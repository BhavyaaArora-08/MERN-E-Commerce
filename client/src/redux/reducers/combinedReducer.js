import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import productReducer from "./productsReducer";

export default combineReducers({
  alerts: alertReducer,
  auth: authReducer,
  product: productReducer,
});
