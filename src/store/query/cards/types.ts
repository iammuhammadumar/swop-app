import { CardFormValues } from '~/store/modules/cardForm/types';
import { CardType } from '~/view/components/CreateCardButton/types';

export interface GetCardVariables {
  id: number;
}

export interface CreateCardVariables {
  isManually?: boolean;
  isCardPhoto?: boolean;
  form: CardFormValues;
  cardType?: CardType;
}

export interface UpdateCardVariables {
  cardId: number;
  form: CardFormValues;
  cardType?: CardType;
}
export interface ParseCardPhotoResponse {
  Name: Nullable<string>;
  Email: Nullable<string>;
  Telephone: Nullable<string>;
  Job: Nullable<string>;
  Site: Nullable<string>;
}
export interface ParseCardData {
  firstName: Nullable<string>;
  lastName: Nullable<string>;
  email: Nullable<string>;
  position: Nullable<string>;
  website: Nullable<string>;
}
