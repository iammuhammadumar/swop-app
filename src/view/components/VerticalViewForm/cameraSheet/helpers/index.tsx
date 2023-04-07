export function getImageFormat(uri: string): string {
  const afterDot = uri?.split(/[#?]/)[0]?.split('.')?.pop()?.trim();
  return afterDot || 'jpg';
}

export function makeName(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function pickName(uri: string): string {
  const uriSplit = uri.split('/');
  const name = uriSplit[uriSplit.length - 1];
  return name;
}
