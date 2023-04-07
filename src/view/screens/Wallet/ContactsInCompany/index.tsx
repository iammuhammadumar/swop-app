import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { useInfiniteGetContactsQuery } from '~/store/query/wallet';
import { pluralize } from '~/utils/pluralize';
import { Avatar } from '~/view/components/Avatar/Avatar';
import { StackHeader } from '~/view/components/Header/StackHeader';
import { MainContainer } from '~/view/components/MainContainer';
import { makeStyles, Text, theme } from '~/view/plugins/theme';
import { CONTACTS_IN_COMPANY_PAGE_LIMIT } from '~/view/screens/Wallet/ContactsInCompany/consts';
import { FontFamily } from '~/view/theme';

type Props = NativeStackScreenProps<ReactNavigation.WalletParamList, 'ContactsInCompany'>;

export const ContactsInCompanyScreen: React.VFC<Props> = ({ route }) => {
  const { company } = route.params;
  const styles = useStyles();
  const {
    data: contactsPages,
    refetch,
    isLoading,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteGetContactsQuery({
    companyName: company.name,
    limit: CONTACTS_IN_COMPANY_PAGE_LIMIT,
  });
  const isFocused = useIsFocused();

  const contacts = useMemo(() => {
    return contactsPages?.pages.flatMap(page => page.list) ?? [];
  }, [contactsPages]);

  const handleEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

  return (
    <MainContainer withTabBar>
      <StackHeader text={company.name} />
      <Text style={styles.contactsCount}>{pluralize(company.contactsCount, 'contact')}</Text>
      {isLoading && (
        <Flow color={theme.colors.brand} style={{ marginTop: 50, alignSelf: 'center' }} size={60} />
      )}
      {isSuccess && contacts.length > 0 && (
        <FlatList
          keyExtractor={item => `${item.id}`}
          data={contacts}
          contentContainerStyle={{ paddingBottom: 35 }}
          renderItem={({ item }) => (
            <View style={[styles.contact]}>
              <Avatar size={55} uri={item.photo} />
              <View style={styles.contactInfo}>
                <Text fontSize={16} fontFamily={FontFamily.SEMI_BOLD} style={{ marginBottom: 5 }}>
                  {item.firstName} {item.lastName}
                </Text>
                <Text>{item.company}</Text>
              </View>
            </View>
          )}
          onEndReached={handleEndReached}
          style={styles.contactsList}
          ListFooterComponent={
            isFetchingNextPage ? (
              <Flow
                color={theme.colors.brand}
                style={{ marginVertical: 20, alignSelf: 'center' }}
                size={60}
              />
            ) : null
          }
        />
      )}
    </MainContainer>
  );
};

const useStyles = makeStyles(() => {
  return {
    contactsCount: {
      textAlign: 'center',
    },
    contactsList: {
      paddingTop: 24,
      paddingHorizontal: 24,
    },
    contact: {
      paddingTop: 13,
      paddingBottom: 18,
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: '#E5EAF6',
      flexDirection: 'row',
      alignItems: 'center',
    },
    contactInfo: {
      marginLeft: 23,
    },
  };
});
