import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../redux/actions/auth";
import src from "./img/loading.svg";

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (props.isAuthorized) {
    return <Redirect to="/" />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    props.login({ email, password });
  };
  return (
    <div>
      {props.loading ? (
        <img
          style={{ margin: "50px auto", textAlign: "center" }}
          src={src}
        ></img>
      ) : (
        <div className="containere">
          <form onSubmit={onSubmit} className="form login">
            <h1>Log In</h1>
            <label for="email">Email Address</label>
            <input
              onChange={onChange}
              value={email}
              placeholder="your@email.com"
              name="email"
            />
            <label for="password">Password</label>
            <input
              onChange={onChange}
              value={password}
              placeholder="************* "
              name="password"
              type="password"
            />
            <button className="btn btn-danger" type="submit">
              LOG IN
            </button>
            <hr></hr>
            <p id="or">OR</p>
            <div className="extra">
              <span>
                <span className="text">Don't have an account?</span>
                <NavLink to="/signup">Sign Up</NavLink>
              </span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    isAuthorized: state.auth.isAuthenticated,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps, { login })(Login);
