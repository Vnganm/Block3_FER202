import React, { createContext, useReducer, useContext, useEffect } from 'react';

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const initialState = { user: null, redirectAfterLogin: null };

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('AuthReducer LOGIN - User payload:', action.payload); // Debug
      console.log('AuthReducer LOGIN - User role:', action.payload?.role); // Debug role
      return { ...state, user: action.payload, redirectAfterLogin: null };
    case 'LOGOUT':
      console.log('AuthReducer LOGOUT'); // Debug
      return { ...state, user: null };
    case 'REGISTER':
      console.log('AuthReducer REGISTER - User payload:', action.payload); // Debug
      return { ...state, user: action.payload };
    case 'SET_REDIRECT':
      return { ...state, redirectAfterLogin: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        console.log('Restored user from localStorage:', parsedUser); // Debug
        console.log('Restored user role from localStorage:', parsedUser?.role); // Debug role
        if (parsedUser && parsedUser.username && parsedUser.role && parsedUser.id) {
          dispatch({ type: 'LOGIN', payload: parsedUser });
        } else {
          console.log('Invalid user data, clearing localStorage');
          localStorage.removeItem('user');
          dispatch({ type: 'LOGOUT' });
        }
      } catch (e) {
        console.error('Error parsing user from localStorage:', e);
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
      }
    }
  }, []);

  useEffect(() => {
    if (state.user) {
      console.log('Saving user to localStorage:', state.user); // Debug
      console.log('Saving user role to localStorage:', state.user?.role); // Debug role
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [state.user]);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);