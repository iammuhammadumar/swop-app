import React, { FC, useEffect, useMemo, useRef } from 'react';
import { FieldError } from 'react-hook-form';
import {
  NativeSyntheticEvent,
  Platform,
  TextInputChangeEventData,
  TextInputProps,
  View,
} from 'react-native';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';

import { GOOGLE_PLACE_KEY_ANDROID, GOOGLE_PLACE_KEY_IOS } from '~/constants/env';
import { CoordinatesInput } from '~/types';
import { Field } from '~/view/components/form/Field';
import { makeStyles, useTheme } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

interface Props extends TextInputProps {
  onChange: (
    text?: NativeSyntheticEvent<TextInputChangeEventData> | string,
    coordinates?: CoordinatesInput,
  ) => void;
  value: string;
  error?: FieldError;
  placeholder: string;
  errorMessage?: string;
  label?: string;
}

export const GooglePlacesInput: FC<Props> = ({
  style,
  error,
  errorMessage,
  value,
  onChange,
  label,
  ...textInputProps
}) => {
  const styles = useStyles();
  const theme = useTheme();
  const autocompleteRef = useRef<GooglePlacesAutocompleteRef>(null);
  const textInputStyle = useMemo(() => {
    return [styles.textInput, style, !!error && styles.errorTextInput];
  }, [styles, style, error]);
  useEffect(() => {
    autocompleteRef.current?.setAddressText(value);
  }, [value]);
  const onPressHandler: (data: GooglePlaceData, details: Nullable<GooglePlaceDetail>) => void = (
    data,
    details,
  ) => {
    const { lat: latitude, lng: longitude } = details?.geometry?.location || {};

    onChange(data.description, { latitude: latitude || 0, longitude: longitude || 0 });
  };

  return (
    <View>
      <Field style={style} label={label} error={error}>
        <GooglePlacesAutocomplete
          ref={autocompleteRef}
          autoCapitalize="none"
          keepResultsAfterBlur
          onPress={onPressHandler}
          enablePoweredByContainer={false}
          placeholderTextColor={theme.colors.gray1}
          fetchDetails
          query={{
            key: Platform.OS === 'android' ? GOOGLE_PLACE_KEY_ANDROID : GOOGLE_PLACE_KEY_IOS,
            language: 'en',
          }}
          textInputProps={{
            style: textInputStyle,
            placeholderTextColor: theme.colors.gray1,
          }}
          {...textInputProps}
        />
      </Field>
    </View>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    textInput: {
      borderRadius: theme.borderRadii.s,
      fontFamily: FontFamily.REGULAR,
      borderWidth: 0.5,
      borderStyle: 'solid',
      borderColor: theme.colors.gray2,
      fontSize: theme.textSize.l,
      color: theme.colors.ink,
      height: 40,
      width: '100%',
      paddingHorizontal: 15,
      paddingVertical: 0,
    },
    errorTextInput: {
      borderColor: theme.colors.negative,
    },
    error: {
      color: theme.colors.negative,
      fontSize: theme.textSize.s,
    },
  };
});
