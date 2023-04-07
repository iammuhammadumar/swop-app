import React from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { StyleProp, TextInputProps, ViewStyle } from 'react-native';

import { Field } from '~/view/components/form/Field';
import { TextInput } from '~/view/components/form/TextInput';

interface Props<FormValues extends FieldValues> extends Omit<TextInputProps, 'style'> {
  name: FieldPath<FormValues>;
  control: Control<FormValues>;
  label?: string;
  style?: StyleProp<ViewStyle>;
  controller?: any;
}

export const TextField = <FormValues extends FieldValues>({
  name,
  control,
  label,
  style,
  ...textInputProps
}: Props<FormValues>): React.ReactElement => {
  const controller = useController({ name, control });

  return (
    <Field style={style} label={label} error={controller.fieldState.error}>
      <TextInput
        value={controller.field.value}
        onChangeText={controller.field.onChange}
        onBlur={controller.field.onBlur}
        error={!!controller.fieldState.error}
        {...textInputProps}
      />
    </Field>
  );
};
