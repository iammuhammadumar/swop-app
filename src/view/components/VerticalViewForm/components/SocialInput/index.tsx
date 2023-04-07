import React, { VFC } from 'react';
import { useController, UseFieldArrayRemove } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';
import { Pressable, TextInput, View } from 'react-native';

import { CardFormValues, SocialInfoItem } from '~/store/modules/cardForm/types';
import { IconContainer } from '~/view/components/IconContainer';
import { SvgIcon } from '~/view/components/SvgIcon';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

interface Props {
  social: SocialInfoItem;
  control: Control<CardFormValues>;
  index: number;
  remove: UseFieldArrayRemove;
}

export const SocialInput: VFC<Props> = ({ social, remove, control, index }) => {
  const styles = useStyles();
  const controller = useController({ name: `socials.${index}.value`, control });
  const { value, onChange } = controller.field;
  const error = controller.formState.errors.socials?.[index]?.value;

  return (
    <View style={styles.container}>
      <IconContainer iconImage={social?.logo} style={styles.logo} />
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          value={value}
          onChangeText={text => onChange(text)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {error && <Text style={styles.error}>{error.message}</Text>}
        <Pressable onPress={() => remove(index)} style={styles.removeBtn}>
          <SvgIcon name="close" size={24} />
        </Pressable>
      </View>
    </View>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    error: {
      position: 'absolute',
      bottom: -15,
      color: theme.colors.negative,
      fontSize: theme.textSize.s,
    },
    inputError: {
      borderBottomColor: theme.colors.negative,
    },
    removeBtn: {
      position: 'absolute',
      right: 0,
    },
    inputWrapper: {
      flex: 1,
    },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray1,
      fontSize: 16,
      fontFamily: FontFamily.MEDIUM,
      paddingBottom: 3,
    },
    container: {
      flexDirection: 'row',
      marginBottom: 20,
      alignItems: 'center',
    },
    logo: {
      marginRight: 17,
    },
  };
});
