import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, ViewStyle } from 'react-native';

import { CompanyModel } from '~/models/company';
import { pluralize } from '~/utils/pluralize';
import { makeStyles, Text } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

interface Props {
  data: CompanyModel;
  style?: ViewStyle;
}

export const CompanyItem: React.VFC<Props> = ({ data, style }) => {
  const styles = useStyles();
  const navigation = useNavigation();

  const handlePress = React.useCallback(() => {
    navigation.navigate('Tabs', {
      screen: 'Wallet',
      params: { screen: 'ContactsInCompany', params: { company: data } },
    });
  }, [data, navigation]);

  return (
    <Pressable style={[styles.company, style]} onPress={handlePress}>
      <Text fontSize={16} fontFamily={FontFamily.SEMI_BOLD}>
        {data.name}
      </Text>
      <Text fontSize={14} style={{ marginTop: 5 }}>
        {pluralize(data.contactsCount, 'Contact')}
      </Text>
    </Pressable>
  );
};

const useStyles = makeStyles(() => {
  return {
    company: {
      width: '100%',
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: '#E5EAF6',
    },
  };
});
