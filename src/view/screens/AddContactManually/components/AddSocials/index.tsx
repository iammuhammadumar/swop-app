import { isString } from '@appello/common/lib/utils/string';
import React, { FC, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack';

import { SocialGroupInfoItem, SocialInfoItem } from '~/store/modules/cardForm/types';
import { useGetSocialGroupQuery } from '~/store/query/socials';
import { StackHeader } from '~/view/components/Header/StackHeader';
import { MainContainer } from '~/view/components/MainContainer';
import { AddCardDetailsOptions } from '~/view/navigation/list';
import { makeStyles } from '~/view/plugins/theme';
import { SectionItem } from '~/view/screens/CardEditor/AddDetails/components';

type Props = NativeStackScreenProps<ReactNavigation.RootParamList, 'AddSocials'>;

export const AddSocialsScreen: FC<Props> = ({ route, navigation }) => {
  const { onSelect } = route.params;
  const styles = useStyles();
  const { data } = useGetSocialGroupQuery();
  const socialsData = React.useMemo(() => data?.filter(item => item.title === 'Socials'), [data]);

  const handlePressItem = useCallback(
    (id: number, options: AddCardDetailsOptions) => {
      return () => {
        onSelect(id, options);
        navigation.goBack();
      };
    },
    [onSelect, navigation],
  );

  const renderSection = (item: SocialInfoItem) => {
    return (
      <SectionItem
        onPress={handlePressItem(item.id, {
          sectionType: 'details',
          item: {
            type: {
              id: item.id,
              name: item.name,
              logo: isString(item.logo) ? item.logo : '',
              is_file: false,
            },
            custom_name: '',
            value: '',
            editable: true,
          },
        })}
        key={item.id}
        iconImage={item.logo}
        name={item.name}
      />
    );
  };

  const renderItem = ({ item }: { item: SocialGroupInfoItem }) => {
    return <View style={styles.section}>{item.data.map(renderSection)}</View>;
  };

  return (
    <MainContainer>
      <StackHeader text="Add Socials" />
      <FlatList
        keyExtractor={item => item.title}
        data={socialsData || []}
        renderItem={renderItem}
      />
    </MainContainer>
  );
};

const useStyles = makeStyles({
  section: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 20,
  },
});
