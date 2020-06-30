import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import all from "./Container3/all";
import New from "./Container3/New";
import Featured from "./Container3/featured";
import offer from "./Container3/offer";
import Navbar from "./Container3/Navbar";

const Container3 = () => {
  return (
    <Router>
      <div className="container3">
        <h2>Latest Products</h2>
        <Navbar />
        <Switch>
          <Route path="/offer" component={offer} />
          <Route path="/New" component={New} />
          <Route path="/Featured" component={Featured} />
          <Route path="/" component={all} />
        </Switch>
      </div>
    </Router>
  );
};

export default Container3;
