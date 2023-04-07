import React from 'react';
import { Image, Pressable, TextStyle, View, ViewStyle } from 'react-native';

import { IconsType } from '~/store/modules/cardForm/consts';
import { IconContainer } from '~/view/components/IconContainer';
import { IconName, SvgIcon } from '~/view/components/SvgIcon/SvgIcon';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

interface Props {
  iconsType: IconsType;
  iconName?: IconName;
  iconImage?: string;
  value?: string;
  style?: ViewStyle;
  color?: string;
  textColor?: string;
  onPress?(): void;
  iconTypeName?: string;
  name?: string;
}

export const SocialInfoBadge: React.VFC<Props> = ({
  iconsType,
  iconName,
  iconImage,
  value,
  style,
  onPress,
  color,
  textColor,
  iconTypeName,
}) => {
  const styles = useStyles({ iconsType, color, textColor });
  const body = (
    <>
      {iconsType === IconsType.CIRCLES && (
        <IconContainer {...{ iconImage, iconName }} style={styles.icon} color={color} />
      )}
      {iconsType === IconsType.BLOCKS && (
        <>
          {iconName && <SvgIcon name={iconName} size={24} style={styles.icon} />}
          {iconImage && (
            <Image
              source={{ uri: iconName ?? iconImage }}
              style={[styles.iconImage, styles.icon]}
            />
          )}
        </>
      )}
      <View>
        {/* <Text variant="p1" style={styles.label}>
          {name}
        </Text> */}
        <Text variant="s_link">
          {iconTypeName?.toLowerCase() === 'phone' ? '+61  ' : ''}
          {value}
        </Text>
      </View>
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

const useStyles = makeStyles(
  ({ iconsType, color, textColor }: Pick<Props, 'iconsType' | 'color' | 'textColor'>) => {
    const containerStyle: ViewStyle =
      iconsType === IconsType.BLOCKS
        ? {
            backgroundColor: color,
            borderRadius: 6,
            paddingHorizontal: 18,
            paddingVertical: 12,
          }
        : {
            alignItems: 'center',
          };

    const textStyle: TextStyle = {
      fontFamily: iconsType === IconsType.BLOCKS ? FontFamily.SEMI_BOLD : FontFamily.REGULAR,
    };
    const theme = useTheme();

    return {
      container: {
        ...containerStyle,
        flexDirection: 'row',
        marginTop: 13,
      },
      iconImage: {
        width: 24,
        height: 24,
      },
      icon: {
        marginRight: 17,
      },
      text: {
        ...textStyle,
        color: textColor,
        fontSize: 18,
        flex: 1,
      },
      label: {
        color: theme.colors.gray1,
      },
    };
  },
);
