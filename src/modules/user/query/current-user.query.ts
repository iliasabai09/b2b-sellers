import { BooleanFields } from '@shared/types/boolean-fields.type';
import { ICurrentUser } from '@modules/user/interfaces/res/current-user.interface';

export const CURRENT_USER_QUERY: BooleanFields<ICurrentUser> = {
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
};
