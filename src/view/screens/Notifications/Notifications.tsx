import React from 'react';
import { ScrollView } from 'react-native';

import { EmptyState } from '~/view/components/EmptyState';
import { StackHeader } from '~/view/components/Header/StackHeader';
import { MainContainer } from '~/view/components/MainContainer';
import { makeStyles } from '~/view/plugins/theme';
import { NotificationItem } from '~/view/screens/Notifications/NotificationItem';
import { testNotifications } from '~/view/screens/Notifications/testData';

export const NotificationsScreen: React.VFC = () => {
  const styles = useStyles();
  // todo: mvp solution
  const isEmpty = true;

  return (
    <MainContainer>
      <StackHeader text="Notifications" />
      {isEmpty && (
        <EmptyState
          label="You have no notifications yet"
          image={require('~/view/assets/images/emptyState/notifications.png')}
        />
      )}
      {!isEmpty && (
        <ScrollView contentContainerStyle={styles.container}>
          {testNotifications.map((item, index) => (
            <NotificationItem notification={item} key={index} />
          ))}
        </ScrollView>
      )}
    </MainContainer>
  );
};

const useStyles = makeStyles({
  container: {
    marginTop: 7,
  },
});
