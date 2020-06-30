/**
 *  this action generator will basically be used to dispatch actions
 *  concerning register, login, setting token etc.
 *  each action will either dispatch a success or a failure action
 *  */

import axios from "axios";
import { setAlert } from "./alert";
import { v4 as uuidv4 } from "uuid";

export const register = ({ email, name, password1, password2 }) => async (
  dispatch
) => {
  dispatch({ type: "LOADING" });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, name, password1, password2 });
    const res = await axios.post("/api/users", body, config);
    dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
    dispatch(setAlert("success", "You are registered successfully!", uuidv4()));
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert("danger", error.msg));
      });
    }

    dispatch({ type: "REGISTER_FAIL" });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });
    const res = await axios.post("/api/users/login", body, config);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    dispatch(setAlert("success", "You are logged in successfully!", uuidv4()));
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert("danger", error.msg));
      });
    }

    dispatch({ type: "LOGIN_FAIL" });
  }
};

// Logout user
export const logoutUser = (token) => async (dispatch) => {
  dispatch({ type: "LOADING" });

  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };

  try {
    await axios.post("/api/users/logout", null, config);
    dispatch({ type: "LOGOUT" });
    console.log("hey", "logout");

    dispatch(setAlert("success", "You have logged out successfully!"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert("danger", error.msg, uuidv4()));
      });
    }
  }
};

export const getUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LOADING" });
    console.log("USER_LOAD");
    const res = await axios.get("/api/users/me");
    console.log("USER_LOAD");
    dispatch({ type: "LOAD_USER", payload: res.data });
    console.log("USER_LOAD");
    console.log(res.data);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert("danger", error.msg, uuidv4()));
      });
    }
  }
};
