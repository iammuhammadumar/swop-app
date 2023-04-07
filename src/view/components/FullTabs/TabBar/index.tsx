import React, { memo, useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';

import { makeStyles, Text, useTheme } from '~/view/plugins/theme';
// import { WalletOption } from '~/view/screens/Wallet/types';
import { FontFamily } from '~/view/theme';

import { FullTabsProps, TabScene } from '../index';

interface TabBarProps {
  list: FullTabsProps['renderScene'];
  changeTab: (value: number) => void;
  defaultSelected?: number;
}

export const TabBar: React.FC<TabBarProps> = memo(({ changeTab, list, defaultSelected = 0 }) => {
  const styles = useStyles();
  const [selected, setSelected] = useState<number>(defaultSelected);

  const handleChangeTab = useCallback((index: number) => {
    return () => {
      setSelected(index);
      changeTab(index);
    };
  }, []);

  const renderTab = (item: TabScene, index: number) => {
    return (
      <Pressable
        style={[styles.optionContainer, selected === index && styles.activeOption]}
        onPress={handleChangeTab(index)}
      >
        <Text
          variant="p2"
          style={[styles.optionText, selected === index && styles.activeOptionText]}
        >
          {item.label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.tabsContainer}>
      {list.map(renderTab)}

      {/* <Pressable
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
      </Pressable> */}
    </View>
  );
});

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
