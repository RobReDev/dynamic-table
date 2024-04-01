export const ESC_KEY_CODE = 27;

export const fromCamelCaseToWords = (str: string) =>
  str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();

export const isDate = (str: string) => !isNaN(Date.parse(str));

export const removeNumbers = (str: string): string => {
  return str.replace(/[0-9]/g, "");
};
