import React, { FC, useMemo } from 'react';
import { Control, useController, UseFieldArrayRemove } from 'react-hook-form';
import { NativeSyntheticEvent, Pressable, TextInputChangeEventData, View } from 'react-native';

import { CardFormValues } from '~/store/modules/cardForm/types';
import { CoordinatesInput } from '~/types';
import { PhoneField } from '~/view/components/form/PhoneField';
import { TextField } from '~/view/components/form/TextField';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';

import { GooglePlacesInput } from '../GooglePlacesInput';

interface CardDetailsFieldProps {
  type?: number;
  control: Control<CardFormValues>;
  index: number;
  name?: string;
  remove: UseFieldArrayRemove;
  editable: boolean;
}
export const CardDetailsField: FC<CardDetailsFieldProps> = ({
  control,
  index,
  remove,
  name,
  type,
  editable,
}) => {
  const theme = useTheme();
  const styles = useStyles();

  const {
    field: { value, onChange },
    fieldState,
  } = useController({ name: `social_links.${index}.value`, control });

  const {
    field: { onChange: onChangeLtn },
  } = useController({ name: `social_links.${index}.latitude`, control });

  const {
    field: { onChange: onChangeLng },
  } = useController({ name: `social_links.${index}.longitude`, control });

  const handlePressDelete = () => {
    remove(index);
  };

  const onChageAddtessHandler = (
    text?: NativeSyntheticEvent<TextInputChangeEventData> | string,
    coordinates?: CoordinatesInput,
  ) => {
    onChange(text);
    onChangeLtn(coordinates?.latitude);
    onChangeLng(coordinates?.longitude);
  };

  const placeholderName = useMemo(() => {
    switch (name) {
      case 'Phone':
        return '';
      case 'Email':
        return 'example@gmail.com';
      case 'Address':
        return 'insert your address';
      default:
        return 'insert link';
    }
  }, [name]);

  const renderInputName = useMemo(() => {
    if (name?.toLowerCase() === 'address' || type === 3) {
      return 'Address';
    }
    if (name?.toLowerCase() === 'phone') {
      return 'Phone';
    }
    return 'Any';
  }, [name, type]);

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text variant="p1" style={styles.title}>
          Title & description
        </Text>
        {!(editable === false) && (
          <Pressable onPress={handlePressDelete}>
            <Text style={styles.delete}>Delete</Text>
          </Pressable>
        )}
      </View>
      <TextField
        name={`social_links.${index}.custom_name`}
        control={control}
        placeholder={name}
        style={styles.name}
        placeholderTextColor={theme.colors.gray1}
        editable={editable}
      />

      {renderInputName === 'Phone' && (
        <PhoneField
          name={`social_links.${index}.value`}
          control={control}
          placeholder={placeholderName}
          editable={editable}
          keyboardType="number-pad"
        />
      )}

      {renderInputName === 'Address' && (
        <GooglePlacesInput
          editable={editable}
          error={fieldState.error}
          errorMessage={fieldState.error?.message}
          value={value}
          onChange={onChageAddtessHandler}
          placeholder={placeholderName}
        />
      )}
      {renderInputName === 'Any' && (
        <TextField
          name={`social_links.${index}.value`}
          control={control}
          placeholder={placeholderName}
          editable={editable}
        />
      )}
    </View>
    // </View>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    container: { marginBottom: 18 },

    info: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginBottom: 4,
    },
    delete: {
      color: theme.colors.delete,
    },
    name: {
      marginBottom: 14,
    },
    title: {
      color: theme.colors.gray1,
    },

    closeIcon: {
      color: theme.colors.primary,
      position: 'absolute',
      right: 14,
      top: 9,
    },
  };
});
