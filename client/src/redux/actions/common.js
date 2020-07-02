import axios from "axios";
import { setAlert } from "./alert";
import { v4 as uuidv4 } from "uuid";

export const loadUP = () => async (dispatch) => {
  dispatch({ type: "LOADING" });
  try {
    if (localStorage.getItem("token")) {
      axios
        .all([axios.get("/api/users/me"), axios.get("/api/products")])
        .then((res) => {
          const user = res[0].data.user;
          const products = res[1].data.products;
          dispatch({ type: "LOAD_PRODUCTS", payload: products });
          dispatch({ type: "LOAD_USER", payload: user });
        });
    } else {
      const res = await axios.get("/api/products");
      dispatch({ type: "LOAD_PRODUCTS", payload: res.data.products });
      dispatch({ type: "NOT_LOADING" });
    }
  } catch (err) {
    dispatch({ type: "AUTH_ERROR" });
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert("error", error.msg, uuidv4()));
      });
    }
  }
};
