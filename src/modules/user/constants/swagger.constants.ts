export const GET_CURRENT_USER = {
  summary: 'Получение текущего пользователя',
  description:
    'Метод возвращает данные текущего авторизованного пользователя. userId берётся из JWT токена.',
};

export const GET_CURRENT_USER_RES = {
  status: 200,
  description: 'Данные пользователя успешно получены',
};
