import React, { ReactElement, VFC } from 'react';
import { Image, Pressable, View, ViewStyle } from 'react-native';

import { IconName, SvgIcon } from '~/view/components/SvgIcon/SvgIcon';
import { makeStyles, useTheme } from '~/view/plugins/theme';

interface Props {
  iconName?: IconName;
  iconImage?: string;
  onPress?(): void;
  style?: ViewStyle;
  iconSize?: number;
  size?: number;
  color?: string;
  children?: ReactElement;
}

export const IconContainer: VFC<Props> = ({
  iconImage,
  iconName,
  onPress,
  style,
  color,
  children,
  size = 43,
  iconSize = 24,
}) => {
  const styles = useStyles({ color, size });

  const body = (
    <>
      {iconImage && (
        <Image source={{ uri: iconImage }} style={{ width: iconSize, height: iconSize }} />
      )}
      {iconName && <SvgIcon name={iconName} fill="white" stroke="white" size={iconSize} />}
      {children}
    </>
  );

  if (onPress) {
    return (
      <Pressable style={[styles.container, style]} onPress={onPress}>
        {body}
      </Pressable>
    );
  }

  return <View style={[styles.container, style]}>{body}</View>;
};

const useStyles = makeStyles(({ color, size }: Pick<Props, 'color'> & { size: number }) => {
  const theme = useTheme();

  return {
    container: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color || theme.colors.brandSecondary,
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
});
