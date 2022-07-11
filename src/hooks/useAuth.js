import React, { useReducer, useContext, createContext, useState } from "react";
import { authReducer } from "../reducers/authReducer";
import { GET_ERRORS, SET_CURRENT_USER } from "../actions/types";
import jwt_decode from "jwt-decode";
const http = require("http");

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
  const [browser, setBrowser] = useState("");
  const [user, dispatchUser] = useReducer(authReducer, initialState);
  const signin = async (userData, dispatch, history) => {
    const options = {
      method: "POST",
      path: "http://localhost/api/users/register",
      socketPath: sessionStorage.Sock,
      hostname: "unix",
      port: null,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = http.request(options, function (res, err) {
      const chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
      res.on("end", function () {
        const body = Buffer.concat(chunks).toString();
        const jsbody = JSON.parse(body);
        if ("_id" in jsbody) {
          history.push("/login");
        } else {
          dispatch({
            type: GET_ERRORS,
            payload: jsbody,
          });
        }
      });
    });

    req.write(JSON.stringify(userData));
    req.end();
  };

  const signup = async (userData, dispatch, history) => {
    const options = {
      method: "POST",
      path: "http://localhost/api/users/login",
      socketPath: sessionStorage.Sock,
      hostname: "unix",
      port: null,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const req = http.request(options, function (res) {
      const chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        const body = Buffer.concat(chunks).toString();
        const jsbody = JSON.parse(body);
        if (!jsbody.token) {
          dispatch({
            type: GET_ERRORS,
            payload: jsbody,
          });
        } else {
          // Save to localStorage
          // Set token to localStorage
          const { token } = jsbody;
          sessionStorage.setItem("jwtToken", token);
          // Set token to Auth header
          // Decode token to get user data
          const decoded = jwt_decode(token);
          // Set current user
          dispatchUser({
            type: SET_CURRENT_USER,
            payload: decoded,
          });
          history.push("/alignment");
        }
      });
    });

    req.write(JSON.stringify(userData));
    req.end();
  };
  const handleEditProfile = async (userData, dispatch, history) => {
    const options = {
      method: "PUT",
      path: `http://localhost/api/users/${user.user.id}`,
      socketPath: sessionStorage.Sock,
      hostname: "unix",
      port: null,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = http.request(options, function (res) {
      const chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        const body = Buffer.concat(chunks).toString();
        const jsbody = JSON.parse(body);

        if ("success" in jsbody) {
          // Save to localStorage
          // Set token to localStorage
          const { token } = jsbody;
          sessionStorage.setItem("jwtToken", token);
          // Set token to Auth header
          // Decode token to get user data
          const decoded = jwt_decode(token);
          // Set current user
          dispatchUser({
            type: SET_CURRENT_USER,
            payload: decoded,
          });
          console.log("successful put request");
          history.push("/alignment");
        } else {
          dispatch({
            type: GET_ERRORS,
            payload: jsbody,
          });
        }
      });
    });

    req.write(JSON.stringify(userData));
    req.end();
  };

  const checkauth = async (history, path) => {
    if (await sessionStorage.jwtToken) {
      // Set auth token header auth
      const token = sessionStorage.jwtToken;
      // setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        // Remove token from local storage
        sessionStorage.removeItem("jwtToken");
        // setAuthToken(false);
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
      history.push(`${path}`);
    }
  };
  const signout = async () => {
    // Remove token from local storage
    sessionStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    // await setAuthToken(false);
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
    handleEditProfile,
    browser,
    setBrowser,
  };
};
