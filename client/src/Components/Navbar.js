import React, { useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
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

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  let enterClass = {};
  let icons = {};

  // if (isOpen) {
  //   icons = { display: "none" };
  // } else {
  //   icons = {};
  // }

  const onClick = (e) => {
    e.preventDefault();
    props.logoutUser(props.token);
    console.log("hey", "logout");
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
    <Navbar sticky="top" id="navbar" expand="md">
      <NavbarBrand
        style={{
          color: "white",
          fontFamily: '"Patrick Hand", cursive',
          fontSize: "3rem",
        }}
        href="/"
      >
        Bonjour
        <FcDebian style={{ color: "white" }} />
      </NavbarBrand>
      <NavbarToggler style={{ backgroundColor: "white" }} onClick={toggle}>
        <GrCar />{" "}
      </NavbarToggler>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink
              style={{ color: "white" }}
              exact
              to="/"
              className="nav-link"
            >
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ color: "white" }}
              exact
              to="/women"
              className="nav-link"
            >
              Women
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ color: "white" }}
              exact
              to="/men"
              className="nav-link"
            >
              Men
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ color: "white" }}
              exact
              to="/sports"
              className="nav-link"
            >
              Sports
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ color: "white" }}
              exact
              to="/kids"
              className="nav-link"
            >
              Kids
            </NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" style={icons} navbar>
          {!props.isAuth && (
            <Dropdown
              direction="left"
              isOpen={dropdownOpen}
              toggle={() => {
                toggle2();
              }}
            >
              <DropdownToggle id="profile">
                <BsPerson
                  style={{
                    fontSize: "2.4rem",
                    color: "white",
                  }}
                />

                <br></br>
                <span style={{ color: "white", fontSize: "1.2rem" }}>
                  Profile
                </span>
              </DropdownToggle>
              <DropdownMenu id="menu">
                <DropdownItem style={{ color: "white", fontSize: "1.5rem" }}>
                  First, you will have to login or signup
                </DropdownItem>
                <DropdownItem>
                  <NavLink to="/login">
                    <h4 id="optio">Login</h4>
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink to="/signup">
                    <h4 id="optio">Signup</h4>
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}

          {props.isAuth && (
            <Fragment style={{ display: "inline" }}>
              <NavItem>
                <NavLink exact to="/wishlist" className="nav-link">
                  <div style={{ textAlign: "center" }}>
                    <BsBookmark
                      style={{ fontSize: "2.4rem", color: "white" }}
                    />
                    <br></br>
                    <p style={{ color: "white", fontSize: "1.2rem" }}>
                      Wishlist
                    </p>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink exact to="/orders" className="nav-link">
                  <div style={{ textAlign: "center" }}>
                    <AiOutlineShoppingCart
                      style={{ fontSize: "2.4rem", color: "white" }}
                    />
                    <br></br>
                    <p style={{ color: "white", fontSize: "1.2rem" }}>Cart</p>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink exact to="/cart" className="nav-link">
                  <div style={{ textAlign: "center" }}>
                    <RiShoppingBagLine
                      style={{ fontSize: "2.4rem", color: "white" }}
                    />
                    <br></br>
                    <p style={{ color: "white", fontSize: "1.2rem" }}>Orders</p>
                  </div>
                </NavLink>
              </NavItem>
              {props.isAdmin && (
                <NavItem>
                  <NavLink exact to="/admin" className="nav-link">
                    <div style={{ textAlign: "center" }}>
                      <BsPersonBoundingBox
                        style={{ fontSize: "2.4rem", color: "white" }}
                      />
                      <br></br>
                      <p style={{ color: "white", fontSize: "1.2rem" }}>
                        Admin
                      </p>
                    </div>
                  </NavLink>
                </NavItem>
              )}
              <NavItem>
                <NavLink exact to="/logout" className="nav-link">
                  <div style={{ textAlign: "center" }}>
                    <BsPerson
                      onClick={onClick}
                      style={{
                        fontSize: "2.4rem",
                        color: "white",
                      }}
                    />
                    <br></br>
                    <p style={{ color: "white", fontSize: "1.2rem" }}>Logout</p>
                  </div>
                </NavLink>
              </NavItem>
            </Fragment>
          )}
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

export default connect(mapStateToProps, { logoutUser })(NavBar);

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
