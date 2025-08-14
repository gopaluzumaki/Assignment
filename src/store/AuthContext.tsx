// src/store/AuthContext.tsx
import React, {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthState = {
  isLoading: boolean;
  userToken: string | null;
};

type AuthAction =
  | { type: 'RESTORE_TOKEN'; token: string | null }
  | { type: 'SIGN_IN'; token: string }
  | { type: 'SIGN_OUT' };

const initialState: AuthState = {
  isLoading: true,
  userToken: null,
};

function authReducer(prevState: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return { ...prevState, userToken: action.token, isLoading: false };
    case 'SIGN_IN':
      return { ...prevState, userToken: action.token, isLoading: false };
    case 'SIGN_OUT':
      return { ...prevState, userToken: null, isLoading: false };
    default:
      return prevState;
  }
}

type AuthContextType = {
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  state: AuthState;
};

export const AuthContext = createContext<AuthContextType>({
  signIn: async () => {},
  signOut: async () => {},
  state: initialState,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let token: string | null = null;
      try {
        token = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.warn('Failed to load token', e);
      }
      dispatch({ type: 'RESTORE_TOKEN', token });
    };
    bootstrapAsync();
  }, []);

  const signIn = useCallback(async (token: string) => {
    await AsyncStorage.setItem('userToken', token);
    dispatch({ type: 'SIGN_IN', token });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('userToken');
    dispatch({ type: 'SIGN_OUT' });
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, state }}>
      {children}
    </AuthContext.Provider>
  );
};
