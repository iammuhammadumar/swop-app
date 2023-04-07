import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Dimensions, Image, ScrollView, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { Button, ButtonStyleType } from '~/view/components/Button';
import { MainContainer } from '~/view/components/MainContainer';
import { SvgIcon } from '~/view/components/SvgIcon';
import { TextLink } from '~/view/components/TextLink';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';
import { OnboardingItem } from '~/view/screens/onboarding/types';
import { FontFamily } from '~/view/theme';

const items: OnboardingItem[] = [
  {
    pic: require('~/view/assets/images/onboarding-1.png'),
    text: 'Contactless, custom-designed\n digital cards',
  },
  {
    pic: require('~/view/assets/images/onboarding-2.png'),
    text: 'Manage all your contacts in one\n place. Share with anyone, at anytime',
  },
  {
    pic: require('~/view/assets/images/onboarding-3.png'),
    text: 'Build and grow your\n professional and social network',
  },
];

const { width: screenWidth } = Dimensions.get('window');

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();
  const styles = useStyles();
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState<number>(0);

  const renderItem = React.useCallback(({ item, index }) => {
    return <CarouselItem item={item} key={index} index={index} />;
  }, []);

  const goToSignIn = useCallback(() => {
    navigation.navigate('Auth', { screen: 'SignIn' });
  }, [navigation]);

  const goToSignUp = useCallback(() => {
    navigation.navigate('Auth', { screen: 'SignUp' });
  }, [navigation]);

  return (
    <MainContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <SvgIcon name="swopTextLogo" width={77} height={23} style={styles.logo} />
        <View>
          <Carousel
            data={items}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            onSnapToItem={setCurrentSlideIndex}
          />
          <Pagination
            dotsLength={3}
            activeDotIndex={currentSlideIndex}
            dotStyle={styles.activeDot}
            inactiveDotStyle={styles.inactiveDot}
            inactiveDotScale={1}
            inactiveDotOpacity={1}
            containerStyle={styles.paginationWrapper}
          />
        </View>
        <View style={styles.buttonsWrapper}>
          <Button
            label="Join now"
            styleType={ButtonStyleType.PRIMARY}
            fullWidth
            onPress={goToSignUp}
          />
          <TextLink text="Sign in" containerStyle={styles.singInLink} onPress={goToSignIn} />
        </View>
      </ScrollView>
    </MainContainer>
  );
};

const CarouselItem: React.VFC<{ item: OnboardingItem; index: number }> = ({ item, index }) => {
  const styles = useStyles();
  return (
    <View>
      <Image source={items[index].pic} style={styles.itemImage} />
      <Text fontSize={16} textAlign="center">
        {item.text}
      </Text>
    </View>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    container: {
      paddingBottom: 20,
    },
    buttonsWrapper: {
      alignItems: 'center',
      paddingHorizontal: 25,
    },
    singInLink: {
      marginTop: 27,
      color: theme.colors.brand,
      fontSize: theme.textSize.l,
      fontFamily: FontFamily.SEMI_BOLD,
    },
    page: {
      backgroundColor: theme.colors.white,
      flex: 1,
    },
    itemImage: {
      width: screenWidth,
      height: 375,
      marginBottom: 28,
    },
    activeDot: {
      width: 28,
      height: 9,
      backgroundColor: theme.colors.brand,
      borderRadius: 9,
    },
    inactiveDot: {
      width: 9,
      height: 9,
      borderRadius: 6,
      backgroundColor: theme.colors.brandSecondary,
    },
    paginationWrapper: {
      marginTop: 57,
    },
    logo: {
      alignSelf: 'center',
      marginTop: 30,
      marginBottom: 30,
    },
  };
});
