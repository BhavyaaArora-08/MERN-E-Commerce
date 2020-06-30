import React from "react";
import { slide as Menu } from "react-burger-menu";
import { NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";

const Sidebar = (props) => {
  return (
    <Menu {...props}>
      <h1>Admin Dashboard</h1>

      <NavLink
        activeClassName={"active-class-2"}
        style={{ color: "white" }}
        exact
        to="/postProduct"
        className="nav-link menu-item"
      >
        Add a product
      </NavLink>

      <NavLink
        activeClassName={"active-class-2"}
        style={{ color: "white" }}
        exact
        to="/allProducts"
        className="nav-link menu-item"
      >
        View All Products
      </NavLink>

      {/* <NavLink
        activeClassName={"active-class-2"}
        style={{ color: "white" }}
        exact
        to="/postProduct"
        className="nav-link menu-item"
      >
        Add a product /
      </NavLink>

      <NavLink
        activeClassName={"active-class-2"}
        style={{ color: "white" }}
        exact
        to="/postProduct"
        className="nav-link menu-item"
      >
        Add a product /
      </NavLink> */}
    </Menu>
  );
};

export default Sidebar;
