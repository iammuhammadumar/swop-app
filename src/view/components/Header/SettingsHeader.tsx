import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, View } from 'react-native';

import { useAppSelector } from '~/store/hooks';
import { Avatar } from '~/view/components/Avatar/Avatar';
import { AvatarSize } from '~/view/components/Avatar/consts';
import { SvgIcon } from '~/view/components/SvgIcon';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';

import { HEADER_HEIGHT } from './consts';

interface Props {
  title?: string;
}

export const SettingsHeader: React.VFC<Props> = ({ title }) => {
  const profile = useAppSelector(state => state.user.profile);
  const theme = useTheme();
  const styles = useStyles();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.leftItem}>
        <Avatar size={AvatarSize.S} uri={profile?.photo} />
      </View>
      <View style={styles.centerItem}>
        <Text variant="h2">{title}</Text>
      </View>
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
    flex: 1,
    alignItems: 'flex-start',
  },
  rightItem: {
    flex: 1,
    alignItems: 'flex-end',
  },
  centerItem: {
    flex: 1,
    alignItems: 'center',
  },
});
