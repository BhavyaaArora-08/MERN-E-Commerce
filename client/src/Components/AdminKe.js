import React, { Fragment, useState } from "react";
import Table from "react-bootstrap/Table";
import getImgSrc from "../utils/getImageSrc";
import { createProduct } from "../redux/actions/product";
import src from "./img/loading.svg";

export const Main = (props) => {
  return (
    <div
      style={{
        margin: "20px 0px 0px 80px",
        border: "1px solid black",
        minHeight: "500px",
        width: "90%",
      }}
    >
      {props.user && (
        <div>
          <div>
            <label>Name</label>
            <span style={{ display: "inline-block" }}>{props.user.name}</span>
          </div>
          <div>
            <label>Email</label>
            <span style={{ display: "inline-block" }}>{props.user.email}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export const AllProducts = (props) => {
  return (
    <div
      className="container post-product containere"
      style={{
        border: "1px solid black",
        minHeight: "500px",
        background: "white",
      }}
    >
      <Table striped bordered hover>
        <thead>
          <th>
            <h3>Name of Product</h3>
          </th>
          <th>
            <h3>Price </h3>
          </th>
          <th>
            <h3>Category</h3>
          </th>
          <th>
            <h3>Image</h3>
          </th>
        </thead>
        <tbody>
          {props.products && props.products.map((p) => <ProductItem p={p} />)}
        </tbody>
      </Table>
    </div>
  );
};

export const ProductItem = ({ p }) => {
  const [view, setView] = useState(false);

  const style = view ? { display: "" } : { display: "none" };

  return (
    <tr>
      <td style={{ width: "50px" }}>{p.name}</td>
      <td style={{ width: "50px" }}>{p.price}</td>
      <td style={{ width: "50px" }}>{p.category}</td>
      <td style={{ width: "50px" }}>
        <button
          onClick={() => {
            setView(!view);
          }}
        >
          {view ? "Hide Image" : "View Image"}
        </button>
        <img
          style={{ ...style, width: "100%", height: "100%" }}
          src={getImgSrc(p.avatar)}
        />
      </td>
    </tr>
  );
};

export const MakeAdmin = () => {
  return (
    <div>
      <p>makeAdmin</p>
    </div>
  );
};

export const PostProduct = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    avatar: null,
  });

  const { name, category, price, avatar } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    props.dispatch(createProduct(formData));
    console.log("hyeyeyeyey");
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, avatar: e.target.files[0] });
  };
  return (
    <div
      style={{
        border: "1px solid black",
        minHeight: "500px",
        background: "white",
      }}
      className="container post-product containere"
    >
      {props.loading ? (
        <img
          style={{ margin: "50px auto", textAlign: "center" }}
          src={src}
        ></img>
      ) : (
        <form onSubmit={onSubmit} className="form">
          <h1>NEW PRODUCT</h1>
          <label htmlFor="name">Name</label>
          <input
            onChange={onChange}
            placeholder="Enter product name"
            type="text"
            name="name"
            value={name}
          />
          <hr></hr>
          <label htmlFor="category">Category</label>
          <br />
          <span style={{ display: "inline-block" }}>
            <label>Women</label>
            <input
              type="radio"
              value="Women"
              onChange={onChange}
              name="category"
            />
          </span>
          <span style={{ display: "inline-block" }}>
            <label>Men</label>
            <input
              type="radio"
              value="Men"
              onChange={onChange}
              name="category"
            />
          </span>
          <span style={{ display: "inline-block" }}>
            <label>Kids</label>
            <input
              type="radio"
              value="Kids"
              onChange={onChange}
              name="category"
            />
          </span>
          <span style={{ display: "inline-block" }}>
            <label>Sports</label>
            <input
              type="radio"
              value="Sports"
              onChange={onChange}
              name="category"
            />
          </span>
          <hr></hr>
          <label htmlFor="price">Price</label>
          <input
            onChange={onChange}
            placeholder="Enter price"
            type="number"
            name="price"
            value={price}
          />
          <label htmlFor="avatar">Image</label>
          <input onChange={fileChangeHandler} type="file" />
          <button className="btn btn-danger" type="submit">
            CREATE PRODUCT
          </button>
        </form>
      )}
    </div>
  );
};
