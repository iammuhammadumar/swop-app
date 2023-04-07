import React, { useMemo, VFC } from 'react';
import { TextInput as BaseTextInput, TextInputProps } from 'react-native';

import { makeStyles, useTheme } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

interface Props extends TextInputProps {
  error?: boolean;
}

export const TextInput: VFC<Props> = ({ style, error, ...textInputProps }) => {
  const styles = useStyles();
  const theme = useTheme();

  const textInputStyle = useMemo(() => {
    return [styles.textInput, style, error && styles.errorTextInput];
  }, [styles, style, error]);
  return (
    <BaseTextInput
      autoCapitalize="none"
      style={textInputStyle}
      placeholderTextColor={theme.colors.gray1}
      {...textInputProps}
    />
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    textInput: {
      borderRadius: theme.borderRadii.s,
      fontFamily: FontFamily.REGULAR,
      borderWidth: 0.5,
      borderStyle: 'solid',
      borderColor: theme.colors.gray2,
      fontSize: theme.textSize.l,
      color: theme.colors.ink,
      height: 40,
      paddingHorizontal: 15,
      paddingVertical: 0,
    },
    errorTextInput: {
      borderColor: theme.colors.negative,
    },
  };
});
