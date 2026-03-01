import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@core/prisma/prisma.service';
import { UpdateUserDto } from '@modules/user/dto/requests/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getCurrentUser(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        phone: true,
        firstName: true,
        lastName: true,
        middleName: true,
        birthDate: true,
        gender: true,
        photoUrl: true,
        about: true,
        telegram: true,
        whatsapp: true,
        instagram: true,
        tiktok: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateMe(userId: number, dto: UpdateUserDto) {
    const exists = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('User not found');

    const data = {
      ...dto,
      birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
    };

    // если вообще ничего не пришло
    if (Object.values(data).every((v) => v === undefined)) {
      throw new BadRequestException('No fields to update');
    }

    return this.prismaService.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        phone: true,
        firstName: true,
        lastName: true,
        middleName: true,
        birthDate: true,
        gender: true,
        photoUrl: true,
        about: true,
        telegram: true,
        whatsapp: true,
        instagram: true,
        tiktok: true,
      },
    });
  }
}
