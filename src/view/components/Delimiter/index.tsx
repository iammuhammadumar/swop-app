import React, { VFC } from 'react';
import { View, ViewStyle } from 'react-native';

import { makeStyles, Text, useTheme } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

interface Props {
  label?: string;
  containerStyle?: ViewStyle;
}

export const Delimiter: VFC<Props> = ({ label, containerStyle }) => {
  const styles = useStyles();

  return (
    <View style={[styles.delimiterWrapper, containerStyle]}>
      <View style={styles.delimiterLine} />
      {label && (
        <>
          <Text style={styles.delimiterText}>{label}</Text>
          <View style={styles.delimiterLine} />
        </>
      )}
    </View>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    delimiterWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    delimiterLine: {
      height: 1,
      flex: 1,
      backgroundColor: '#E5EAF6',
    },
    delimiterText: {
      fontSize: theme.textSize.l,
      fontFamily: FontFamily.SEMI_BOLD,
      marginHorizontal: 13,
      color: theme.colors.primary,
    },
  };
});
