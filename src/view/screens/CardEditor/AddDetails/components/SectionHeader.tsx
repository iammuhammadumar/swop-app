import React, { FC, memo } from 'react';
import { View } from 'react-native';

import { makeStyles, Text, useTheme } from '~/view/plugins/theme';

interface SectionHeaderProps {
  title: string;
}

export const SectionHeader: FC<SectionHeaderProps> = memo(props => {
  const styles = useStyles();
  return (
    <View style={styles.root}>
      <View style={styles.row} />
      <View style={styles.titleBox}>
        <Text fontSize={14} textAlign="center" fontWeight="600" variant="p2">
          {props.title}
        </Text>
      </View>
      <View style={styles.row} />
    </View>
  );
});

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    root: {
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingTop: 20,
      paddingBottom: 10,
    },
    titleBox: {
      minWidth: 127,
      borderRadius: 32,
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: theme.colors.gray3,
    },
    row: {
      height: 3,
      flex: 1,
      backgroundColor: theme.colors.gray3,
    },
  };
});
