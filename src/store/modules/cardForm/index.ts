import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import deepCopy from '@ungap/structured-clone';

import { CardView, IconsType } from './consts';
import { CardFormState } from './types';

export const initialState: CardFormState = {
  form: {
    allow_change_vertical_profile_picture: true,
    allow_change_profile_picture: true,
    allow_change_cover_photo: true,
    fromWeb: false,
    iconsType: IconsType.CIRCLES,
    verticalLogo: '',
    photo: '',
    company: '',
    department: '',
    team_name: '',
    card_name: '',
    horizontalIconColor: '',
    personalDetails: [],
    accreditations: [],
    pictures: [],
    verticalPhoto: '',
    horizontalCardColor: '',
    horizontalTextColor: '',
    horizontalCompanyLogo: null,
    horizontalProfilePhoto: null,
    verticalCompanyLogo: null,
    verticalProfilePhoto: null,
    firstName: '',
    lastName: '',
    position: '',
    companyName: '',
    teamName: '',
    bio: '',
    phoneNumber: '',
    email: '',
    officeLocation: '',
    social_links: [],
    socials: [],
    verticalBlockColor: '',
    verticalBlockTextColor: '',
    verticalCircleColor: '',
    verticalCircleTextColor: '',
    logoBackgroundColor: null,
  },
  cardView: CardView.HORIZONTAL,
  cardId: null,
  isCardPhoto: false,
};

const cardFormSlice = createSlice({
  name: 'cardForm',
  initialState,
  reducers: {
    updateForm(state, { payload }: PayloadAction<Partial<CardFormState['form']>>) {
      // deepCopy is used for react-hook-form compatibility
      state.form = { ...state.form, ...deepCopy(payload) };
    },
    resetForm(state) {
      state.form = initialState.form;
      state.cardView = initialState.cardView;
      state.cardId = initialState.cardId;
      state.isCardPhoto = initialState.isCardPhoto;
    },
    setCardId(state, { payload }: PayloadAction<Nullable<number>>) {
      state.cardId = payload;
    },
    setIsCardPhoto(state, { payload }: PayloadAction<boolean>) {
      state.isCardPhoto = payload;
    },
    changeCardView(state, { payload }: PayloadAction<CardView>) {
      state.cardView = payload;
    },
  },
});

export const cardFormReducer = cardFormSlice.reducer;
export const { updateForm, resetForm, changeCardView, setCardId, setIsCardPhoto } =
  cardFormSlice.actions;
