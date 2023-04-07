export function preparePhoneNumber(code: string, rawValue: string): string {
  const value = rawValue.replace(/\D+/g, '');

  if (rawValue.trim().startsWith('+')) {
    return `+${value}`;
  }

  if (value.startsWith('0')) {
    return `${code}${value.slice(1)}`;
  }

  return `${code}${value}`;
}
