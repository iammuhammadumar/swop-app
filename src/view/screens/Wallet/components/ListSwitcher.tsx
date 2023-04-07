import React from 'react';
import { Pressable, View } from 'react-native';

import { makeStyles, Text, useTheme } from '~/view/plugins/theme';
import { WalletOption } from '~/view/screens/Wallet/types';
import { FontFamily } from '~/view/theme';

interface Props {
  selectedTab: WalletOption;
  onSelect: (value: WalletOption) => void;
}

export const ListSwitcher: React.VFC<Props> = ({ selectedTab, onSelect }) => {
  const styles = useStyles();
  return (
    <View style={styles.tabsContainer}>
      <Pressable
        style={[
          styles.optionContainer,
          selectedTab === WalletOption.CONTACTS && styles.activeOption,
        ]}
        onPress={() => onSelect(WalletOption.CONTACTS)}
      >
        <Text
          variant="p2"
          style={[
            styles.optionText,
            selectedTab === WalletOption.CONTACTS && styles.activeOptionText,
          ]}
        >
          Contacts
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.optionContainer,
          selectedTab === WalletOption.COMPANIES && styles.activeOption,
        ]}
        onPress={() => onSelect(WalletOption.COMPANIES)}
      >
        <Text
          variant="p2"
          style={[
            styles.optionText,
            selectedTab === WalletOption.COMPANIES && styles.activeOptionText,
          ]}
        >
          Companies
        </Text>
      </Pressable>
    </View>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    tabsContainer: {
      marginTop: 15,
      flexDirection: 'row',
      alignItems: 'center',
    },
    optionContainer: {
      flex: 1,
      borderBottomColor: '#E9E9E9',
      borderBottomStyle: 'solid',
      borderBottomWidth: 4,
    },
    activeOption: {
      borderBottomColor: theme.colors.brand,
    },
    optionText: {
      paddingVertical: 9,
      textAlign: 'center',
      fontFamily: FontFamily.SEMI_BOLD,
      color: theme.colors.gray1,
    },
    activeOptionText: {
      color: theme.colors.brand,
    },
  };
});
