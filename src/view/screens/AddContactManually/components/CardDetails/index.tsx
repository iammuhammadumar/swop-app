/* eslint-disable @typescript-eslint/naming-convention */
import { useNavigation } from '@react-navigation/native';
import React, { VFC } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { View } from 'react-native';

import { CardFormValues } from '~/store/modules/cardForm/types';
import { Button, ButtonStyleType } from '~/view/components/Button';
import { CardDetailsField } from '~/view/components/VerticalViewForm/components/CardDetailsField';
import { AddCardDetailsOptions } from '~/view/navigation/list';
import { makeStyles, Text } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

interface Props {
  form: UseFormReturn<CardFormValues>;
}
export const CardDetails: VFC<Props> = ({ form }) => {
  const styles = useStyles();
  const navigation = useNavigation();

  const socialsField = useFieldArray({
    name: 'social_links',
    control: form.control,
  });

  const addLink = (id: number, { sectionType, item }: AddCardDetailsOptions): void => {
    if (sectionType === 'details') {
      socialsField.append([item]);
    }
  };

  const handleAddDetails = (): void => {
    navigation.navigate('AddSocials', { onSelect: addLink });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="p2" fontFamily={FontFamily.SEMI_BOLD}>
        Details
      </Text>
      {!!socialsField.fields.length && (
        <>
          {socialsField.fields.map(({ custom_name, id, type, editable }, index) => {
            if (custom_name === 'Address' || custom_name === 'Phone' || custom_name === 'Email') {
              return null;
            }

            return (
              <CardDetailsField
                type={type?.id}
                index={index}
                name={type?.name}
                key={id || index}
                remove={socialsField.remove}
                control={form.control}
                editable={editable}
              />
            );
          })}
        </>
      )}
      <Button
        label="+ Add details"
        onPress={handleAddDetails}
        styleType={ButtonStyleType.SECONDARY}
        containerStyle={{ marginTop: 15 }}
      />
    </View>
  );
};

const useStyles = makeStyles(() => {
  return {
    container: {
      marginTop: 20,
    },
    addLinkBtn: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    addIcon: {
      marginRight: 15,
    },
    title: {
      marginBottom: 25,
    },
    accreditation: {
      marginBottom: 10,
    },
  };
});
