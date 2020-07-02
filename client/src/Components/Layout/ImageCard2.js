import React from "react";
import { addTo } from "../../redux/actions/cart";
import { setAlert } from "../../redux/actions/alert";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

const ImageCard2 = (props) => {
  const onClick1 = (e) => {
    e.preventDefault();
    if (!props.isAuth) {
      props.setAlert("error", "Please Login/ Register First", uuidv4());
      return false;
    }
    props.addTo({ where: "cart", product: props.product });
  };
  return (
    <div className="cart-item row">
      <hr></hr>
      <div className="col-lg-3 col-md-3 col-sm-6 col-6">
        <img src={props.img} />
      </div>
      <div className="col-lg-9 col-md-9 col-sm-6 col-6">
        <span>
          <label>Price</label> : {props.price}
        </span>
        <br></br>
        <span>{props.text}</span>
        <br></br>
        <span>
          <label>Qty</label> : {props.count}
          <button onClick={onClick1} className="btn">
            +
          </button>
        </span>
      </div>
      <hr></hr>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    isAuth: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { addTo, setAlert })(ImageCard2);
