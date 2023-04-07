import { PhoneNumberUtil } from 'google-libphonenumber';
import React, { useMemo, useRef } from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import PhoneInput, { PhoneInputProps } from 'react-native-phone-number-input';

import DropdownIcon from '~/view/assets/icons/dropdown.svg';
import { Field } from '~/view/components/form/Field';
import { makeStyles, useTheme } from '~/view/plugins/theme';

import { DEFAULT_COUNTRY_CODE } from './consts';

const phoneNumberUtil = PhoneNumberUtil.getInstance();

interface Props<FormValues extends FieldValues> extends Omit<TextInputProps, 'style'> {
  name: FieldPath<FormValues>;
  control: Control<FormValues>;
  label?: string;
  style?: StyleProp<ViewStyle>;
}

export const PhoneNumberField = <FormValues extends FieldValues>({
  name,
  control,
  label,
  style,
}: Props<FormValues>): React.ReactElement => {
  const inputRef = useRef<PhoneInput>(null);
  const controller = useController({
    name,
    control,
  });
  const styles = useStyles();
  const theme = useTheme();
  const { value } = controller.field;

  const parsedPhoneNumber = useMemo(() => {
    if (!value?.startsWith('+')) {
      return { value, code: DEFAULT_COUNTRY_CODE as PhoneInputProps['defaultCode'] };
    }
    try {
      const phone = phoneNumberUtil.parse(value);
      return {
        value: phone.getNationalNumber()?.toString(),
        code: phoneNumberUtil.getRegionCodeForNumber(phone) as PhoneInputProps['defaultCode'],
      };
      // eslint-disable-next-line no-empty
    } catch (e) {}

    return { value, code: DEFAULT_COUNTRY_CODE as PhoneInputProps['defaultCode'] };
  }, [value]);

  return (
    <Field style={style} label={label} error={controller.fieldState.error}>
      <PhoneInput
        ref={inputRef}
        defaultCode={parsedPhoneNumber.code}
        layout="first"
        containerStyle={styles.container}
        textInputStyle={styles.input}
        textContainerStyle={styles.inputContainer}
        countryPickerButtonStyle={styles.country}
        value={parsedPhoneNumber.value}
        textInputProps={{
          placeholderTextColor: theme.colors.gray1,
          placeholder: 'Phone number',
          onBlur: controller.field.onBlur,
        }}
        renderDropdownImage={<DropdownIcon width={15} height={15} color={theme.colors.ink} />}
        codeTextStyle={styles.code}
        countryPickerProps={{
          preferredCountries: ['AU'],
        }}
        onChangeFormattedText={controller.field.onChange}
      />
    </Field>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    container: {
      borderRadius: theme.borderRadii.s,
      width: '100%',
      borderWidth: 0.5,
      borderStyle: 'solid',
      borderColor: theme.colors.ink,
      height: 40,
    },
    input: {
      backgroundColor: '#fff',
      padding: 0,
      flex: 1,
      fontSize: theme.textSize.l,
    },
    inputContainer: {
      flex: 1,
      marginRight: 15,
      alignSelf: 'center',
      backgroundColor: theme.colors.white,
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    code: {
      color: theme.colors.gray1,
      paddingHorizontal: 10,
      marginRight: 0,
      fontSize: theme.textSize.l,
    },
    country: {
      borderRightWidth: 0.5,
      borderStyle: 'solid',
      borderColor: theme.colors.ink,
      width: 'auto',
      paddingHorizontal: 10,
      alignSelf: 'center',
      height: 38,
    },
  };
});
