import React, { Component } from "react";
import ImageCard1 from "./ImageCard1";
import { connect } from "react-redux";
import getImageSrc from "../utils/getImageSrc";

const Men = (props) => {
  return (
    <div className="row" style={{ padding: "20px" }}>
      {props.products &&
        props.products.map((p) => (
          <div className="col-lg-4 col-md-4 col-sm-6">
            <ImageCard1
              text={p.name}
              price={p.price}
              img={getImageSrc(p.avatar)}
            ></ImageCard1>
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    products: state.product.allProducts.filter(
      (p) => p.category === "Sports" || p.category === "sports"
    ),
  };
};

export default connect(mapStateToProps)(Men);
