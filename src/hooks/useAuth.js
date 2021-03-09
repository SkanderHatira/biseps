import React, { useReducer, useContext, createContext } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import setAuthToken from "../helpers/setAuthToken";
import { GET_ERRORS, SET_CURRENT_USER } from "../actions/types";
import jwt_decode from "jwt-decode";

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
  };
  const [user, dispatchUser] = useReducer(authReducer, initialState);
  const signin = async (userData, dispatch, history) => {
    await axios
      .post("http://localhost:5000/api/users/register", userData)
      .then((res) => history.push("/login")) // re-direct to login on successful register
      .catch((err) => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      });
  };
  const signup = async (userData, dispatch, history) => {
    await axios
      .post("http://localhost:5000/api/users/login", userData)
      .then((res) => {
        // Save to localStorage
        // Set token to localStorage
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatchUser({
          type: SET_CURRENT_USER,
          payload: decoded,
        });
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      });
  };
  const checkauth = async (history, path) => {
    if (await localStorage.jwtToken) {
      // Set auth token header auth
      const token = localStorage.jwtToken;
      console.log(token);
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      console.log(decoded);
      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        console.log("yes");
        // Remove token from local storage
        console.log(currentTime);
        console.log(decoded.exp);
        localStorage.removeItem("jwtToken");
        setAuthToken(false);
        dispatchUser({
          type: SET_CURRENT_USER,
          payload: {},
        });
        // Redirect to login
        history.push("/login");
      }
      // Set user and isAuthenticated
      dispatchUser({
        type: SET_CURRENT_USER,
        payload: decoded,
      });
      console.log(decoded);
      console.log(user);
      history.push(`${path}`);
    }
  };
  const signout = async () => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    await setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    await dispatchUser({
      type: SET_CURRENT_USER,
      payload: {},
    });
  };

  return {
    user,
    signin,
    signup,
    checkauth,
    signout,
  };
};
