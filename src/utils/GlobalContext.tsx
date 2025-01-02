/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';
import config from '@/config';
import { GlobalContextType, GlobalProviderProps, GlobalState } from '@/types';

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [globalState, setGlobalState] = useState<GlobalState>(config);

  const value = React.useMemo(() => ({ globalState, setGlobalState }), [globalState]);

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};


export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
