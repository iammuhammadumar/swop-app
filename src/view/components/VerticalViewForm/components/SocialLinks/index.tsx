import { useNavigation } from '@react-navigation/native';
import React, { VFC } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { Pressable, View } from 'react-native';

import { CardFormValues } from '~/store/modules/cardForm/types';
import { useGetSocialsQuery } from '~/store/query/socials';
import { IconContainer } from '~/view/components/IconContainer';
import { makeStyles, Text } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

import { SocialInput } from '../SocialInput';

interface Props {
  form: UseFormReturn<CardFormValues>;
}

export const SocialLinks: VFC<Props> = ({ form }) => {
  const styles = useStyles();
  const navigation = useNavigation();

  const { data: socials = {} } = useGetSocialsQuery();

  const socialsField = useFieldArray({
    name: 'socials',
    control: form.control,
  });

  const addLink = (id: number): void => {
    socialsField.append({
      socialId: id,
      value: '',
    });
  };

  const goToSocialSelect = (): void => {
    navigation.navigate('SelectSocial', { onSelect: addLink });
  };

  return (
    <View style={styles.container}>
      {socialsField.fields.map(({ id, socialId }, index) => (
        <SocialInput
          key={id}
          social={socials[socialId]}
          remove={socialsField.remove}
          index={index}
          control={form.control}
        />
      ))}
      <Pressable onPress={goToSocialSelect} style={styles.addLinkBtn}>
        <IconContainer iconName="plus" iconSize={18} style={styles.addIcon} />
        <Text variant="p2" fontFamily={FontFamily.MEDIUM}>
          Add social links
        </Text>
      </Pressable>
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
  };
});
