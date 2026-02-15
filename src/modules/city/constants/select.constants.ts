import { Prisma } from '@prisma/client';

export const CITY_SELECT = Prisma.validator<Prisma.CityFindFirstArgs>()({
  select: {
    id: true,
    name: true,
    regionId: true,
  },
  orderBy: {
    name: 'asc',
  },
});
