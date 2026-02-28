import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@core/prisma/prisma.service';
import { CreateCompanyDto } from '@modules/company/dto/requests/create-company.dto';
import { ROLE } from '@modules/auth/enums/role.enum';
import { UpdateCompanyDto } from '@modules/company/dto/requests/update-company.dto';
import { AddCompanyMemberDto } from '@modules/company/dto/requests/add-company-member.dto';
import { UpdateMemberRoleDto } from '@modules/company/dto/requests/update-member-role.dto';
import { CompanyEmployeeDto } from '@modules/company/dto/res/company-employee.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCompany(userId: number, dto: CreateCompanyDto) {
    return this.prismaService.company.create({
      data: {
        ...dto,
        status: 'PENDING',
        members: {
          create: {
            userId,
            role: ROLE.OWNER,
            // status по дефолту ACTIVE
          },
        },
      },
      include: {
        members: true,
      },
    });
  }

  async updateCompany(companyId: number, dto: UpdateCompanyDto) {
    return this.prismaService.company.update({
      where: { id: companyId },
      data: dto,
    });
  }

  async addMember(
    actor: { sub: number; companyId: number },
    dto: AddCompanyMemberDto,
  ) {
    const companyId = actor.companyId;
    if (!companyId) {
      throw new BadRequestException('Компания не указана в токене');
    }

    // 1) пользователь должен существовать
    const targetUser = await this.prismaService.user.findUnique({
      where: { phone: dto.phone },
      select: { id: true, phone: true },
    });

    if (!targetUser) {
      throw new NotFoundException(
        'Пользователь с таким номером телефона не найден',
      );
    }

    // 2) нельзя добавлять самого себя
    if (targetUser.id === actor.sub) {
      throw new BadRequestException(
        'Вы не можете добавить самого себя в компанию',
      );
    }

    // 3) если уже участник — конфликт
    const exists = await this.prismaService.companyMember.findUnique({
      where: {
        userId_companyId: {
          companyId,
          userId: targetUser.id,
        },
      },
      select: { id: true },
    });

    if (exists) {
      throw new ConflictException('Пользователь уже состоит в этой компании');
    }

    // 4) запрещаем выдавать OWNER
    if (dto.role === ROLE.OWNER) {
      throw new ForbiddenException('Назначение роли OWNER запрещено');
    }

    // 5) создаём membership
    return this.prismaService.companyMember.create({
      data: {
        companyId,
        userId: targetUser.id,
        role: dto.role,
      },
      select: {
        id: true,
        role: true,
        user: {
          select: { id: true, phone: true, firstName: true, lastName: true },
        },
      },
    });
  }

  async getMyCompanies(userId: number, companyId: number) {
    const companies = await this.prismaService.company.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      select: {
        name: true,
        address: true,
        members: {
          where: { userId },
          select: { role: true, companyId: true },
        },
      },
    });

    return companies.map((c) => ({
      name: c.name,
      address: c.address,
      role: c.members[0]?.role ?? null,
      isActive: companyId === c.members[0]?.companyId,
    }));
  }

  async removeMember(
    ownerId: number,
    ownerCompanyId: number,
    targetUserId: number,
  ) {
    // 1️⃣ Найти компанию, где этот owner OWNER
    const ownerMembership = await this.prismaService.companyMember.findFirst({
      where: {
        userId: ownerId,
        companyId: ownerCompanyId,
        role: 'OWNER',
      },
    });

    if (!ownerMembership) {
      throw new ForbiddenException('Only OWNER can remove members');
    }

    const companyId = ownerMembership.companyId;

    // 2️⃣ Проверяем что удаляемый пользователь в этой же компании
    const targetMembership = await this.prismaService.companyMember.findFirst({
      where: {
        userId: targetUserId,
        companyId,
      },
    });

    if (!targetMembership) {
      throw new NotFoundException('User is not a member of this company');
    }

    // 3️⃣ Нельзя удалить OWNER
    if (targetMembership.role === 'OWNER') {
      throw new BadRequestException('Cannot remove OWNER');
    }

    // 4️⃣ Удаляем
    await this.prismaService.companyMember.delete({
      where: {
        id: targetMembership.id,
      },
    });

    return { success: true };
  }

  async updateMemberRole(
    ownerId: number,
    companyId: number,
    dto: UpdateMemberRoleDto,
  ) {
    if (dto.role === ROLE.OWNER) {
      throw new BadRequestException('Use transfer ownership endpoint');
    }

    if (ownerId === dto.userId) {
      throw new ForbiddenException('Cannot change your own role');
    }

    const member = await this.prismaService.companyMember.findUnique({
      where: { userId_companyId: { companyId, userId: dto.userId } },
      select: { role: true, userId: true, companyId: true },
    });

    if (!member) throw new NotFoundException('Member not found');

    if ((member.role as ROLE) === ROLE.OWNER) {
      throw new ForbiddenException('Cannot change OWNER role');
    }

    return this.prismaService.companyMember.update({
      where: { userId_companyId: { companyId, userId: dto.userId } },
      data: { role: dto.role },
      select: {
        role: true,
      },
    });
  }

  async getCompanyMembers(companyId: number): Promise<CompanyEmployeeDto[]> {
    const exists = await this.prismaService.company.findUnique({
      where: { id: companyId },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Company not found');

    const members = await this.prismaService.companyMember.findMany({
      where: { companyId },
      select: {
        role: true,
        user: {
          select: {
            id: true,
            phone: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' }, // если есть createdAt у CompanyMember
    });

    return members.map((m) => ({
      role: m.role,
      userId: m.user.id,
      phone: m.user.phone,
      firstName: m.user.firstName ?? null,
      lastName: m.user.lastName ?? null,
    }));
  }
}
