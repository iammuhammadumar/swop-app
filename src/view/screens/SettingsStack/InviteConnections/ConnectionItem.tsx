import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

import { Delimiter } from '~/view/components/Delimiter';
import { SvgIcon } from '~/view/components/SvgIcon';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';
import { INVITED_SHOW_DURATION } from '~/view/screens/SettingsStack/InviteConnections/consts';
import { PhoneContact } from '~/view/screens/SettingsStack/InviteConnections/types';
import { FontFamily } from '~/view/theme';

interface Props {
  contact: PhoneContact;
  onInvite(contact: PhoneContact): Promise<void>;
}

export const ConnectionItem: React.VFC<Props> = ({ contact, onInvite }) => {
  const styles = useStyles();
  const theme = useTheme();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isInvited, setInvited] = useState<boolean>(false);

  const handleInviteClick = useCallback(async () => {
    setLoading(true);
    try {
      await onInvite(contact);
      setInvited(true);
    } finally {
      setLoading(false);
    }
  }, [contact, onInvite]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isInvited) {
      timeout = setTimeout(() => {
        setInvited(false);
      }, INVITED_SHOW_DURATION);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isInvited]);

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text variant="p2" fontFamily={FontFamily.SEMI_BOLD}>
            {contact.name}
          </Text>
          <Text variant="p1">{contact.phoneNumber}</Text>
        </View>
        <Pressable
          onPress={handleInviteClick}
          style={[styles.inviteBtn, isInvited && styles.invitedBtn]}
        >
          {isInvited && <SvgIcon name="check" stroke={theme.colors.brandSecondary} size={21} />}
          {!isInvited && (
            <Text style={styles.inviteText}>{isLoading ? 'Loading...' : 'Invite'}</Text>
          )}
        </Pressable>
      </View>
      <Delimiter />
    </>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    container: {
      paddingVertical: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    inviteBtn: {
      width: 70,
      height: 28,
      borderRadius: 22,
      borderStyle: 'solid',
      borderColor: theme.colors.brandSecondary,
      borderWidth: 2,
      backgroundColor: theme.colors.brandSecondary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    invitedBtn: {
      borderColor: '#E5EAF6',
      backgroundColor: theme.colors.white,
    },
    checkIcon: {},
    inviteText: {
      fontFamily: FontFamily.SEMI_BOLD,
      fontSize: 12,
      color: theme.colors.primary,
    },
  };
});
