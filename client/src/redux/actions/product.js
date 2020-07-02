import axios from "axios";
import { setAlert } from "./alert";

export const loadProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/products");
    dispatch({
      type: "LOAD_PRODUCTS",
      payload: res.data.products,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert("error", error.msg));
      });
    }

    // dispatch({ type: "SERVER_ERROR" });
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (product.avatar && product.avatar.size > 1000000) {
      dispatch(setAlert("error", "File size too large"));
      return;
    }
    const res = await axios.post("/api/products", product, config);
    const id = res.data.product._id;
    if (product.avatar) {
      const formdata = new FormData();
      formdata.append("avatar", product.avatar);
      const res2 = await axios.post(`/api/products/${id}/avatar`, formdata);
      dispatch({ type: "PRODUCT_ADDED" });
    }
    dispatch(setAlert("success", "Product Added"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert("error", error.msg));
      });
    }
  }
};

export const addToCart = () => async (dispatch) => {};
