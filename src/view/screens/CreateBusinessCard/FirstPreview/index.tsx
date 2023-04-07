import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack';

import { useAppSelector } from '~/store/hooks';
import { updateForm } from '~/store/modules/cardForm';
import { Button, ButtonStyleType } from '~/view/components/Button';
import { CardType } from '~/view/components/CreateCardButton/types';
import { StackHeader } from '~/view/components/Header/StackHeader';
import { HorizontalCard } from '~/view/components/HorizontalCard';
import { MainContainer } from '~/view/components/MainContainer';
import { makeStyles, Text } from '~/view/plugins/theme';

import { useAppDispatch } from '../../../../store/hooks';

interface Props
  extends NativeStackScreenProps<ReactNavigation.CreateBusinessCardParamList, 'FirstPreview'> {}

export const FirstPreviewScreen: React.VFC<Props> = ({ route }) => {
  const {
    horizontalCardColor,
    horizontalCompanyLogo,
    companyLogoColor,
    email,
    verticalCompanyLogo,
  } = route.params;
  const styles = useStyles();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const formEmail = useAppSelector(state => state?.cardForm?.form?.email);

  const handleSubmit = () => {
    if (!formEmail) {
      dispatch(
        updateForm({
          email,
          horizontalCompanyLogo,
          verticalCompanyLogo,
          horizontalCardColor,
          logoBackgroundColor: companyLogoColor,
        }),
      );
    }

    navigation.navigate('CardEditor', { cardType: CardType.BUSINESS });
  };

  return (
    <MainContainer>
      <StackHeader text="Create Business Card" />
      <View style={styles.container}>
        <HorizontalCard
          logo={horizontalCompanyLogo}
          cardColor={horizontalCardColor}
          logoBackgroundColor={companyLogoColor}
        />

        <Text variant="p2" textAlign="center" style={styles.text}>
          Here is your new digital business card.{'\n'}Click continue to customise further!
        </Text>
        <Button
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
});
