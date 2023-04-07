import React, { useRef } from 'react';

import { CardModel } from '~/models/businessCard';
import { CardType } from '~/view/components/CreateCardButton/types';
import { HorizontalCard } from '~/view/components/HorizontalCard';
import { ShareCardModal } from '~/view/components/HorizontalCard/components/ShareCardModal';
import { ShareCardModalRef } from '~/view/components/HorizontalCard/components/ShareCardModal/types';

interface Props {
  card: CardModel;
  cardType: CardType;
}

export const CardWrapper: React.VFC<Props> = ({ card, cardType }) => {
  const shareModalRef = useRef<ShareCardModalRef>(null);

  const onCardPress = () => {
    shareModalRef.current?.open();
  };
  return (
    <>
      <HorizontalCard
        forView
        photo={card.photo}
        isCardPhoto={card.isCardPhoto}
        logo={card.horizontalLogo}
        firstName={card.firstName}
        lastName={card.lastName}
        position={card.position}
        cardColor={card.horizontalCardColor}
        textColor={card.horizontalTextColor}
        logoBackgroundColor={card.logoBackgroundColor}
        style={{ marginBottom: 20 }}
        isManually={card.isManually}
        cardType={cardType}
        onPress={onCardPress}
        cardName={card.card_name}
      />
      <ShareCardModal ref={shareModalRef} id={card.id} cardType={cardType} />
    </>
  );
};
