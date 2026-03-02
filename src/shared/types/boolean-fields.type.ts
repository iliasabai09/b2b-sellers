export type BooleanFields<T> = {
  [K in keyof T]: boolean;
};
