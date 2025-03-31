import React, { useState } from 'react';

interface IGlobalContextProps {
  user: any;
  recentTransactoins: any;
  loading: boolean;
  phantomConnected: boolean;
  setRecentTransContext: (trans: any) => void;
  setUser: (user: any) => void;
  setLoading: (loading: boolean) => void;
  setPhantomConnected: (connected: any) => void;
}

export const GlobalContext = React.createContext<IGlobalContextProps>({
  user: {},
  recentTransactoins: [],
  loading: true,
  phantomConnected: false,
  setUser: () => {},
  setLoading: () => {},
  setRecentTransContext: () => {},
  setPhantomConnected: () => {}
});

export const GlobalContextProvider = (props: any) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [recentTrans, setRecentTransContext] = useState([]);

  const [phantomConnected, setPhantomConnected] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        user: currentUser,
        loading: isLoading,
        recentTransactoins: recentTrans,
        phantomConnected: phantomConnected,
        setUser: setCurrentUser,
        setLoading: setIsLoading,
        setRecentTransContext: setRecentTransContext,
        setPhantomConnected: setPhantomConnected
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};