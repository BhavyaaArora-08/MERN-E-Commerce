import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import "mdbreact/dist/css/mdb.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import store from "./redux/store/configureStore";
import setAuthToken from "./utils/setAuthToken.js";
import { loadProducts } from "./redux/actions/product";
import { getUser } from "./redux/actions/auth";

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(getUser());
    }
    store.dispatch(loadProducts());
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
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
            <Route path="/" component={Landing} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
