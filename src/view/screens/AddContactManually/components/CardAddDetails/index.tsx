import React, { FC } from 'react';
import { Control, useController } from 'react-hook-form';
import { View } from 'react-native';

import { CardFormValues } from '~/store/modules/cardForm/types';
import { TextInput } from '~/view/components/form/TextInput';
import { GooglePlacesInput } from '~/view/components/VerticalViewForm/components/GooglePlacesInput';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';

interface CardDetailsFieldProps {
  type?: number;
  control: Control<CardFormValues>;
  index: number;
  name?: string;
}
export const CardAddDetails: FC<CardDetailsFieldProps> = ({ control, index, name, type }) => {
  const styles = useStyles();

  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    field: { value: custom_name },
  } = useController({ name: `social_links.${index}.custom_name`, control });

  const {
    field: { value, onChange },
  } = useController({ name: `social_links.${index}.value`, control });

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text variant="p1" style={styles.title}>
          {custom_name}
        </Text>
      </View>
      {name === 'Address' || type === 3 ? (
        <GooglePlacesInput value={value} onChange={onChange} placeholder="" />
      ) : (
        <TextInput value={value} onChangeText={onChange} />
      )}
    </View>
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
