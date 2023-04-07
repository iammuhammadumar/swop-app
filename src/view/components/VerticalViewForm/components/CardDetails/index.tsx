import { useNavigation } from '@react-navigation/native';
import React, { useCallback, VFC } from 'react';
import { useFieldArray, UseFormReturn, useWatch } from 'react-hook-form';
import { View } from 'react-native';

import { CardFormValues } from '~/store/modules/cardForm/types';
import { EmployeePermissionsType } from '~/store/query/cards/utils';
import { Button, ButtonStyleType } from '~/view/components/Button';
import { AddCardDetailsOptions } from '~/view/navigation/list';
import { makeStyles, Text } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

import { CardDetailsField } from '../CardDetailsField';
import { MediaCardDetailsField } from '../MediaCardDetailsField';
import { PersonalDetailsInput } from '../PersonalDetailsInput';

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

  const personalDetails = useFieldArray({
    name: 'personalDetails',
    control: form.control,
  });
  const accreditations = useFieldArray({
    name: 'accreditations',

    control: form.control,
  });
  const picturesField = useFieldArray({
    name: 'pictures',
    control: form.control,
  });
  const [fromWeb, employeePermissions] = useWatch({
    name: ['fromWeb', 'employeePermissions'],
    control: form.control,
  });

  const showAddDetailsButton = useCallback(
    (fromWeb: boolean, employeePermissions: EmployeePermissionsType[] | undefined): boolean => {
      if (!fromWeb) {
        return true;
      }
      if (fromWeb && !employeePermissions) {
        return false;
      }
      if (employeePermissions?.length) {
        return true;
      }
      return false;
    },
    [],
  );

  const addLink = (id: number, { sectionType, item }: AddCardDetailsOptions): void => {
    if (sectionType === 'accreditations') {
      accreditations.append([
        {
          value: '',
        },
      ]);
    }
    if (sectionType === 'personalDetails') {
      personalDetails.append([
        {
          name: item.type.name,
          value: '',
          editable: true,
        },
      ]);
    }
    if (sectionType === 'details') {
      socialsField.append([item]);
    }
    if (sectionType === 'pictures') {
      picturesField.append([item]);
    }
  };

  const handleAddDetails = (): void => {
    navigation.navigate('AddCardDetails', { onSelect: addLink, fromWeb, employeePermissions });
  };

  const capitalize = (string: string) => {
    return string && string[0].toUpperCase() + string.slice(1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="p2" fontFamily={FontFamily.SEMI_BOLD}>
        Details
      </Text>
      {!!personalDetails.fields.length && (
        <>
          {personalDetails.fields.map(({ id, name, editable }, index) => (
            <PersonalDetailsInput
              fieldName="personalDetails"
              index={index}
              key={id || index}
              remove={personalDetails.remove}
              control={form.control}
              name={name && capitalize(name)}
              editable={editable}
            />
          ))}
        </>
      )}
      {!!socialsField.fields.length && (
        <>
          {socialsField.fields.map(({ id, type, editable }, index) => (
            <CardDetailsField
              type={type?.id}
              index={index}
              name={type?.name}
              key={id || index}
              remove={socialsField.remove}
              control={form.control}
              editable={editable}
            />
          ))}
        </>
      )}
      {!!accreditations.fields.length && (
        <>
          <Text style={styles.accreditation} variant="p2" fontFamily={FontFamily.SEMI_BOLD}>
            Accreditations
          </Text>
          {accreditations.fields.map((item, index) => (
            <PersonalDetailsInput
              fieldName="accreditations"
              index={index}
              key={index}
              remove={accreditations.remove}
              control={form.control}
              editable
            />
          ))}
        </>
      )}
      {!!picturesField.fields.length &&
        picturesField.fields.map((item, index) => (
          <MediaCardDetailsField
            key={item.id || index}
            index={index}
            name={item.type?.name}
            remove={picturesField.remove}
            control={form.control}
          />
        ))}
      {showAddDetailsButton(fromWeb, employeePermissions) && (
        <Button
          label="+ Add details"
          onPress={handleAddDetails}
          styleType={ButtonStyleType.SECONDARY}
          containerStyle={{ marginTop: 15 }}
        />
      )}
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
