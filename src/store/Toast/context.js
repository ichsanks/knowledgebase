import React, {createContext, useContext, useReducer} from 'react';
import {initialState, ToastReducer} from './reducers';

const ToastStateContext = createContext();
const ToastDispatchContext = createContext();

export function useToastState() {
  const context = useContext(ToastStateContext);
  if (context === undefined) {
    throw new Error('useToastState must be used within a ToastProvider');
  }

  return context;
}

export function useToastDispatch() {
  const context = useContext(ToastDispatchContext);
  if (context === undefined) {
    throw new Error('useToastDispatch must be used within a ToastProvider');
  }

  return context;
}

export const ToastProvider = ({children}) => {
  const [user, dispatch] = useReducer(ToastReducer, initialState);

  return (
    <ToastStateContext.Provider value={user}>
      <ToastDispatchContext.Provider value={dispatch}>
        {children}
      </ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  );
};
