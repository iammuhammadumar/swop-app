import { isString } from '@appello/common/lib/utils/string';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack';

import { SocialGroupInfoItem, SocialInfoItem } from '~/store/modules/cardForm/types';
import { useGetSocialGroupQuery } from '~/store/query/socials';
import { StackHeader } from '~/view/components/Header/StackHeader';
import { MainContainer } from '~/view/components/MainContainer';
import { AddCardDetailsOptions } from '~/view/navigation/list';
import { makeStyles } from '~/view/plugins/theme';

import { SectionHeader, SectionItem } from './components';
import { SectionMediaItem } from './components/SectionMediaItem';
import { SectionPDFItem } from './components/SectionPDFItem';
import { PersonalData, personalData } from './configs/index';

type Props = NativeStackScreenProps<ReactNavigation.RootParamList, 'AddCardDetails'>;

export const AddCardDetailsScreen: FC<Props> = ({ route, navigation }) => {
  const { onSelect, fromWeb, employeePermissions } = route.params;
  const styles = useStyles();
  const { data } = useGetSocialGroupQuery();
  const [renderData, setRenderData] = useState<SocialGroupInfoItem[]>([]);

  useEffect(() => {
    let dublicateData: SocialGroupInfoItem[] = data ? [...data] : [];
    if (fromWeb) {
      if (dublicateData[0] && data) {
        const employeePermissionsId = employeePermissions?.map(item => item.type);

        dublicateData.shift();
        dublicateData[0] = { ...data[1] };
        dublicateData[1] = { ...data[2] };

        dublicateData[0].data = dublicateData[0].data.filter(item =>
          employeePermissionsId?.includes(item.id),
        );

        dublicateData[1].data = dublicateData[1].data.filter(item =>
          employeePermissionsId?.includes(item.id),
        );

        dublicateData = dublicateData.filter(element => element.data.length > 0);
      }
    }

    setRenderData(dublicateData);
  }, [data, employeePermissions, fromWeb]);

  const handlePressItem = useCallback(
    (id: number, options: AddCardDetailsOptions) => {
      return () => {
        onSelect(id, options);
        navigation.goBack();
      };
    },
    [onSelect, navigation],
  );

  const handlePressItemCallBeack = useCallback(
    (id: number, options: AddCardDetailsOptions) => {
      onSelect(id, options);
      navigation.goBack();
    },
    [onSelect, navigation],
  );

  const renderSection = (item: SocialInfoItem) => {
    if (item.name === 'Photo' || item.name === 'Video') {
      return (
        <SectionMediaItem
          onSelect={handlePressItemCallBeack}
          key={item.id}
          iconImage={item.logo}
          name={item.name}
          id={item.id}
          mediaType={item.name === 'Photo' ? 'photo' : 'video'}
        />
      );
    }
    if (item.name === 'PDF') {
      return (
        <SectionPDFItem
          onSelect={handlePressItemCallBeack}
          key={item.id}
          iconImage={item.logo}
          name={item.name}
          id={item.id}
          mediaType="PDF"
        />
      );
    }
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
    return (
      <>
        <SectionHeader title={item.title} />
        <View style={styles.section}>{item.data.map(renderSection)}</View>
      </>
    );
  };

  const renderPersonalDetails = useCallback(
    (item: PersonalData) => (
      <SectionItem
        onPress={handlePressItem(item.id, {
          sectionType: item.sectionType,
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
    ),
    [handlePressItem],
  );

  const ListHeaderComponent = useMemo(() => {
    return (
      <>
        <SectionHeader title="Personal Details" />
        <View style={styles.section}>{personalData.map(renderPersonalDetails)}</View>
      </>
    );
  }, [renderPersonalDetails, styles.section]);

  return (
    <MainContainer>
      <StackHeader text="Add Details" />
      <FlatList
        keyExtractor={item => item.title}
        data={renderData}
        renderItem={renderItem}
        ListHeaderComponent={!fromWeb ? ListHeaderComponent : undefined}
      />
    </MainContainer>
  );
};

const useStyles = makeStyles({
  section: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
