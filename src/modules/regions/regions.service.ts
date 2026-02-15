import { Injectable } from '@nestjs/common';
import {
  REGION_SELECT,
  REGION_WITH_CITIES_SELECT,
} from './constants/select.constants';
import { PrismaService } from '@core/prisma/prisma.service';

@Injectable()
export class RegionsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.region.findMany(REGION_SELECT);
  }

  findAllWithCities() {
    return this.prisma.region.findMany(REGION_WITH_CITIES_SELECT);
  }
}
