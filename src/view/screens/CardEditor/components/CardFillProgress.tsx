import React, { useMemo } from 'react';
import { View } from 'react-native';

import { useAppSelector } from '~/store/hooks';
import { CardView } from '~/store/modules/cardForm/consts';
import { makeStyles, useTheme } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

const options = [CardView.HORIZONTAL, CardView.VERTICAL];

export const CardFillProgress: React.VFC = () => {
  const styles = useStyles();
  const cardView = useAppSelector(state => state.cardForm.cardView);

  const progressPercent = useMemo(
    () => ((options.indexOf(cardView) + 1) * 100) / options.length,
    [cardView],
  );

  return (
    <View style={styles.container}>
      <View style={styles.progress}>
        <View style={[styles.progressActive, { width: `${progressPercent}%` }]} />
      </View>
    </View>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    container: {
      marginTop: 15,
      flexDirection: 'row',
      alignItems: 'center',
    },
    progress: {
      flex: 1,
      height: 4,
      backgroundColor: '#E9E9E9',
    },
    progressActive: {
      backgroundColor: theme.colors.brand,
      height: 4,
    },
    text: {
      paddingVertical: 9,
      textAlign: 'center',
      fontFamily: FontFamily.SEMI_BOLD,
      color: theme.colors.gray1,
    },
    activeText: {
      color: theme.colors.brand,
    },
  };
});
