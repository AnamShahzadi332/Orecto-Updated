import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import FreePlan from "../assets/userdashboard/sxFH9r5VnA0Huw7NV0NPS9yudbatp5yoR43nYOtO.png";
import { Card, Row, Col } from "react-bootstrap";

export default function Dashboard() {
  const [authtoken, setauthtoken] = useState("");
  const [email, setemail] = useState("");
  const [loggedin, setloggedin] = useState("");
  const [phone, setphone] = useState("");
  const [name, setname] = useState("");
  const [avatar, setavatar] = useState("");
  const [summary, setsummary] = useState([]);

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
  }, [authtoken]);

  async function Dashboardsummary() {
    if (authtoken === "" || authtoken === null) {
    } else {
      let data = { token: authtoken };
      const response = await fetch("http://127.0.0.1:3001/dashboardsummary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      console.log("Summary is", result);
      setsummary(result);
    }
  }
  return (
    <>
      <div className="m-3 d-flex flex-column" style={{ width: "100%" }}>
        <div style={{ fontSize: "40px", fontWeight: "500" }}>Dashboard</div>
        {/* <div className='d-flex flex-row justify-content-between'>
                <div className='subSection'>
                </div>
                <div className='subSection'>
                </div>
                <div className='subSection'>
                </div>
            </div> */}
        {/* start */}
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body className="card-background">
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <Card.Title as="h4">
                        {summary.cart_item_count} Products
                      </Card.Title>
                      <p className="card-category">In your cart</p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body className="card-background">
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <Card.Title as="h4">
                        {summary.wishlist_item_count} Products
                      </Card.Title>
                      <p className="card-category">In your wishlist</p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Last day
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body className="card-background">
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <Card.Title as="h4">
                        {" "}
                        {summary.order_count} Products
                      </Card.Title>
                      <p className="card-category">your ordered</p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock-o mr-1"></i>
                  In the last hour
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        {/* end */}
        <Row className="mt-3">
          <Col lg="5" sm="6">
            <Card className="card-stats">
              <Card.Body className="card-background">
                <Row>
                  <Col>
                    <p className="card-category" style={{ color: "black" }}>
                      Default Shipping Address
                    </p>
                    <hr />
                  </Col>
                </Row>
              </Card.Body>
              {/* <Card.Footer>
                        <hr></hr>
                        <div className="stats">
                        <i className="fas fa-redo mr-1"></i>
                        Update Now
                        </div>
                    </Card.Footer> */}
            </Card>
          </Col>
          <Col lg="5" sm="6">
            <Card className="card-stats">
              <Card.Body className="card-background">
                <Row>
                  <Col>
                    <p className="card-category" style={{ color: "black" }}>
                      Purchased Package
                    </p>
                    <hr />
                    <p style={{ textAlign: "center" }}>
                      <img
                        src={FreePlan}
                        alt="Service_Plan"
                        style={{ width: "150px" }}
                      />
                    </p>
                    <p
                      style={{
                        textAlign: "center",
                        color: "gray",
                        fontSize: "13px",
                      }}
                    >
                      Product Upload: 3 Times
                    </p>
                    <p
                      style={{
                        textAlign: "center",
                        color: "gray",
                        fontSize: "13px",
                        marginTop: "-10px",
                      }}
                    >
                      Product Upload Remaining: 5 Times
                    </p>
                    <p
                      className="card-category"
                      style={{
                        color: "#0c8c9c",
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "500",
                        display: "none",
                      }}
                    >
                      Package Not Found
                    </p>
                    <p
                      className="card-category"
                      style={{
                        color: "#0c8c9c",
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "500",
                      }}
                    >
                      Current Package: Free
                    </p>
                    <div className="text-center">
                      <button
                        className="btn"
                        style={{ backgroundColor: "#0abb75", color: "white" }}
                      >
                        Upgrade Package
                      </button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
