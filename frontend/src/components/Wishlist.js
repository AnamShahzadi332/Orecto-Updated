import React, { useState, useEffect } from "react";
import "../styles/Wishlist.css";
import { Row, Col } from "react-bootstrap";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { Rate } from "antd";
import WishListOne from "../assets/userdashboard/WishlistProductone.png";
import WishListTwo from "../assets/userdashboard/WishlistProducttwo.png";
import WishListThree from "../assets/userdashboard/WishlistProductthree.png";
import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";
import WishlistOrders from "../components/WishlistOrders.js";
export default function Wishlist() {
  const [authtoken, setauthtoken] = useState("");
  const [email, setemail] = useState("");
  const [loggedin, setloggedin] = useState("");
  const [phone, setphone] = useState("");
  const [name, setname] = useState("");
  const [avatar, setavatar] = useState("");
  const [wishlist, setwishlist] = useState([]);
  const [resfresh, setrefresh] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    let name = localStorage.getItem("name");
    let avatar = localStorage.getItem("image");
    let user_email = localStorage.getItem("email");
    let phone_no = localStorage.getItem("phone");
    console.log(token);
    if (token === null || token === "" || token === "undefined") {
      setloggedin(false);
    } else {
      setloggedin(true);
    }

    setname(name);
    setavatar(avatar);
    setauthtoken(token);
    setemail(user_email);
    setphone(phone_no);
    console.log(token);
  }, [null]);

  useEffect(() => {
    Dashboardsummary();
  }, [authtoken, resfresh]);

  async function Dashboardsummary() {
    if (authtoken === "" || authtoken === null) {
    } else {
      let data = { token: authtoken };
      const response = await fetch("http://127.0.0.1:3001/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      console.log("Wishlist is", result);
      setwishlist(result.data);
      console.log(result);
    }
  }
  return (
    <>
      <div className="m-3 d-flex flex-column" style={{ width: "100%" }}>
        <div style={{ fontSize: "30px", fontWeight: "300" }}>Wishlist</div>
        {/* start
        <Row>
          {wishlist &&
            wishlist.map((product) => {
              return <WishlistOrders key={product.id} product={product} />;
            })}
        </Row> */}
        <div className="search-product-container">
          {wishlist.length > 0
            ? wishlist.map(
                (filteredProduct) => (
                  // parseFloat(
                  //   filteredProduct.main_price
                  //     .split("s")[1]
                  //     .replace(/,(?=\d{3})/g, "")
                  // ) >= startprice &&
                  // parseFloat(
                  //   filteredProduct.main_price
                  //     .split("s")[1]
                  //     .replace(/,(?=\d{3})/g, "")
                  // ) <= lastprice ? (
                  <WishlistOrders
                    refresh={setrefresh}
                    id={filteredProduct.id}
                    product={filteredProduct.product}
                  />
                )
                // ) : null
              )
            : null}
        </div>
      </div>
    </>
  );
}
