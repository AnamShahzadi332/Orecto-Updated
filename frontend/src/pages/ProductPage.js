import React, { useState, useEffect } from "react";
import "../styles/ProductPage.css";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
// import Col from "react-bootstrap/Col";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Rate, Progress, notification, Space, Select } from "antd";
import {
  DownOutlined,
  StarFilled,
  InfoCircleOutlined,
} from "@ant-design/icons";
import GoogleAds from "../components/GoogleAds";
import sadEmoji from "../assets/userdashboard/sad.png";
import { MDBBadge, MDBInput } from "mdb-react-ui-kit";
import Chat from "../assets/chat.png";
import ReplacementIcon from "../assets/replacement.png";
import FastDeliveryIcon from "../assets/fastdelivery.png";
import LocationIcon from "../assets/location.png";
import QualityIcon from "../assets/quality.png";
import CashOnDeliveryIcon from "../assets/cashondeliveryicon.png";
import flash from "../assets/flash.svg";
import wishlist from "../assets/wishlist.png";
import {
  MDBBtn,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Product from "../components/Product";
import share_icon from "../assets/share.png";
export default function ProductPage() {
  const [productid, setproductid] = useState("");
  const [shopid, setshopid] = useState("");
  const [productdetails, setproductdetails] = useState([]);
  const [shopdetails, setshopdetails] = useState([]);
  const [relatedproducts, setrelatedproducts] = useState([]);
  const [ProductReviews, setProductReviews] = useState([]);
  const [sent_offers, setsent_offers] = useState([]);
  const [loading, setloading] = useState(true);
  const [basicActive, setBasicActive] = useState("tab1");
  const [productdiscription, setproductdiscription] = useState("");
  const [token, settoken] = useState("");
  const [userid, setuserid] = useState("");
  const [basicModal, setBasicModal] = useState(false);
  const [authtoken, setauthtoken] = useState("");
  const [email, setemail] = useState("");
  const [loggedin, setloggedin] = useState("");
  const [name, setname] = useState("");
  const [avatar, setavatar] = useState("");
  const [offeredprice, setofferedprice] = useState("");
  const [offeredprice1, setofferedprice1] = useState("");
  const [offeredprice2, setofferedprice2] = useState("");
  const [offeredprice3, setofferedprice3] = useState("");
  // const [avatar, setavatar] = useState("");
  // const [avatar, setavatar] = useState("");
  // successful
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
  const [basicModalTwo, setBasicModalTwo] = useState(false);

  const toggleShowTwo = () => setBasicModalTwo(!basicModalTwo);

  // ticket

  const [basicModalThree, setBasicModalThree] = useState(false);

  const toggleShowThree = () => setBasicModalThree(!basicModalThree);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const toggleShow = () => setBasicModal(!basicModal);
  const [api, contextHolder] = notification.useNotification();
  const openNotification_Error = () => {
    api["error"]({
      message: "Error",
      description: "User is not signed in.",
    });
  };
  const openNotification_Error_Offer = () => {
    api["error"]({
      message: "Error",
      description: "Offer Not sent.",
    });
  };
  const openNotification_Success = () => {
    api["success"]({
      message: "Added",
      description: "Item added in your Cart.",
    });
  };
  const openNotification_Succes_SentOffer = () => {
    api["success"]({
      message: "Sent",
      description: "Your Offer has been sent successfuly.",
    });
  };
  const openNotification_Success_Wishlist = () => {
    api["success"]({
      message: "Added",
      description: "Item added in your Wishlist.",
    });
  };
  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  useEffect(() => {
    setproductid(window.location.search.split("?")[1]);
    let authtoken = localStorage.getItem("token");
    let user_id = localStorage.getItem("id");
    settoken(authtoken);
    setuserid(user_id);
  });

  useEffect(() => {
    if (productdetails.length > 0) {
      let formatted_price = productdetails[0].main_price
        .split("s")[1]
        .replace(/,(?=.*\.\d+)/g, "");
      setofferedprice1(parseInt(formatted_price) - 80);
      setofferedprice2(parseInt(formatted_price) - 50);
      setofferedprice3(parseInt(formatted_price) - 100);
    }
  }, [productdetails]);

  async function GetDetails() {
    console.log(productid);
    let data = { id: productid };
    if (productid !== "") {
      setloading(true);
      const response = await fetch("http://127.0.0.1:3001/productdetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      setproductdetails(result.data);

      const related_products_response = await fetch(
        "http://127.0.0.1:3001/relatedproducts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      let result_products = await related_products_response.json();
      console.log(result_products);
      setrelatedproducts(result_products.data);
      console.log("Related Products are", result_products.data);
      setshopid(result.data[0].shop_id);

      // console.log(doc);
      // setproductdiscription(doc);
      console.log(result.data[0].shop_id);
      if (
        result.data[0].shop_id !== "" &&
        result.data[0].added_by !== "admin"
      ) {
        let data = { id: result.data[0].shop_id };
        const response = await fetch("http://127.0.0.1:3001/shopdetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });
        let shop_result = await response.json();
        setshopdetails(shop_result.data);
        console.log("Shop details", shop_result.data);
        setloading(false);
      }
      console.log("Product Details", result.data);
      setloading(false);
    }
  }

  async function GetReviews() {
    if (productid != "") {
      let data = { id: productid };
      const response = await fetch("http://127.0.0.1:3001/productReviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      setProductReviews(result.data);
      console.log("Reviews are", result);
    }
  }
  async function SendOffer() {
    console.log(loggedin);
    if (loggedin === true && authtoken.length > 0) {
      let data = {
        token: authtoken,
        user_id: parseInt(userid),
        seller_id: parseInt(productdetails[0].seller_id),
        product_id: parseInt(productdetails[0].id),
        quantity: 1,
        offered_price: offeredprice,
        current_price: productdetails[0].main_price,
      };
      const response = await fetch("http://127.0.0.1:3001/sent-offer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      console.log(result);
      if (result.error === false) {
        toggleShow();
        openNotification_Succes_SentOffer();
        GetOffers();
      } else {
        openNotification_Error_Offer();
      }
    }
  }

  async function GetOffers() {
    console.log(loggedin);
    if (loggedin === true && authtoken.length > 0) {
      let data = {
        token: authtoken,
      };
      const response = await fetch("http://127.0.0.1:3001/get-all-offers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      console.log("My Offers are", result.my_offers);
      if (result.my_offers.data.length > 0) {
        let sent_offers = [];
        result.my_offers.data.map((d, i) =>
          d.product_id === parseInt(productid)
            ? sent_offers.push(d)
            : console.log("not found")
        );
        setsent_offers(sent_offers);
      } else {
        console.log("Offer not found");
      }
    }
  }

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: false,
    autoplaySpeed: 800,
    // rows: 2,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          dots: false,
          infinite: false,
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          dots: false,
          infinite: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 680,
        settings: {
          dots: false,
          infinite: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  async function AddtoCart() {
    if (token === "" || token === null) {
      openNotification_Error();
    } else {
      let data = {
        token: token,
        productid: productid,
        variantid: "",
        userid: userid,
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
      openNotification_Success();
    }
  }

  async function AddtoWishlist() {
    if (token === "" || token === null) {
      openNotification_Error();
    } else {
      let data = {
        token: token,
        productid: productid,
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

  // async function GetShopInfo() {

  // }
  useEffect(() => {
    // GetShopInfo();
  }, [shopid]);
  useEffect(() => {
    GetDetails();
    GetOffers();
    GetReviews();
  }, [productid]);

  useEffect(() => {
    console.log("sent_offers", sent_offers.length);
  }, [sent_offers]);

  return (
    <>
      {contextHolder}
      {loading === true ? (
        <Loading />
      ) : (
        <Container fluid className="mainProductPageDiv">
          {sent_offers.length > 0 ? (
            <MDBModal
              show={basicModalTwo}
              setShow={setBasicModalTwo}
              tabIndex="-1"
            >
              <MDBModalDialog centered>
                <MDBModalContent>
                  <MDBModalHeader>
                    <MDBModalTitle>Offer sent successfully</MDBModalTitle>
                    <MDBBtn
                      className="btn-close"
                      color="none"
                      onClick={toggleShowTwo}
                    ></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalBody>
                    <div className="modal_body_section">
                      <div>
                        <img style={{ width: "100px" }} src={sadEmoji} alt="" />
                      </div>
                      <div className="modal_body_sectiontwo">
                        <div style={{ fontSize: "15px", padding: "0px 10px" }}>
                          {productdetails[0].name}
                        </div>
                        <div>
                          <div style={{ fontWeight: "600" }}>
                            {" "}
                            {productdetails[0].main_price}
                          </div>
                          <div style={{ fontSize: "12px" }}>
                            QTY:{" "}
                            <span style={{ fontWeight: "600" }}>
                              {" "}
                              {sent_offers[0].quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3" style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: "600",
                          textTransform: "uppercase",
                        }}
                      >
                        {sent_offers[0].status === "Pending"
                          ? sent_offers[0].status
                          : "Congratulations !"}
                      </div>
                      <div style={{ fontSize: "13px", marginTop: "5px" }}>
                        <div>
                          Your offered price {sent_offers[0].user_offer} is{" "}
                          {sent_offers[0].status === "Pending"
                            ? "In Pending"
                            : "acceptable"}{" "}
                          .
                        </div>
                        <div>
                          Should we finalize the deal and add the product to
                          your cart so you can check out?
                        </div>
                      </div>
                    </div>
                  </MDBModalBody>

                  <MDBModalFooter style={{ justifyContent: "center" }}>
                    <div className="d-flex flex-row justify-content-around">
                      <div
                        onClick={() => {
                          AddtoCart();
                          toggleShowTwo();
                        }}
                        className="offer_buttons"
                      >
                        Yes
                      </div>
                      <div className="ml-3 mr-3 mt-2">OR</div>
                      <div onClick={toggleShowTwo} className="offer_buttons_no">
                        No
                      </div>
                    </div>
                  </MDBModalFooter>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
          ) : (
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
              <MDBModalDialog centered>
                <MDBModalContent>
                  <MDBModalHeader>
                    <MDBModalTitle>Make an offer</MDBModalTitle>
                    <MDBBtn
                      className="btn-close"
                      color="none"
                      onClick={toggleShow}
                    ></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalBody>
                    <div className="modal_body_section">
                      <div>
                        <img
                          style={{ width: "100px" }}
                          src={productdetails[0].thumbnail_image}
                          alt=""
                        />
                      </div>
                      <div className="modal_body_sectiontwo">
                        <div
                          className="title_name"
                          style={{
                            fontSize: "15px",
                            width: "50%",
                            padding: "0px 10px",
                          }}
                        >
                          {productdetails[0].name}
                        </div>
                        <div>
                          <div style={{ fontWeight: "600" }}>
                            {productdetails[0].main_price}
                          </div>
                          <div style={{ fontSize: "12px" }}>
                            QTY: <span style={{ fontWeight: "600" }}>1</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-center">Your offer</div>
                      <div className="mt-2 d-flex flex-row justify-content-around pl-4 pr-4">
                        <div
                          onClick={() => {
                            setofferedprice(offeredprice1);
                          }}
                          className="offer_buttons"
                        >
                          Rs. {offeredprice1.toLocaleString("en-US")}
                        </div>
                        <div
                          onClick={() => {
                            setofferedprice(offeredprice2);
                          }}
                          className="offer_buttons"
                        >
                          Rs. {offeredprice2.toLocaleString("en-US")}
                        </div>
                        <div
                          onClick={() => {
                            setofferedprice(offeredprice3);
                          }}
                          className="offer_buttons"
                        >
                          Rs. {offeredprice3.toLocaleString("en-US")}
                        </div>
                      </div>
                      {/* <div className='d-flex mt-2 input_field_setting'>
            <span>PKR: </span>
            <input className='make_offer_input' type="text" value={`${inputAmount}`} onChange={handleChange}/>
          </div> */}
                      <div className="input_field_setting">
                        <span className="make_offer_input_text">Rs. </span>
                        <input
                          onChange={(e) => setofferedprice(e.target.value)}
                          value={offeredprice}
                          className="make_offer_input"
                          type="number"
                        />
                      </div>
                    </div>
                  </MDBModalBody>

                  <MDBModalFooter style={{ justifyContent: "center" }}>
                    <MDBBtn onClick={SendOffer} style={{ width: "50%" }}>
                      Send Offer
                    </MDBBtn>
                  </MDBModalFooter>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
          )}

          <Row className="mt-1">
            <Col md={4}>
              <Carousel
                infiniteLoop={true}
                showStatus={false}
                showIndicators={false}
              >
                {productdetails.length > 0
                  ? productdetails[0].photos.map((d, i) => (
                      <div>
                        <img style={{ width: "70%" }} src={d.path} alt="" />
                      </div>
                    ))
                  : null}
                {/* <div>
                  <img
                    style={{ width: "50%" }}
                    src={productdetails[0].thumbnail_image}
                    alt=""
                  />
                </div> */}
              </Carousel>
            </Col>
            <Col md={4}>
              {/* <GoogleAds
                client="ca-pub-1558863166168778"
                slot="7106302581"
                style={{ display: "inline-block", width: "100%" }}
              /> */}
              {/* <div
                className="m-1"
                style={{
                  border: "1px solid #FFF600",

                  borderRadius: "30px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                  className="flex flex-row"
                >
                  <div
                    style={{
                      textAlign: "center",
                      width: "20%",
                      padding: "5px",
                      height: "20%",
                      fontSize: "10px",
                      backgroundColor: "#FFF600",
                      color: "red",
                      textTransform: "uppercase",
                      borderRadius: "30px",
                    }}
                  >
                    <img style={{ width: "20%" }} src={flash} />
                    Flash Sale
                  </div>
                  <div style={{ display: "flex" }} className="flex flex-row">
                    <div
                      style={{
                        fontSize: "8px",
                        lineHeight: "25px",
                        paddingTop: "2px",
                        paddingLeft: "10px",
                        width: "50px",
                      }}
                    >
                      900 Sold
                    </div>
                    <div style={{ width: "120px" }}>
                      <Progress percent={70} showInfo={false} />
                    </div>
                    <div
                      style={{
                        fontSize: "8px",
                        lineHeight: "25px",
                        paddingTop: "2px",
                        paddingLeft: "10px",
                        width: "50px",
                      }}
                    >
                      100 Left
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center" }}
                    className="flex flex-row"
                  >
                    <div style={{ fontSize: "12px" }} className="text-xs">
                      Timer
                    </div>
                    <div className="flash-timer">09:12:00</div>
                  </div>
                </div>
              </div> */}
              <div className="p-1">
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex", width: "100%" }}>
                    <div
                      className="flex flex-row mt-1 mb-1"
                      style={{
                        alignItems: "center",
                        display: "flex",
                        fontSize: "12px",
                        width: "100%",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div className=" bestselletbadge pl-2 pr-2">
                          Best Seller
                        </div>
                        <div
                          style={{ fontSize: "13px", width: "120px" }}
                          className="pl-2"
                        >
                          {productdetails[0].brand.name}
                        </div>
                      </div>
                      <div>
                        <img
                          style={{ width: "30px", marginLeft: "7px" }}
                          src={productdetails[0].brand.logo}
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "end" }}>
                    <img className="share-icon" src={share_icon} />
                    <img
                      className="wishlist-icon"
                      onClick={AddtoWishlist}
                      src={wishlist}
                    />
                  </div>
                </div>
                <div
                  className="w-100 font-semibold"
                  style={{ fontSize: "25px", color: "#414553" }}
                >
                  {productdetails[0].name}
                </div>
                <div
                  className="flex flex-row text-xs mt-1"
                  style={{
                    color: "#008C9C",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center" }}
                    className=""
                  >
                    <Rate
                      className="rating-size"
                      disabled
                      value={productdetails[0].rating}
                    />
                    <DownOutlined
                      style={{ marginLeft: "4px", fontSize: "8px", color: "" }}
                    />
                  </div>
                  <div
                    className="ml-2 pl-1 pr-1 border-r"
                    style={{ fontSize: "12px", borderColor: "#008C9C" }}
                  >
                    {productdetails[0].rating} Ratings
                  </div>
                  <div style={{ fontSize: "12px" }} className="pl-1">
                    1000+ Questions Answered
                  </div>
                </div>
                {/* <div
                  style={{ display: "flex" }}
                  className="flex flex-row text-sm mt-1 font-semibold"
                >
                  <div
                    style={{ fontSize: "16px", fontWeight: "550" }}
                    className="pl-1 pr-1"
                  >
                    Promotions:
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#008C9C",
                    }}
                    className="pl-1 underline"
                  >
                    Min spend Rs.500
                  </div>
                </div> */}
                <div className="mt-3">
                  <div className="product-price text-2xl font-bold">
                    {productdetails[0].main_price}
                  </div>
                  {productdetails[0].has_discount === true ? (
                    <div
                      style={{ display: "flex", alignItems: "center" }}
                      className="flex flex-row"
                    >
                      <div
                        className="p-1 text-xs text-white rounded-md"
                        style={{
                          backgroundColor: "#EE2D24",
                          borderRadius: "5px",
                          fontSize: "12px",
                        }}
                      >
                        {productdetails[0].discount}
                      </div>
                      <div
                        className="pl-2 line-through"
                        style={{
                          textDecoration: "line-through",
                          color: "#41455380",
                        }}
                      >
                        {productdetails[0].stroked_price}
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="mt-5 selection-buttons">
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Select
                      className="select-dropdown"
                      defaultValue="Color"
                      onChange={handleChange}
                      options={[
                        {
                          value: "Red",
                          label: "Red",
                        },
                        {
                          value: "Blue",
                          label: "Blue",
                        },

                        {
                          value: "Green",
                          label: "Green",
                        },
                      ]}
                    />
                    <Select
                      className="select-dropdown"
                      defaultValue="Size"
                      onChange={handleChange}
                      options={[
                        {
                          value: "S",
                          label: "S",
                        },
                        {
                          value: "M",
                          label: "M",
                        },

                        {
                          value: "L",
                          label: "L",
                        },
                      ]}
                    />
                    <Select
                      className="select-dropdown"
                      defaultValue="Dimension"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div
                  className="mt-4 mb-3 flex flex-col"
                  style={{ width: "100%" }}
                >
                  <div className="text-xs">Quantity</div>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                    className="mt-2 flex flex-row justify-between"
                  >
                    <Select
                      className="select-dropdown"
                      defaultValue="1"
                      onChange={handleChange}
                      options={[
                        {
                          value: "2",
                          label: "2",
                        },
                        {
                          value: "3",
                          label: "3",
                        },

                        {
                          value: "4",
                          label: "4",
                        },
                      ]}
                    />
                    <Link style={{ padding: "0px", margin: "0px" }} to="/cart">
                      {" "}
                      <MDBBtn className="btn-buy">Buy Now</MDBBtn>
                    </Link>

                    <MDBBtn className="addtocart" onClick={AddtoCart}>
                      Add to Cart
                    </MDBBtn>

                    <MDBBtn
                      onClick={
                        sent_offers.length > 0 ? toggleShowTwo : toggleShow
                      }
                      className="Makeoffer-button"
                    >
                      {sent_offers.length > 0
                        ? "Review Your Offer"
                        : "Make and Offer"}
                    </MDBBtn>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="p-1" style={{ border: "1px solid #C3C3C3" }}>
                {/* upper square div */}
                <div className="mt-1 p-2">
                  {/* central div */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    className="flex flex-row justify-between"
                  >
                    <div
                      className="text-normal font-semibold"
                      style={{ color: "#414553" }}
                    >
                      Services
                    </div>
                    <InfoCircleOutlined />
                  </div>
                  <div className="mt-1 pl-3 pr-3">
                    <div
                      style={{ display: "flex" }}
                      className="flex flex-row justify-start"
                    >
                      <div className="mt-2">
                        <img
                          style={{ height: "20px", width: "20px" }}
                          src={ReplacementIcon}
                          alt=""
                        />
                      </div>
                      <div
                        className="flex flex-col"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          color: "#414553",
                        }}
                      >
                        <div className="pl-2">5 days return policy</div>
                        <span
                          style={{ fontSize: "12px", color: "grey" }}
                          className="pl-2 text-xs"
                        >
                          change of mind is not applicable
                        </span>
                      </div>
                    </div>
                    <div
                      className="mt-1 flex flex-row justify-start"
                      style={{
                        display: "flex",
                        color: "#414553",
                        alignItems: "flex-end",
                      }}
                    >
                      <div className="mt-1">
                        <img
                          style={{ height: "20px", width: "20px" }}
                          src={QualityIcon}
                          alt=""
                        />
                      </div>
                      <div className="pl-2">Warranty not available</div>
                    </div>
                  </div>
                  {/* central div */}
                </div>
                <hr />
                {/* upper square div */}
                {/* middle square div */}
                <div className="mt-1 p-2">
                  {/* central div */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    className="flex flex-row justify-between"
                  >
                    <div
                      className="text-normal font-semibold"
                      style={{ color: "#414553" }}
                    >
                      Delivery
                    </div>
                    <InfoCircleOutlined />
                  </div>
                  <div className="mt-1 pl-3 pr-3">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                      className="mt-1 flex flex-row justify-start"
                    >
                      <div className="mt-1">
                        <img
                          style={{ height: "20px", width: "20px" }}
                          src={CashOnDeliveryIcon}
                          alt=""
                        />
                      </div>
                      <div className="pl-2" style={{ color: "#414553" }}>
                        {shopdetails.cash_on_delivery_status === 1
                          ? "Cash on Delivery available"
                          : "Cash on Delivery not available"}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-end",
                      }}
                      className="mt-1 flex flex-row justify-start"
                    >
                      <div className="mt-1">
                        <img
                          style={{ height: "20px", width: "20px" }}
                          src={LocationIcon}
                          alt=""
                        />
                      </div>
                      <div className="pl-2" style={{ color: "#414553" }}>
                        {shopdetails.address}
                      </div>
                    </div>
                    <div
                      style={{ textAlign: "end" }}
                      className="flex flex-row justify-end"
                    >
                      <div
                        className="pl-2 mt-3 underline cursor-pointer"
                        style={{ color: "#2991F0" }}
                      >
                        change
                      </div>
                    </div>
                  </div>
                  {/* central div */}
                </div>
                {/* middle square div */}
                {/* lower square div */}
                <hr />
                <div className="p-2">
                  {/* central div */}
                  {productdetails[0].added_by === "admin" ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      className="flex flex-row justify-between"
                    >
                      <div style={{ width: "100%" }} className="">
                        <h6 style={{ color: "#414553" }}>
                          {productdetails[0].brand.name}
                          <img
                            style={{ width: "10%", marginLeft: "7px" }}
                            src={productdetails[0].brand.logo}
                          />
                        </h6>
                      </div>
                      <div>
                        <img
                          style={{
                            height: "20px",
                            width: "20px",
                            cursor: "pointer",
                          }}
                          src={Chat}
                          alt=""
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      className="flex flex-row justify-between"
                    >
                      <div style={{ width: "100%" }} className="">
                        <h6 style={{ color: "#414553" }}>
                          {shopdetails.name}
                          <MDBBadge style={{ width: "10%" }} className="ms-1">
                            {shopdetails.rating} *
                          </MDBBadge>
                        </h6>
                      </div>
                      <div>
                        <img
                          style={{
                            height: "20px",
                            width: "20px",
                            cursor: "pointer",
                          }}
                          src={Chat}
                          alt=""
                        />
                      </div>
                    </div>
                  )}

                  <div className="row shop-summary">
                    <div className="shop-tab1 col-2 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                      <div
                        className="text-center"
                        style={{
                          fontSize: "12px",
                          border: "1px solid #EAEAEA",
                        }}
                      >
                        <h2>97%</h2>
                        <h4>Ratings</h4>
                      </div>
                    </div>
                    <div class="vertical1"></div>
                    <div className="shop-tab2 col-2 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                      <div
                        className="text-center"
                        style={{ border: "1px solid #EAEAEA" }}
                      >
                        <h2>91%</h2>
                        <h4>Response</h4>
                      </div>
                    </div>
                    <div class="vertical"></div>
                    <div className="shop-tab3 col-2 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                      <div
                        className="text-center"
                        style={{ border: "1px solid #EAEAEA" }}
                      >
                        <h2>89%</h2>
                        <h4>Shipping</h4>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 flex">
                    <div style={{ textAlign: "center" }} className="mx-auto">
                      {productdetails[0].added_by === "admin" ? null : (
                        <Link
                          to={`/sellershop/ID=?${productdetails[0].shop_id}`}
                        >
                          {" "}
                          <MDBBtn>Visit Store </MDBBtn>
                        </Link>
                      )}
                    </div>
                  </div>
                  {/* central div */}
                </div>

                {/* lower square div */}
              </div>
            </Col>
          </Row>
          <hr />
          <div className="fixed-ad">
            <div></div>
          </div>
          <Row>
            <div className="details-tabs">
              <MDBTabs className="mb-3">
                <MDBTabsItem>
                  <MDBTabsLink
                    style={{ fontSize: "15px", fontWeight: "600" }}
                    onClick={() => handleBasicClick("tab1")}
                    active={basicActive === "tab1"}
                  >
                    Product details
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    style={{ fontSize: "15px", fontWeight: "600" }}
                    onClick={() => handleBasicClick("tab2")}
                    active={basicActive === "tab2"}
                  >
                    Ratings & Reviews
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>

              <MDBTabsContent>
                <MDBTabsPane show={basicActive === "tab1"}>
                  <div className="mt-4">
                    <h5>Discription</h5>
                    <div
                      style={{
                        paddingLeft: "50px",
                        marginTop: "3%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p
                        className="Features"
                        dangerouslySetInnerHTML={{
                          __html: productdetails[0].description,
                        }}
                      />
                    </div>
                  </div>
                  {/* <div className="mt-4">
                    <h5>Highlights</h5>
                    <div
                      style={{
                        marginTop: "3%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "grid", paddingLeft: "50px" }}>
                        <span className="list-item">
                          Soft and stretchy cotton blend fabric
                        </span>
                        <span className="list-item">
                          Dri-FIT Technology helps you stay dry and comfortable
                        </span>
                        <span className="list-item">
                          Crew neck and short sleeves
                        </span>
                        <span className="list-item">
                          Single zipper pocket to chest
                        </span>
                        <span className="list-item">
                          Nike signature branding detail
                        </span>
                        <span className="list-item">
                          Wash according to care label instructions
                        </span>
                        <span className="list-item">
                          Model is approx. 185 cm and wears size M
                        </span>
                      </div>

                      <div style={{ display: "grid", paddingLeft: "50px" }}>
                        <span className="list-item">
                          Soft and stretchy cotton blend fabric
                        </span>
                        <span className="list-item">
                          Dri-FIT Technology helps you stay dry and comfortable
                        </span>
                        <span className="list-item">
                          Crew neck and short sleeves
                        </span>
                        <span className="list-item">
                          Single zipper pocket to chest
                        </span>
                        <span className="list-item">
                          Nike signature branding detail
                        </span>
                        <span className="list-item">
                          Wash according to care label instructions
                        </span>
                        <span className="list-item">
                          Model is approx. 185 cm and wears size M
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h5>Specifications</h5>
                    <div
                      style={{
                        marginTop: "3%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "grid", paddingLeft: "50px" }}>
                        <span className="list-item">
                          Soft and stretchy cotton blend fabric
                        </span>
                        <span className="list-item">
                          Dri-FIT Technology helps you stay dry and comfortable
                        </span>
                        <span className="list-item">
                          Crew neck and short sleeves
                        </span>
                        <span className="list-item">
                          Single zipper pocket to chest
                        </span>
                        <span className="list-item">
                          Nike signature branding detail
                        </span>
                        <span className="list-item">
                          Wash according to care label instructions
                        </span>
                        <span className="list-item">
                          Model is approx. 185 cm and wears size M
                        </span>
                      </div>

                      <div style={{ display: "grid", paddingLeft: "50px" }}>
                        <span className="list-item">
                          Soft and stretchy cotton blend fabric
                        </span>
                        <span className="list-item">
                          Dri-FIT Technology helps you stay dry and comfortable
                        </span>
                        <span className="list-item">
                          Crew neck and short sleeves
                        </span>
                        <span className="list-item">
                          Single zipper pocket to chest
                        </span>
                        <span className="list-item">
                          Nike signature branding detail
                        </span>
                        <span className="list-item">
                          Wash according to care label instructions
                        </span>
                        <span className="list-item">
                          Model is approx. 185 cm and wears size M
                        </span>
                      </div>
                    </div>
                  </div> */}
                </MDBTabsPane>
                <MDBTabsPane show={basicActive === "tab2"}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                    }}
                  >
                    {/* <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "20px", fontWeight: "600" }}>
                        Overall Rating
                      </div>
                      <div style={{ fontSize: "20px", fontWeight: "600" }}>
                        2.0
                      </div>
                      <div>
                        <Rate
                          disabled
                          value={productdetails[0].rating}
                          style={{ fontSize: "18px" }}
                        />
                      </div>
                      <div style={{ fontSize: "14px", color: "#959595" }}>
                        Based on total ratings
                      </div>
                    </div>
                    <div className="ml-5">
                      <div
                        style={{
                          width: 170,
                        }}
                      >
                        <div className="d-flex">
                          {" "}
                          5
                          <Progress
                            className="ml-2"
                            showInfo={false}
                            percent={70}
                            size="small"
                          />{" "}
                          (19)
                        </div>
                        <div className="d-flex">
                          {" "}
                          4
                          <Progress
                            className="ml-2"
                            showInfo={false}
                            percent={20}
                            size="small"
                          />{" "}
                          (15)
                        </div>
                        <div className="d-flex">
                          {" "}
                          3
                          <Progress
                            className="ml-2"
                            showInfo={false}
                            percent={50}
                            size="small"
                          />{" "}
                          (11)
                        </div>
                        <div className="d-flex">
                          {" "}
                          2
                          <Progress
                            className="ml-2"
                            showInfo={false}
                            percent={10}
                            size="small"
                          />{" "}
                          (5)
                        </div>
                        <div className="d-flex">
                          {" "}
                          1
                          <Progress
                            className="ml-2"
                            showInfo={false}
                            percent={5}
                            size="small"
                          />{" "}
                          (1)
                        </div>
                      </div>
                    </div> */}
                    {ProductReviews.length > 0 ? (
                      ProductReviews.map((d, i) => (
                        <div>
                          <div>
                            <div style={{ display: "flex" }}>
                              <div>
                                <img
                                  className="mr-3"
                                  style={{ width: "45px" }}
                                  src={d.avatar}
                                />
                              </div>
                              <div>
                                <span className="review-name">
                                  {d.user_name}
                                </span>
                                <p className="review-date">{d.time}</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <p>{d.comment}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="review-name">No Reviews</p>
                    )}
                  </div>
                </MDBTabsPane>
                {/* <MDBTabsPane show={basicActive === "tab3"}>
                  Tab 3 content
                </MDBTabsPane> */}
              </MDBTabsContent>
              <hr />
              {relatedproducts.length > 0 ? (
                <div>
                  <h4 className="related-title">Related Products</h4>
                  <Slider
                    className={
                      relatedproducts.length > 6 ? "" : "realted-products-div"
                    }
                    {...settings2}
                  >
                    {relatedproducts.map((product) => {
                      return <Product key={product.id} product={product} />;
                    })}
                  </Slider>
                </div>
              ) : null}
            </div>
          </Row>
        </Container>
      )}
    </>
  );
}
