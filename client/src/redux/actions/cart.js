import axios from "axios";
import { setAlert } from "./alert";
import { v4 as uuidv4 } from "uuid";

export const addTo = ({ product, where }) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING" });
    const body = { product: { id: product._id }, where };
    console.log(body);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // if()
    // THIS AREA CAN BE IMPROVED
    // updating user model
    const res = await axios.patch("/api/users/product", body, config);
    // also getting the populating
    const res2 = await axios.get(`/api/users/product/${where}`);
    dispatch({ type: `ADD_TO`, payload: { ...res2.data, to: where } });

    dispatch(setAlert("success", res.data.msg, uuidv4()));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert("error", error.msg, uuidv4()));
      });
    }
  }
};
