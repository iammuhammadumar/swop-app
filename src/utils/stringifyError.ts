export function stringifyError(error: unknown): string {
  const names = Object.getOwnPropertyNames(error);
  const obj = names.reduce<Record<string, unknown>>((acc, name) => {
    if (name !== 'stack') {
      acc[name] = (error as Record<string, unknown>)[name];
    }
    return acc;
  }, {});

  return JSON.stringify(obj);
}
