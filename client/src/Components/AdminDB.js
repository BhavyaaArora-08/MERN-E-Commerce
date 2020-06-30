import React, { useState, useEffect } from "react";
import Navbar2 from "./Navbar2";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import { AllProducts, AllUsers, PostProduct, MakeAdmin, Main } from "./AdminKe";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDB = (props) => {
  const [state, setState] = useState({});

  useEffect(() => {
    setState({
      allPs: props.products,
    });
  }, []);

  if (!props.isAdmin) {
    return <Redirect to="/" />;
  }

  return (
    <div id="c">
      <Router>
        <Sidebar pageWrapId={"page-wrap"} outerContainerId={"c"} />
        <Switch id="page-wrap">
          <Route
            path="/postProduct"
            render={() => (
              <PostProduct loading={props.loading} dispatch={props.dispatch} />
            )}
          />
          <Route
            path="/allProducts"
            render={() => <AllProducts products={state.allPs} />}
          />
          <Route path="/" render={() => <Main user={props.user} />}></Route>
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    products: state.product.allProducts,
    isAdmin: state.auth.user ? state.auth.user.isAdmin : false,
    user: state.auth.user,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps)(AdminDB);
