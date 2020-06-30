import React, { useState, Fragment } from "react";
import { NavLink, Redirect } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/auth";

import { BsPerson, BsBookmark, BsPersonBoundingBox } from "react-icons/bs";
import { GrCar } from "react-icons/gr";
import { FcDebian } from "react-icons/fc";
import { RiShoppingBagLine } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";

const NavBar2 = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  let enterClass = {};
  let icons = {};

  if (!props.isAdmin) {
    console.log("Access Denied");
    return <Redirect to="/" />;
  }

  // if (isOpen) {
  //   icons = { display: "none" };
  // } else {
  //   icons = {};
  // }

  const onClick = (e) => {
    e.preventDefault();
    props.logoutUser(props.token);
  };

  if (dropdownOpen) {
    enterClass = { borderBottom: "0.2rem red solid", transition: "ease" };
  } else {
    enterClass = {};
  }

  const toggle2 = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  // color="dark" light
  return (
    <Navbar sticky="top" id="navbar2" expand="md">
      <NavbarBrand
        style={{
          color: "white",
          fontFamily: '"Patrick Hand", cursive',
          fontSize: "3rem",
        }}
        href="/"
      >
        Admin Dashboard
      </NavbarBrand>
      <NavbarToggler style={{ backgroundColor: "white" }} onClick={toggle}>
        <GrCar />{" "}
      </NavbarToggler>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink
              activeClassName={"active-class-2"}
              style={{ color: "white" }}
              exact
              to="/allProducts"
              className="nav-link"
            >
              View All Products /
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              activeClassName={"active-class-2"}
              style={{ color: "white" }}
              exact
              to="/postProduct"
              className="nav-link"
            >
              Add a product /
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              activeClassName={"active-class-2"}
              style={{ color: "white" }}
              exact
              to="/allUsers"
              className="nav-link"
            >
              View all Users /
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              activeClassName={"active-class-2"}
              style={{ color: "white" }}
              exact
              to="/makeAdmin"
              className="nav-link"
            >
              Create an Admin /
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state, props) => {
  return {
    isAuth: state.auth.isAuthenticated,
    token: state.auth.token,
    isAdmin: state.auth.user ? state.auth.user.isAdmin : false,
  };
};

export default connect(mapStateToProps, { logoutUser })(NavBar2);

{
  /* <Dropdown
            isOpen={dropdownOpen}
            toggle={toggle2}
            direction="left"
            onMouseOver={() => {
              setDropdownOpen(true);
            }}
            onMouseLeave={() => {
              setDropdownOpen(false);
            }}
          >
            <DropdownToggle
              tag="span"
              data-toggle="dropdown"
              aria-expanded={dropdownOpen}
              style={{ cursor: "pointer" }}
              className="nav-link"
            >
              <div style={{ ...enterClass, textAlign: "center" }}>
                <BsPerson style={{ fontSize: "2.4rem", color: "white" }} />
                <br></br>
                <p style={{ fontSize: "1.2rem" }}>Profile</p>
              </div>
            </DropdownToggle>
            <DropdownMenu style={{ padding: "1rem" }}>
              <div>
                <h6>Welcome!</h6>
                <hr></hr>
                <p style={{ fontSize: "1.4rem" }}>
                  To access account and manage orders
                </p>
              </div>
              <NavLink exact to="/login" className="nav-link">
                <Button onClick={toggle2} outline color="danger">
                  Login/Signup
                </Button>
              </NavLink>
            </DropdownMenu>
          </Dropdown> */
}
