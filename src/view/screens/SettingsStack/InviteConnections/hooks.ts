import { useMountEffect } from '@appello/common/lib/hooks';
import { IS_IOS } from '@appello/mobile/lib/constants/platform';
import React, { useState } from 'react';
import { Alert, PermissionsAndroid } from 'react-native';
import { getAllWithoutPhotos as getContacts } from 'react-native-contacts';

import { PhoneContact } from '~/view/screens/SettingsStack/InviteConnections/types';

interface UseContactsReturn {
  contacts: PhoneContact[];
  isFetching: boolean;
}

export function useContacts(): UseContactsReturn {
  const [contacts, setContacts] = useState<PhoneContact[]>([]);
  const [isFetching, setFetching] = useState(false);

  const loadContacts = React.useCallback(async () => {
    setFetching(true);
    try {
      const isAccessGranted = IS_IOS
        ? true
        : (await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
            title: 'Contacts',
            message: 'This app would like to view your contacts. Change permissions in Settings',
            buttonPositive: 'OK',
          })) === 'granted';

      if (!isAccessGranted) {
        return;
      }

      const result = await getContacts();
      const contacts = result
        .filter(contact => contact.phoneNumbers.length && contact.phoneNumbers[0].number)
        .sort((a, b) => a.givenName.localeCompare(b.givenName))
        .map(contact => ({
          name: contact.givenName || contact.phoneNumbers[0].number,
          phoneNumber: contact.phoneNumbers[0].number,
        }));
      setContacts(contacts);
    } catch (e) {
      Alert.alert('This app would like to view your contacts. Change permissions in Settings');
    } finally {
      setFetching(false);
    }
  }, []);

  useMountEffect(() => {
    loadContacts();
  });

  return { contacts, isFetching };
}
