import { isString } from '@appello/common/lib/utils/string';
import React, { useState } from 'react';
import { useWatch } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { FileAsset } from '~/types';
import { Button, ButtonStyleType } from '~/view/components/Button';
import { CardType } from '~/view/components/CreateCardButton/types';
import { ColorButton } from '~/view/components/form/ColorButton';
import { TextField } from '~/view/components/form/TextField';
import { HorizontalCard } from '~/view/components/HorizontalCard';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

import { theme } from '../../../../plugins/theme/theme';
import { useHorizontalViewForm, useLogoBackgroundColor } from './hooks';

interface Props {
  isManually?: boolean;
  isCardPhoto?: boolean;
  removeCard?(): void;
  cardType?: CardType;
}

export const HorizontalViewForm: React.VFC<Props> = ({
  isManually,
  removeCard,
  isCardPhoto,
  cardType,
}) => {
  const styles = useStyles();
  const [isRemoving, setRemoving] = useState(false);

  const { form, handleSubmit } = useHorizontalViewForm();

  const [
    firstName,
    lastName,
    companyLogo,
    cardColor,
    textColor,
    profilePhoto,
    logoBackgroundColor,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    card_name,
    position,
    allowChangeProfilePicture,
    fromWeb,
  ] = useWatch({
    name: [
      'firstName',
      'lastName',
      'horizontalCompanyLogo',
      'horizontalCardColor',
      'horizontalTextColor',
      'horizontalProfilePhoto',
      'logoBackgroundColor',
      'card_name',
      'position',
      'allow_change_profile_picture',
      'fromWeb',
    ],
    control: form.control,
  });
  const { isLoading: isLogoBackgroundColorLoading } = useLogoBackgroundColor(companyLogo, color => {
    if (cardColor === theme.colors.brand || !isString(companyLogo)) {
      form.setValue('horizontalCardColor', color);
    }
  });

  const handleRemoveCard = async () => {
    setRemoving(true);
    try {
      await removeCard?.();
    } finally {
      setRemoving(false);
    }
  };

  const handlePhotoUpload = (file: FileAsset): void => {
    form.setValue('horizontalProfilePhoto', file);
  };

  const handleLogoUpload = (file: FileAsset): void => {
    form.setValue('horizontalCompanyLogo', file);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.content} enableOnAndroid>
      <HorizontalCard
        position={position}
        logo={companyLogo}
        photo={profilePhoto}
        style={styles.card}
        onPhotoUpload={!isCardPhoto && allowChangeProfilePicture ? handlePhotoUpload : undefined}
        onLogoUpload={!isManually && !isCardPhoto && !fromWeb ? handleLogoUpload : undefined}
        cardType={cardType}
        cardName={card_name}
        {...{
          cardColor,
          textColor,
          firstName,
          lastName,
          logoBackgroundColor,
          isLogoBackgroundColorLoading,
          isManually,
          isCardPhoto,
          card_name,
        }}
      />
      <View style={[styles.section, styles.sectionUnderline, { marginTop: 15 }]}>
        <Text variant="p2" fontFamily={FontFamily.SEMI_BOLD}>
          Card design
        </Text>
        <ColorButton
          name="horizontalCardColor"
          control={form.control}
          text="Card colour"
          containerStyle={{ marginTop: 15 }}
        />
        <ColorButton
          name="horizontalTextColor"
          control={form.control}
          text="Text colour"
          containerStyle={{ marginTop: 20 }}
        />
      </View>
      <View style={styles.section}>
        <Text variant="p2" fontFamily={FontFamily.SEMI_BOLD}>
          Add details
        </Text>
        <TextField
          name="firstName"
          control={form.control}
          style={{ marginTop: 15 }}
          placeholder="First name"
          label="First name"
        />
        <TextField
          name="lastName"
          control={form.control}
          style={{ marginTop: 11 }}
          label="Last name"
          placeholder="Last name"
        />
        {cardType === CardType.PERSONAL && (
          <TextField
            name="card_name"
            control={form.control}
            style={{ marginTop: 11 }}
            label="Card Name (optional)"
          />
        )}
      </View>
      <Button styleType={ButtonStyleType.PRIMARY} label="Continue" onPress={handleSubmit} />
      {removeCard && (
        <Button
          label="Delete card"
          isLoading={isRemoving}
          onPress={handleRemoveCard}
          styleType={ButtonStyleType.NEGATIVE}
          containerStyle={{ marginTop: 15 }}
        />
      )}
    </KeyboardAwareScrollView>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    content: {
      paddingHorizontal: 25,
      paddingVertical: 25,
    },
    card: {
      alignSelf: 'center',
    },
    section: {
      flexDirection: 'column',
      paddingTop: 25,
      paddingBottom: 35,
    },
    sectionUnderline: {
      borderBottomWidth: 2,
      borderBottomStyle: 'solid',
      borderBottomColor: theme.colors.gray2,
    },
  };
});
