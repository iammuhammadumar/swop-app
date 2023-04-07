import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { IconsType } from '~/store/modules/cardForm/consts';
import { useGetSocialsQuery } from '~/store/query/socials';
import { StackHeader } from '~/view/components/Header/StackHeader';
import { MainContainer } from '~/view/components/MainContainer';
import { SocialInfoBadge } from '~/view/components/VerticalCard/components/SocialInfoBadge';
import { makeStyles } from '~/view/plugins/theme';

type Props = NativeStackScreenProps<ReactNavigation.RootParamList, 'SelectSocial'>;

export const SelectSocialScreen: React.VFC<Props> = ({ route, navigation }) => {
  const { onSelect } = route.params;
  const styles = useStyles();
  const { data } = useGetSocialsQuery();

  const socials = useMemo(() => (data ? Object.values(data) : []), [data]);

  const handleSelect = (id: number) => {
    onSelect(id);
    navigation.goBack();
  };

  return (
    <MainContainer>
      <StackHeader text="Add socials" />
      <ScrollView style={styles.container}>
        {socials.map(item => (
          <SocialInfoBadge
            key={item.id}
            iconsType={IconsType.CIRCLES}
            iconImage={item.logo}
            value={item.name}
            onPress={() => handleSelect(item.id)}
            style={styles.badge}
          />
        ))}
      </ScrollView>
    </MainContainer>
  );
};

const useStyles = makeStyles(() => {
  return {
    container: {
      marginTop: 10,
      paddingHorizontal: 25,
    },
    badge: {
      borderBottomWidth: 1,
      borderBottomColor: '#E5EAF6',
      borderBottomStyle: 'solid',
      paddingBottom: 15,
      paddingTop: 2,
    },
  };
});
