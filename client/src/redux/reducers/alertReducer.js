const initialState = []; //default state
// the closest/immeadiate state or state managed by this reducer is alerts

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ALERT": {
      return [...state, action.payload];
    }
    case "REMOVE_ALERT": {
      return state.filter((alert) => alert.id != action.id);
    }
    default:
      return state;
  }
};

export default alertReducer;
