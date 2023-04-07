import { useSwitchValue } from '@appello/common/lib/hooks';
import * as React from 'react';
import { useMemo } from 'react';
import { Pressable, PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';

import { IconName, SvgIcon } from '~/view/components/SvgIcon/SvgIcon';
import { makeStyles, Text, theme } from '~/view/plugins/theme';
import { useTheme } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

export enum ButtonStyleType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  NEGATIVE = 'negative',
}

interface Props extends Omit<PressableProps, 'title' | 'style'> {
  styleType?: ButtonStyleType;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  label?: string;
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: IconName;
}

export const Button: React.FC<Props> = ({
  containerStyle,
  label,
  styleType,
  disabled,
  isLoading,
  fullWidth,
  children,
  textStyle,
  icon,
  ...buttonProps
}) => {
  const styles = useStyles({ styleType });
  const [isPressed, on, off] = useSwitchValue(false);

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || isLoading}
      onPressIn={on}
      onPressOut={off}
      {...buttonProps}
      style={[
        styles.button,
        containerStyle,
        fullWidth && { width: '100%' },
        isPressed && { opacity: 0.8 },
        disabled && styles.buttonDisabled,
      ]}
    >
      {icon && <SvgIcon name={icon} size={25} style={styles.icon} />}
      {label && (
        <Text
          style={[
            styles.buttonText,
            textStyle,
            isLoading && styles.buttonTextLoading,
            disabled && styles.buttonTextDisabled,
          ]}
        >
          {label}
        </Text>
      )}
      {isLoading && <Flow color={theme.colors.white} size={40} style={styles.loader} />}
      {children}
    </Pressable>
  );
};

const useStyles = makeStyles(({ styleType }: Pick<Props, 'styleType'>) => {
  const { colors, borderRadii, textSize } = useTheme();

  const color: { text?: string; background?: string } = useMemo(() => {
    if (styleType === ButtonStyleType.PRIMARY) {
      return {
        text: colors.white,
        background: colors.primary,
      };
    }
    if (styleType === ButtonStyleType.SECONDARY) {
      return {
        text: colors.primary,
        background: colors.white,
      };
    }
    if (styleType === ButtonStyleType.NEGATIVE) {
      return {
        text: colors.negative,
        background: colors.white,
      };
    }
    return { text: colors.ink };
  }, [colors, styleType]);

  return {
    icon: {
      marginRight: 5,
    },
    button: {
      borderRadius: borderRadii.m,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      height: 44,
      backgroundColor: color.background,
      ...(styleType === ButtonStyleType.SECONDARY
        ? {
            backgroundColor: colors.white,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: colors.primary,
          }
        : {}),
      ...(styleType === ButtonStyleType.NEGATIVE
        ? {
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: colors.negative,
          }
        : {}),
    },
    buttonDisabled: {
      backgroundColor: '#e1e1e1',
      borderWidth: 0,
    },
    buttonText: {
      color: color.text,
      fontSize: textSize.l,
      fontFamily: FontFamily.SEMI_BOLD,
    },
    buttonTextDisabled: {
      color: theme.colors.gray1,
    },
    buttonTextLoading: {
      opacity: 0,
    },
    loader: {
      position: 'absolute',
    },
  };
});
