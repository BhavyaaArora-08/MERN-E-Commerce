import React, { useEffect, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Men from "./Components/Men";
import Women from "./Components/Women";
import Sports from "./Components/Sports";
import Kids from "./Components/Kids";
import Landing from "./Components/Landing";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Alert from "./Components/Alert";
import AdminDB from "./Components/AdminDB";
import Cart from "./Components/Cart";
import "mdbreact/dist/css/mdb.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import store from "./redux/store/configureStore";
import setAuthToken from "./utils/setAuthToken.js";
import { loadProducts } from "./redux/actions/product";
import { getUser } from "./redux/actions/auth";
import src from "./Components/img/loading.svg";

import axios from "axios";

const isValid = async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.token,
      },
    };
    // for instance a token was saved but the user no more exists (acc got deleted)
    const res = await axios.post("/api/users/isValid", null, config);
    return res;
  } catch (err) {
    console.log(err, "hey");
    store.dispatch({ type: "RESET" });
    return <Redirect to="/" />;
  }
};

function App() {
  useEffect(async () => {
    if (localStorage.token) {
      store.dispatch({ type: "LOADING" });
      const res = await isValid();
      if (res.data && res.data.msg) {
        setAuthToken(localStorage.token);
        store.dispatch(loadProducts());
        store.dispatch(getUser());
      } else {
        store.dispatch({ type: "RESET" });
        store.dispatch(loadProducts());
        return <Redirect to="/" />;
      }
    }
  }, []);

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
