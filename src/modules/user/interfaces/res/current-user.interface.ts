import { Gender } from '@modules/user/enums/user.enum';

export interface ICurrentUser {
  id: number;
  phone: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: Date | null;
  gender: Gender;
  photoUrl: string;
  about: string;
  telegram: string;
  whatsapp: string;
  instagram: string;
  tiktok: string;
}
