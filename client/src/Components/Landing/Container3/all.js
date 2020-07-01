import React from "react";
// images
import src1 from "../../img/yellow1.jpeg";
import src2 from "../../img/winwomen.jpeg";
import src3 from "../../img/partywom.jpeg";
import src4 from "../../img/glam.jpeg";
import src5 from "../../img/sumwom.jpeg";
import src6 from "../../img/6s.jpg";

// icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const all = () => {
  return (
    <div className="row">
      <div className="main col-lg-4 col-md-4 col-sm-6">
        <div className="product-img">
          <img src={src1} alt="" />
        </div>
        <div className="product-caption">
          <div className="product-ratting">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </div>
          <h4>
            <a href="#">Green Dress with details</a>
          </h4>
          <div className="price">
            <ul>
              <li>$40.00</li>
              <li className="discount">$60.00</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="main col-lg-4 col-md-4 col-sm-6">
        <div className="product-img">
          <img src={src2} alt="" />
        </div>
        <div className="product-caption">
          <div className="product-ratting">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </div>
          <h4>
            <a href="#">Green Dress with details</a>
          </h4>
          <div className="price">
            <ul>
              <li>$40.00</li>
              <li className="discount">$60.00</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="main col-lg-4 col-md-4 col-sm-6">
        <div className="product-img">
          <img src={src3} alt="" />
        </div>
        <div className="product-caption">
          <div className="product-ratting">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </div>
          <h4>
            <a href="#">Green Dress with details</a>
          </h4>
          <div className="price">
            <ul>
              <li>$40.00</li>
              <li className="discount">$60.00</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="main col-lg-4 col-md-4 col-sm-6">
        <div className="product-img">
          <img src={src4} alt="" />
        </div>
        <div className="product-caption">
          <div className="product-ratting">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </div>
          <h4>
            <a href="#">Green Dress with details</a>
          </h4>
          <div className="price">
            <ul>
              <li>$40.00</li>
              <li className="discount">$60.00</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="main col-lg-4 col-md-4 col-sm-6">
        <div className="product-img">
          <img src={src5} alt="" />
        </div>
        <div className="product-caption">
          <div className="product-ratting">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </div>
          <h4>
            <a href="#">Green Dress with details</a>
          </h4>
          <div className="price">
            <ul>
              <li>$40.00</li>
              <li className="discount">$60.00</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="main col-lg-4 col-md-4 col-sm-6">
        <div className="product-img">
          <img src={src6} alt="" />
        </div>
        <div className="product-caption">
          <div className="product-ratting">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </div>
          <h4>
            <a href="#">Green Dress with details</a>
          </h4>
          <div className="price">
            <ul>
              <li>$40.00</li>
              <li className="discount">$60.00</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default all;