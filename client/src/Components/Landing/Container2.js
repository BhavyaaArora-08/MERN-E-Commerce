import React from "react";
import { MDBAnimation } from "mdbreact";
import src1 from "../img/cover.jpg";
import src3 from "../img/13060.jpg";
import src2 from "../img/15s.jpg";
import src4 from "../img/4.jpg";
import { NavLink } from "react-router-dom";

const Container2 = () => {
  return (
    <div style={{ backgroundColor: "white" }} id="shop" className="container2">
      <h2>Shop by Category</h2>
      <div className="row container2">
        <div className="main col-lg-6 col-md-6 col-sm-6 col-6">
          <img src={src1}></img>
          <NavLink to="/women">
            <button className="btn btn-dark">Women</button>
          </NavLink>
        </div>
        <div className="main col-lg-6 col-md-6 col-sm-6 col-6 ">
          <img src={src3}></img>
          <NavLink to="/men">
            <button className="btn btn-dark">Men</button>
          </NavLink>
        </div>
        <div className="main col-lg-6 col-md-6 col-sm-6 col-6 ">
          <img src={src2}></img>
          <NavLink to="/kids">
            <button className="btn btn-dark">Kids</button>
          </NavLink>
        </div>
        <div className="main col-lg-6 col-md-6 col-sm-6 col-6 ">
          <img src={src4}></img>
          <NavLink to="/sports">
            <button className="btn btn-dark">Sports</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Container2;
