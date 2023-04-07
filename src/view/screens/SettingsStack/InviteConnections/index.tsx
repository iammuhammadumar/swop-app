import React, { useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { useInviteConnectionMutation } from '~/store/query/inviteConnections';
import { getErrorData } from '~/utils/getErrorData';
import { preparePhoneNumber } from '~/utils/preparePhoneNumber';
import { processApiError } from '~/utils/processApiError';
import { StackHeader } from '~/view/components/Header/StackHeader';
import { MainContainer } from '~/view/components/MainContainer';
import { makeStyles, Text } from '~/view/plugins/theme';

import { ConnectionItem } from './ConnectionItem';
import { useContacts } from './hooks';
import { PhoneContact } from './types';

export const InviteConnectionsScreen: React.VFC = () => {
  const styles = useStyles();
  const { contacts, isFetching: isContactsFetching } = useContacts();
  const [inviteConnection] = useInviteConnectionMutation();

  const handleContactInvite = useCallback(
    async (contact: PhoneContact) => {
      try {
        await inviteConnection({
          phone: preparePhoneNumber('+61', contact.phoneNumber),
        }).unwrap();
      } catch (e) {
        const errors = getErrorData(e);

        if (errors.phone) {
          showMessage({
            message: errors.phone,
            type: 'danger',
          });
        } else {
          processApiError({ errors });
        }

        throw e;
      }
    },
    [inviteConnection],
  );

  return (
    <MainContainer>
      <StackHeader text="Invite Connections" />
      <ScrollView contentContainerStyle={styles.container}>
        {contacts.length > 0 &&
          contacts.map((item, index) => (
            <ConnectionItem contact={item} key={index} onInvite={handleContactInvite} />
          ))}
        {!contacts.length && (
          <View>
            <Text color="gray1" style={styles.notFoundText}>
              {isContactsFetching ? 'Loading...' : '0 contacts'}
            </Text>
          </View>
        )}
      </ScrollView>
    </MainContainer>
  );
};

const useStyles = makeStyles({
  container: {
    marginTop: 6,
    paddingHorizontal: 25,
  },
  notFoundText: {
    marginTop: 20,
  },
});
