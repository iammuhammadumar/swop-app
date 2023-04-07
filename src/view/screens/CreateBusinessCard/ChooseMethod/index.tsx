import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import { getFileNameFromUrl } from '~/utils/getFileNameFromUrl';
import { Button, ButtonStyleType } from '~/view/components/Button';
import { CreateCardButton } from '~/view/components/CreateCardButton/CreateCardButton';
import { CardType } from '~/view/components/CreateCardButton/types';
import { StackHeader } from '~/view/components/Header/StackHeader';
import { MainContainer } from '~/view/components/MainContainer';
import { makeStyles, Text } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

export const ChooseMethodScreen: React.VFC = () => {
  const styles = useStyles();
  const navigation = useNavigation();

  const scanCard = React.useCallback(async () => {
    const image = await ImagePicker.openCamera({
      mediaType: 'photo',
      width: 300,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
    });
    navigation.navigate('CardEditor', {
      cardPhoto: {
        name: getFileNameFromUrl(image.path),
        uri: image.path,
        type: image.mime,
      },
      cardType: CardType.BUSINESS,
    });
  }, [navigation]);

  return (
    <MainContainer>
      <StackHeader text="Create Business Card" />
      <View style={styles.container}>
        <CreateCardButton
          type={CardType.BUSINESS}
          onPress={() => navigation.navigate('CreateBusinessCard', { screen: 'EnterEmail' })}
        />
        <Text variant="p2" fontFamily={FontFamily.SEMI_BOLD} style={styles.OR} textAlign="center">
          OR
        </Text>
        <View style={styles.btnsContainer}>
          <Button
            styleType={ButtonStyleType.PRIMARY}
            label="Scan an existing card"
            onPress={scanCard}
          />
          <Button
            styleType={ButtonStyleType.SECONDARY}
            disabled
            label="Add card from invitation code"
            onPress={() => navigation.navigate('CorporateInvitation')}
            containerStyle={styles.inviteBtn}
          />
        </View>
      </View>
    </MainContainer>
  );
};

const useStyles = makeStyles({
  container: {
    marginTop: 50,
  },
  OR: {
    marginVertical: 30,
  },
  btnsContainer: {
    paddingHorizontal: 25,
  },
  inviteBtn: {
    marginTop: 30,
  },
});
