import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
// import { MDBMask, MDBView } from "mdbreact";
import { MdShoppingCart } from "react-icons/md";
import { connect } from "react-redux";
import { addTo } from "../redux/actions/cart";
import { setAlert } from "../redux/actions/alert";
import { v4 as uuidv4 } from "uuid";

function ImageCard1(props) {
  const onClick1 = (e) => {
    e.preventDefault();
    if (!props.isAuth) {
      props.setAlert("error", "Please Login In/ Register First", uuidv4());
      return false;
    }
    props.addTo({ where: "cart", product: props.product });
  };

  return (
    <span style={{ position: "relative", padding: "10px" }}>
      <p style={{ zIndex: "+4", backgroundColor: "white" }} id="text">
        {props.text}
      </p>
      <img
        src={props.img}
        alt="wowo"
        style={{
          boxSizing: "border-box",
          width: "100%",
          height: "400px",
          display: "inline",
          margin: "30px auto",
          marginBottom: "0",
          zIndex: "0",
        }}
      ></img>

      {/* <p className="white-text">Super light overlay</p> */}

      <div
        style={{ position: "relative", backgroundColor: "white" }}
        id="price"
      >
        <span>Price : Rs {props.price}</span>
        <button
          onClick={onClick1}
          style={{
            position: "absolute",
            right: "0",
            padding: "5px",
            margin: "0 5px",
          }}
          className="btn"
        >
          <MdShoppingCart />
        </button>
      </div>
    </span>
  );
}

const mapStateToProps = (state, props) => {
  return {
    isAuth: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { addTo, setAlert })(ImageCard1);

// style={{
//   position: "absolute",
//   transform: "translate(-50%,-50%)",
//   marginRight: "-50%",
//   top: "50%",
//   left: "50%",
// }}
