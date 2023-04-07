export const isValidHex = (color: string): boolean => {
  if (!color || typeof color !== 'string') return false;

  // Validate hex values
  if (color.substring(0, 1) === '#') {
    color = color.substring(1);
  } else {
    return false;
  }

  switch (color.length) {
    case 6:
      return /^[0-9A-F]{6}$/i.test(color);
    default:
      return false;
  }
};

export const delateHEX = (color: string): string => {
  const value = color.replaceAll('#', '');
  return value;
};
