export const REQUEST_OTP = {
  summary: 'Отправка кода для подтверждения',
  description: 'Если 200 то ок',
};

export const REQUEST_OTP_RES = {
  status: 200,
  description: 'Возвращает статус',
};

export const VERIFY_OTP = {
  summary: 'Проверка кода подтверждения',
  description: 'По номеру телефона и отп коду',
};

export const VERIFY_OTP_RES = {
  status: 200,
  description: 'Возвращает токены',
};
