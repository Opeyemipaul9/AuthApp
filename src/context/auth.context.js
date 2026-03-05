import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
  useContext,
  
} from 'react';
import { authService } from '../services/authService';



const initialState = {
  user: null,
  token: null,
  error: null,
  status: 'idle',
};

const AuthReducer = (state, action) => {
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
        status: 'unauthenticated',
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
        status: 'unauthenticated',
      };
    default:
      return state;
  }
};


const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
      const [state, dispatch] = useReducer(AuthReducer, initialState);

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
    <AuthContext.Provider value={{ ...state, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const exit = useContext(AuthContext);
  if (!exit) throw new Error('useAuth must be used within <AuthProvider>');
  return exit;
};
