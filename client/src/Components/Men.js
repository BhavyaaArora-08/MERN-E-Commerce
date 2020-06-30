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
      (p) => p.category === "Men" || p.category === "men"
    ),
  };
};

export default connect(mapStateToProps)(Men);
{
  // import img11 from "./img/men.jpeg";
  // import img12 from "./img/menp.jpeg";
  // import img13 from "./img/yellowm.jpeg";
  // import img4 from "./img/9906.jpg";
  // import img5 from "./img/denim.jpeg";
  // import img6 from "./img/4914.jpg";
  // import img1 from "./img/533.jpg";
  // import img2 from "./img/628.jpg";
  // import img3 from "./img/11222.jpg";
  // import img10 from "./img/13060.jpg";
  // import img7 from "./img/18994.jpg";
  // import img8 from "./img/18648.jpg";
  // import img9 from "./img/7787.jpg";
  /* <div className="col-lg-4 col-md-4 col-sm-6">
        <ImageCard1 text="denim jacket" price="2000" img={img2}></ImageCard1>
      </div>
      <div className="col-lg-4 col-md-4 ">
        <ImageCard1 text="black coat" price="4000" img={img1}></ImageCard1>
      </div>
      <div className="col-lg-4 col-md-6 ">
        <ImageCard1
          text="red-blue striped shirt"
          price="1000"
          img={img6}
        ></ImageCard1>
      </div>
      <div className="col-lg-8 col-md-6 ">
        <ImageCard1 text="denim shirt" price="1200" img={img5}></ImageCard1>
      </div>
      <div className="col-lg-12 col-md-12 ">
        <ImageCard1
          text="black dotted shirt"
          price="1500"
          img={img4}
        ></ImageCard1>
      </div>
      <div className="col-lg-4 col-md-6 ">
        <ImageCard1
          text="plain purple shirt"
          price="2000"
          img={img7}
        ></ImageCard1>
      </div>
      <div className="col-lg-4 col-md-6 ">
        <ImageCard1
          text="Blue-white striped Tshirt"
          price="700"
          img={img8}
        ></ImageCard1>
      </div>
      <div className="col-lg-4 col-md-6 ">
        <ImageCard1
          text="black-white shirt"
          price="1000"
          img={img9}
        ></ImageCard1>
      </div>
      <div className="col-lg-8 col-md-6 ">
        <ImageCard1 text="sky-blue shirt" price="1800" img={img10}></ImageCard1>
      </div>
      <div className="col-lg-4 col-md-6 ">
        <ImageCard1 text="denim jacket" price="1500" img={img11}></ImageCard1>
      </div>
      <div className="col-lg-4 col-md-6 ">
        <ImageCard1 text="brown coat" price="3000" img={img12}></ImageCard1>
      </div>
      <div className="col-lg-8 col-md-12 ">
        <ImageCard1 text="red sweater" price="1000" img={img13}></ImageCard1>
      </div> */
}
