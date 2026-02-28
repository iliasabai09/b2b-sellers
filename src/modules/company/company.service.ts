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
}
