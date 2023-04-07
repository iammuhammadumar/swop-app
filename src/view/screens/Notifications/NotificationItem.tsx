import React from 'react';
import { View } from 'react-native';

import { Avatar } from '~/view/components/Avatar/Avatar';
import { AvatarSize } from '~/view/components/Avatar/consts';
import { Delimiter } from '~/view/components/Delimiter';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';
import { NotificationListItem } from '~/view/screens/Notifications/types';

interface Props {
  notification: NotificationListItem;
}

export const NotificationItem: React.VFC<Props> = ({ notification }) => {
  const styles = useStyles();

  return (
    <View style={[styles.wrapper, !notification.isRead ? styles.unread : undefined]}>
      <View style={styles.container}>
        <View style={styles.leftSide}>
          <Avatar size={AvatarSize.M} uri={notification.photo ?? undefined} />
          <Text style={styles.text}>{notification.text}</Text>
        </View>
        <Text variant="inactive" fontSize={12}>
          {notification.time}
        </Text>
      </View>
      <Delimiter />
    </View>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    wrapper: {
      paddingHorizontal: 25,
    },
    unread: {
      backgroundColor: '#eef9fe',
    },
    container: {
      paddingVertical: 20,
      alignItems: 'center',
      flexDirection: 'row',
      adssad: 'space-between',
    },
    leftSide: {
      alignItems: 'center',
      flexDirection: 'row',
      maxWidth: '70%',
    },
    text: {
      marginLeft: 15,
      color: theme.colors.primary,
    },
  };
});
