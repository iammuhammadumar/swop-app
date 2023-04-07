import React from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { StyleProp, TextInputProps, View, ViewStyle } from 'react-native';

import { Field } from '~/view/components/form/Field';
import { TextInput } from '~/view/components/form/TextInput';
import { makeStyles, Text } from '~/view/plugins/theme';

interface Props<FormValues extends FieldValues> extends Omit<TextInputProps, 'style'> {
  name: FieldPath<FormValues>;
  control: Control<FormValues>;
  label?: string;
  style?: StyleProp<ViewStyle>;
  controller?: any;
}

export const PhoneField = <FormValues extends FieldValues>({
  name,
  control,
  label,
  style,
  ...textInputProps
}: Props<FormValues>): React.ReactElement => {
  const controller = useController({ name, control });
  const styles = useStyles();

  return (
    <Field style={style} label={label} error={controller.fieldState.error}>
      <View style={styles.fildContainer}>
        <Text style={styles.leftTitle} variant="p2">
          +61
        </Text>
        <TextInput
          value={controller.field.value}
          onChangeText={controller.field.onChange}
          onBlur={controller.field.onBlur}
          error={!!controller.fieldState.error}
          style={styles.input}
          {...textInputProps}
        />
      </View>
    </Field>
  );
};

const useStyles = makeStyles(() => {
  return {
    fildContainer: {
      width: '100%',
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    leftTitle: {
      marginLeft: 15,
      position: 'absolute',
    },
    input: {
      paddingHorizontal: 50,
      width: '100%',
    },
  };
});
