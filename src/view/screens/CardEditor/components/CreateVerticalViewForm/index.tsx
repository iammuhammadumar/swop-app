import { useNavigation } from '@react-navigation/native';
import React, { VFC } from 'react';

import { dispatch } from '~/store';
import { updateForm } from '~/store/modules/cardForm';
import { CardFormValues } from '~/store/modules/cardForm/types';
import { CardType } from '~/view/components/CreateCardButton/types';
import { VerticalViewForm } from '~/view/components/VerticalViewForm';
import { useVerticalViewForm } from '~/view/components/VerticalViewForm/hooks';

interface Props {
  isManually?: boolean;
  removeCard?(): void;
  cardType?: CardType;
}

export const CreateVerticalViewForm: VFC<Props> = ({ isManually, removeCard, cardType }) => {
  const navigation = useNavigation();
  const { form } = useVerticalViewForm();
  const handleSubmit = (values: CardFormValues): void => {
    dispatch(updateForm(values));

    navigation.navigate('PreviewScreen', { cardType });
  };

  return (
    <VerticalViewForm
      onSubmit={handleSubmit}
      form={form}
      isManually={isManually}
      removeCard={removeCard}
      cardType={cardType}
    />
  );
};
