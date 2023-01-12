import React, { useEffect, useState } from "react";
import "../styles/SearchResults.css";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { listProducts } from "../actions/ProdcutActions";
import PriceCheckBox from "../components/PriceCheckBox";
import { prices } from "../data/priceRanges";
import cat_banner from "../assets/category_banner.avif";
import cat_banner1 from "../assets/category_banner1.avif";
import { Carousel } from "react-bootstrap";
import cat_banner2 from "../assets/category_banner2.avif";
import button from "../assets/button1.avif";
import button2 from "../assets/button2.avif";
import button3 from "../assets/button3.avif";
import cart_card1 from "../assets/cat_card1.avif";
import cart_card2 from "../assets/cat_card2.avif";
import cart_card3 from "../assets/cat_card3.avif";
import cart_card5 from "../assets/cat_card5.avif";
import cart_card6 from "../assets/cat_card6.avif";
import cart_card7 from "../assets/car_cardr.avif";
import category1 from "../assets/category/1.png";
import category2 from "../assets/category/2.png";
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
import menu from "../assets/card.avif";
import menu1 from "../assets/card2.avif";
import menu2 from "../assets/card3.avif";
import { Row, Col } from "react-bootstrap";
import { data } from "../data/data";
import Slide from "react-slick";
import { Select, Radio, InputNumber, Space, Slider, Switch } from "antd";
import AllProducts from "../components/AllProducts";
import FlashProducts from "../components/FlashProducts";
import Loader from "../assets/Loader.gif";
import Loading from "../components/Loading";
import { Pagination } from "antd";
const SearchResults = (props) => {
  const [range, setRange] = useState([0, 50000]);
  const [rating, setrating] = useState("2.5");
  const [Flash_Products, setFlashProducts] = useState([]);
  const [Search_Products, setSearchProducts] = useState([]);
  const [Banners, setBanners] = useState([]);
  const [Brands, setBrands] = useState([]);
  const [categories, setAllcategories] = useState([]);
  const [subcategories, setsubcategories] = useState([]);
  const [categoryid, setcategoryid] = useState("");
  const [search, setsearch] = useState("");
  const [sorttype, setsorttype] = useState("Price Low to High");
  const [isloading, setisloading] = useState(true);
  const [lineloading, setlineloading] = useState(false);
  const [paginate, setpaginate] = useState(1);
  const [lastpage, setlastpage] = useState(1);
  const [startprice, setstartprice] = useState(0);
  const [lastprice, setlastprice] = useState(2000);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  let totals = 0;
  const handleChangeSort = (value) => {
    setsorttype(value);
  };
  useEffect(() => {
    let query = window.location.search.split("=")[1];
    setsearch(query.replace(/%20/g, " "));
    console.log(query.replace(/%20/g, " "));
  }, [null]);
  const category = props.match.params.cat;

  useEffect(() => {
    if (Brands.length > 0)
      console.log(
        Brands.map((d, i) => ({
          label: d.name,
          value: d.name,
        }))
      );
  }, [Brands]);

  async function GetSearchProducts() {
    if (search !== "") {
      let data = { name: search };
      const response = await fetch("http://127.0.0.1:3001/searchproducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      setSearchProducts(result.data);
      console.log("Search Products", result);
      setisloading(false);
    }
  }

  useEffect(() => {
    GetSearchProducts();
  }, [null, search]);
  useEffect(() => {
    GetSubCategories();
  }, [categoryid]);
  async function GetSubCategories() {
    let data = { id: categoryid };
    const response = await fetch("http://127.0.0.1:3001/subcategories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    let result = await response.json();
    setsubcategories(result.data);
    console.log("Sub_Categories", result);
  }

  async function GetCategories() {
    const response = await fetch("http://127.0.0.1:3001/categories", {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let result = await response.json();
    setAllcategories(result.data);
    console.log("Categories", result.data);
  }

  async function GetBrands() {
    const response = await fetch("http://127.0.0.1:3001/brands", {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let result = await response.json();
    setBrands(result.data);
    console.log("Brands", result);
  }
  async function GetFlashProducts() {
    const response = await fetch("http://127.0.0.1:3001/flashdeals", {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let result = await response.json();
    setFlashProducts(result.data);
    console.log("Flash Products", result.data);
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
  useEffect(() => {
    GetBanners();
    GetCategories();
    GetFlashProducts();
    GetBrands();
  }, [null]);

  const handleFilters = (filters) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key].id === parseInt(filters, 10)) {
        array = data[key].array;
      }
    }
    setRange(array);
  };
  const onChange = (value) => {
    console.log(value);
  };
  const onChangeStart = (value) => {
    setstartprice(value);
  };
  const onChangeRating = (value) => {
    setrating(value);
  };
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: "Gucci",
      value: "Gucci",
    });
  }
  const marks = {
    0: "1 star",
    100: "5 star",
  };

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: false,
    autoplaySpeed: 800,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          dots: true,
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          dots: true,
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 680,
        settings: {
          dots: true,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      {(isloading === true) === true ? (
        <Loading />
      ) : (
        <div className="search-page-container">
          <div className="filter-options-container">
            <h5
              style={{ fontWeight: "600", fontSize: "17px" }}
              className="mt-4"
            >
              Fulfillment
            </h5>
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              onChange={handleChange}
              options={[
                {
                  label: "Mall",
                  value: "Mall",
                },
              ]}
            />
            <h5
              style={{ fontWeight: "600", fontSize: "17px" }}
              className="mt-4"
            >
              Category
            </h5>
            <Select
              defaultValue="Select Category"
              style={{
                width: "100%",
              }}
              onChange={(e) =>
                (window.location.href = `/categorybased?id=${e}`)
              }
              options={
                categories.length > 0
                  ? categories.map((d, i) => ({
                      label: d.name,
                      value: d.id,
                    }))
                  : null
              }
            />
            <h5
              style={{ fontWeight: "600", fontSize: "17px" }}
              className="mt-4"
            >
              Brand
            </h5>
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              onChange={handleChange}
              options={
                Brands.length > 0
                  ? Brands.map((d, i) => ({
                      label: d.name,
                      value: d.name,
                    }))
                  : null
              }
            />
            <h5
              style={{ fontWeight: "600", fontSize: "17px" }}
              className="mt-4"
            >
              Price (Rs)
            </h5>
            <Space>
              <InputNumber
                defaultValue={10}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                onChange={(e) => setstartprice(e)}
              />
              To
              <InputNumber
                defaultValue={50000}
                // min={0}
                value={lastprice}
                formatter={(lastprice) =>
                  `${lastprice}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(lastprice) => lastprice.replace(/\$\s?|(,*)/g, "")}
                onChange={(e) => setlastprice(e)}
              />
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setlineloading(true);
                  setTimeout(() => {
                    setlineloading(false);
                  }, 1000);
                }}
              >
                Go
              </span>
            </Space>
            <h5
              style={{ fontWeight: "600", fontSize: "17px" }}
              className="mt-4"
            >
              Produce Rating
            </h5>
            <span style={{ fontSize: "14px", color: "#008c9c" }}>
              {rating} Stars or more
            </span>
            <Slider
              defaultValue={2.5}
              style={{ marginBottom: "5px" }}
              min={0}
              value={rating}
              max={5}
              onChange={onChangeRating}
              step={0.1}
            />
            <div
              style={{
                fontSize: "13px",
                color: "grey",
                display: "flex",
                justifyContent: "space-between",
              }}
              className="d-flex"
            >
              <span>1 star</span> <span>5 star</span>
            </div>
            <h5
              style={{ fontWeight: "600", fontSize: "17px" }}
              className="mt-4"
            >
              Size
            </h5>

            <Radio.Group
              style={{ margin: "5px" }}
              onChange={onChange}
              defaultValue="a"
            >
              <Radio.Button>EU 25</Radio.Button>
            </Radio.Group>
            <Radio.Group
              onChange={onChange}
              defaultValue="a"
              style={{ margin: "5px" }}
            >
              <Radio.Button value="d">EU 20</Radio.Button>
            </Radio.Group>
            <Radio.Group
              style={{ margin: "5px" }}
              onChange={onChange}
              defaultValue="a"
            >
              <Radio.Button value="d">EU 27</Radio.Button>
            </Radio.Group>
            <Radio.Group
              style={{ margin: "5px" }}
              onChange={onChange}
              defaultValue="a"
            >
              <Radio.Button>EU 25</Radio.Button>
            </Radio.Group>
            <Radio.Group
              onChange={onChange}
              defaultValue="a"
              style={{ margin: "5px" }}
            >
              <Radio.Button value="d">EU 20</Radio.Button>
            </Radio.Group>
            <Radio.Group
              style={{ margin: "5px" }}
              onChange={onChange}
              defaultValue="a"
            >
              <Radio.Button value="d">XS</Radio.Button>
            </Radio.Group>
            <Radio.Group
              style={{ margin: "5px" }}
              onChange={onChange}
              defaultValue="a"
            >
              <Radio.Button value="d">S</Radio.Button>
            </Radio.Group>
            <Radio.Group
              style={{ margin: "5px" }}
              onChange={onChange}
              defaultValue="a"
            >
              <Radio.Button value="d">M</Radio.Button>
            </Radio.Group>
            <Radio.Group
              style={{ margin: "5px" }}
              onChange={onChange}
              defaultValue="a"
            >
              <Radio.Button value="d">L</Radio.Button>
            </Radio.Group>
            <Radio.Group
              style={{ margin: "5px" }}
              onChange={onChange}
              defaultValue="a"
            >
              <Radio.Button value="d">XL</Radio.Button>
            </Radio.Group>

            <h5
              style={{ fontWeight: "600", fontSize: "17px" }}
              className="mt-4"
            >
              New Arrival
            </h5>
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              onChange={handleChange}
              options={[
                {
                  label: "Last 30 Days",
                  value: "Last 30 Days",
                },
                {
                  label: "Last 60 Days",
                  value: "Last 60 Days",
                },
              ]}
            />
            <h5
              style={{ fontWeight: "600", fontSize: "17px" }}
              className="mt-4"
            >
              Colors
            </h5>
            <Radio.Group
              style={{ margin: "5px" }}
              onChange={onChange}
              defaultValue="a"
            >
              <Radio.Button>
                <span
                  style={{
                    borderRadius: "3px",
                    marginRight: "7px",
                    padding: "10px",
                    backgroundColor: "black",
                    padding: "1px 13px",
                  }}
                ></span>
                Black
              </Radio.Button>
            </Radio.Group>
            <Radio.Group
              style={{ margin: "5px" }}
              onChange={onChange}
              defaultValue="a"
            >
              <Radio.Button>
                <span
                  style={{
                    borderRadius: "3px",
                    marginRight: "7px",
                    padding: "10px",
                    backgroundColor: "cyan",
                    padding: "1px 13px",
                  }}
                ></span>
                Cyan
              </Radio.Button>
            </Radio.Group>
            <Radio.Group
              style={{ margin: "5px" }}
              onChange={onChange}
              defaultValue="a"
            >
              <Radio.Button>
                <span
                  style={{
                    borderRadius: "3px",
                    marginRight: "7px",
                    padding: "10px",
                    backgroundColor: "blue",
                    padding: "1px 13px",
                  }}
                ></span>
                Blue
              </Radio.Button>
            </Radio.Group>
            <Radio.Group
              style={{ margin: "5px" }}
              onChange={onChange}
              defaultValue="a"
            >
              <Radio.Button>
                <span
                  style={{
                    borderRadius: "3px",
                    marginRight: "7px",
                    padding: "10px",
                    backgroundColor: "yellow",
                    padding: "1px 13px",
                  }}
                ></span>
                Yellow
              </Radio.Button>
            </Radio.Group>
            <h5
              style={{ fontWeight: "600", fontSize: "17px" }}
              className="mt-4"
            >
              Material
            </h5>
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              onChange={handleChange}
              options={[
                {
                  label: "Cotton",
                  value: "Cotton",
                },
                {
                  label: "Cotton Blend",
                  value: "Cotton Blend",
                },
                {
                  label: "Polyster",
                  value: "Polyster",
                },
                {
                  label: "Polyster Brand",
                  value: "Polyster Brand",
                },
                {
                  label: "Combination",
                  value: "Combination",
                },
              ]}
            />
            <h5
              style={{ fontWeight: "600", fontSize: "17px" }}
              className="mt-4"
            >
              Seller
            </h5>
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              onChange={handleChange}
              options={[
                {
                  label: "Orecto Fashion",
                  value: "Orecto Fashion",
                },
                {
                  label: "Orecto Brand",
                  value: "Orecto Brand",
                },
                {
                  label: "Orecto Bazar",
                  value: "Orecto Bazar",
                },
                {
                  label: "AURA",
                  value: "AURA",
                },
                {
                  label: "Appearl LLC",
                  value: "Appearl LLC",
                },
              ]}
            />
          </div>

          <div className="search-page-product-container">
            <>
              {/* <div>
          <h2 className="sec-title">Shop Top Brands</h2>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <img
              style={{ width: "12%" }}
              src="https://f.nooncdn.com/mpcms/EN0002/assets/796cc9bf-b827-406c-872a-82c9d3b21d2d.png"
            />
            <img
              style={{ width: "12%" }}
              src="https://f.nooncdn.com/mpcms/EN0002/assets/0caaa6cf-492d-4f71-9072-c9db442b08bf.png"
            />
            <img
              style={{ width: "12%" }}
              src="https://f.nooncdn.com/mpcms/EN0002/assets/d04d1e6e-3898-43e6-a355-97e57cfa2c3c.png"
            />
            <img
              style={{ width: "12%" }}
              src="https://f.nooncdn.com/mpcms/EN0002/assets/d5dcb3b9-5b6a-4870-b66e-9caba958e039.png"
            />
            <img
              style={{ width: "12%" }}
              src="https://f.nooncdn.com/mpcms/EN0002/assets/025cf731-829b-428c-8cd3-9f8373ff3c8e.png"
            />
            <img
              style={{ width: "12%" }}
              src="https://f.nooncdn.com/mpcms/EN0002/assets/a09e01af-2950-4315-a11e-18f4145a7b82.png"
            />
          </div>
        </div> */}
              {/* .filter(
              (product) =>
                product.category
                  .toLowerCase()
                  .includes(category.toLowerCase()) &&
                product.price <= range[1] &&
                product.price >= range[0]
            ) */}
              <div className="mt-4 filters-searched">
                <div style={{ width: "100%" }}>
                  <span>
                    {Search_Products.length} Search Results for "{search}"
                  </span>
                </div>
                <div
                  style={{
                    width: "100%",
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
                {Search_Products.length > 0
                  ? Search_Products.sort(
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
        </div>
      )}
    </div>
  );
};

export default SearchResults;
