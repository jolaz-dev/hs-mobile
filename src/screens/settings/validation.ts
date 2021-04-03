export const validateContent = (text: string): string => {
  if (!text) {
    return "Can't be blank";
  }
  return '';
};

export const validateLength = (text: string): string => {
  if (text && text.length < 4) {
    return 'Must be 4 characters or more.';
  }
  return '';
};
