export const checkString = (value: unknown): value is string =>
  !!value && typeof value === "string";
