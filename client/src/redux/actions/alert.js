import { v4 as uuidv4 } from "uuid";

// it will be used to dispatch actions to set and remove alerts
export const setAlert = (alertType, msg) => (dispatch) => {
  const id = uuidv4();
  const obj = {
    type: "SET_ALERT",
    payload: { alertType, msg, id },
  };
  dispatch(obj);

  setTimeout(() => {
    dispatch({
      type: "REMOVE_ALERT",
      id,
    });
  }, 5000);
};
