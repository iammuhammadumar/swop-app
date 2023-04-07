import React, { useRef, useState } from 'react';

import { WalletHeader } from '~/view/components/Header/WalletHeader';
import { MainContainer } from '~/view/components/MainContainer';
import { AddNewModal } from '~/view/screens/Wallet/components/AddNewModal';
import { CompaniesList } from '~/view/screens/Wallet/components/CompaniesList';
import { ContactsList } from '~/view/screens/Wallet/components/ContactsList';
import { ListSwitcher } from '~/view/screens/Wallet/components/ListSwitcher';
import { AddContactModalRef, WalletOption } from '~/view/screens/Wallet/types';

export const WalletScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState<WalletOption>(WalletOption.CONTACTS);
  const addModalRef = useRef<AddContactModalRef>(null);
  const [searchValue, setSearchValue] = useState<string>('');

  const handleAddContact = React.useCallback(() => {
    addModalRef.current?.open();
  }, []);

  return (
    <MainContainer withTabBar>
      <WalletHeader onAdd={() => addModalRef.current?.open()} onSearch={setSearchValue} />
      <ListSwitcher selectedTab={selectedTab} onSelect={setSelectedTab} />
      {selectedTab === WalletOption.CONTACTS && (
        <ContactsList onAdd={handleAddContact} searchValue={searchValue} />
      )}
      {selectedTab === WalletOption.COMPANIES && <CompaniesList searchValue={searchValue} />}
      <AddNewModal ref={addModalRef} />
    </MainContainer>
  );
};
