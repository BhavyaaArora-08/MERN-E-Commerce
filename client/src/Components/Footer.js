import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="row">
        <div className="content col-lg-3 col-md-4 col-sm-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          lacus mauris, semper in suscipit nec, malesuada a risus. Suspendisse
          potenti.
        </div>
        <div className="content col-lg-3 col-md-4 col-sm-6">
          <h1>Quick Links</h1>
          <a href="#">About</a>
          <a href="#">Offers and Discounts</a>
          <a href="#">Get Coupon</a>
          <a href="#">Contact Us</a>
        </div>
        <div className="content col-lg-3 col-md-4 col-sm-6">
          <h1>New Products</h1>
          <a href="#">Women's Clothing</a>
          <a href="#">Men's Clothing</a>
          <a href="#">Kid's Clothing</a>
        </div>
        <div className="content col-lg-3 col-md-4 col-sm-6">
          <h1>Support</h1>
          <a href="#">Terms and Conditions</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Report an issue</a>
        </div>
      </div>

      <p>Copyright @copy 2020 All rights reserved Bonjour</p>
    </div>
  );
};

export default Footer;
