import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import CloseIcon from '~/view/assets/icons/close.svg';
import { theme } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

interface Props {
  onChange: (text: string) => void;
  value: string;
}

export const SearchInput: React.FC<Props> = ({ onChange, value }) => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        onChangeText={onChange}
        value={value}
        placeholderTextColor={theme.colors.gray1}
        autoFocus
      />
      <Pressable style={styles.cleanBtn} onPress={() => onChange('')}>
        <CloseIcon color={theme.colors.white} width={10} height={10} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    flex: 1,
  },
  input: {
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    paddingVertical: 9,
    paddingLeft: 30,
    fontFamily: FontFamily.SEMI_BOLD,
    fontSize: 14,
  },
  cleanBtn: {
    width: 18,
    height: 18,
    borderRadius: 18 / 2,
    backgroundColor: '#C4C4C4',
    position: 'absolute',
    top: 9,
    right: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
