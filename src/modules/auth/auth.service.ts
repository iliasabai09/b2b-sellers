import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { OtpRequestDto } from './dto/otp-request.dto';
import { generateOtp6, normalizeKzPhone } from './utils/phone.util';
import { OtpVerifyDto } from './dto/otp-verify.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  requestOtp(dto: OtpRequestDto) {
    const phone = normalizeKzPhone(dto.phone);

    // MVP: генерим и “отправляем” (лог)
    const code = generateOtp6();
    console.log(`[OTP MOCK] phone=${phone} code=${code}`);

    // Важно: в ответ код НЕ возвращаем
    return { ok: true };
  }

  async verifyOtp(dto: OtpVerifyDto) {
    const phone = normalizeKzPhone(dto.phone);

    // MVP-условие: любой 6-значный код валиден (DTO уже проверил /^\d{6}$/)
    // Тут позже появится реальная проверка по БД/провайдеру.

    const user = await this.prisma.user.upsert({
      where: { phone },
      update: {},
      create: { phone },
    });

    const memberships = await this.prisma.companyMember.findMany({
      where: { userId: user.id },
      include: { company: true },
      orderBy: { id: 'asc' },
    });

    const payload = {
      sub: user.id,
      companyId: memberships.length ? memberships[0].companyId : null,
    };

    const accessToken = await this.jwt.signAsync(payload, { expiresIn: '15m' });
    const refreshToken = await this.jwt.signAsync(
      { sub: user.id },
      { expiresIn: '30d' },
    );

    return {
      accessToken,
      refreshToken,
      // user: { id: user.id, phone: user.phone },
      // companies: memberships.map((m) => ({
      //   companyId: m.companyId,
      //   name: m.company.name,
      //   role: m.role,
      //   isSupplierVerified: m.company.status === 'APPROVED',
      // })),
    };
  }
}
