import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma/prisma.service';
import { CITY_SELECT } from '@modules/city/constants/select.constants';

@Injectable()
export class CityService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.city.findMany(CITY_SELECT);
  }
}
