import { useSwitchValue } from '@appello/common/lib/hooks';
import React from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { Pressable, StyleProp, TextInputProps, ViewStyle } from 'react-native';

import { Field } from '~/view/components/form/Field';
import { TextInput } from '~/view/components/form/TextInput';
import { SvgIcon } from '~/view/components/SvgIcon';
import { makeStyles, useTheme } from '~/view/plugins/theme';

interface Props<FormValues extends FieldValues> extends Omit<TextInputProps, 'style'> {
  name: FieldPath<FormValues>;
  control: Control<FormValues>;
  label: string;
  style?: StyleProp<ViewStyle>;
}

export const PasswordField = <FormValues extends FieldValues>({
  name,
  control,
  label,
  style,
  ...textInputProps
}: Props<FormValues>): React.ReactElement => {
  const controller = useController({ name, control });
  const [isPasswordVisible, , , togglePasswordVisibility] = useSwitchValue(false);
  const styles = useStyles();
  const theme = useTheme();

  return (
    <Field style={style} label={label} error={controller.fieldState.error}>
      <TextInput
        value={controller.field.value}
        onChangeText={controller.field.onChange}
        onBlur={controller.field.onBlur}
        style={styles.input}
        error={!!controller.fieldState.error}
        secureTextEntry={!isPasswordVisible}
        autoComplete="password"
        autoCapitalize="none"
        {...textInputProps}
      />
      <Pressable onPress={togglePasswordVisibility} style={styles.toggle}>
        {isPasswordVisible && (
          <SvgIcon name="eye" fill={theme.colors.primary} width={24} height={24} />
        )}
        {!isPasswordVisible && (
          <SvgIcon name="eyeOff" fill={theme.colors.primary} width={24} height={24} />
        )}
      </Pressable>
    </Field>
  );
};

const useStyles = makeStyles({
  input: {
    paddingRight: 9 + 24 + 10,
  },
  toggle: {
    position: 'absolute',
    right: 15,
    top: 9,
  },
});
