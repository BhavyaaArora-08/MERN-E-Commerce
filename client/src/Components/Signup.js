import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../redux/actions/auth";

const Login = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });

  const { name, email, password1, password2 } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    props.register({ email, password1, password2, name });
  };

  // if logged in then redirect to orders/ profile page
  if (props.isAuthorized) {
    return <Redirect to="/" />;
  }

  const onChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  return (
    <div className="containere">
      <form onSubmit={onSubmit} className="form">
        <h1>Sign up</h1>
        <label htmlFor="name">Name</label>
        <input
          onChange={onChange}
          placeholder="Enter your name"
          type="text"
          name="name"
          value={name}
        />
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={onChange}
          placeholder="your@email.com"
          name="email"
        />
        <label htmlFor="password1">Password</label>
        <input
          type="password"
          value={password1}
          onChange={onChange}
          placeholder="*************"
          name="password1"
        />
        <label htmlFor="password2">Confirm Password</label>
        <input
          type="password"
          value={password2}
          onChange={onChange}
          placeholder="*************"
          name="password2"
        />
        <button className="btn btn-danger" type="submit">
          SIGN UP
        </button>
        <hr></hr>
        <p id="or">OR</p>
        <div className="extra">
          <span>
            <span className="text">Already have an account?</span>
            <NavLink to="/login">Log in</NavLink>
          </span>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    isAuthorized: state.auth.isAuhtenticated,
  };
};
export default connect(mapStateToProps, { register })(Login);
