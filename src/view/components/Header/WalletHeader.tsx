import { useSwitchValue } from '@appello/common/lib/hooks';
import React, { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { useDebounce } from 'use-debounce';

import { SearchInput } from '~/view/components/form/SearchInput';
import { SvgIcon } from '~/view/components/SvgIcon';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

import { HEADER_HEIGHT, SEARCH_DEBOUNCE } from './consts';

interface Props {
  onAdd?: () => void;
  onSearch?: (value: string) => void;
}

export const WalletHeader: React.VFC<Props> = ({ onAdd, onSearch }) => {
  const [isSearchOpened, openSearch, closeSearch] = useSwitchValue(false);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [debouncedSearchValue] = useDebounce(searchValue, SEARCH_DEBOUNCE);

  const theme = useTheme();
  const styles = useStyles();

  const handleCancel = () => {
    setSearchValue('');
    closeSearch();
  };

  useEffect(() => {
    onSearch?.(debouncedSearchValue);
  }, [debouncedSearchValue]);

  return (
    <>
      {!isSearchOpened && (
        <View style={styles.container}>
          <Pressable onPress={onAdd} style={[styles.actionBtn, { left: 20 }]}>
            <SvgIcon name="plus" stroke={theme.colors.brand} size={24} />
          </Pressable>
          <Text variant="h2">Wallet</Text>
          <Pressable onPress={openSearch} style={[styles.actionBtn, { right: 20 }]}>
            <SvgIcon name="search" stroke={theme.colors.brand} size={24} />
          </Pressable>
        </View>
      )}
      {isSearchOpened && (
        <View style={styles.searchWrapper}>
          <SearchInput onChange={setSearchValue} value={searchValue} />
          <Pressable onPress={handleCancel} style={{ marginLeft: 12 }}>
            <Text fontFamily={FontFamily.SEMI_BOLD}>Cancel</Text>
          </Pressable>
        </View>
      )}
    </>
  );
};

const useStyles = makeStyles(() => {
  return {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      height: HEADER_HEIGHT,
      marginBottom: 10,
    },
    actionBtn: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchWrapper: {
      height: HEADER_HEIGHT,
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
  };
});
