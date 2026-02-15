import { Prisma } from '@prisma/client';

export const REGION_SELECT = Prisma.validator<Prisma.RegionFindManyArgs>()({
  select: {
    id: true,
    name: true,
  },
  orderBy: {
    name: 'asc',
  },
});

export const REGION_WITH_CITIES_SELECT =
  Prisma.validator<Prisma.RegionFindManyArgs>()({
    select: {
      id: true,
      name: true,
      cities: {
        select: {
          id: true,
          name: true,
        },
        orderBy: { name: 'asc' },
      },
    },
    orderBy: { name: 'asc' },
  });
