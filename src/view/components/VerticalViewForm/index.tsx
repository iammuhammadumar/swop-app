import React, { useState } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { Dimensions, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { CardFormValues } from '~/store/modules/cardForm/types';
import { FileAsset } from '~/types';
import { Button, ButtonStyleType } from '~/view/components/Button';
import { TextField } from '~/view/components/form/TextField';
import { VerticalCardHeader } from '~/view/components/VerticalCard/components/VerticalCardHeader';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

import { CardType } from '../CreateCardButton/types';
import { ColorButton } from '../form/ColorButton';
import { CardDetails } from './components/CardDetails';

const { width: screenWidth } = Dimensions.get('window');

interface Props {
  isManually?: boolean;
  form: UseFormReturn<CardFormValues>;
  cardType?: CardType;
  removeCard?: () => void;
  onSubmit(values: CardFormValues): void;
}

export const VerticalViewForm: React.VFC<Props> = ({
  form,
  onSubmit,
  isManually,
  removeCard,
  cardType,
}) => {
  const styles = useStyles();
  const [isRemoving, setRemoving] = useState(false);

  const [
    verticalCompanyLogo,
    verticalProfilePhoto,
    horizontalProfilePhoto,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    allow_change_cover_photo,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    allow_change_vertical_profile_picture,
  ] = useWatch({
    name: [
      'verticalCompanyLogo',
      'verticalProfilePhoto',
      'horizontalProfilePhoto',
      'allow_change_cover_photo',
      'allow_change_vertical_profile_picture',
    ],
    control: form.control,
  });

  const handleRemoveCard = async () => {
    setRemoving(true);
    try {
      await removeCard?.();
    } finally {
      setRemoving(false);
    }
  };

  const changePhoto = (image: Nullable<FileAsset>): void => {
    form.setValue(
      `${cardType === CardType.PERSONAL ? 'horizontalProfilePhoto' : 'verticalProfilePhoto'}`,
      image,
    );
  };

  const changeBackground = (image: Nullable<FileAsset>): void => {
    form.setValue('verticalCompanyLogo', image);
  };

  return (
    <KeyboardAwareScrollView enableOnAndroid>
      <VerticalCardHeader
        photo={cardType === CardType.PERSONAL ? horizontalProfilePhoto : verticalProfilePhoto}
        background={verticalCompanyLogo}
        onPhotoUpload={changePhoto}
        onBackgroundUpload={changeBackground}
        allow_change_cover_photo={allow_change_cover_photo}
        allow_change_vertical_profile_picture={allow_change_vertical_profile_picture}
      />

      <View style={styles.formContent}>
        <View>
          <TextField
            name="firstName"
            control={form.control}
            style={{ marginTop: 15 }}
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
              containerStyle={{ marginTop: 15 }}
            />
          </View>
          <View style={styles.divider} />
        </View>
        <CardDetails form={form} />
        <View>
          <Button
            styleType={ButtonStyleType.PRIMARY}
            label={isManually ? 'Confirm' : 'Preview'}
            isLoading={form.formState.isSubmitting}
            containerStyle={{ marginTop: 18 }}
            onPress={form.handleSubmit(onSubmit)}
          />
          {removeCard && (
            <Button
              label="Delete card"
              isLoading={isRemoving}
              onPress={handleRemoveCard}
              styleType={ButtonStyleType.NEGATIVE}
              containerStyle={{ marginTop: 15 }}
            />
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
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
  };
});
