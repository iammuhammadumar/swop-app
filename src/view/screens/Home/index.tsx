import React from 'react';

import { FullTabs, TabScene } from '~/view/components/FullTabs';
import { MainHeader } from '~/view/components/Header/MainHeader';
import { MainContainer } from '~/view/components/MainContainer';

import { BusinessCards, PersonalCards } from './components';

const renderScene: TabScene[] = [
  {
    label: 'Business',
    component: BusinessCards,
  },
  {
    label: 'Personal',
    component: PersonalCards,
  },
];

export const HomeScreen: React.FC = () => {
  return (
    <MainContainer withTabBar>
      <MainHeader />
      <FullTabs renderScene={renderScene} />
    </MainContainer>
  );
};
