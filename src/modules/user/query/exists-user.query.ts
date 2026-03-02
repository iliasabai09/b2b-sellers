import { BooleanFields } from '@shared/types/boolean-fields.type';
import { IExistsUser } from '@modules/user/interfaces/res/exists-user.interface';

export const EXISTS_USER_QUERY: BooleanFields<IExistsUser> = {
  id: true,
  photoUrl: true,
};
