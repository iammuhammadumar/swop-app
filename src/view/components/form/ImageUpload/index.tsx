import { isString } from '@appello/common/lib/utils/string';
import React from 'react';
import { FieldPath, FieldValues, useController } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';
import { Image, Pressable, View, ViewStyle } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import { getFileNameFromUrl } from '~/utils/getFileNameFromUrl';
import { SvgIcon } from '~/view/components/SvgIcon';
import { IconName } from '~/view/components/SvgIcon/SvgIcon';
import { makeStyles, Text } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

interface Props<TFormValues extends FieldValues> {
  containerStyle?: ViewStyle;
  iconName: IconName;
  backgroundColor: string;
  iconColor: string;
  text: string;
  control: Control<TFormValues>;
  name: FieldPath<TFormValues>;
}

export const ImageUpload = <TFormValues extends FieldValues>({
  containerStyle,
  iconName,
  backgroundColor,
  iconColor,
  text,
  name,
  control,
}: Props<TFormValues>): React.ReactElement => {
  const controller = useController({ name, control });
  const styles = useStyles();
  const { value, onChange } = controller.field;

  const handlePress = async (): Promise<void> => {
    const image = await ImagePicker.openPicker({
      width: 1000,
      height: 1000,
      cropping: true,
      freeStyleCropEnabled: true,
    });
    onChange({
      name: getFileNameFromUrl(image.path),
      uri: image.path,
      type: image.mime,
    });
  };

  return (
    <Pressable onPress={handlePress} style={[styles.container, containerStyle]}>
      {value && (
        <Image source={{ uri: isString(value) ? value : value?.uri }} style={styles.image} />
      )}
      {!value && (
        <View style={[styles.photoWrapper, { backgroundColor }]}>
          <SvgIcon name={iconName} size={23} fill={iconColor} stroke={iconColor} />
        </View>
      )}
      <Text variant="p2" fontFamily={FontFamily.MEDIUM}>
        {text}
      </Text>
    </Pressable>
  );
};

const useStyles = makeStyles({
  image: {
    width: 43,
    height: 43,
    borderRadius: 43 / 2,
    marginRight: 15,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoWrapper: {
    width: 43,
    height: 43,
    borderRadius: 43 / 2,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
