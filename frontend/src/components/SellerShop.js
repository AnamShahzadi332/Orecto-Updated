import React, { useState, useEffect } from "react";
import "../styles/SellerShop.css";
// icons
import Avatar from "../assets/avataar.png";
import ChatNow from "../assets/chatnow.png";
import Store from "../assets/store.png";
// tabs
import { Carousel } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Pagination, Select } from "antd";
import AllProducts from "./AllProducts";
import Loading from "../components/Loading";
import sellerfollow from "../assets/sellerfollow.png";
import sellerchat from "../assets/sellerchat.png";
import share from "../assets/share.png";
export default function SellerShop() {
  const [shop_id, setshop_id] = useState("");
  const [shopdetails, setshopdetails] = useState([]);
  const [Allproducts, setAllproducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [NewArrival, setNewArrival] = useState([]);
  const [paginate, setpaginate] = useState(1);
  const [lastpage, setlastpage] = useState(1);
  const [sorttype, setsorttype] = useState("Price Low to High");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setshop_id(window.location.search.split("?")[1]);
  }, [null]);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const handleChangeSort = (value) => {
    setsorttype(value);
  };
  async function GetShopInfo() {
    setloading(true);

    let data = { id: shop_id };
    if (shop_id !== "") {
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

      const response_featured = await fetch(
        "http://127.0.0.1:3001/shopfeatured",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      let shop_result_featured = await response_featured.json();
      setFeatured(shop_result_featured.data);
      console.log("Feature Products", shop_result_featured.data);
      const response_arrival = await fetch(
        "http://127.0.0.1:3001/shoparrival",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      let shop_result_arrival = await response_arrival.json();
      setNewArrival(shop_result_arrival.data);

      console.log("New Arrival Products", shop_result_arrival.data);
      let info = { id: shop_id, page: paginate };
      const product_response = await fetch(
        "http://127.0.0.1:3001/allproductsofseller",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(info),
        }
      );
      let products_result = await product_response.json();
      setAllproducts(products_result.data);
      setlastpage(products_result.meta.total);
      console.log("Shop All Products", products_result);
    }
    setloading(false);
  }

  useEffect(() => {
    GetShopInfo();
  }, [shop_id]);
  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <div className="container mainDiv">
          <div className="bg-banner">
            <div className="profileDiv bg-white">
              <div className="d-flex flex-row">
                <div className="p-3">
                  <img
                    className="profileDP"
                    src={shopdetails.logo}
                    alt="Profile"
                  />
                </div>
                <div className="p-3">
                  <div
                    className="d-flex flex-column mt-3"
                    style={{ color: "#7f7878" }}
                  >
                    <div
                      className="text-left mb-1"
                      style={{ fontSize: "18px" }}
                    >
                      {shopdetails.name}
                    </div>

                    <div
                      className="text-left mb-1"
                      style={{ fontSize: "10px" }}
                    >
                      4774 Followers
                    </div>
                    <div className="text-left" style={{ fontSize: "10px" }}>
                      84% Positive Seller Ratings
                    </div>
                  </div>
                </div>
                <div className="profileIcons p-3" style={{ color: "#7f7878" }}>
                  <div
                    style={{ display: "flex", justifyContent: "center" }}
                    className="d-flex flex-row justify-center"
                  >
                    <img
                      style={{ height: "30px" }}
                      src={sellerchat}
                      alt="Follow"
                    />
                  </div>
                  <div className="text-center" style={{ marginTop: "-34px" }}>
                    Chat Now
                  </div>
                </div>
                <div className="profileIcons p-3" style={{ color: "#7f7878" }}>
                  <div
                    style={{ display: "flex", justifyContent: "center" }}
                    className="d-flex flex-row"
                  >
                    <img
                      style={{ height: "32px" }}
                      src={sellerfollow}
                      alt="Follow"
                    />
                  </div>
                  <div className="text-center" style={{ marginTop: "-34px" }}>
                    Follow
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ------------- */}
          <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mt-3 mb-3"
          >
            <Tab eventKey="home" title="Homepage">
              <h3 className="mt-4">New Arrivals</h3>
              <hr />
              <div>
                <div className="search-product-container">
                  {NewArrival.length > 0
                    ? NewArrival.map(
                        (filteredProduct) => (
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
                  <Pagination
                    showSizeChanger={false}
                    onChange={(e) => setpaginate(e)}
                    defaultCurrent={1}
                    total={lastpage}
                  />
                </div>
              </div>

              <Carousel
                className="first-courousal"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "95%",
                }}
              >
                {shopdetails.length > 0
                  ? shopdetails.sliders.map((d, i) => (
                      <Carousel.Item>
                        <img
                          style={{ height: "240px" }}
                          className="d-block  w-100"
                          src={d}
                          alt="First slide"
                        />
                      </Carousel.Item>
                    ))
                  : null}
              </Carousel>
            </Tab>
            <Tab eventKey="products" title="All Products">
              <h3>All Products</h3>
              <div>
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    className="mt-4"
                  >
                    <div>
                      <span className="all-prod">
                        All Products from "{shopdetails.name}"
                      </span>
                    </div>
                    <div
                      style={{
                        width: "40%",
                        display: "flex",
                        justifyContent: "flex-end ",
                      }}
                      className="d-flex"
                    >
                      <div
                        style={{
                          marginRight: "5%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ width: "100%", marginRight: "20px" }}>
                          Sort By
                        </span>
                        <Select
                          defaultValue="Price Low to High"
                          style={{
                            width: "140%",
                          }}
                          onChange={handleChangeSort}
                          options={[
                            {
                              value: "RECOMMENDED",
                              label: "Recomended",
                            },
                            {
                              value: "Price High to Low",
                              label: "Price High to Low",
                            },
                            {
                              value: "Price Low to High",
                              label: "Price Low to High",
                            },

                            {
                              value: "Rating High to Low",
                              label: "Rating High to Low",
                            },
                          ]}
                        />
                      </div>

                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ width: "100%", marginRight: "20px" }}>
                          Display
                        </span>
                        <Select
                          defaultValue="50 PER PAGE"
                          style={{
                            width: "80%",
                          }}
                          onChange={handleChange}
                          options={[
                            {
                              value: "50 PER PAGE",
                              label: "50 PER PAGE",
                            },
                            {
                              value: "100 PER PAGE",
                              label: "100 PER PAGE",
                            },
                            {
                              value: "150 PER PAGE",
                              label: "150 PER PAGE",
                            },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="search-product-container">
                    {Allproducts.length > 0
                      ? Allproducts.sort(
                          sorttype === "Price High to Low"
                            ? (a, b) =>
                                parseFloat(
                                  b.main_price
                                    .split("s")[1]
                                    .replace(/,(?=\d{3})/g, "")
                                ) >
                                parseFloat(
                                  a.main_price
                                    .split("s")[1]
                                    .replace(/,(?=\d{3})/g, "")
                                )
                                  ? 1
                                  : -1
                            : (a, b) =>
                                parseFloat(
                                  a.main_price
                                    .split("s")[1]
                                    .replace(/,(?=\d{3})/g, "")
                                ) >
                                parseFloat(
                                  b.main_price
                                    .split("s")[1]
                                    .replace(/,(?=\d{3})/g, "")
                                )
                                  ? 1
                                  : -1
                        ).map(
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
                    <Pagination
                      showSizeChanger={false}
                      onChange={(e) => setpaginate(e)}
                      defaultCurrent={1}
                      total={lastpage}
                    />
                  </div>
                </>
              </div>
            </Tab>
            <Tab eventKey="contact" title="Profile">
              <h3>Profile</h3>
            </Tab>
          </Tabs>
        </div>
      )}
    </>
  );
}
