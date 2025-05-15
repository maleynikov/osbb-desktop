import React, {
    createContext,
    useContext
  } from 'react';
import { useNavigate } from 'react-router';
import { useState } from 'react'


interface AuthContextInterface {
  onLogin: (token: any) => void;
  onLogout: () => void;
  isLogged: () => boolean;
}

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextInterface | null>(null);

const useStorage = (name: string, defaultValue: any = null) => {
  const [storedValue, setStoredValue] = useState(() => {
    const value = window.localStorage.getItem(name);
    if (value) return value;
    window.localStorage.setItem(name, defaultValue);
    return defaultValue;
  })

  const setValue = (value: any) => {
    window.localStorage.setItem(name, value);
    setStoredValue(value);
  }
  return [storedValue, setValue];
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useStorage('ssid');
  const navigte = useNavigate();

  const loginHandler = (token: string) => {
    setToken(token);
    navigte('/dashboard', {replace: true});
  }

  const logoutHandler = () => {
    setToken(null);
    navigte('/', {replace: true});
  }

  const value  = {
    onLogin: loginHandler,
    onLogout: logoutHandler,
    isLogged: () => token && token.length === 32,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

const useAuth = () => {
  return useContext(AuthContext);
}

export {
  AuthProvider,
  useAuth,
  useStorage,
}
