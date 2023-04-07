import React, { ReactElement } from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';

import { makeStyles } from '~/view/plugins/theme';

interface Props {
  children: ReactElement;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const CardBox: React.VFC<Props> = ({ style, onPress, children }) => {
  const styles = useStyles();
  return (
    <Pressable style={[styles.shadowWrapper, style]} onPress={onPress}>
      <View style={styles.container}>{children}</View>
    </Pressable>
  );
};

const CARD_HEIGHT = 204;

const useStyles = makeStyles(() => {
  return {
    shadowWrapper: {
      width: 325,
      height: CARD_HEIGHT,
      shadowColor: '#a8a8a8',
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 3,
      shadowOpacity: 1,
      elevation: 4,
      borderRadius: 13,
      backgroundColor: '#fff',
    },

    container: {
      width: 325,
      height: CARD_HEIGHT,
      borderRadius: 13,
      overflow: 'hidden',
    },
  };
});
