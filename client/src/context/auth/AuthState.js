import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RESET_PASSWORD,
  RECOVER_PASSWORD,
  CLEAR_ERRORS
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    isSent: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get('/api/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/users', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Login User
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth', formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Forgot Password
  
  const forgotP = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
     const res = await axios.post('/api/reset', formData, config);

      
    } catch (err) {
      dispatch({
        type: RECOVER_PASSWORD,
        payload: err.response.data.msg
      });
      
    }
  };

   // Reset Password
  
  const resetP = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
     const res = await axios.post('/api/resetp', formData, config);

      
    } catch (err) {
      dispatch({
        type: RESET_PASSWORD,
        payload: err.response.data.msg
      });
      
    }

    
    /*
     try {
      const res = await axios.get('/api/reset', logincrd, config);  
      dispatch({
        type: RECOVER_PASSWORD,
        payload: res.data
      });
     } catch (err) {

     }

     */
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isSent: state.isSent,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        forgotP,
        resetP,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
