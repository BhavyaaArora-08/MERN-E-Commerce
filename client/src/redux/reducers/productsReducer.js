import { Switch } from "@material-ui/core";

const initialState = {
  allProducts: [],
  inCart: [],
  inWishlist: [],
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_PRODUCTS": {
      return { ...state, allProducts: action.payload };
    }

    default:
      return state;
  }
};
