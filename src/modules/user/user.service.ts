import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@core/prisma/prisma.service';

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
}
