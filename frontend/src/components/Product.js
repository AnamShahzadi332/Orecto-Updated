import React, { useEffect, useState } from "react";
import Rating from "./Rating";
import "../styles/Product.css";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import {
  MDBProgress,
  MDBProgressBar,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import mall from "../assets/mall.png";
import star from "../assets/star.svg";
const Product = ({ product }) => {
  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/products/product/ID=?${product.id}`}
    >
      <div className="link_products">
        <div className="product">
          <span
            style={{
              fontSize: "11px",
              backgroundColor: "grey",
              color: "white",
            }}
            className="badge-custom"
          >
            Best Seller
          </span>
          <img
            style={{ width: "100%", borderRadius: "5px 5px 0px 0px" }}
            src={product.thumbnail_image}
            alt=""
          />
          <div className="discription-mobile">
            <img
              style={{
                margin: "5px 10px",
                height: "16px",
                width: "30px",
              }}
              src={mall}
            />
            <div>
              <p
                style={{
                  fontSize: "14px",
                  marginBottom: "0px",
                  textAlign: "left",
                  color: "#1b1d22",
                }}
                className="title_name"
              >
                {product.name}
              </p>
              <p
                style={{
                  marginTop: "0px",
                  textAlign: "left",
                  color: "#008c9c",
                  marginBottom: "0px",
                }}
                className="title"
              >
                {product.main_price}
              </p>
              <p className="title-stroked">{product.stroked_price}</p>
            </div>

            {product.has_discount === true ? (
              <div
                className="details"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div className="mobile-discription">
                  <div className="mobile-ratings">
                    <p
                      className="title discountrate"
                      style={{
                        marginBottom: "0px",
                        marginTop: "0px",
                        fontSize: "12px",
                        textAlign: "left",
                        color: "#008c9c",
                      }}
                    >
                      {product.discount} OFF
                    </p>
                    <div className="rating">
                      <span
                        style={{
                          fontSize: "10px",
                          marginLeft: "5px",
                          marginTop: "2px",
                        }}
                      >
                        {product.rating} *
                      </span>
                    </div>
                    <span
                      style={{
                        color: "black",
                        fontSize: "10px",
                        margin: "0px  4px",
                      }}
                    >
                      (0)
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="details"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div className="mobile-discription">
                  <div className="mobile-ratings">
                    <p
                      className="title"
                      style={{
                        marginBottom: "0px",
                        marginTop: "0px",
                        fontSize: "12px",
                        textAlign: "left",
                        color: "#008c9c",
                      }}
                    >
                      {"0.00"} OFF
                    </p>
                    <div className="rating">
                      <span
                        style={{
                          fontSize: "10px",
                          marginLeft: "5px",
                          marginTop: "2px",
                        }}
                      >
                        {product.rating} *
                      </span>
                    </div>
                    <span
                      style={{
                        color: "black",
                        fontSize: "10px",
                        margin: "0px  4px",
                      }}
                    >
                      (0)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* <div className="product-desktop">
            <div>
              <p
                style={{
                  fontSize: "14px",
                  marginBottom: "0px",
                  textAlign: "left",
                  color: "black",
                }}
                className="title_name"
              >
                {product.name}
              </p>
              <p
                style={{
                  marginTop: "0px",
                  textAlign: "left",
                  color: "#008c9c",
                  marginBottom: "0px",
                }}
                className="title"
              >
                {product.main_price}
              </p>
            </div>
            {product.has_discount === true ? (
              <div
                className="details"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex" }}>
                  <p
                    className="title"
                    style={{
                      textDecoration: "line-through",
                      fontSize: "12px",
                      textAlign: "left",
                      color: "grey",
                      marginBottom: "0px",
                    }}
                  >
                    {product.stroked_price}
                  </p>
                  <p
                    className="title"
                    style={{
                      marginBottom: "0px",
                      marginTop: "0px",
                      fontSize: "12px",
                      textAlign: "left",
                      color: "#008c9c",
                    }}
                  >
                    {product.discount} OFF
                  </p>
                </div>
                <div className="d-flex">
                  <div className="rating">
                    <span
                      style={{
                        fontSize: "10px",
                        marginLeft: "5px",
                        marginTop: "2px",
                      }}
                    >
                      {product.rating} *
                    </span>
                  </div>
                  <span
                    style={{
                      color: "black",
                      fontSize: "10px",
                      margin: "0px  4px",
                    }}
                  >
                    (0)
                  </span>
                </div>
              </div>
            ) : (
              <div
                className="details"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex" }}>
                  <p
                    className="title"
                    style={{
                      textDecoration: "line-through",
                      fontSize: "12px",
                      textAlign: "left",
                      color: "grey",
                      marginBottom: "0px",
                    }}
                  >
                    Rs 0.00
                  </p>
                  <p
                    className="title"
                    style={{
                      marginBottom: "0px",
                      marginTop: "0px",
                      fontSize: "12px",
                      textAlign: "left",
                      color: "#008c9c",
                    }}
                  >
                    {product.discount} OFF
                  </p>
                </div>
                <div className="d-flex">
                  <div className="rating">
                    <span
                      style={{
                        fontSize: "10px",
                        marginLeft: "5px",
                        marginTop: "2px",
                      }}
                    >
                      {product.rating} *
                    </span>
                  </div>
                  <span
                    style={{
                      color: "black",
                      fontSize: "10px",
                      margin: "0px  4px",
                    }}
                  >
                    (0)
                  </span>
                </div>
              </div>
            )}
            </div> */}
          </div>
          <div className="discription-desktop">
            <img
              style={{
                margin: "5px 10px",
                height: "16px",
                width: "30px",
              }}
              src={mall}
            />
            <div>
              <p
                style={{
                  fontSize: "14px",
                  marginBottom: "0px",
                  textAlign: "left",
                  color: "black",
                }}
                className="title_name"
              >
                {product.name}
              </p>
              <p
                style={{
                  marginTop: "0px",
                  textAlign: "left",
                  color: "#008c9c",
                  marginBottom: "0px",
                }}
                className="title"
              >
                {product.main_price}
              </p>
            </div>
            {product.has_discount === true ? (
              <div
                className="details"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex" }}>
                  <p
                    className="title"
                    style={{
                      textDecoration: "line-through",
                      fontSize: "12px",
                      textAlign: "left",
                      color: "grey",
                      marginBottom: "0px",
                    }}
                  >
                    {product.stroked_price}
                  </p>
                  <p
                    className="title"
                    style={{
                      marginBottom: "0px",
                      marginTop: "0px",
                      fontSize: "12px",
                      textAlign: "left",
                      color: "#008c9c",
                    }}
                  >
                    {product.discount} OFF
                  </p>
                </div>
                <div className="d-flex">
                  <div className="rating">
                    <span
                      style={{
                        fontSize: "10px",
                        marginLeft: "5px",
                        marginTop: "2px",
                      }}
                    >
                      {product.rating} *
                    </span>
                  </div>
                  <span
                    style={{
                      color: "black",
                      fontSize: "10px",
                      margin: "0px  4px",
                    }}
                  >
                    (0)
                  </span>
                </div>
              </div>
            ) : (
              <div
                className="details"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex" }}>
                  <p
                    className="title"
                    style={{
                      textDecoration: "line-through",
                      fontSize: "12px",
                      textAlign: "left",
                      color: "grey",
                      marginBottom: "0px",
                    }}
                  >
                    Rs 0.00
                  </p>
                  <p
                    className="title"
                    style={{
                      marginBottom: "0px",
                      marginTop: "0px",
                      fontSize: "12px",
                      textAlign: "left",
                      color: "#008c9c",
                    }}
                  >
                    {product.discount} OFF
                  </p>
                </div>
                <div className="d-flex">
                  <div className="rating">
                    <span
                      style={{
                        fontSize: "10px",
                        marginLeft: "5px",
                        marginTop: "2px",
                      }}
                    >
                      {product.rating} *
                    </span>
                  </div>
                  <span
                    style={{
                      color: "black",
                      fontSize: "10px",
                      margin: "0px  4px",
                    }}
                  >
                    (0)
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
