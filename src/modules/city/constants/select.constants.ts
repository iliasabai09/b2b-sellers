import { CityFindManyArgs } from '@core/generated/models/City';

export const CITY_SELECT: CityFindManyArgs = {
  select: {
    id: true,
    name: true,
    regionId: true,
  },
  orderBy: {
    name: 'asc',
  },
};
