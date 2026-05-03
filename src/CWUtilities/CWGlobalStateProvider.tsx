import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';
import { AuthState } from './CWAuthTypes';
import { ToastTypeData } from './CWScreenSlot.Types';
import { CWSharedViewModel } from './CWSharedViewModel';

// Define the shape of the global state object
interface GlobalState {
  userAuthenticationStatus: AuthState;
  setUserAuthenticationStatus: Dispatch<SetStateAction<AuthState>>;
  toastTypeData: ToastTypeData | undefined
  setToastTypeData: Dispatch<SetStateAction<ToastTypeData | undefined>>;
  failureRetryToast: ToastTypeData | undefined;
  setFailureRetryToast: Dispatch<SetStateAction<ToastTypeData | undefined>>;
}

// Create a context with a defaultValue
const GlobalStateContext = createContext<GlobalState | null>(null);

// Create a provider component
export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [userAuthenticationStatus, setUserAuthenticationStatus] = useState<AuthState>(CWSharedViewModel.Instance.userAuthenticationStatus);
  const [toastTypeData, setToastTypeData] = useState<ToastTypeData | undefined>(undefined);
  const [failureRetryToast, setFailureRetryToast] = useState<ToastTypeData | undefined>(undefined);



  // Create an object representing the global state
  const globalState: GlobalState = {
    userAuthenticationStatus,
    setUserAuthenticationStatus,
    toastTypeData,
    setToastTypeData,
    failureRetryToast,
    setFailureRetryToast,
  };

  return (
    <GlobalStateContext.Provider value={globalState}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to consume the context
export const useGlobalState = (): GlobalState => {
  const context = useContext(GlobalStateContext);
  if (context === null) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};