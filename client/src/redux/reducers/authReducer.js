const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: localStorage.getItem("token") ? true : false,
  user: null,
  loading: false,
  user: null,
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

    case "LOAD_USER": {
      console.log(action.payload);
      return {
        ...state,
        ...action.payload,
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

    default:
      return state;
  }
};
