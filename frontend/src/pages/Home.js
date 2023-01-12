import React, { useState, useRef, useEffect } from "react";
import { Button } from "@material-ui/core";
import category1 from "../assets/category/1.png";
import category2 from "../assets/category/2.png";
import moment from "moment";
import category3 from "../assets/category/3.png";
// import category4 from "../assets/category/4.png";
// import category5 from "../assets/category/5.png";
import category6 from "../assets/category/6.png";
import category7 from "../assets/category/7.png";
import category8 from "../assets/category/8.png";
import category9 from "../assets/category/9.png";
import category10 from "../assets/category/10.png";
import category11 from "../assets/category/11.png";
import category12 from "../assets/category/12.png";
import category13 from "../assets/category/13.png";
import category14 from "../assets/category/14.png";
import category15 from "../assets/category/15.png";
import category16 from "../assets/category/16.png";
import daraz from "../assets/daraz.jpg";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../styles/Home.css";
import Product from "../components/Product";
import FlashProducts from "../components/FlashProducts";
import { listProducts } from "../actions/ProdcutActions";
import banner3 from "../assets/banner3.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel, Card } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import banner from "../assets/banner.avif";
import atomative from "../assets/Automotive.png";
import {
  MDBProgress,
  MDBProgressBar,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBSpinner,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import menu from "../assets/card.avif";
import menu1 from "../assets/card2.avif";
import menu2 from "../assets/card3.avif";
import { data } from "../data/data";
import Loading from "../components/Loading";
import AllProducts from "../components/AllProducts";
import Featurecategories from "./FeatureCategories";
const Home = () => {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");
  const [PageNumber, setPageNumber] = useState(1);
  const [FeaturedProducts, setFeaturedProducts] = useState([]);
  const [All_Products, setAll_Products] = useState([]);
  const [BestSelling, setBestSelling] = useState([]);
  const [Flash_Products, setFlashProducts] = useState([]);
  const [Feature_categories, setFeature_categories] = useState([]);
  const [Banners, setBanners] = useState([]);
  const [BannersTwo, setBannersTwo] = useState([]);
  const [BannersThree, setBannersThree] = useState([]);
  const [Sliderstwo, setSliderstwo] = useState([]);
  const [Slidersthree, setSlidersthree] = useState([]);
  const [SliderOne, setSliderOne] = useState([]);
  const [Sliders, setSliders] = useState([]);
  const [isloading, setisloading] = useState(true);
  const [spining, setspinning] = useState(false);
  const [flashdate, setflashdate] = useState("");

  async function GetFeaturedProducts() {
    const response = await fetch("http://127.0.0.1:3001/featureproducts", {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    });

    let result = await response.json();
    setFeaturedProducts(result);
    console.log("Feature Products", result);
  }

  useEffect(() => {}, [null]);
  async function GetFlashProducts() {
    const response = await fetch("http://127.0.0.1:3001/flashdeals", {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let result = await response.json();
    if (result.data.length > 0) {
      setFlashProducts(result.data[0].products.data);
      setflashdate(result.data[0].date);
      console.log("Flash Products are", result.data[0].products.data);
    } else {
      setFlashProducts([]);
      console.log("Flash Delas not available");
    }
    setisloading(false);
  }

  async function GetBestSelling() {
    const response = await fetch("http://127.0.0.1:3001/best-selling", {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let result = await response.json();
    if (result.length > 0) {
      setBestSelling(result);
      console.log("Best Selling are", result);
    } else {
      setBestSelling([]);
      console.log("Best Selling not available");
    }
    setisloading(false);
  }

  async function GetFeatureCategories() {
    const response = await fetch("http://127.0.0.1:3001/featurecategories", {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let result = await response.json();

    if (result.data.length > 0) {
      console.log("Feature Categories are", result);
      setFeature_categories(result.data);
    } else {
      console.log("Feature Categories are not available");
    }

    setisloading(false);
  }
  async function GetSliders() {
    const response = await fetch("http://127.0.0.1:3001/allsliders", {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let result = await response.json();
    setSliders(result.data);
    console.log("Sliders", result);
  }
  async function GetBanners() {
    const response = await fetch("http://127.0.0.1:3001/banners", {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let result = await response.json();
    setBanners(result);
    console.log("Banners", result);
  }

  async function GetBannersTwo() {
    const response = await fetch("http://127.0.0.1:3001/bannersTwo", {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let result = await response.json();
    setBannersTwo(result);
    console.log("Banners Two", result);
  }

  async function GetBannersThree() {
    const response = await fetch("http://127.0.0.1:3001/banners-three", {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let result = await response.json();
    setBannersThree(result);
    console.log("Banners Three", result);
  }

  async function GetSliderTwo() {
    const response = await fetch("http://127.0.0.1:3001/slider-home-two", {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let result = await response.json();
    setSliderstwo(result.data);
    console.log("Sliders two are", result.data);
  }

  async function GetSliderThree() {
    const response = await fetch("http://127.0.0.1:3001/slider-home-three", {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let result = await response.json();
    setSlidersthree(result.data);
    console.log("Sliders two are", result.data);
  }
  async function GetSliderOne() {
    const response = await fetch("http://127.0.0.1:3001/home-slider-one", {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let result = await response.json();
    setSliderOne(result.data);
    console.log("Sliders one are", result.data);
  }

  let getting_products = [];
  async function GetAllProducts() {
    let data = { page: 1 };
    const response = await fetch("http://127.0.0.1:3001/Allproducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    let result = await response.json();
    console.log(result.data);
    setAll_Products(result.data);
  }

  async function LoadMoreProducts() {
    if (PageNumber > 1) {
      setspinning(true);
      let data = { page: PageNumber };
      const response = await fetch("http://127.0.0.1:3001/Allproducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      console.log(result.data);
      let gethered = All_Products.concat(result.data);
      setAll_Products(gethered);
      setspinning(false);
    }
  }
  useEffect(() => {
    console.log(PageNumber);
    LoadMoreProducts();
  }, [PageNumber]);

  useEffect(() => {
    console.log("All Products are", All_Products);
  }, [PageNumber]);
  useEffect(() => {
    GetSliders();
    GetSliderThree();
    GetBannersThree();
    GetSliderTwo();
    GetSliderOne();
    GetBannersTwo();
    GetBestSelling();
    GetAllProducts();
    GetBanners();
    GetFeaturedProducts();
    GetFlashProducts();
    GetFeatureCategories();
  }, [null]);

  // Flash Deal Timer
  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState("00:00:00");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    var input = "1675191540";
    let end_timer = moment(input, "HH").format("HH:mm:ss");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    var input = "1675191540";
    // Deadline Hours
    let current_hours = moment().format("HH");
    let total_hours = moment("23:59:59", "hh:mm:ss").format("HH");
    let deadline_hours = parseInt(total_hours) - parseInt(current_hours);
    console.log(deadline_hours);
    // Deadline Minutes
    let current_minutes = moment().format("MM");
    let total_minutes = moment("23:59:59", "hh:mm:ss").format("MM");
    let deadline_minutes = parseInt(total_minutes) - parseInt(current_minutes);
    console.log(deadline_minutes);

    // Deadline Seconds
    let current_seconds = moment().format("SS");
    let total_seconds = moment("23:59:59", "hh:mm:ss").format("SS");
    let deadline_seconds = parseInt(total_seconds) - parseInt(current_seconds);
    console.log(deadline_seconds);
    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + parseInt(deadline_seconds));
    deadline.setMinutes(deadline.getMinutes() + parseInt(deadline_minutes));
    deadline.setHours(deadline.getHours() + parseInt(deadline_hours));
    return deadline;
  };

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  const onClickReset = () => {
    clearTimer(getDeadTime());
  };
  // const productList = useSelector(data);
  const { loading, error, products } = data;
  const listOfData = [
    // your data array here
  ];

  function CarouselContainer(props) {
    // render the carousel structure
  }

  function renderCard(index, modIndex, cursor) {
    const item = listOfData[modIndex];
    // render the item
  }
  const settings2 = {
    dots: false,
    // infinite: true,
    speed: 500,
    slidesToShow: Flash_Products.length > 7 ? 7 : 6,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 800,
    // rows: 2,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          dots: false,
          infinite: false,
          slidesToShow: Flash_Products.length > 7 ? 7 : 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          dots: false,
          infinite: false,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 680,
        settings: {
          dots: false,
          infinite: false,
          slidesToShow: 2,
        },
      },
    ],
  };

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const items =
    Feature_categories.length > 0
      ? Feature_categories.map((d, i) => (
          <img className="item" data-value="1" src={d.banner} />
        ))
      : [];

  // const items = [
  //   <div
  //     className="container-category"
  //     style={{ display: "flex", marginLeft: "10px", marginTop: "10px" }}
  //   >
  //     <img className="item" data-value="1" src={category1} />
  //     <img className="item" data-value="1" src={category2} />
  //     <img className="item" data-value="1" src={category3} />
  //     {/* <img
  //       className="item"
  //       data-value="1"

  //     <img
  //       className="item"
  //       data-value="1"
  //        */}
  //     <img className="item" data-value="1" src={category6} />
  //     <img className="item" data-value="1" src={category7} />
  //     <img className="item" data-value="1" src={category8} />
  //     <img className="item" data-value="1" src={category9} />
  //     <img className="item" data-value="1" src={category10} />
  //     <img className="item" data-value="1" src={category11} />
  //     <img className="item" data-value="1" src={category12} />
  //     <img className="item" data-value="1" src={category13} />
  //     <img className="item" data-value="1" src={category14} />
  //     <img className="item" data-value="1" src={category15} />
  //     <img className="item" data-value="1" src={category16} />
  //   </div>,
  // ];
  // Flash Deals Timer Function

  return (
    <div>
      <div></div>
      {isloading === true ? (
        <Loading />
      ) : (
        <div className="home-page-container">
          <div>
            <div className="banner-container">
              {BannersThree.length > 0
                ? BannersThree.map((d, i) => (
                    <img style={{ width: "100%" }} src={d.photo} />
                  ))
                : null}
              <Row
                className="desktop-banner"
                style={{ display: "flex", flexWrap: "nowrap" }}
              >
                <Col style={{ padding: "0px", margin: "0px" }} md={7}>
                  <Carousel
                    indicators={false}
                    style={{ height: "100%", width: "100%" }}
                  >
                    {Sliders.length > 0
                      ? Sliders.map((d, i) => (
                          <Carousel.Item className="main_banner">
                            <img
                              style={{ width: "100%", height: "115%" }}
                              className="d-block w-100"
                              src={d.photo}
                              alt="First slide"
                            />
                          </Carousel.Item>
                        ))
                      : null}
                  </Carousel>
                </Col>

                <Col style={{ padding: "0px", margin: "0px" }} md={2}>
                  <Carousel
                    indicators={false}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <Carousel.Item style={{ height: "100%", width: "100%" }}>
                      <img
                        className="sec_banner d-block"
                        src={
                          "https://shop.activeitzone.com/public/uploads/all/Y7IuvQwPLMjN21CRQVnzZX2c3ePzTbNthDCgcPl9.webp"
                        }
                        alt="First slide"
                      />
                    </Carousel.Item>
                  </Carousel>
                </Col>
                <Row className="banner-row">
                  <div style={{ padding: "0px", margin: "0px" }} md={4}>
                    <Col
                      className="slider-2"
                      style={{ padding: "0px", margin: "0px" }}
                      md={4}
                    >
                      <Carousel indicators={false} style={{ width: "72%" }}>
                        {Sliderstwo.length > 0
                          ? Sliderstwo.map((d, i) => (
                              <Carousel.Item>
                                <img
                                  className="third_banner d-block`"
                                  src={d.photo}
                                  alt="First slide"
                                />
                                <Carousel.Caption></Carousel.Caption>
                              </Carousel.Item>
                            ))
                          : null}
                      </Carousel>
                    </Col>
                  </div>
                  <div style={{ padding: "0px", margin: "0px" }} md={4}>
                    <Col
                      className="slider-2"
                      style={{ padding: "0px", margin: "0px" }}
                      md={4}
                    >
                      <Carousel indicators={false} style={{ width: "72%" }}>
                        {Slidersthree.length > 0
                          ? Slidersthree.map((d, i) => (
                              <Carousel.Item>
                                <img
                                  className="third_banner d-block"
                                  src={d.photo}
                                  alt="First slide"
                                />
                                <Carousel.Caption></Carousel.Caption>
                              </Carousel.Item>
                            ))
                          : null}
                      </Carousel>
                    </Col>
                  </div>
                </Row>
              </Row>
              <Row
                className="mobile-banner"
                style={{ display: "flex", flexWrap: "nowrap" }}
              >
                <Col style={{ padding: "0px", margin: "0px" }} md={7}>
                  <Carousel
                    indicators={false}
                    style={{ height: "100%", width: "100%" }}
                  >
                    {Sliders.length > 0
                      ? Sliders.map((d, i) => (
                          <Carousel.Item className="main_banner">
                            <img
                              style={{ width: "100%", height: "100%" }}
                              className="d-block w-100"
                              src={d.photo}
                              alt="First slide"
                            />
                          </Carousel.Item>
                        ))
                      : null}
                  </Carousel>
                </Col>
                <div className="mobile-banners mt-2">
                  <Col style={{ padding: "0px", margin: "0px" }} md={2}>
                    <Carousel
                      indicators={false}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <Carousel.Item style={{ height: "100%", width: "100%" }}>
                        <img
                          className="sec_banner d-block"
                          src={
                            "https://shop.activeitzone.com/public/uploads/all/Y7IuvQwPLMjN21CRQVnzZX2c3ePzTbNthDCgcPl9.webp"
                          }
                          alt="First slide"
                        />
                      </Carousel.Item>
                    </Carousel>
                  </Col>
                  <Row className="banner-row">
                    <div style={{ padding: "0px", margin: "0px" }} md={4}>
                      <Col
                        className="slider-2"
                        style={{ padding: "0px", margin: "0px" }}
                        md={4}
                      >
                        <Carousel indicators={false} style={{ width: "72%" }}>
                          {Sliderstwo.length > 0
                            ? Sliderstwo.map((d, i) => (
                                <Carousel.Item>
                                  <img
                                    className="third_banner d-block`"
                                    src={d.photo}
                                    alt="First slide"
                                  />
                                  <Carousel.Caption></Carousel.Caption>
                                </Carousel.Item>
                              ))
                            : null}
                        </Carousel>
                      </Col>
                    </div>
                    <div style={{ padding: "0px", margin: "0px" }} md={4}>
                      <Col
                        className="slider-2"
                        style={{ padding: "0px", margin: "0px" }}
                        md={4}
                      >
                        <Carousel indicators={false} style={{ width: "72%" }}>
                          {Slidersthree.length > 0
                            ? Slidersthree.map((d, i) => (
                                <Carousel.Item>
                                  <img
                                    className="third_banner d-block"
                                    src={d.photo}
                                    alt="First slide"
                                  />
                                  <Carousel.Caption></Carousel.Caption>
                                </Carousel.Item>
                              ))
                            : null}
                        </Carousel>
                      </Col>
                    </div>
                  </Row>
                </div>
              </Row>

              {/* <TouchCarousel
                component={CarouselContainer}
                cardCount={items.length}
                cardSize={375}
                renderCard={items}
                loop
                autoplay={3000}
              /> */}

              {/* <Featurecategories /> */}

              <AliceCarousel
                disableDotsControls
                disableButtonsControls
                mouseTracking
                items={items}
                responsive={responsive}
                controlsStrategy="alternate"
              />
              {/* <Carousel variant="dark">
          <Carousel.Item>
           
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Second slide&bg=eee"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h5>Second slide label</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Third slide&bg=e5e5e5"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h5>Third slide label</h5>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl
                consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel> */}
              {/* <div
          data-qa="widget_bannerModuleScroller"
          className="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events swiper-container-free-mode"
        >
          <div className="swiper-wrapper" style={{ width: "118.667px" }}>
            <div class="sc-djUGQo idaigz">
              <div class="bannerContainer"></div>
            </div>
          </div>
        </div> */}
            </div>
          </div>
          {/* <div style={{ textAlign: "center" }}>
            {Banners.length > 0
              ? Banners.map((d, i) => <img src={d.photo} />)
              : null}
          </div> */}
          {Flash_Products.length > 0 ? (
            <div className="flashSale">
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="flashSale__container"
              >
                <div style={{ alignItems: "center" }} className="d-flex">
                  <p className="first-title">FLASH DEALS</p>

                  <div className="countdown">
                    <button> {timer.split(":")[0]}</button>
                    <p style={{ margin: "2px", color: "black" }}>:</p>
                    <button>{timer.split(":")[1]}</button>
                    <p style={{ margin: "2px", color: "black" }}>:</p>
                    <button>{timer.split(":")[2]}</button>
                  </div>
                </div>{" "}
                <div className="view-all">View All</div>
              </div>

              <div>
                {" "}
                <hr />{" "}
                <div className="home-product-slider">
                  <div className="flashSale__product">
                    <Slider style={{ width: "100%" }} {...settings2}>
                      {Flash_Products.length > 0
                        ? Flash_Products.map((product) => {
                            return (
                              <FlashProducts
                                key={product.id}
                                product={product}
                              />
                            );
                          })
                        : null}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flashSale">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                  className="flashSale__container"
                >
                  <div className="d-flex">
                    <h4 className="first-title">Best Selling</h4>
                  </div>
                  <div className="view-all">View All</div>
                </div>

                <div>
                  <div className="home-product-slider">
                    <div className="flashSale__product">
                      <Slider style={{ width: "100%" }} {...settings2}>
                        {BestSelling.length > 0
                          ? BestSelling.map((product) => {
                              return (
                                <FlashProducts
                                  key={product.id}
                                  product={product}
                                />
                              );
                            })
                          : null}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div
            className="banners-div"
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            {BannersTwo.length > 0
              ? BannersTwo.map((d, i) => (
                  <img className="banner-small" src={d.photo} />
                ))
              : null}
          </div>
          {FeaturedProducts.length > 0 ? (
            <div className="home-product-slider">
              <h4 className="sec-title">Feature Products</h4>
              <hr />
              <Slider {...settings2}>
                {FeaturedProducts &&
                  FeaturedProducts.map((product) => {
                    return <Product key={product.id} product={product} />;
                  })}
              </Slider>
            </div>
          ) : null}

          <div className="home-product-slider">
            <h4 className="first-title">Recommended for you</h4>
            <hr style={{ margin: "5px" }} />

            <div className="search-product-container">
              {All_Products.length > 0
                ? All_Products.map(
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
                      <AllProducts
                        key={filteredProduct.id}
                        product={filteredProduct}
                      />
                    )
                    // ) : null
                  )
                : null}
            </div>
            <div style={{ textAlign: "center" }}>
              <MDBBtn
                style={{ width: "320px" }}
                outline
                className="mx-2 mt-4"
                color="dark"
                onClick={() => {
                  let next_no = PageNumber + 1;
                  setPageNumber(next_no);
                }}
              >
                {spining === true ? (
                  <MDBSpinner size="sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </MDBSpinner>
                ) : (
                  "Load More"
                )}
              </MDBBtn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
