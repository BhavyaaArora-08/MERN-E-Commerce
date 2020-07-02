import React, { useEffect, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Navbar from "./Layout/Navbar";
import Men from "./Shop/Men";
import Women from "./Shop/Women";
import Sports from "./Shop/Sports";
import Kids from "./Shop/Kids";
import Landing from "./Landing";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Alert from "./Layout/Alert";
import AdminDB from "./Admin/AdminDB";
import Cart from "./Profile/Cart";
import "mdbreact/dist/css/mdb.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import store from "../redux/store/configureStore";
import setAuthToken from "../utils/setAuthToken.js";
import { loadUP } from "../redux/actions/common";
import src from "./img/loading.svg";

// import axios from "axios";

/**
 * TODO : Loading of users and products should run in parallel
 */

function App() {
  useEffect(() => {
    setAuthToken(localStorage.getItem("token"));
    store.dispatch(loadUP());
  });
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          {store.getState("auth").loading ? (
            <Fragment>
              <Navbar />
              <Alert />
              <img
                style={{ margin: "50px auto", textAlign: "center" }}
                src={src}
              ></img>
            </Fragment>
          ) : (
            <Fragment>
              <Navbar />
              <Alert />
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/women" component={Women} />
                <Route path="/men" component={Men} />
                <Route path="/sports" component={Sports} />
                <Route path="/kids" component={Kids} />
                <Route path="/admin" component={AdminDB} />
                <Route path="/cart" component={Cart} />
                <Route path="/" component={Landing} />
              </Switch>
            </Fragment>
          )}
        </Router>
      </div>
    </Provider>
  );
}

export default App;

// const isValid = async () => {
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         "x-auth-token": localStorage.token,
//       },
//     };
//     // for instance a token was saved but the user no more exists (acc got deleted)
//     const res = await axios.post("/api/users/isValid", null, config);
//     return res;
//   } catch (err) {
//     store.dispatch({ type: "RESET" });
//     return <Redirect to="/" />;
//   }
// };
// useEffect(async () => {
//   if (localStorage.token) {
//     store.dispatch({ type: "LOADING" });
//     const res = await isValid();
//     if (res.data && res.data.msg) {
//       setAuthToken(localStorage.token);
//       store.dispatch(loadProducts());
//       store.dispatch(getUser());
//     } else {
//       store.dispatch({ type: "RESET" });
//       store.dispatch(loadProducts());
//       return <Redirect to="/" />;
//     }
//   } else {
//     store.dispatch({ type: "RESET" });
//     store.dispatch(loadProducts());
//     return <Redirect to="/" />;
//   }
// }, []);
