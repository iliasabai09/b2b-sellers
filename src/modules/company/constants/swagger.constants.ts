export const CREATE_COMPANY = {
  summary: 'Создание компании',
  description: 'Метод создает компанию',
};

export const CREATE_COMPANY_RES = {
  status: 200,
  description: 'Возвращает созданную компанию',
};

export const UPDATE_COMPANY = {
  summary: 'Редактирование компании',
  description: 'Метод обновляет данные компании (доступно только OWNER)',
};

export const UPDATE_COMPANY_RES = {
  status: 200,
  description: 'Возвращает обновленную компанию',
};

export const ADD_MEMBER = {
  summary: 'Добавление пользователя в компанию',
  description:
    'Метод добавляет существующего пользователя в текущую компанию по номеру телефона с указанной ролью (доступно OWNER и ADMIN)',
};

export const ADD_MEMBER_RES = {
  status: 201,
  description: 'Возвращает созданного участника компании',
};
