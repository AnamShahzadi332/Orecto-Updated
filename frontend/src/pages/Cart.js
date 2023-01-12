import React, { useEffect, useState } from "react";
import { addToCart, removeFromCart } from "../actions/CartAction";
import { Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import "../styles/Cart.css";
import CancelIcon from "@material-ui/icons/Cancel";
import { Radio, InputNumber, Space, Input } from "antd";
import check from "../assets/check.png";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import producr_img from "../assets/banner3.jpg";
import Loading from "../components/Loading";
import wishlist from "../assets/love.png";
import trash from "../assets/trash-grey.png";
import { Button } from "react-bootstrap";
import { notification } from "antd";
const Cart = (props) => {
  const [cartdetails, setcartdetails] = useState([]);
  const [courierdetailes, setcourierdetailes] = useState([]);
  const [authtoken, setauthtoken] = useState("");
  const [email, setemail] = useState("");
  const [userid, setuserid] = useState("");
  const [loggedin, setloggedin] = useState("");
  const [name, setname] = useState("");
  const [avatar, setavatar] = useState("");
  const [check_all, setcheck_all] = useState(false);
  const [loading, setloading] = useState(true);
  const [total, settotal] = useState("");
  const [total_price, settotal_price] = useState("");
  const [total_shipping, settotal_shipping] = useState("");
  const [total_checkout, settotal_checkout] = useState("");
  const [ActiveTab, setActiveTab] = useState(0);
  const [quantity, setquantity] = useState("");
  const [cartsummary, setcartsummary] = useState([]);
  const [cartcount, setcartcount] = useState([]);
  const productID = props.match.params.id;
  let total_products = 0;
  useEffect(() => {
    let token = localStorage.getItem("token");
    let name = localStorage.getItem("name");
    let avatar = localStorage.getItem("image");
    let user_email = localStorage.getItem("email");
    let user_id = localStorage.getItem("id");
    console.log(token);
    if (token === null || token === "" || token === "undefined") {
      setloggedin(false);
    } else {
      setloggedin(true);
    }

    setname(name);
    setavatar(avatar);
    setauthtoken(token);
    setuserid(user_id);
    setemail(user_email);
    console.log(token);
  }, [null]);

  const [api, contextHolder] = notification.useNotification();
  const openNotification_Error = () => {
    api["error"]({
      message: "Error",
      description: "User is not signed in.",
    });
  };
  const openNotification_Success_Wishlist = () => {
    api["success"]({
      message: "Added",
      description: "Item added in your Wishlist.",
    });
  };

  async function AddtoWishlist(ID) {
    if (authtoken === "" || authtoken === null) {
      openNotification_Error();
    } else {
      let data = {
        token: authtoken,
        productid: ID,
        variantid: "",
        userid: userid,
        quantity: 1,
      };
      const response = await fetch("http://127.0.0.1:3001/wishlist-add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let cartdetails = await response.json();
      console.log(cartdetails);
      openNotification_Success_Wishlist();
    }
  }

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
  async function GetCourierDetails() {
    if (loggedin === true && authtoken.length > 0) {
      let data = { token: authtoken };
      const response = await fetch("http://127.0.0.1:3001/courierlist", {
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
        console.log("Couriers are not availanle");
        setcourierdetailes("");
      } else {
        setcourierdetailes(result[0].carriers.data);
      }
    }
  }

  async function DeleteCartItem(ID) {
    setloading(true);
    let data = { token: authtoken, id: ID };
    const response = await fetch("http://127.0.0.1:3001/deletecartitem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    let result = await response.json();
    console.log("Delete Item", result);
    GetCartItems();
    CartCount();
    CartSummary();
    setTimeout(() => {
      setloading(false);
    }, 1000);
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

  async function UpdateItem(ID, number) {
    setloading(true);
    let data = { id: ID, quantity: number, token: authtoken };
    console.log(data);
    const response = await fetch("http://127.0.0.1:3001/update-cart-items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    let result = await response.json();
    console.log("Delete Item", result);
    GetCartItems();
    CartCount();
    CartSummary();
    setTimeout(() => {
      setloading(false);
    }, 1000);
  }

  useEffect(() => {
    GetCartItems();
    GetCourierDetails();
    CartSummary();
    CartCount();
  }, [authtoken]);

  return (
    <div>
      {contextHolder}
      {loading === true ? (
        <Loading />
      ) : (
        <div className="cart_div mt-3">
          <Link to="/" className="back-res ">
            Back to home
          </Link>

          <div className="row-container">
            <div style={{ border: "none" }}>
              <div className="card card-body">
                <span style={{ fontSize: "14px" }}>
                  Preferred Delivery Option :{" "}
                </span>
                <div className="mt-2" style={{ display: "flex" }}>
                  {courierdetailes.length > 0 ? (
                    courierdetailes.map((d, i) => (
                      <div
                        onClick={() => setActiveTab(d.id)}
                        className={
                          ActiveTab === d.id
                            ? "selected-dilvery ml-2"
                            : "unselected-dilvery ml-2"
                        }
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          width: "18%",
                        }}
                      >
                        <div className="courrier-menus">
                          <div style={{ display: "flex" }}>
                            <div
                              className={
                                ActiveTab === d.id
                                  ? "dilverycheck"
                                  : "dilveryuncheck"
                              }
                              style={{ width: "14%" }}
                            >
                              <img style={{ width: "100%" }} src={check} />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: "10px",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "700",
                                }}
                              >
                                {d.transit_price}
                              </span>
                              <span style={{ fontSize: "13px" }}>{d.name}</span>
                              <span style={{ fontSize: "13px" }}>
                                {"In " + d.transit_time + " Days"}
                              </span>
                            </div>
                          </div>
                          <div>
                            <img style={{ width: "50px" }} src={d.logo} />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      className={"selected-dilvery ml-2"}
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        width: "18%",
                      }}
                    >
                      <div className="courrier-menus">
                        <div style={{ display: "flex" }}>
                          <div
                            className={"dilverycheck"}
                            style={{ width: "14%" }}
                          >
                            <img style={{ width: "80%" }} src={check} />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginLeft: "10px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "14px",
                                fontWeight: "700",
                              }}
                            >
                              {"Rs. 180"}
                            </span>
                            <span style={{ fontSize: "13px" }}>
                              {"Standard Delivery"}
                            </span>
                            <span style={{ fontSize: "13px" }}>
                              {"In " + 2 + " Days"}
                            </span>
                          </div>
                        </div>
                        <div>
                          {/* <img style={{ width: "50px" }} src={d.logo} /> */}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* <div
                className="selected-dilvery"
                style={{
                  cursor: "pointer",

                  display: "flex",
                  flexDirection: "column",
                  width: "18%",
                }}
              >
                <div style={{ display: "flex" }}>
                  <div className="dilverycheck" style={{ width: "12%" }}>
                    <img style={{ width: "75%" }} src={check} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "14px", fontWeight: "700" }}>
                      Rs. 159
                    </span>
                    <span style={{ fontSize: "13px" }}>TCS</span>
                    <span style={{ fontSize: "13px" }}>
                      Receive by 18-22 Dec 2022
                    </span>
                  </div>
                </div>
              </div> */}
                </div>
              </div>

              {cartdetails.length !== 0 && loggedin !== false
                ? cartdetails.map((d, i) => (
                    <div
                      style={{ padding: "0px 10px" }}
                      className="card card-body mt-3"
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            margin: "5px 0px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span style={{ fontSize: "15px" }} className="ml-2">
                            {d.name}
                          </span>
                        </div>
                        <div></div>
                      </div>
                      <hr style={{ margin: "4px" }} />
                      {d.cart_items.map((data, i) => (
                        <div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              style={{
                                width: "75%",
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
                                <div style={{ display: "flex" }}>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "100%",
                                      justifyContent: "flex-start",
                                      alignItems: "center",
                                    }}
                                  >
                                    <img
                                      style={{ width: "75px", padding: "12px" }}
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
                                </div>
                              </div>
                              <div className="operations-details">
                                <div className="product_pricing_details">
                                  <span
                                    style={{
                                      fontSize: "16px",
                                      color: "#008c9c",
                                    }}
                                  >
                                    Rs.
                                    {data.price}
                                  </span>
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      textDecoration: "line-through",
                                    }}
                                  >
                                    Rs. 5,30
                                  </span>

                                  <div className="d-flex mt-1">
                                    <img
                                      onClick={() => DeleteCartItem(data.id)}
                                      style={{
                                        cursor: "pointer",
                                        width: "18px",
                                      }}
                                      src={trash}
                                    />
                                    <img
                                      onClick={() =>
                                        AddtoWishlist(data.product_id)
                                      }
                                      style={{
                                        cursor: "pointer",
                                        width: "20px",
                                        marginLeft: "5px",
                                      }}
                                      src={wishlist}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className=" quantity-buttons">
                                <Button
                                  onClick={() => {
                                    if (quantity.length === 0) {
                                      setquantity(data.quantity - 1);
                                      UpdateItem(data.id, data.quantity - 1);
                                    } else {
                                      setquantity(quantity - 1);
                                      UpdateItem(data.id, quantity - 1);
                                    }
                                  }}
                                  disabled={
                                    data.lower_limit === data.quantity
                                      ? true
                                      : false
                                  }
                                  className="quantity-button"
                                  variant="light"
                                >
                                  -
                                </Button>
                                <Input
                                  className="quntity-input"
                                  onChange={(e) => {
                                    const telNo = e.target.value;
                                    const re = /^[0-9\b]+$/;
                                    if (telNo === "" || re.test(telNo)) {
                                      UpdateItem(
                                        data.id,
                                        parseInt(e.target.value)
                                      );
                                    }
                                  }}
                                  style={{ width: "40px", textAlign: "center" }}
                                  value={data.quantity}
                                />
                                <Button
                                  disabled={
                                    data.upper_limit === data.quantity
                                      ? true
                                      : false
                                  }
                                  onClick={() => {
                                    if (quantity.length === 0) {
                                      setquantity(data.quantity + 1);
                                      UpdateItem(data.id, data.quantity + 1);
                                    } else {
                                      setquantity(quantity + 1);
                                      UpdateItem(data.id, quantity + 1);
                                    }
                                  }}
                                  className="quantity-button"
                                  variant="light"
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          </div>
                          <hr />
                        </div>
                      ))}
                    </div>
                  ))
                : null}
            </div>

            <div className="col-12 order-summary">
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
                  style={{ padding: "0px", margin: "0px", textAlign: "center" }}
                  to="/checkout"
                >
                  <MDBBtn>PROCEED TO CHECKOUT</MDBBtn>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
