import { Gender } from '@modules/user/enums/user.enum';

export const UPDATE_USER_SCHEMA = {
  schema: {
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        example: 'Ильяс',
      },
      lastName: {
        type: 'string',
        example: 'Абай',
      },
      middleName: {
        type: 'string',
        example: 'Серикович',
      },
      birthDate: {
        type: 'string',
        format: 'date',
        example: '2002-07-09T00:00:00.000Z',
      },
      gender: {
        type: 'string',
        enum: [Gender.MALE, Gender.FEMALE, Gender.OTHER],
        example: 'MALE',
      },
      about: {
        type: 'string',
        example: 'Занимаюсь поставками и разработкой',
      },
      telegram: {
        type: 'string',
        example: '@ilyas_tg',
      },
      whatsapp: {
        type: 'string',
        example: '+77001234567',
      },
      instagram: {
        type: 'string',
        example: 'https://instagram.com/ilyas',
      },
      tiktok: {
        type: 'string',
        example: 'https://tiktok.com/@ilyas',
      },
      photo: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};
