import React, { useState, useEffect } from "react";
import "../styles/MyFooter.css";
// import OrectoLogo from "../assets/Orecto-Logo-White.png";
// import WorkIcon from "@mui/icons-material/Work";
// import Visa from "../assets/visa.png";
// import Seller from "../assets/seller.png";
import { Row, Col, Container, Button } from "react-bootstrap";
import MasterCard from "../assets/mastercard.png";
import OrectoLogo from "../assets/logo.svg";
import DebitCard from "../assets/debitcard.png";
import JazzCash from "../assets/Jazzcash.png";
import EasyPaisa from "../assets/easypaisa.png";
import CashonDelivery from "../assets/cashondelivery.png";
import info from "../assets/info.png";
import email from "../assets/email.png";
// ------------------
import Facebook from "../assets/facebook.png";
import Twitter from "../assets/twitter.png";
import LinkedIn from "../assets/linkedin.png";
import Instagram from "../assets/instagram.png";
import Youtube from "../assets/youtube.png";
import Snapchat from "../assets/snapchat.png";
import Snackvideo from "../assets/snackvideo.png";
import Tiktok from "../assets/tiktok.png";
import { MDBBtn } from "mdb-react-ui-kit";
// import Pinterest from "../assets/pinterest.png";

export default function MyFooter() {
  const [categories, setcategories] = useState([]);
  const [sub_categories, setsub_categories] = useState([]);
  async function GetCategories() {
    console.log("categpry started");
    const response = await fetch("http://127.0.0.1:3001/categories", {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let result = await response.json();
    if (result.data.length > 0) {
      setcategories(result.data);
      // result.data.map((d, i) => SubCategories(d.id));
      console.log("Categories", result.data);
    } else {
      console.log("NOT FOUND");
    }
  }
  async function SubCategories(ID) {
    let data = {
      id: ID,
    };
    const response = await fetch("http://127.0.0.1:3001/subcategories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    let result = await response.json();
    setsub_categories(result.data);
    console.log("Sub Categories are", result);
  }

  useEffect(() => {
    GetCategories();
  }, [null]);
  return (
    <>
      <div className="FooterMiddleSection">
        <div className="bottom-menus row">
          <hr className="footer-seoerater" />
          <div className="mobile-width col-5 col-sm-5 col-md-5 col-lg-4 col-xl-4 col-xxl-3">
            <div className="FooterMiddleHeading">We're Always Here To Help</div>
            <p className="detail-footer">
              Reach out to us through any of these support channels
            </p>
            {/* <div className="paymentMethod mt-3">
              <img src={CashonDelivery} alt="Cash On Delivery" />
              <img src={DebitCard} alt="Debit Card" />
              <img src={MasterCard} alt="Master Card" />
              <img src={EasyPaisa} alt="Easy Paisa" />
              <img src={JazzCash} alt="Jazzcash Card" />
            </div> */}
          </div>
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="mobile-width col-5 col-sm-5 col-md-5 col-lg-4 col-xl-4 col-xxl-3"
          >
            {/* <div className="FooterMiddleHeading text-left md:text-center lg:text-center">
              &copy; Orecto 2022
            </div> */}
          </div>
          <div className="mobile-width col-5 col-sm-5 col-md-5 col-lg-3 col-xl-3 col-xxl-2">
            <div className="help-div">
              <div className="email-border">
                <img style={{ width: "25px" }} src={email} />
              </div>
              <div>
                <div className="FooterMiddleHeading-HELP">EMAIL SUPPORT</div>
                <div className="FooterMiddleHeading-HELPLink">
                  cs@orecto.com
                </div>
              </div>
            </div>
            {/* <div className="d-flex SocialIcons mt-3">
              <img src={Facebook} alt="Facebook" />
              <img src={Twitter} alt="Twitter" />
              <img src={LinkedIn} alt="Linked In" />
              <img src={Instagram} alt="Instagram" />
              <img src={Youtube} alt="Youtube" />
              <img src={Snapchat} alt="Snapchat" />
              <img src={Snackvideo} alt="Snackvideo" />
              <img src={Tiktok} alt="Tiktok" />
            </div> */}
          </div>
          <div className="mobile-width col-5 col-sm-5 col-md-5 col-lg-3 col-xl-3 col-xxl-2">
            <div className="help-div">
              <div className="info-border">
                <img style={{ width: "30px" }} src={info} />
              </div>
              <div>
                <div className="FooterMiddleHeading-HELP">HELP CENTER</div>
                <div className="FooterMiddleHeading-HELPLink">
                  034-1112-4444
                </div>
              </div>
            </div>
            {/* <div style={{ fontSize: "20px", fontWeight: "bold" }}>
              Download Now
            </div>
            <div className="d-flex flex-row mt-3">
              <img
                style={{ height: "35px", cursor: "pointer" }}
                src="https://orecto.pk/public/assets/img/play.png"
                alt=""
              />
              <img
                style={{
                  marginLeft: "10px",
                  height: "35px",
                  cursor: "pointer",
                }}
                src="https://orecto.pk/public/assets/img/app.png"
                alt=""
              />
            </div> */}
          </div>
        </div>
      </div>
      <div style={{ marginTop: "0%" }} className="p-5 bg-custom footer-details">
        <div className="FooterUpperSection">
          <div className="d-flex flex-column">
            <div className="MyFooterHeading">Registered Office Address:</div>
            <div className="d-flex flex-column">
              <div className="myFooterLinks">
                VOH Technologies (SMC-Private) Limited 2022
              </div>
              <div className="myFooterLinks">
                Third Floor 122/2h H Block DHA Phase 1 Lahore,
              </div>
              <div className="myFooterLinks">
                2nd Floor CCA 100 DD Block DHA Phase 4 Lahore
              </div>
              <div className="myFooterLinks"></div>
              <div className="myFooterLinks">Lahore, 54000,</div>
              <div className="myFooterLinks">Punjab, Pakistan</div>
              <div className="myFooterLinks"></div>
              <div className="myFooterLinks">Telephone: 034-1112-4444</div>
            </div>
          </div>
          <div className="d-flex flex-column mt-1">
            <div className="MyFooterHeading">About</div>
            <div className="d-flex flex-column">
              <div className="myFooterLinks">About Us</div>

              <div className="myFooterLinks">Terms and Conditions</div>

              <div className="myFooterLinks">Blog</div>
              <div className="myFooterLinks">Join Affiliate Program</div>
            </div>
          </div>
          {/* <div className="d-flex flex-column mt-1">
            <div className="MyFooterHeading">Help</div>
            <div className="d-flex flex-column">
              <div className="myFooterLinks">Payment Policy</div>
              <div className="myFooterLinks">Shipping</div>
              <div className="myFooterLinks">Cancellation & Returns</div>
              <div className="myFooterLinks">FAQ</div>
              <div className="myFooterLinks">Report Infringement</div>
            </div>
          </div> */}
          <div className="d-flex flex-column mt-1">
            <div className="MyFooterHeading">Policy</div>
            <div className="d-flex flex-column">
              <div className="myFooterLinks">Seller Policy</div>
              <div className="myFooterLinks">Privacy Policy</div>
              <div className="myFooterLinks">Terms and Conditions</div>
              <div className="myFooterLinks">Warranty Policy</div>
              <div className="myFooterLinks">Return Policy</div>
            </div>
          </div>
          <div className="d-flex flex-column mt-1">
            <div className="MyFooterHeading">
              <img
                style={{ height: "50px", width: "200px" }}
                src={OrectoLogo}
                alt=""
              />
            </div>
            <div className="d-flex flex-column">
              <div className="myFooterDescription">
                Our vision was to provide a safe, efficient <br /> online
                marketplace platform for vendors and
                <br />
                customers across the country to come together.
                <br /> We work tirelessly to make sure that we <br />
                provide users with the best online shopping
                <br /> experience and value for their purchases.
              </div>
            </div>
            <div className="mt-4">
              <Button
                onClick={() =>
                  (window.location.href = "https://orecto.pk/shops/create")
                }
                className="BecomeSeller"
              >
                Become a Seller
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mainSEOFooter">
        <Container style={{ padding: "0px" }} fluid>
          <Row
            style={{ backgroundColor: "#414553", color: "white" }}
            className="text-left p-4"
          >
            <Col xs={12} sm={12} md={6} lg={3} xl={3} xxl={3}>
              <h5 className="footerSEOHeading">
                How Orecto Transformed Online Shopping in Pakistan
              </h5>
              <p className="footerSEOText">
                Orecto first made waves in Pakistan’s e-commerce market after
                its introduction in 2012. We have since grown to become
                Pakistan’s largest platform for online shopping with a network
                spread across Asia in Pakistan, Bangladesh, Sri Lanka, Myanmar,
                and Orecto.com.np. Our vision was to provide a safe, efficient
                online marketplace platform for vendors and customers across the
                country to come together. We started off exclusively as an
                online fashion retail platform and over the years expanded to
                become a complete one-stop solution for all your buying needs.
                Orecto prides itself on not being just another ecommerce venture
                in Asia. We work tirelessly to make sure that we provide users
                with the best online online shopping experience and value for
                their purchases. Whether you shop online through our website or
                our online shopping mobile App, you can expect easy navigation,
                customized recommendations, and a smooth online shopping
                experience guaranteed.
              </p>
              <h5 className="footerSEOHeading">
                What Makes Us Different from Other Online Shopping Platforms?
              </h5>
              <div className="footerSEOText">
                <div className="font-weight-bold">
                  Select from the Largest Online Marketplace in Pakistan
                </div>
                <div>
                  With over 15 million products to select from, Orecto offers
                  its customers the most comprehensive listing of products in
                  the country. Whether you’re looking for electronics, apparel,
                  appliances, or groceries – there is something for everyone.
                </div>
                <div className="font-weight-bold">Hassle Free Delivery</div>
                <div>
                  Online shopping is only as good as its execution and Orecto
                  promises hassle free delivery right from the moment you order
                  to when your package is dropped at your door. We cater to both
                  major and smaller cities alike, and give you the choice to
                  track your package as it makes its way to you so you always
                  know your order status. If you are unsatisfied with any aspect
                  of your order, we have a simple 7-day return or exchange
                  policy.
                </div>
                <div className="font-weight-bold">
                  Payment Options to Suit Every Style
                </div>
                <div>
                  You can choose to pay through a credit/debit card, opt for
                  cash on delivery or even go for EMI (easy monthly
                  instalments). You can also avail exclusive offers by
                  downloading Orecto Wallet – a closed loop digital wallet that
                  offers you a secure, easy way to make payments. We also have
                  easypaisa & jazzcash payment method for our customers' ease
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={3} xl={3} xxl={3}>
              <h5 className="footerSEOHeading">Shop from Verified Vendors</h5>
              <p className="footerSEOText">
                Orecto understands that online shopping in Pakistan comes with
                its fair share of risks. This is why with Orecto Marketplace and
                Orecto Mall customers have the security of choosing from
                verified vendors and brands from Karachi, Lahore, Islamabad and
                all across Pakistan. Now you’ll never have to second guess
                authenticity because Orecto makes sure to do it for you!
              </p>

              <div className="footerSEOText">
                <div className="font-weight-bold">
                  Shop Around the World with Orecto Global Collection
                </div>
                <div>
                  International sellers and local convenience come together with
                  Orecto Global collection. Get the chance to shop online from
                  vendors around the world without leaving the Orecto website.
                  Featuring thousands of novelty gadgets and accessories, Orecto
                  Global Collection offers you a selection of products that you
                  won’t find anywhere else when you’re online shopping in
                  Pakistan.
                </div>
                <div className="mt-2 font-weight-bold">
                  Avail Exclusive Discounts, Offers, and Promotions
                </div>
                <div>
                  Online shopping with Orecto means you get the chance to avail
                  exclusive online-only promotional packages as well as discount
                  vouchers from our vendors when you shop from their pages. Our
                  flash sales give you customized product offers all curated
                  with the help of our advanced AI technology so you always have
                  deals you’ll actually be interested in!
                </div>
                <div className="mt-2 font-weight-bold">
                  Buy Value, not Just Goods with Orecto Care
                </div>
                <div>
                  Orecto does not just cater online shopping in Pakistan but
                  also aims to simplify the way you give back to society. With
                  charities spanning across sectors of education, health care,
                  environmental preservation, and shelters, you can choose to
                  make a big difference with a few, simple clicks.
                </div>
                <div className="mt-2 font-weight-bold">
                  Simplify Corporate Purchases
                </div>
                <div>
                  Who says corporate purchases need to be a complicated affair?
                  When you opt for Orecto Corporate, you get an efficient and
                  transparent solution for your business’ bulk purchasing needs.
                  We’re proud to be working with some of the most prestigious
                  organizations in Pakistan across a number of different
                  industries.
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={3} xl={3} xxl={3}>
              <h5 className="footerSEOHeading">Top Categories & Brands</h5>

              <p
                style={{
                  margin: "0px",
                  fontWeight: "700",
                  fontSize: "11px",
                }}
              >
                Electronics & Mobile
              </p>
              <p className="footerSEOText">Mobile & Accessories</p>
              {/* <p className="footerSEOText">
                Orecto first made waves in Pakistan’s e-commerce market after
                its introduction in 2012. We have since grown to become
                Pakistan’s largest platform for online shopping with a network
                spread across Asia in Pakistan, Bangladesh, Sri Lanka, Myanmar,
                and Orecto.com.np. Our vision was to provide a safe, efficient
                online marketplace platform for vendors and customers across the
                country to come together. We started off exclusively as an
                online fashion retail platform and over the years expanded to
                become a complete one-stop solution for all your buying needs.
                Orecto prides itself on not being just another ecommerce venture
                in Asia. We work tirelessly to make sure that we provide users
                with the best online online shopping experience and value for
                their purchases. Whether you shop online through our website or
                our online shopping mobile App, you can expect easy navigation,
                customized recommendations, and a smooth online shopping
                experience guaranteed.
              </p>
              <h5 className="footerSEOHeading">
                What Makes Us Different from Other Online Shopping Platforms?
              </h5>
              <div className="footerSEOText">
                <div className="font-weight-bold">
                  Select from the Largest Online Marketplace in Pakistan
                </div>
                <div>
                  With over 15 million products to select from, Orecto offers
                  its customers the most comprehensive listing of products in
                  the country. Whether you’re looking for electronics, apparel,
                  appliances, or groceries – there is something for everyone.
                </div>
                <div className="font-weight-bold">
                  Select from the Largest Online Marketplace in Pakistan
                </div>
                <div>
                  With over 15 million products to select from, Orecto offers
                  its customers the most comprehensive listing of products in
                  the country. Whether you’re looking for electronics, apparel,
                  appliances, or groceries – there is something for everyone.
                </div>
                <div className="font-weight-bold">
                  Select from the Largest Online Marketplace in Pakistan
                </div>
                <div>
                  With over 15 million products to select from, Orecto offers
                  its customers the most comprehensive listing of products in
                  the country. Whether you’re looking for electronics, apparel,
                  appliances, or groceries – there is something for everyone.
                </div> */}
              {/* </div> */}
            </Col>
            <Col
              style={{ width: "23%" }}
              xs={12}
              sm={12}
              md={6}
              lg={2}
              xl={2}
              xxl={2}
            >
              <h5 className="footerSEOHeading">
                How Orecto Transformed Online Shopping in Pakistan
              </h5>
              <p className="footerSEOText">
                Orecto first made waves in Pakistan’s e-commerce market after
                its introduction in 2012. We have since grown to become
                Pakistan’s largest platform for online shopping with a network
                spread across Asia in Pakistan, Bangladesh, Sri Lanka, Myanmar,
                and Orecto.com.np. Our vision was to provide a safe, efficient
                online marketplace platform for vendors and customers across the
                country to come together. We started off exclusively as an
                online fashion retail platform and over the years expanded to
                become a complete one-stop solution for all your buying needs.
                Orecto prides itself on not being just another ecommerce venture
                in Asia. We work tirelessly to make sure that we provide users
                with the best online online shopping experience and value for
                their purchases. Whether you shop online through our website or
                our online shopping mobile App, you can expect easy navigation,
                customized recommendations, and a smooth online shopping
                experience guaranteed.
              </p>
              <h5 className="footerSEOHeading">
                What Makes Us Different from Other Online Shopping Platforms?
              </h5>
              <div className="footerSEOText">
                <div className="font-weight-bold">
                  Select from the Largest Online Marketplace in Pakistan
                </div>
                <div>
                  With over 15 million products to select from, Orecto offers
                  its customers the most comprehensive listing of products in
                  the country. Whether you’re looking for electronics, apparel,
                  appliances, or groceries – there is something for everyone.
                </div>
                <div className="font-weight-bold">
                  Select from the Largest Online Marketplace in Pakistan
                </div>
                <div>
                  With over 15 million products to select from, Orecto offers
                  its customers the most comprehensive listing of products in
                  the country. Whether you’re looking for electronics, apparel,
                  appliances, or groceries – there is something for everyone.
                </div>
                <div className="font-weight-bold">
                  Select from the Largest Online Marketplace in Pakistan
                </div>
                <div>
                  With over 15 million products to select from, Orecto offers
                  its customers the most comprehensive listing of products in
                  the country. Whether you’re looking for electronics, apparel,
                  appliances, or groceries – there is something for everyone.
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
// SocialIcons
