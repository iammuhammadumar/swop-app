import React from 'react';
import { FieldPath, FieldValues, useController } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';
import { StyleProp, View, ViewStyle } from 'react-native';

import { IconsType } from '~/store/modules/cardForm/consts';
import { Button, ButtonStyleType } from '~/view/components/Button';
import { SvgIcon } from '~/view/components/SvgIcon';
import { makeStyles, useTheme } from '~/view/plugins/theme';

const options: IconsType[] = [IconsType.CIRCLES, IconsType.BLOCKS];

interface Props<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  name: FieldPath<TFormValues>;
  containerStyle?: StyleProp<ViewStyle>;
}

export const IconStyleSwitcher = <TFormValues extends FieldValues>({
  containerStyle,
  control,
  name,
}: Props<TFormValues>): React.ReactElement => {
  const controller = useController({ name, control });
  const styles = useStyles();
  const { value: selected, onChange } = controller.field;

  return (
    <View style={[styles.container, containerStyle]}>
      {options.map((item, index) => (
        <View style={styles.option} key={index}>
          <Button
            styleType={selected === item ? ButtonStyleType.PRIMARY : ButtonStyleType.SECONDARY}
            label={item}
            onPress={() => onChange(item)}
          />
          {selected === item && (
            <View style={styles.selectedIcon}>
              <SvgIcon name="checkBold" size={18} />
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    container: {
      flexDirection: 'row',
    },
    selectedIcon: {
      width: 18,
      height: 18,
      borderRadius: 18 / 2,
      backgroundColor: theme.colors.white,
      position: 'absolute',
      right: 13,
      top: 13,
      alignItems: 'center',
      justifyContent: 'center',
    },
    option: {
      flex: 1,
      marginRight: 12,
      position: 'relative',
    },
  };
});
