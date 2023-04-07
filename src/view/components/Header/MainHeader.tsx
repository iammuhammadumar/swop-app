import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, View } from 'react-native';

import { SvgIcon } from '~/view/components/SvgIcon';
import { makeStyles, useTheme } from '~/view/plugins/theme';

import { HEADER_HEIGHT } from './consts';

export const MainHeader: React.FC = () => {
  const theme = useTheme();
  const styles = useStyles();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.centerItem}>
        <SvgIcon name="swopTextLogo" width={77} height={23} />
      </View>
      <Pressable style={styles.leftItem} onPress={() => navigation.navigate('ScanCardQRCode')}>
        <SvgIcon name="scan" size={24} />
      </Pressable>
      <Pressable style={styles.rightItem} onPress={() => navigation.navigate('Notifications')}>
        <SvgIcon name="notificationBell" fill={theme.colors.primary} width={24} height={24} />
      </Pressable>
    </View>
  );
};

const useStyles = makeStyles({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    height: HEADER_HEIGHT,
  },
  leftItem: {
    position: 'absolute',
    left: 20,
    alignItems: 'flex-start',
  },
  rightItem: {
    position: 'absolute',
    right: 20,
    alignItems: 'flex-end',
  },
  centerItem: {
    flex: 1,
    alignItems: 'center',
  },
});
