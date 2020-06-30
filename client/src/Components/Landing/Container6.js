import React from "react";
import { GoPackage } from "react-icons/go";
import { AiOutlineUnlock } from "react-icons/ai";
import { FaHandshake } from "react-icons/fa";

const Container6 = () => {
  return (
    <div className="container6">
      <h2>Why Us?</h2>
      <div className="row">
        <div className="col-lg-4 content ">
          <p>Free Shipping</p>
          <GoPackage className="icon" />
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          lacus mauris, semper in suscipit nec, malesuada a risus. Suspendisse
          potenti.
        </div>
        <div className="col-lg-4 content ">
          <p>Secure Payment System</p>
          <AiOutlineUnlock className="icon" />
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          lacus mauris, semper in suscipit nec, malesuada a risus. Suspendisse
          potenti.
        </div>
        <div className="col-lg-4 content ">
          <p>Everything is Sanitized</p>
          <FaHandshake className="icon" />
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          lacus mauris, semper in suscipit nec, malesuada a risus. Suspendisse
          potenti.
        </div>
      </div>
    </div>
  );
};

export default Container6;
