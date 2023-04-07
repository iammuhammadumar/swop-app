import { useMountEffect } from '@appello/common/lib/hooks';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';
import { Dimensions, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack';
import { useDispatch } from 'react-redux';

import { resetForm, updateForm } from '~/store/modules/cardForm';
import { CardFormValues } from '~/store/modules/cardForm/types';
import { useGetSocialsQuery } from '~/store/query/socials';
import { FileAsset } from '~/types';
import { Button, ButtonStyleType } from '~/view/components/Button';
import { CardType } from '~/view/components/CreateCardButton/types';
import { ColorButton } from '~/view/components/form/ColorButton';
import { TextField } from '~/view/components/form/TextField';
import { StackHeader } from '~/view/components/Header/StackHeader';
import { MainContainer } from '~/view/components/MainContainer';
import { VerticalCardHeader } from '~/view/components/VerticalCard/components/VerticalCardHeader';
import { PersonalDetailsInput } from '~/view/components/VerticalViewForm/components/PersonalDetailsInput';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

import { CardAddDetails } from './components/CardAddDetails';
import { CardDetails } from './components/CardDetails';
import { useAddContactManuallyForm } from './hook';

const { width: screenWidth } = Dimensions.get('window');

interface Props
  extends NativeStackScreenProps<ReactNavigation.RootParamList, 'AddContactManually'> {}

export const AddContactManuallyScreen: React.VFC<Props> = ({ route }) => {
  const { photo, isScanCard, cardDetails } = route.params;
  const styles = useStyles();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { form } = useAddContactManuallyForm(isScanCard ? cardDetails : undefined);
  const { data } = useGetSocialsQuery();

  useMountEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  });

  useEffect(() => {
    if (photo) {
      changeBackground(photo);
    }
  }, [photo]);

  const personalDetails = useFieldArray({
    name: 'personalDetails',
    control: form.control,
  });

  const socialLinks = useFieldArray({
    name: 'social_links',
    control: form.control,
  });

  const handleSubmit = async (values: CardFormValues) => {
    const getIdByName = (name?: string): number => {
      switch (name) {
        case 'Email':
          return 1;
        case 'Phone':
          return 2;
        default:
          return 3;
      }
    };

    if (data) {
      const socialType = data;
      const filteredSocialLinks = values.social_links
        .map(item => {
          if (!item.type) {
            return { ...item, type: socialType[getIdByName(item?.custom_name)] };
          }
          return item;
        })
        .filter(item => item.value);
      const filteredPersonalDetails = values.personalDetails.filter(item => item.value);

      const newValues = {
        ...values,
        personalDetails: filteredPersonalDetails,
        social_links: filteredSocialLinks,
      };

      dispatch(updateForm(newValues));

      navigation.navigate('PreviewScreen', { cardType: CardType.BUSINESS, isManually: true });
    }
  };

  const [verticalCompanyLogo, verticalProfilePhoto] = useWatch({
    name: ['verticalCompanyLogo', 'verticalProfilePhoto', 'horizontalProfilePhoto'],
    control: form.control,
  });

  const changePhoto = (image: Nullable<FileAsset>): void => {
    form.setValue(`${'verticalProfilePhoto'}`, image);
    form.setValue('horizontalProfilePhoto', image);
  };

  const changeBackground = (image: Nullable<FileAsset>): void => {
    form.setValue('verticalCompanyLogo', image);
    form.setValue('horizontalCompanyLogo', image);
  };

  return (
    <MainContainer>
      <StackHeader text="Add contact manually" style={{ paddingBottom: 20 }} />
      <KeyboardAwareScrollView enableOnAndroid>
        <VerticalCardHeader
          photo={verticalProfilePhoto}
          background={photo ?? verticalCompanyLogo}
          onPhotoUpload={changePhoto}
          onBackgroundUpload={photo ? undefined : changeBackground}
        />
        <View style={styles.formContent}>
          <View>
            <TextField
              name="firstName"
              control={form.control}
              style={styles.marginTop}
              label="First name"
            />
            <TextField
              name="lastName"
              control={form.control}
              style={styles.lastName}
              label="Last name"
            />
            <View style={styles.divider} />
            <View style={styles.section}>
              <Text variant="p2" fontFamily={FontFamily.SEMI_BOLD}>
                Card design
              </Text>
              <ColorButton
                name="horizontalIconColor"
                control={form.control}
                text="Icon colour"
                containerStyle={styles.marginTop}
              />
            </View>
            <View style={styles.divider} />
          </View>
          <View style={styles.addDetails}>
            <Text style={styles.title} variant="p2" fontFamily={FontFamily.SEMI_BOLD}>
              Details
            </Text>
            {personalDetails.fields.map((item, index) => (
              <PersonalDetailsInput
                fieldName="personalDetails"
                index={index}
                hideIcon
                key={index}
                name={item.name}
                remove={personalDetails.remove}
                control={form.control}
                editable
              />
            ))}
            {socialLinks.fields.map(({ id, type }, index) => (
              <CardAddDetails
                type={type?.id}
                index={index}
                name={type?.name}
                key={id || index}
                control={form.control}
              />
            ))}
          </View>
          <View style={styles.divider} />
          <CardDetails form={form} />
          <View>
            <Button
              styleType={ButtonStyleType.PRIMARY}
              label="Preview"
              isLoading={form.formState.isSubmitting}
              containerStyle={{ marginTop: 18 }}
              onPress={form.handleSubmit(handleSubmit)}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </MainContainer>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    formContent: {
      paddingHorizontal: 25,
      paddingTop: 35,
      justifyContent: 'space-between',
      flex: 1,
    },
    section: {
      marginVertical: 20,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.gray2,
      width: screenWidth,
      marginLeft: -25,
    },
    lastName: {
      marginTop: 11,
      marginBottom: 20,
    },
    marginTop: {
      marginTop: 15,
    },
    addDetails: {
      marginTop: 20,
    },
    title: {
      marginBottom: 25,
    },
  };
});
