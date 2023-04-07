import React, { FC, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import { TabBar } from './TabBar';

export interface TabScene {
  label: string;
  component: FC;
}
export interface FullTabsProps {
  renderScene: TabScene[];
}

export const FullTabs: FC<FullTabsProps> = ({ renderScene }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const TabBody = useMemo(() => {
    return renderScene[selectedTab]?.component;
  }, [selectedTab]);

  const handleChangeTab = useCallback((index: number) => {
    setSelectedTab(index);
  }, []);

  return (
    <View>
      <TabBar list={renderScene} changeTab={handleChangeTab} />
      <TabBody />
    </View>
  );
};
