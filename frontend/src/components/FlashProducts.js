import React from "react";
import Rating from "./Rating";
import "../styles/FlashProducts.css";
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
const FlashProducts = ({ product }) => {
  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/products/product/ID=?${product.id}`}
    >
      <div className="link_products">
        <div className="product">
          {/* <span class="badge-custom">
            OFF<span class="box ml-1 mr-0">&nbsp;{product.discount}</span>
          </span> */}
          {/* <span
            style={{
              fontSize: "11px",
              backgroundColor: "grey",
              color: "white",
            }}
            className="badge-custom"
          >
            Best Seller
          </span> */}
          <img
            style={{ width: "100%", borderRadius: "5px 5px 0px 0px" }}
            src={product.image}
            alt=""
          />

          <div className="discription">
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
                  textAlign: "center",
                  color: "#404553",
                  fontWeight: "bold",
                  marginBottom: "0px",
                }}
                className="title"
              >
                {product.price}
              </p>
            </div>
            <div
              className="details"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  width: "100%",
                }}
              >
                <MDBProgress
                  style={{
                    width: "100%",
                    margin: "0px 5px",
                    backgroundColor: "#008c9c59",
                    borderRadius: "15px",
                  }}
                  height="15"
                >
                  <MDBProgressBar
                    style={{ backgroundColor: "#008c9c" }}
                    width="70"
                    valuemin={0}
                    valuemax={100}
                  >
                    <span
                      style={{
                        textAlign: "center",
                        margin: "0px 30%",
                      }}
                    >
                      {" "}
                      SELLING FAST
                    </span>
                  </MDBProgressBar>
                </MDBProgress>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FlashProducts;
{
  /* <div className="link_products">
<div className="product">
  <span className="badge-custom">
    OFF
    <span class="box ml-1 mr-0">&nbsp;17%</span>
  </span>
  <img
    style={{ width: "100%", borderRadius: "5px 5px 0px 0px" }}
    src={product.image}
    alt=""
  />
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
  <p style={{ color: "#008c9c" }} className="title">
    Rs {product.price}
  </p>
 
</div>
</div> */
}
