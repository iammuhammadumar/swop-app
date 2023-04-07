import React, { FC, memo, ReactElement } from 'react';
import { Dimensions, Pressable, StyleProp, ViewStyle } from 'react-native';

import { IconContainer } from '~/view/components/IconContainer';
import { makeStyles, Text } from '~/view/plugins/theme';

interface SectionItemProps {
  iconImage: string | ReactElement;
  color?: string;
  name?: string;
  onPress?: () => void;
  containerStyles?: StyleProp<ViewStyle>;
}

const { width: windowWidth } = Dimensions.get('window');

export const SectionItem: FC<SectionItemProps> = memo(
  ({ iconImage, color, name, onPress, containerStyles }) => {
    const styles = useStyles();
    return (
      <Pressable style={[styles.root, containerStyles]} onPress={onPress}>
        {typeof iconImage === 'string' ? (
          <IconContainer style={styles.icon} {...{ iconImage }} color={color} />
        ) : (
          <IconContainer style={styles.icon}>{iconImage}</IconContainer>
        )}
        <Text fontWeight="500" variant="c1">
          {name}
        </Text>
      </Pressable>
    );
  },
);

const useStyles = makeStyles({
  icon: {
    marginBottom: 6,
  },
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth / 3,
    paddingVertical: 21,
  },
});
