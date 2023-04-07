import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FieldPath, FieldValues, useController } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';

import { makeStyles, Text } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

interface Props<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  name: FieldPath<TFormValues>;
  text: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const ColorButton = <TFormValues extends FieldValues>({
  text,
  containerStyle,
  name,
  control,
}: Props<TFormValues>): React.ReactElement => {
  const navigation = useNavigation();
  const controller = useController({ name, control });
  const { value, onChange } = controller.field;
  const styles = useStyles({ color: value });

  return (
    <Pressable
      style={[styles.content, containerStyle]}
      onPress={() =>
        navigation.navigate('ColorPicker', { title: text, initialColor: value, onSave: onChange })
      }
    >
      <View style={styles.color} />
      <Text variant="p2" fontFamily={FontFamily.MEDIUM}>
        {text}
      </Text>
    </Pressable>
  );
};

const useStyles = makeStyles(({ color }: { color: string }) => {
  return {
    content: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    color: {
      backgroundColor: color,
      width: 43,
      height: 43,
      borderRadius: 43 / 2,
      shadowColor: '#a8a8a8',
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 3,
      shadowOpacity: 0.8,
      elevation: 4,
      marginRight: 17,
    },
  };
});
