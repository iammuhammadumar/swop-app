export function getFileNameFromUrl(url: string): string {
  return url.substring(url.lastIndexOf('/') + 1);
}
