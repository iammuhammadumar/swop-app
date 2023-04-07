import React from 'react';
import { Pressable, View } from 'react-native';

import { CardView } from '~/store/modules/cardForm/consts';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

const options = [CardView.HORIZONTAL, CardView.VERTICAL];

interface Props {
  value: CardView;
  onChange: (value: CardView) => void;
}
// todo: rewrite as TabsSwitcher or just Tabs with jeneric type and update Wallet screen
export const CardViewSwitcher: React.VFC<Props> = ({ value, onChange }) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <Pressable
          style={[styles.optionContainer, option === value && styles.activeOption]}
          key={index}
          onPress={() => onChange(option)}
        >
          <Text variant="p2" style={[styles.text, option === value && styles.activeText]}>
            {option}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    container: {
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
    text: {
      paddingVertical: 9,
      textAlign: 'center',
      fontFamily: FontFamily.SEMI_BOLD,
      color: theme.colors.gray1,
    },
    activeText: {
      color: theme.colors.brand,
    },
  };
});
