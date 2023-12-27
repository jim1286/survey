export const set = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const get = (key: string) => {
  const value = localStorage.getItem(key);

  if (!value) {
    return undefined;
  }

  return value;
};

export const clear = () => {
  localStorage.clear();
};
