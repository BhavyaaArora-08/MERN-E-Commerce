import React, { Component } from "react";
import ImageCard1 from "../Layout/ImageCard1";
import { connect } from "react-redux";
import getImageSrc from "../../utils/getImageSrc";
import src from "../img/loading.svg";

const Men = (props) => {
  return (
    <div className="row" style={{ padding: "20px" }}>
      {props.loading ? (
        <img
          style={{ margin: "50px auto", textAlign: "center" }}
          src={src}
        ></img>
      ) : (
        props.products &&
        props.products.map((p) => (
          <div className="col-lg-4 col-md-4 col-sm-6">
            <ImageCard1
              product={p}
              text={p.name}
              price={p.price}
              img={getImageSrc(p.avatar)}
            ></ImageCard1>
          </div>
        ))
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const products = state.product.allProducts.filter(
    (p) => p.category === "Kids" || p.category === "kids"
  );
  return {
    products,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps)(Men);
