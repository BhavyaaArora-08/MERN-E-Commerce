import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const style = {
    margin: "0px 5px",
    color: "black",
  };

  return (
    <div>
      <NavLink style={{ ...style, fontWeight: "600" }} to="/">
        All
      </NavLink>
      <NavLink activeClassName="active-class-2" style={style} to="/offer">
        Offer
      </NavLink>
      <NavLink activeClassName="active-class-2" style={style} to="/Featured">
        Featured
      </NavLink>
      <NavLink activeClassName="active-class-2" style={style} to="/New">
        New
      </NavLink>
    </div>
  );
};

export default Navbar;
