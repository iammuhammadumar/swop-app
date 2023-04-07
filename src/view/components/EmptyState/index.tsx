import React from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';

import { Button, ButtonStyleType } from '~/view/components/Button';
import { makeStyles, Text } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

interface Props {
  image: ImageSourcePropType;
  addBtnLabel?: string;
  onAddBtnClick?(): void;
  label: string;
}

export const EmptyState: React.VFC<Props> = ({ image, addBtnLabel, onAddBtnClick, label }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.text}>{label}</Text>
      {Boolean(addBtnLabel) && (
        <Button
          onPress={onAddBtnClick}
          styleType={ButtonStyleType.SECONDARY}
          label={addBtnLabel}
          containerStyle={styles.addBtn}
        />
      )}
    </View>
  );
};

const useStyles = makeStyles({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  image: {
    width: 144,
    height: 144,
    marginBottom: 15,
  },
  text: {
    fontFamily: FontFamily.SEMI_BOLD,
    color: '#D8DAE5',
    fontSize: 16,
  },
  addBtn: {
    marginTop: 25,
    width: 165,
  },
});
