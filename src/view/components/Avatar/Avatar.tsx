import React from 'react';
import { Image, Pressable, View } from 'react-native';

import { AvatarSize } from '~/view/components/Avatar/consts';
import { SvgIcon } from '~/view/components/SvgIcon';
import { makeStyles } from '~/view/plugins/theme';

interface Props {
  size: AvatarSize;
  uri?: string;
  onPress?: () => void;
}

export const Avatar: React.FC<Props> = ({ size, uri, onPress }) => {
  const styles = useStyles();

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}
    >
      {uri ? (
        <Image source={{ uri }} style={styles.photo} />
      ) : (
        <View style={styles.emptyPhoto}>
          <SvgIcon name="user" height={size / 2} width={size / 2} fill="#959EAB" />
        </View>
      )}
    </Pressable>
  );
};

const useStyles = makeStyles({
  container: {
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyPhoto: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
