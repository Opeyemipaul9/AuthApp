import React, {
  createContext,
  useEffect,
  useCallback,
  useContext,
  useState,
} from 'react';
import { authService } from '../../../../../Downloads/rn-auth-app/src/services/authService';

export const AuthenticationContext = createContext();

const initialState = {
  user: null,
  token: null,
  error: null,
  status: 'idle',
};

const AuthReducer = (action, state) => {
  switch (action.type) {
    case 'AUTH_LOADING':
      return { ...state, status: 'loading', error: null };

    case 'AUTH_SUCCESS':
      return {
        ...state,
        status: 'authenticated',
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };

    case 'AUTH_ERROR':
      return {
        ...state,
        status: 'unauthenticated',
        error: action.payload,
      };
    case 'AUTH_LOGOUT':
      return {
        ...initialState,
        status: 'unauhenticated',
      };
    case 'SESSION_RESTORED':
      return {
        ...state,
        status: 'authenticated',
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'SESSION_NOT_FOUND':
      return {
        ...state,
        state: 'unauthenticated',
      };
    default:
      return state;
  }
};
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  useEffect(() => {
    (async () => {
      const session = await authService.getSession();
      if (session) {
        dispatch({ type: 'SESSION_RESTORED', payload: session });
      } else {
        dispatch({ type: 'SESSION_NOT_FOUND' });
      }
    })();
  }, []);

  
  const login = useCallback(async details => {
    dispatch({ type: 'AUTH_LOADING' });
    try {
      const { user, token } = await authService.login(details);
      await authService.saveSession(user, token);
      dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  }, []);

  const signUp = useCallback(async data => {
    dispatch({ type: 'AUTH_LOADING' });
    try {
      const { user, token } = await authService.signup(data);
      await authService.saveSession(user, token);
      dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  }, []);

  const logout = useCallback(async () => {
    await authService.clearSession();
    dispatch({ type: 'AUTH_LOGOUT' });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const exit = useContext(AuthContext);
  if (!exit) throw new Error('useAuth must be used within <AuthProvider>');
  return exit;
};
