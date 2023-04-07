import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { useLazyParseCardPhotoQuery } from '~/store/query/cards';
import { Button, ButtonStyleType } from '~/view/components/Button';
import { CardBox } from '~/view/components/CardBox';
import { StackHeader } from '~/view/components/Header/StackHeader';
import { MainContainer } from '~/view/components/MainContainer';
import { makeStyles, Text } from '~/view/plugins/theme';

interface Props
  extends NativeStackScreenProps<ReactNavigation.RootParamList, 'AddContactViaScanCard'> {}

export const AddContactViaScanCardScreen: React.VFC<Props> = ({ route }) => {
  const { photo } = route.params;

  const styles = useStyles();
  const navigation = useNavigation();
  const [parseCardPhoto] = useLazyParseCardPhotoQuery();
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await parseCardPhoto(photo);
      setLoading(false);
      navigation.navigate('AddContactManually', { photo, isScanCard: true, cardDetails: data });
    } catch {
      setLoading(false);
      navigation.navigate('AddContactManually', {
        photo,
      });
    }
  };

  return (
    <MainContainer>
      <StackHeader text="Add contact manually" />
      <View style={styles.container}>
        <CardBox>
          <Image source={{ uri: photo.uri }} resizeMode="cover" style={styles.background} />
        </CardBox>
        <Text variant="p2" textAlign="center" style={styles.text}>
          Here is your manually added contact card. Click continue to customise further!
        </Text>
        <Button
          isLoading={isLoading}
          styleType={ButtonStyleType.PRIMARY}
          label="Continue"
          containerStyle={styles.btn}
          onPress={handleSubmit}
        />
      </View>
    </MainContainer>
  );
};

const useStyles = makeStyles({
  container: {
    marginTop: 40,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  btn: {
    marginTop: 28,
    width: '100%',
  },
  text: {
    marginTop: 20,
  },
  background: {
    width: '100%',
    height: '100%',
  },
});
