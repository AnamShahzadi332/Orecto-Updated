import React, { useState, useEffect } from "react";
// import Rating from "./Rating";
import "../styles/Wishlist.css";
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
import { Rating } from "@mui/material";
import WishlistOne from "../assets/userdashboard/WishlistProductone.png";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { notification, Space } from "antd";
const WishlistOrders = (props) => {
  const [tabid, settabid] = useState("sub1");
  const [authtoken, setauthtoken] = useState("");
  const [email, setemail] = useState("");
  const [loggedin, setloggedin] = useState("");
  const [phone, setphone] = useState("");
  const [name, setname] = useState("");
  const [avatar, setavatar] = useState("");
  const [user_id, setuser_id] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Cart Updated",
      description: "Product added in cart",
    });
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    let name = localStorage.getItem("name");
    let avatar = localStorage.getItem("image");
    let user_email = localStorage.getItem("email");
    let phone_no = localStorage.getItem("phone");
    let userid = localStorage.getItem("id");
    console.log(token);
    if (authtoken === null || authtoken === "" || authtoken === "undefined") {
      setloggedin(false);
    } else {
      setloggedin(true);
    }
    setuser_id(userid);
    setname(name);
    setavatar(avatar);
    setauthtoken(token);
    setemail(user_email);
    setphone(phone_no);
    console.log(token);
  }, [null]);
  useEffect(() => {
    console.log(props);
  }, [null]);

  async function DeleteOrder(ID) {
    if (authtoken === "" || authtoken === null) {
    } else {
      let data = { token: authtoken, id: ID };
      const response = await fetch("http://127.0.0.1:3001/wishlist-delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      console.log("Wishlist is", result);
      props.refresh(ID);
    }
  }

  async function AddtoCart(ID) {
    if (authtoken === "" || authtoken === null) {
    } else {
      let data = {
        token: authtoken,
        productid: ID,
        variantid: "",
        userid: user_id,
        quantity: 1,
      };
      const response = await fetch("http://127.0.0.1:3001/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let cartdetails = await response.json();
      console.log(cartdetails);
    }
  }
  return (
    // <Link to={`/products/product/ID=?${"product.id"}`}>

    <div className="link_products">
      {contextHolder}
      <div className="product">
        <img
          style={{ width: "100%", borderRadius: "5px 5px 0px 0px" }}
          src={props.product.thumbnail_image}
          alt=""
        />

        <div className="discription">
          <div>
            <Link
              style={{ textDecoration: "none", padding: "0px", margin: "0px" }}
              to={`/products/product/ID=?${props.product.id}`}
            >
              <p
                style={{
                  fontSize: "15px",
                  marginBottom: "0px",
                  textAlign: "left",
                  color: "black",
                }}
                className="title_name"
              >
                {props.product.name}
              </p>
            </Link>
            <div>
              <Rating disabled defaultValue={props.product.rating} />
            </div>
            <div className="d-flex mb-2">
              <p
                className="title"
                style={{
                  textDecoration: "line-through",

                  textAlign: "left",
                  color: "grey",
                  marginBottom: "0px",
                }}
              >
                Rs 0.00
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
                {props.product.base_price}
              </p>
            </div>
            <div className="wishlist-actions">
              <DeleteOutlined
                onClick={() => DeleteOrder(props.id)}
                style={{ fontSize: "18px", color: "#008c9c" }}
              />
              <MDBBtn
                className="wishlist-cart-button"
                onClick={() => {
                  AddtoCart(props.product.id);
                  DeleteOrder(props.id);
                  openNotificationWithIcon("success");
                }}
              >
                <span>
                  <ShoppingCartOutlined
                    style={{
                      fontSize: "15px",
                      color: "white",
                      marginRight: "5px",
                    }}
                  />
                  Add to Cart
                </span>
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>
    </div>

    // </Link>
  );
};

export default WishlistOrders;
