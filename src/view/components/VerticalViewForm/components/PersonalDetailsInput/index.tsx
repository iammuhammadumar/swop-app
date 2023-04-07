import React, { VFC } from 'react';
import { UseFieldArrayRemove } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';
import { Pressable, View } from 'react-native';

import { CardFormValues } from '~/store/modules/cardForm/types';
import { TextField } from '~/view/components/form/TextField';
import { SvgIcon } from '~/view/components/SvgIcon';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

interface Props {
  control: Control<CardFormValues>;
  index: number;
  remove: UseFieldArrayRemove;
  fieldName: 'personalDetails' | 'accreditations';
  name?: string;
  hideIcon?: boolean;
  editable: boolean;
}

export const PersonalDetailsInput: VFC<Props> = ({
  remove,
  control,
  index,
  fieldName,
  name,
  hideIcon,
  editable,
}) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text color="gray1" style={styles.title}>
          {name}
        </Text>
        <TextField
          name={`${fieldName}.${index}.value`}
          autoCapitalize="none"
          autoCorrect={false}
          control={control}
          editable={editable}
        />
        {hideIcon || !editable ? null : (
          <Pressable onPress={() => remove(index)} style={styles.removeBtn}>
            <SvgIcon name="close" size={24} />
          </Pressable>
        )}
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
    title: {
      marginBottom: 4,
    },
    inputError: {
      borderBottomColor: theme.colors.negative,
    },
    removeBtn: {
      position: 'absolute',
      right: 10,
      top: 28,
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
