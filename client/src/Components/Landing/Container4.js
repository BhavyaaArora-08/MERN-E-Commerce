import React from "react";
import src1 from "../../assets/img/boy.png";

const Container4 = () => {
  return (
    <div className="big">
      <div className="row container4">
        <div className="col-lg-6 col-md-6 col-sm-6 col-0">
          <img src={src1} />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 content">
          <h3>Find the best products here</h3>
          <button className="btn btn-dark">Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default Container4;
