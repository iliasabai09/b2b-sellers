import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma/prisma.service';

@Injectable()
export class OptionService {
  constructor(private readonly prisma: PrismaService) {}

  async getOptions() {
    return this.prisma.option.findMany({
      select: {
        id: true,
        type: true,
        name: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }
}
