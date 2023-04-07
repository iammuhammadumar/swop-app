import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { FlatList } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';

import { useInfiniteGetCompaniesQuery } from '~/store/query/wallet';
import { EmptyState } from '~/view/components/EmptyState';
import { makeStyles, theme } from '~/view/plugins/theme';
import { CompanyItem } from '~/view/screens/Wallet/components/CompanyItem';
import { COMPANIES_PAGE_LIMIT } from '~/view/screens/Wallet/components/consts';

interface Props {
  searchValue: string;
}

export const CompaniesList: React.VFC<Props> = ({ searchValue }) => {
  const isFocused = useIsFocused();
  const styles = useStyles();

  const {
    fetchNextPage,
    hasNextPage,
    data: companiesPages,
    isLoading,
    isSuccess,
    refetch,
    isFetchingNextPage,
  } = useInfiniteGetCompaniesQuery({
    limit: COMPANIES_PAGE_LIMIT,
    search: searchValue,
  });

  const companies = useMemo(() => {
    return companiesPages?.pages.flatMap(page => page.list) ?? [];
  }, [companiesPages]);

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
      {isSuccess && companies.length === 0 && (
        <EmptyState
          label="You have no companies yet"
          image={require('~/view/assets/images/emptyState/companies.png')}
        />
      )}
      {isLoading && (
        <Flow color={theme.colors.brand} style={{ marginTop: 50, alignSelf: 'center' }} size={60} />
      )}
      {isSuccess && companies.length > 0 && (
        <FlatList
          keyExtractor={(_, index) => `company-${index}`}
          data={companies}
          contentContainerStyle={{ paddingBottom: 35 }}
          style={styles.list}
          onEndReached={handleEndReached}
          renderItem={({ item, index }) => (
            <CompanyItem data={item} style={index !== 0 ? { marginTop: 15 } : undefined} />
          )}
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
    list: {
      paddingTop: 24,
      paddingHorizontal: 24,
    },
  };
});
