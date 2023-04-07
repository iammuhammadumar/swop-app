/* eslint-disable no-console */
export const logger = {
  log: (...args: any[]): void => {
    if (__DEV__) {
      console.log(...args);
    }
  },

  warn: (...args: any[]): void => {
    if (__DEV__) {
      console.warn(...args);
    }
  },

  error: (...args: any[]): void => {
    if (__DEV__) {
      console.error(...args);
    }
  },
};
