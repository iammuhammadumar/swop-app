import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

import { makeStyles, Text, useTheme } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

interface Props {
  text: string;
  containerStyle?: StyleProp<TextStyle>;
  onPress?(): void;
}

export const TextLink: React.FC<Props> = ({ text, containerStyle, onPress }) => {
  const styles = useStyles();

  return (
    <Text variant="p1" style={[styles.text, containerStyle]} onPress={onPress}>
      {text}
    </Text>
  );
};

const useStyles = makeStyles(() => {
  const { colors } = useTheme();

  return {
    text: {
      color: colors.brandSecondary,
      fontFamily: FontFamily.SEMI_BOLD,
    },
  };
});
