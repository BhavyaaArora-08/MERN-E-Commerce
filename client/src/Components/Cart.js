import React from "react";
import { connect } from "react-redux";
import ImageCard2 from "./ImageCard1";
import getImageSrc from "../utils/getImageSrc";

const Cart = (props) => {
  return (
    <div>
      <h1>Your Cart</h1>
      {props.products &&
        props.products.map((p) => (
          <ImageCard2
            product={p}
            text={p.name}
            price={p.price}
            img={getImageSrc(p.avatar)}
          />
        ))}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    products: state.auth.cart,
  };
};

export default connect(mapStateToProps)(Cart);
