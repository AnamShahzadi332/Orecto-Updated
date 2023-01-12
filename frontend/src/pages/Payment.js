import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/CartAction";
import { Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import "../styles/checkout.css";
import CancelIcon from "@material-ui/icons/Cancel";
import { Radio, InputNumber, Space } from "antd";
import check from "../assets/check.png";
import jazzcash_logo from "../assets/Jazzcash.png";
import easypaisa_logo from "../assets/easypaisa.png";
import wallet_logo from "../assets/wallet.png";
import mastercard from "../assets/mastercard.png";
import alphapay_logo from "../assets/alphapay.png";
import visa_logo from "../assets/visa.png";
import union_logo from "../assets/union-pay.png";
import mastercard_logo from "../assets/atm-card.png";
import COD_logo from "../assets/cash-on-delivery.png";
import { MDBBtn, MDBInput, MDBBadge } from "mdb-react-ui-kit";
import producr_img from "../assets/banner3.jpg";
import coupon from "../assets/coupon.png";
import Loading from "../components/Loading";

const Payment = (props) => {
  const [authtoken, setauthtoken] = useState("");
  const [email, setemail] = useState("");
  const [loggedin, setloggedin] = useState("");
  const [userid, setuserid] = useState("");
  const [name, setname] = useState("");
  const [avatar, setavatar] = useState("");
  const [paymentlist, setpaymentlist] = useState([]);
  const [active, setactive] = useState(6);
  const [cartsummary, setcartsummary] = useState([]);
  const [cartdetails, setcartdetails] = useState([]);
  const [cartcount, setcartcount] = useState([]);
  useEffect(() => {
    let token = localStorage.getItem("token");
    let name = localStorage.getItem("name");
    let avatar = localStorage.getItem("image");
    let id = localStorage.getItem("id");
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
    setuserid(id);
    console.log(token);
  }, [null]);

  const productID = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const [count, setCount] = useState(1);

  async function GetPaymentList() {
    if (loggedin === true && authtoken.length > 0) {
      let data = { token: authtoken };
      const response = await fetch("http://127.0.0.1:3001/paymentlist", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      let result = await response.json();

      // console.log("couriers are", result[0].carriers.data);
      if (result.length === 0) {
        console.log("There are no Payments Available");
        setpaymentlist("");
      } else {
        setpaymentlist(result);
        console.log("Payments are", result);
      }
    }
  }

  async function GetCartItems() {
    // setloading(true);
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
      }
      console.log("cart", result);
    }
  }

  async function CreateOrder() {
    // setloading(true);
    let data = {
      token: authtoken,
      ownerid: cartdetails[0].owner_id,
      userid: parseInt(userid),
      paymentmethod: "cod",
    };
    console.log(data);
    if (loggedin === true && authtoken.length > 0) {
      const response = await fetch("http://127.0.0.1:3001/createorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      console.log(result);
      window.history.push("/");
    }
  }

  useEffect(() => {
    GetPaymentList();
    GetCartItems();
    CartSummary();
    CartCount();
  }, [authtoken]);
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const onChange = (value) => {
    console.log("changed", value);
  };
  console.log(productID);

  const dispatch = useDispatch();

  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty));
    }
  }, [dispatch, productID, qty]);

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
  }

  return (
    <div className="cart_div mt-2">
      <Link to="/" className="back-res mt-3">
        Back to home
      </Link>
      > Cart
      <div className="row-container">
        <div style={{ border: "none" }}>
          <div className="card card-body">
            <div className="">
              <div class="overlay-content">
                <span style={{ fontSize: "24px" }}>Select Payment Options</span>
                {paymentlist.map((d, i) => (
                  <div
                    onClick={() => setactive(6)}
                    className={
                      active === 6
                        ? "selected-payment-method"
                        : "payment-options"
                    }
                  >
                    <img className="payment_logo" src={d.image} />
                    <span className="mt-2">{d.title}</span>
                  </div>
                ))}
                {/* <div
                  className="mt-3"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    onClick={() => setactive(2)}
                    className={
                      active === 2
                        ? "selected-payment-method"
                        : "payment-options"
                    }
                  >
                    <img className="payment_logo" src={jazzcash_logo} />{" "}
                    <span className="mt-1">JazzCash</span>
                  </div>
                  <div
                    onClick={() => setactive(3)}
                    className={
                      active === 3
                        ? "selected-payment-method"
                        : "payment-options"
                    }
                  >
                    <img className="payment_logo" src={wallet_logo} />{" "}
                    <span className="mt-1">O wallet</span>
                  </div>
                  <div
                    onClick={() => setactive(4)}
                    className={
                      active === 4
                        ? "selected-payment-method"
                        : "payment-options"
                    }
                  >
                    <img className="payment_logo" src={mastercard_logo} />{" "}
                    <span className="mt-1">Credit/Debit Card</span>
                  </div>
                  <div
                    onClick={() => setactive(5)}
                    className={
                      active === 5
                        ? "selected-payment-method"
                        : "payment-options"
                    }
                  >
                    <img className="payment_logo" src={alphapay_logo} />{" "}
                    <span className="mt-1">Bank Al-Falah</span>
                  </div>
                  <div
                    onClick={() => setactive(6)}
                    className={
                      active === 6
                        ? "selected-payment-method"
                        : "payment-options"
                    }
                  >
                    <img className="payment_logo" src={COD_logo} />{" "}
                    <span className="mt-1">Cah On Delivery</span>
                  </div>
                </div> */}
                <div
                  onClick={() => setactive(1)}
                  className={
                    active === 1
                      ? "selected-payment-options-easypaisa"
                      : "display-out"
                  }
                >
                  <span>
                    Experience easy payments – save your Easypaisa account as
                    default method to pay! Please ensure your Easypaisa account
                    is Active and has sufficient balance.
                  </span>
                  <span>To confirm your payment after providing OTP: -</span>
                  <span className="mt-2">
                    - USSD prompt for Telenor Customers Only
                  </span>
                  <span className="ml-2">
                    • Unlock your phone and enter 5 digit PIN in the prompt to
                    pay
                  </span>
                  <span className="mt-2">OR</span>
                  <span className="mt-2">
                    - Approve Payment in your Easypaisa App (Telenor and Other
                    Networks)
                  </span>
                  <span className="ml-2">
                    • Login to Easypaisa App and tap on payment notification to
                    approve
                  </span>
                  <span className="ml-2">
                    • If you miss the notification, go to My Approvals in side
                    menu to confirm
                  </span>
                  <div className="mt-4">
                    <span>Easypaisa Account number</span>
                    <MDBInput />
                  </div>
                  <div>
                    <MDBBtn className="mt-3 pay-button">Pay Now</MDBBtn>
                  </div>
                </div>
                <div
                  onClick={() => setactive(2)}
                  className={
                    active === 2
                      ? "selected-payment-options-jazzcash"
                      : "display-out"
                  }
                >
                  <span>➊ FOR JAZZ/WARID</span>
                  <span className="">
                    ↳ Unlock your phone and you will receive a MPIN Input Prompt
                  </span>
                  <span className="mt-3">➋ FOR OTHER NETWORKS</span>
                  <span>↳ Log-in to your JazzCash App and enter your MPIN</span>

                  <span className="mt-3">
                    Note: Ensure your JazzCash account is Active and has
                    sufficient balance.
                  </span>

                  <div className="mt-4">
                    <span>JazzCash Account number</span>
                    <MDBInput />
                  </div>
                  <div>
                    <MDBBtn className="mt-3 pay-button">Pay Now</MDBBtn>
                  </div>
                </div>
                <div
                  onClick={() => setactive(4)}
                  className={
                    active === 4
                      ? "selected-payment-options-card"
                      : "display-out"
                  }
                >
                  <div>
                    <img style={{ width: "50px" }} src={visa_logo} />
                    <img style={{ width: "45px" }} src={mastercard} />
                  </div>

                  <div style={{ width: "250px" }} className="mt-4">
                    <span className="font-size-12">* Card number</span>
                    <MDBInput />
                  </div>
                  <div style={{ width: "250px" }} className="mt-4">
                    <span className="font-size-12">* Name on card</span>
                    <MDBInput />
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "150px" }} className="mt-4">
                      <span className="font-size-12">* Expiration Date</span>
                      <MDBInput />
                    </div>
                    <div
                      style={{ width: "80px", marginLeft: "20px" }}
                      className="mt-4"
                    >
                      <span className="font-size-12">* CVV</span>
                      <MDBInput />
                    </div>
                  </div>
                  <div>
                    <div className="mt-4 d-flex">
                      <input type="checkbox" />
                      <span className="ml-1"> Save Card</span>
                    </div>
                    <div
                      style={{ lineHeight: "15px", width: "250px" }}
                      className="ml-3"
                    >
                      <span className="font-size-10">
                        I acknowledge that my card information is saved in my
                        Orecto account for subsequent transactions.
                      </span>
                    </div>
                  </div>
                  <div>
                    <MDBBtn className="mt-3 pay-button">Pay Now</MDBBtn>
                  </div>
                </div>
                <div
                  onClick={() => setactive(3)}
                  className={
                    active === 3
                      ? "selected-payment-options-wallet"
                      : "display-out"
                  }
                >
                  <div className="mt-4 wallet-options">
                    <span>Available Balance</span>
                    <div className="insuficient-balance">
                      <span className="font-size-20">Rs. 0</span>
                      <span
                        style={{ color: "#db4437" }}
                        className="font-size-10"
                      >
                        Insufficient Funds
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 wallet-options">
                    <span>TopUp Amount</span>
                    <span className="font-size-20">Rs. 550</span>
                  </div>
                  <div className="mt-3">
                    <MDBBtn className="mt-3 pay-button">Pay Now</MDBBtn>
                  </div>
                </div>
                <div
                  onClick={() => setactive(5)}
                  className={
                    active === 5
                      ? "selected-payment-options-bank"
                      : "display-out"
                  }
                >
                  <div style={{ width: "250px" }} className="mt-4">
                    <span className="font-size-12">
                      * Bank Al-Falah Account number
                    </span>
                    <MDBInput />
                  </div>
                  <div style={{ width: "250px" }} className="mt-4">
                    <span className="font-size-12">* CNIC NO.</span>
                    <MDBInput />
                  </div>
                  <div className="mt-3">
                    <MDBBtn className="mt-3 pay-button">Pay Now</MDBBtn>
                  </div>
                </div>
                <div
                  onClick={() => setactive(6)}
                  className={
                    active === 6
                      ? "selected-payment-options-COD"
                      : "display-out"
                  }
                >
                  <div className="mt-4">
                    <span className="font-size-12">
                      You can pay in cash to our courier when you receive the
                      goods at your doorstep.
                    </span>
                  </div>
                  <div className="mt-3">
                    <MDBBtn onClick={CreateOrder} className="mt-3 pay-button">
                      Order Now
                    </MDBBtn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-summary-card col-12">
          <div className="card card-body">
            <div>
              <div>
                <span style={{ fontSize: "16px ", fontWeight: "600" }}>
                  Order Summary
                </span>
              </div>

              <div
                className="mt-2 mb-2"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span className="font-size-12">
                  Subtotal ({cartcount.count} Items and shipping fee included){" "}
                </span>
                <span style={{ fontSize: "13px ", fontWeight: "600" }}>
                  {cartsummary.grand_total}
                </span>
              </div>
            </div>

            <div
              className="mt-2 mb-2"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span style={{ fontSize: "14px" }}>Total Amount </span>
              <span
                style={{
                  color: "#008c9c",
                  fontSize: "17px ",
                  fontWeight: "600",
                }}
              >
                {cartsummary.grand_total}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
