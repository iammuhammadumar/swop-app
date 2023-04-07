declare module '*.png' {
  const content: string;
  // eslint-disable-next-line import/no-default-export
  export default content;
}

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';

  const content: React.FC<SvgProps>;
  // eslint-disable-next-line import/no-default-export
  export default content;
}

declare type Nullable<T> = T | null;

declare type Copy<T> = { [K in keyof T]: T[K] };
