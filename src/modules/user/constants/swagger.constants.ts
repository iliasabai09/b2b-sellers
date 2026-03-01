export const GET_CURRENT_USER = {
  summary: 'Получение текущего пользователя',
  description:
    'Метод возвращает данные текущего авторизованного пользователя. userId берётся из JWT токена.',
};

export const GET_CURRENT_USER_RES = {
  status: 200,
  description: 'Данные пользователя успешно получены',
};

export const UPDATE_ME = {
  summary: 'Обновление данных пользователя',
  description:
    'Метод обновляет данные текущего пользователя. userId берётся из JWT. В ответе возвращаются поля пользователя без memberships, createdAt, updatedAt.',
};

export const UPDATE_ME_RES = {
  status: 200,
  description: 'Данные пользователя успешно обновлены',
};
