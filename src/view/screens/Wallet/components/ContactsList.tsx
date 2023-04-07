import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';

import { CardModel } from '~/models/businessCard';
import { useInfiniteGetContactsQuery } from '~/store/query/wallet';
import BurgerIconClose from '~/view/assets/icons/wallet/burgerClose.svg';
import BurgerIconOpen from '~/view/assets/icons/wallet/burgerOpen.svg';
import { CardType } from '~/view/components/CreateCardButton/types';
import { EmptyState } from '~/view/components/EmptyState';
import { HorizontalCard } from '~/view/components/HorizontalCard';
import { Sort } from '~/view/components/Sorting';
import { SortItem } from '~/view/components/Sorting/types';
import { makeStyles, Text, theme } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

import { Avatar } from '../../../components/Avatar/Avatar';
import { CONTACTS_PAGE_LIMIT, ContactsFilter, ContactsSort } from './consts';

const sortOptions: SortItem<ContactsSort>[] = [
  {
    label: 'Sort by first name (a-z)',
    value: ContactsSort.FIRST_NAME,
  },
  {
    label: 'Sort by last name (a-z)',
    value: ContactsSort.LAST_NAME,
  },
  {
    label: 'Recently connected',
    value: ContactsSort.RECENTLY_CONNECTED,
  },
];
const filterOptions: SortItem<ContactsFilter>[] = [
  {
    label: 'All',
    value: ContactsFilter.ALL,
  },
  {
    label: 'Business Wallet',
    value: ContactsFilter.BUSINESS,
  },
  // {
  //   label: 'Social Wallet',
  //   value: ContactsFilter.SOCIAL,
  // },
  {
    label: 'Personal Wallet',
    value: ContactsFilter.PERSONAL,
  },
];
interface Props {
  onAdd: () => void;
  searchValue: string;
}

export const ContactsList: React.VFC<Props> = ({ onAdd, searchValue }) => {
  const isFocused = useIsFocused();
  const styles = useStyles();
  const navigation = useNavigation();
  const [currentSort, setSort] = React.useState<ContactsSort>(ContactsSort.FIRST_NAME);
  const [currentFilter, setFilter] = React.useState<ContactsFilter>(ContactsFilter.ALL);
  const [burgerIconState, setBurgerIconState] = React.useState<boolean>(false);

  const {
    fetchNextPage,
    hasNextPage,
    data: contactsPages,
    isLoading,
    isSuccess,
    refetch,
    isFetchingNextPage,
  } = useInfiniteGetContactsQuery({
    limit: CONTACTS_PAGE_LIMIT,
    sort: currentSort,
    search: searchValue,
    filter: currentFilter,
  });

  const contacts = useMemo<CardModel[]>(() => {
    return contactsPages?.pages.flatMap(page => page.list) ?? [];
  }, [contactsPages]);

  const openCardDetails = React.useCallback(
    (id: number, cardType?: CardType) => {
      navigation.navigate('BusinessCard', { id, cardType });
    },
    [navigation],
  );

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
    <>
      {isSuccess && contacts.length === 0 && (
        <EmptyState
          onAddBtnClick={onAdd}
          label="You have no contacts yet"
          addBtnLabel="Add contact"
          image={require('~/view/assets/images/emptyState/contacts.png')}
        />
      )}
      {isLoading && (
        <Flow color={theme.colors.brand} style={{ marginTop: 50, alignSelf: 'center' }} size={60} />
      )}
      {isSuccess && contacts.length > 0 && (
        <FlatList
          keyExtractor={item => `${item.id}`}
          data={contacts}
          contentContainerStyle={{ paddingBottom: 35 }}
          renderItem={({ item, index }) => {
            return !burgerIconState ? (
              <HorizontalCard
                cardType={item.cardType}
                photo={item.photo}
                logo={item.horizontalLogo}
                firstName={item.firstName}
                lastName={item.lastName}
                position={item.position}
                cardColor={item.horizontalCardColor}
                textColor={item.horizontalTextColor}
                isCardPhoto={item.isCardPhoto}
                isManually={item.isManually}
                key={item.id}
                style={[{ alignSelf: 'center' }, index !== 0 && { marginTop: 20 }]}
                onPress={() => openCardDetails(item.id, item.cardType)}
              />
            ) : (
              <View style={[styles.contact]}>
                <Avatar size={55} uri={item.photo} />
                <View style={styles.contactInfo}>
                  <Text
                    fontSize={16}
                    fontFamily={FontFamily.SEMI_BOLD}
                    style={styles.contactUserInfo}
                  >
                    {item.firstName} {item.lastName}
                  </Text>
                  <Text>{item.position}</Text>
                  <Text>{item.company}</Text>
                </View>
              </View>
            );
          }}
          onEndReached={handleEndReached}
          style={styles.contactsList}
          ListHeaderComponent={
            <View style={styles.listHeaderComponent}>
              <Sort
                options={sortOptions}
                selectedOption={{ label: currentSort, value: currentSort }}
                onSelect={option => setSort(option.value)}
                style={styles.sortWrapper}
                title="Sort by"
              />
              <Sort
                options={filterOptions}
                selectedOption={{ label: currentSort, value: currentFilter }}
                onSelect={option => setFilter(option.value)}
                style={styles.sortWrapper}
                title="Filter"
              />
              <Pressable
                onPress={() => setBurgerIconState(!burgerIconState)}
                style={styles.burgerIcon}
              >
                {!burgerIconState ? <BurgerIconClose /> : <BurgerIconOpen />}
              </Pressable>
            </View>
          }
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
    </>
  );
};

const useStyles = makeStyles(() => {
  return {
    burgerIcon: { right: 0, position: 'absolute' },
    listHeaderComponent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    contactsList: {
      paddingHorizontal: 24,
    },
    sortWrapper: {
      paddingRight: 10,
      width: 100,
      marginTop: 20,
      alignSelf: 'flex-start',
      marginBottom: 24,
    },
    contactUserInfo: { marginBottom: 5 },
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
