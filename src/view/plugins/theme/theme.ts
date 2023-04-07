import { createBox, createText, createTheme, useTheme as useReTheme } from '@shopify/restyle';
import { AllProps } from '@shopify/restyle/dist/restyleFunctions';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import { FontFamily } from '~/view/theme';

interface VariantsThemeType {
  [key: string]: AllProps<Theme>;
}

const colors = {
  primary: '#0F0B47',
  ink: '#000000',
  white: '#ffffff',
  brand: '#1168DC',
  brandSecondary: '#58C3F9',
  gray1: '#9E9E9E',
  gray2: '#E3E3E3',
  gray3: '#F6F6FC',
  gray4: '#1a1a1a',
  negative: '#E54639',
  delete: '#DE2727',
};

const borderRadii = {
  xs: 6,
  s: 10,
  m: 15,
  l: 22,
  xl: 25,
};

const textSize = {
  s: 12,
  m: 14,
  l: 16,
  xl: 18,
  xxl: 20,
};

const textLineHeight = {
  s: 0,
  m: 0,
  l: 0,
  xl: 0,
  xxl: 34,
};

const spacing = {
  auto: 'auto',
  // xxxs: 4,
  // xxs: 8,
  // xs: 12,
  // sm: 16,
  // s: 20,
  // l: 24,
  // m: 28,
  // xl: 32,
  // xxl: 36,
  // xxxl: 50,
};

const textVariants: VariantsThemeType = {
  p1: {
    fontFamily: FontFamily.REGULAR,
    color: 'ink',
    fontSize: 14,
  },
  p2: {
    fontFamily: FontFamily.REGULAR,
    color: 'ink',
    fontSize: 16,
    lineHeight: 22,
  },
  c1: {
    fontFamily: FontFamily.REGULAR,
    color: 'ink',
    fontSize: 12,
    lineHeight: 18,
  },

  h1: {
    fontFamily: FontFamily.SEMI_BOLD,
    color: 'ink',
    fontSize: textSize.xxl,
    lineHeight: textLineHeight.xxl,
  },
  h2: {
    fontFamily: FontFamily.SEMI_BOLD,
    color: 'ink',
    fontSize: textSize.l,
    lineHeight: 22,
  },
  error: {
    fontFamily: FontFamily.REGULAR,
    color: 'negative',
    fontSize: 12,
  },
  inactive: {
    color: 'gray1',
  },
  s_link: {
    fontFamily: FontFamily.SEMI_BOLD,
    color: 'ink',
    fontSize: textSize.xl,
    lineHeight: 24,
  },
};

const themeObject = {
  breakpoints: {},
  colors,
  borderRadii,
  spacing,
  textVariants,
  textSize,
};

export const theme = createTheme(themeObject);
export type Theme = typeof theme;
export type ColorsVariants = keyof typeof colors;

// Restyle components
export const Text = createText<Theme>();
export const Box = createBox<Theme>();

export const useTheme = (): Theme => useReTheme<Theme>();

export type NamedStyles<T> = { [key in keyof T]: ViewStyle | TextStyle | ImageStyle };
export const makeStyles = <P extends Record<string, unknown> | void, S extends NamedStyles<S>>(
  styles: ((props: P) => S) | S,
): ((props: P) => S) => {
  return styles instanceof Function ? styles : () => styles;
};
