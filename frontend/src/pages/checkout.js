import React, { useEffect, useState } from "react";
import { addToCart, removeFromCart } from "../actions/CartAction";
import { Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import "../styles/checkout.css";
import CancelIcon from "@material-ui/icons/Cancel";
import { Radio, InputNumber, Space, Modal } from "antd";
import check from "../assets/check.png";
import jazzcash_logo from "../assets/Jazzcash.png";
import easypaisa_logo from "../assets/easypaisa.png";
import wallet_logo from "../assets/wallet.png";
import mastercard_logo from "../assets/mastercard.png";
import alphapay_logo from "../assets/alphapay.png";
import COD_logo from "../assets/cash-on-delivery.png";
import { MDBBtn, MDBInput, MDBBadge } from "mdb-react-ui-kit";
import producr_img from "../assets/banner3.jpg";
import coupon from "../assets/coupon.png";
import Loading from "../components/Loading";

const Checkout = (props) => {
  const [authtoken, setauthtoken] = useState("");
  const [email, setemail] = useState("");
  const [loggedin, setloggedin] = useState("");
  const [name, setname] = useState("");
  const [avatar, setavatar] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [total, settotal] = useState("");
  const [total_price, settotal_price] = useState("");
  const [total_shipping, settotal_shipping] = useState("");
  const [total_checkout, settotal_checkout] = useState("");
  const [loading, setloading] = useState(true);
  const [cartdetails, setcartdetails] = useState([]);
  const [cartsummary, setcartsummary] = useState([]);
  const [cartcount, setcartcount] = useState([]);
  let total_products = 0;
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    let name = localStorage.getItem("name");
    let avatar = localStorage.getItem("image");
    let user_email = localStorage.getItem("email");
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
    console.log(token);
  }, [null]);



  async function GetCartItems() {
    setloading(true);
    console.log(loggedin);
    if (loggedin === true && authtoken.length > 0) {
      let data = { token: authtoken };
      const response = await fetch("http://127.0.0.1:3001/cartlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      console.log(result);
      if (result.length === 0) {
        console.log("cart is empty");
        setcartdetails("");
      } else {
        setcartdetails(result);
        let total_price = [];
        let total_shipping = [];
        result.map((d, i) => (total_products = ++d.cart_items.length));
        result.map((d, i) =>
          d.cart_items.map((a, k) => total_price.push(a.price * a.quantity))
        );
        result.map((d, i) =>
          d.cart_items.map((a, k) => total_shipping.push(a.shipping_cost))
        );

        let formated_price = total_price.reduce((a, b) => a + b, 0);
        let formated_shipping = total_shipping.reduce((a, b) => a + b, 0);
        let totalcheckout = formated_price + formated_shipping;
        settotal_shipping(formated_shipping.toLocaleString("en-US"));
        settotal_price(formated_price.toLocaleString("en-US"));
        settotal_checkout(totalcheckout.toLocaleString("en-US"));
        settotal(total_products);
      }
      console.log("cart", result);
    }
  }

  async function CartSummary() {
    if (loggedin === true && authtoken.length > 0) {
      let data = { token: authtoken };
      const response = await fetch("http://127.0.0.1:3001/getcartsummary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();

      // console.log("couriers are", result[0].carriers.data);
      if (result.length === 0) {
        console.log("Cart Summary are not availanle");
        setcartsummary("");
      } else {
        setcartsummary(result);
        console.log("Summary", result);
      }
    }
  }

  async function CartCount() {
    if (loggedin === true && authtoken.length > 0) {
      let data = { token: authtoken };
      const response = await fetch("http://127.0.0.1:3001/getcartcount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();

      // console.log("couriers are", result[0].carriers.data);
      if (result.length === 0) {
        console.log("Cart Summary are not availanle");
        setcartcount("");
      } else {
        setcartcount(result);
        console.log("Count", result);
      }
    }
    setloading(false);
  }

  useEffect(() => {
    GetAddress();
    GetCartItems();
    CartSummary();
    CartCount();
  }, [authtoken]);

  async function GetAddress() {
    let data = { token: authtoken };
    const response = await fetch("http://127.0.0.1:3001/Getaddress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Addresses are", result);
  }

  return (
    <div>
      {loading === true ? (
        <Loading />
      ) : (
        <div className="cart_div">
          <Link to="/" className="back-res mt-3">
            Back to home
          </Link>
          > Cart
          <div className="row-container">
            <Modal
              width={700}
              title="My Delivery Address"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <div
                className="selected-dilvery"
                style={{
                  cursor: "pointer",

                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex" }}>
                  <div className="dilverycheck" style={{ width: "25%" }}>
                    <img
                      className="mt-1"
                      style={{ width: "75%" }}
                      src={check}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span className="" style={{ fontSize: "12px" }}>
                        {name}
                      </span>

                      <span
                        className="font-color"
                        style={{
                          fontSize: "12px",
                          marginLeft: "15px",
                        }}
                      >
                        Edit
                      </span>
                    </div>
                    <span className="mt-1" style={{ fontSize: "12px" }}>
                      (+92) 3224324856
                    </span>
                    <div className="mt-1">
                      <span className="font-size-12">
                        Punjab,Lahore - Baghbanpura,Madina Colony,House#14
                        A,Street#4 near Islamia Model Girls High School,Multani
                        Colony,Baghbanpura,Lahore,Zaheer Grocery Shop, Shahbaz
                        Butt Property dealer,
                      </span>
                    </div>
                    <div className="d-flex mt-4">
                      <div className="dilvery-badge mr-1 ml-1">Home</div>
                      <div className="grey-dilvery-badge mr-1 ml-1">
                        Default Shipping Address
                      </div>
                      <div className="grey-dilvery-badge mr-1 ml-1">
                        Default Billing Address
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
            <div style={{ border: "none" }}>
              <div className="card card-body">
                <span style={{ fontSize: "14px" }}>Deliver to :{name}</span>
                <div className="mt-2" style={{ display: "flex" }}>
                  <div className="user-details">
                    <div className="dilvery-badge">Home</div>
                    <span style={{ fontSize: "12px" }} className="ml-2">
                      03224324856
                    </span>
                  </div>

                  <div className="vertical-line"></div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    className="ml-4"
                  >
                    <span style={{ fontSize: "12px" }}>
                      House#14 A,Street#4 near Islamia Model Girls High
                      School,Multani Colony,Baghbanpura,Lahore, Madina Colony,
                      Lahore - Baghbanpura, Punjab, Zaheer Grocery Shop, Shahbaz
                      Butt Property dealer,
                    </span>
                    <MDBBtn
                      onClick={showModal}
                      style={{ width: "15%" }}
                      color="link"
                      rippleColor="dark"
                    >
                      Change
                    </MDBBtn>
                  </div>
                </div>
                <div className="mt-2">
                  <span style={{ fontSize: "12px" }}>
                    Bill to the same address
                  </span>
                  <span
                    onClick={showModal}
                    style={{
                      cursor: "pointer",
                      fontSize: "11px",
                      color: "#008c9c",
                      marginLeft: "20px",
                    }}
                  >
                    Edit
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: "12px" }}>Email to {email}</span>
                  <span
                    style={{
                      cursor: "pointer",

                      fontSize: "11px",
                      color: "#008c9c",
                      marginLeft: "20px",
                    }}
                  >
                    Edit
                  </span>
                </div>
              </div>

              <div
                style={{ padding: "0px 10px" }}
                className="card card-body mt-3"
              >
                <div
                  className="mb-3"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div></div>
                </div>
                {cartdetails.length !== 0 && loggedin !== false
                  ? cartdetails.map((d, i) => (
                      <div style={{ padding: "0px 10px" }} className="">
                        {d.cart_items.map((data, i) => (
                          <div>
                            <div
                              className=""
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  className="product-discription-div"
                                  style={{ display: "flex" }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "45%",
                                      justifyContent: "flex-start",
                                      alignItems: "center",
                                    }}
                                  >
                                    <img
                                      className="product-Image"
                                      style={{ width: "20%", padding: "12px" }}
                                      src={data.product_thumbnail_image}
                                    />

                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <span>{data.product_name}</span>
                                      <span
                                        className="product-details"
                                        style={{
                                          fontSize: "12px",
                                          color: "grey",
                                        }}
                                      >
                                        No Brand, Color Family,Size L
                                      </span>
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <span style={{ fontSize: "13px" }}>
                                      Qty: {data.quantity}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div
                                className="mobile-price-div"
                                style={{ width: "20%" }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: "12px",
                                  }}
                                  className="mobile-price-text"
                                >
                                  <div className="product-price-badge">
                                    <span
                                      style={{ textDecoration: "line-through" }}
                                    >
                                      Rs.1,290
                                    </span>
                                    <span className="ml-2">-27% </span>
                                  </div>
                                  <div style={{ width: "100px" }}>
                                    <span className="ml-4">
                                      Rs. {data.price}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <hr />
                          </div>
                        ))}
                      </div>
                    ))
                  : null}

                <div
                  className="selected-dilvery"
                  style={{
                    cursor: "pointer",

                    display: "flex",
                    flexDirection: "column",
                    width: "20%",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <div className="dilverycheck" style={{ width: "12%" }}>
                      <img
                        className="mt-1"
                        style={{ width: "75%" }}
                        src={check}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div>
                        <div className="vertical-line-deliveryplan"></div>
                        <span
                          className="font-color"
                          style={{ fontSize: "12px" }}
                        >
                          Standard Delivery
                        </span>

                        <span
                          className="font-color"
                          style={{
                            fontSize: "12px",

                            marginLeft: "15px",
                          }}
                        >
                          Rs. 159
                        </span>
                      </div>
                      <span style={{ fontSize: "12px" }}>
                        Receive by 18-22 Dec 2022
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                  className="mt-3 item-summary"
                >
                  <div className="vouncher">
                    <div>
                      <img style={{ width: "20px" }} src={coupon} />

                      <span className="ml-1"> Store Vouncher </span>
                    </div>
                    <div>
                      <span> Get Vouncher > </span>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <span>
                      {cartcount.count} Item(s). Subtotal{" "}
                      <span style={{ color: "#008c9c", fontWeight: "600" }}>
                        {cartsummary.sub_total}
                      </span>
                    </span>
                    <span style={{ color: "#837f7f" }}>
                      Saved {cartsummary.discount}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-summary col-12">
              <div className="card card-body">
                <div>
                  <div>
                    <span style={{ fontSize: "16px ", fontWeight: "600" }}>
                      Order Summary
                    </span>
                  </div>
                  <div
                    className="mt-2 mb-2"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontSize: "13px" }}>
                      Subtotal ({cartcount.count} items)
                    </span>
                    <span style={{ fontSize: "15px ", fontWeight: "600" }}>
                      {cartsummary.sub_total}
                    </span>
                  </div>
                  <div
                    className="mt-2 mb-2"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontSize: "13px" }}>Shipping Fee </span>
                    <span style={{ fontSize: "15px ", fontWeight: "600" }}>
                      {cartsummary.shipping_cost}
                    </span>
                  </div>

                  <div
                    className="mt-2 mb-2"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontSize: "13px" }}>Discount </span>
                    <span style={{ fontSize: "15px ", fontWeight: "600" }}>
                      {cartsummary.discount}
                    </span>
                  </div>
                </div>
                <div
                  className="mt-2 mb-2"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <MDBInput label="Vouncher Code" id="form1" type="text" />
                  <MDBBtn className="coupon-apply-button">Apply</MDBBtn>
                </div>
                <div
                  className="mt-2 mb-2"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ fontSize: "14px" }}>Total </span>
                  <span style={{ fontSize: "15px ", fontWeight: "600" }}>
                    {cartsummary.grand_total}
                  </span>
                </div>
                <Link
                  style={{ textAlign: "center", margin: "0px", padding: "0px" }}
                  to="/payment"
                >
                  <MDBBtn>Confirm CHECKOUT</MDBBtn>{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
