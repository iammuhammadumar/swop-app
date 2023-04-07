import { isString } from '@appello/common/lib/utils/string';
import React from 'react';
import { FieldPath, FieldValues, useController } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';
import { Pressable, View, ViewStyle } from 'react-native';

import { Avatar } from '~/view/components/Avatar/Avatar';
import { AvatarSize } from '~/view/components/Avatar/consts';
import { ProfileFormValues } from '~/view/components/ProfileForm';
import { useDeviceGallery } from '~/view/hooks/useDeviceGallery';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';

interface Props<FormValues extends FieldValues> {
  containerStyle?: ViewStyle;
  control: Control<FormValues>;
  name: FieldPath<FormValues>;
}

export const AvatarUpload = <FormValues extends ProfileFormValues>({
  containerStyle,
  control,
  name,
}: Props<FormValues>): React.ReactElement => {
  const styles = useStyles();
  const controller = useController({ name, control });
  const { value, onChange } = controller.field;
  const { goToGallery } = useDeviceGallery({ maxHeight: 200, maxWidth: 200 });

  const handlePress = React.useCallback(async () => {
    const photo = await goToGallery();
    if (photo) {
      onChange(photo);
    }
  }, [goToGallery, onChange]);

  const uri = React.useMemo(() => {
    if (value) {
      return isString(value) ? value : value.uri;
    }

    return undefined;
  }, [value]);

  return (
    <Pressable onPress={handlePress} style={[containerStyle, styles.container]}>
      <View style={styles.photoWrapper}>
        <Avatar size={AvatarSize.M} uri={uri} onPress={handlePress} />
      </View>
      <Text fontSize={18} fontWeight="600" style={styles.label}>
        Change photo
      </Text>
    </Pressable>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    photoWrapper: {
      marginRight: 15,
    },
    label: {
      color: theme.colors.primary,
    },
  };
});
