import React from "react";
import { connect } from "react-redux";
import ImageCard2 from "../Layout/ImageCard2";
import getImageSrc from "../../utils/getImageSrc";
import src from "../img/loading.svg";
import { Redirect } from "react-router";

const Cart = (props) => {
  if (!props.isAuth) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <h1>Your Cart</h1>
      {props.loading ? (
        <img
          style={{ margin: "50px auto", textAlign: "center" }}
          src={src}
        ></img>
      ) : (
        props.products &&
        props.products.map((p) => (
          <ImageCard2
            product={p.product}
            text={p.product.name}
            price={p.product.price}
            img={getImageSrc(p.product.avatar)}
            count={p.count}
          />
        ))
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    isAuth: state.auth.isAuthenticated,
    products: state.auth.cart,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps)(Cart);
