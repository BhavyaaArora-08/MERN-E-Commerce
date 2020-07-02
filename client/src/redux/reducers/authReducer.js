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
      console.log(action.payload);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        cart: action.payload.user.cart,
        wishlist: action.payload.user.wishlist,
        orders: action.payload.user.orders,
        isAuthenticated: true,
        loading: false,
      };
    }
    case "NOT_LOADING": {
      return { ...state, loading: false };
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
      return {
        ...state,
        user: action.payload,
        cart: action.payload.cart,
        wishlist: action.payload.wishlist,
        orders: action.payload.orders,
        loading: false,
      };
    }
    case "REGISTER_FAIL":
    case "LOGOUT":
    case "AUTH_ERROR":
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
    default:
      return state;
  }
};
