import React from 'react';
import { FieldError } from 'react-hook-form';
import { StyleProp, View, ViewStyle } from 'react-native';

import { makeStyles, Text, useTheme } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

interface Props {
  label?: string;
  error?: FieldError;
  style?: StyleProp<ViewStyle>;
}

export const Field: React.FC<Props> = ({ label, error, style, children }) => {
  const styles = useStyles();

  return (
    <View style={style}>
      {label && (
        <Text variant="p1" color="gray1" style={styles.label}>
          {label}
        </Text>
      )}
      <View>{children}</View>
      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    label: {
      marginBottom: 4,
      fontFamily: FontFamily.MEDIUM,
    },
    error: {
      color: theme.colors.negative,
      fontSize: theme.textSize.s,
    },
  };
});
