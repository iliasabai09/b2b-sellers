export const GET_CATEGORIES = {
  summary: 'Получение дерева категорий',
  description:
    'Метод возвращает дерево категорий (до 3 уровней). Возвращаются только активные категории (isActive = true). Категории отсортированы по полю sort и name. В ответе каждая категория может содержать массив дочерних категорий (children).',
};

export const GET_CATEGORIES_RES = {
  status: 200,
  description: 'Дерево категорий успешно получено',
};
