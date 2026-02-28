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

export const GET_MY_COMPANIES = {
  summary: 'Получение компаний пользователя',
  description:
    'Метод возвращает список компаний, в которых состоит пользователь (userId берётся из JWT). Для каждой компании возвращаются name, address, role пользователя и флаг isActive.',
};

export const GET_MY_COMPANIES_RES = {
  status: 200,
  description: 'Возвращает список компаний пользователя и активную компанию',
};

export const REMOVE_MEMBER = {
  summary: 'Удаление участника из компании',
  description:
    'Метод удаляет участника из компании. Доступен только пользователю с ролью OWNER в текущей компании. userId владельца берётся из JWT, удаляемый участник передаётся в параметре :userId. Нельзя удалить владельца (OWNER).',
};

export const REMOVE_MEMBER_RES = {
  status: 200,
  description: 'Участник успешно удалён из компании',
};

export const UPDATE_ROLE = {
  summary: 'Обновление роли участника компании',
  description:
    'Метод обновляет роль участника в компании. Доступен только пользователю с ролью OWNER в текущей компании. userId владельца берётся из JWT, изменяемый участник передаётся в body (userId), новая роль передаётся в body (role). Нельзя изменить роль владельца (OWNER) и нельзя назначить роль OWNER через этот метод.',
};

export const UPDATE_ROLE_RES = {
  status: 200,
  description: 'Роль участника успешно обновлена',
};

export const GET_COMPANY_MEMBERS = {
  summary: 'Получение сотрудников компании',
  description:
    'Метод возвращает список участников (сотрудников) текущей компании. Доступен авторизованным пользователям. companyId берётся из JWT. Возвращает: роль участника (role), имя и фамилию (firstName, lastName), id пользователя (userId), номер телефона (phone).',
};

export const GET_COMPANY_MEMBERS_RES = {
  status: 200,
  description: 'Список сотрудников компании успешно получен',
};
