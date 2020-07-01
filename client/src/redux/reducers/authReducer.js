const initialState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: localStorage.getItem("token") ? true : false,
  user: null,
  loading: false,
  cart: [],
  wishlist: [],
  orders: [],
};

//
//

export default (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS": {
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    }
    case "LOADING": {
      return { ...state, loading: true };
    }
    case "ADD_TO": {
      const where = action.payload.to;
      return {
        ...state,
        [where]: action.payload.products,
        loading: false,
      };
    }

    case "LOAD_USER": {
      console.log(action.payload, "here");
      return {
        ...state,
        ...action.payload,
        cart: action.payload.cart,
        wishlist: action.payload.wishlist,
        orders: action.payload.orders,
        loading: false,
      };
    }
    case "PRODUCT_ADDED": {
      return { ...state, loading: false };
    }
    case "REGISTER_FAIL":
    case "LOGOUT":
    case "LOGIN_FAIL": {
      localStorage.removeItem("token");

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    }
    case "RESET": {
      return {
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    }

    default:
      return state;
  }
};
