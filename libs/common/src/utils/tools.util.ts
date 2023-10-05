export const toJSON = (value: any) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
