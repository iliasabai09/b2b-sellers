import { RegionFindManyArgs } from '@core/generated/models/Region';

export const REGION_SELECT: RegionFindManyArgs = {
  select: {
    id: true,
    name: true,
  },
  orderBy: {
    name: 'asc',
  },
};

export const REGION_WITH_CITIES_SELECT: RegionFindManyArgs = {
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
};
