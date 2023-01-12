import React, { useState, useEffect } from "react";
import "../styles/ManageProfile.css";
import Form from "react-bootstrap/Form";
import { PlusOutlined } from "@ant-design/icons";
import { Card, Row, Col } from "react-bootstrap";
import { EllipsisOutlined } from "@ant-design/icons";
import InputGroup from "react-bootstrap/InputGroup";
import { MDBBtn } from "mdb-react-ui-kit";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import flag from "../assets/pakistan.png";
import { notification, Space } from "antd";
export default function ManageProfile() {
  const [authtoken, setauthtoken] = useState("");
  const [email, setemail] = useState("");
  const [loggedin, setloggedin] = useState("");
  const [phone, setphone] = useState("");
  const [newphone, setnewphone] = useState("");
  const [name, setname] = useState("");
  const [userid, setuserid] = useState("");
  const [avatar, setavatar] = useState("");
  const [newname, setnewname] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [profile, setprofile] = useState();
  const [verificationcode, setverificationcode] = useState("");
  const [passinput, setpassinput] = useState(false);
  const [errorform, seterrorform] = useState(false);
  const [confirmpasserrorform, setconfirmpasserrorform] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Profile Updated",
      description: "Your Profile is successfully updated.",
    });
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    let name = localStorage.getItem("name");
    let avatar = localStorage.getItem("image");
    let user_email = localStorage.getItem("email");
    let phone_no = localStorage.getItem("phone");
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
    setemail(user_email);
    setphone(phone_no);
    setnewphone(phone_no);
    setuserid(user_id);
    console.log(token);
  }, [null]);

  async function Send_Code() {
    console.log(loggedin);
    if (loggedin === true && authtoken.length > 0) {
      let data = { token: authtoken, id: userid, type: "number" };
      const response = await fetch("http://127.0.0.1:3001/resend-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      console.log(result);
    }
  }

  async function EditProfile() {
    if (loggedin === true && authtoken.length > 0) {
      let data = {
        id: userid,
        token: authtoken,
        name: name,
        phone: phone,
        password: password,
      };
      const response = await fetch("http://127.0.0.1:3001/edit-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      console.log(result);
      if (result.result === true) {
        openNotificationWithIcon("success");
      }
    }
  }

  // async function EditProfileImage() {
  //   console.log(loggedin);
  //   if (loggedin === true && authtoken.length > 0) {
  //     let data = {
  //       id: userid,
  //       filename: profile[0].name,
  //       image: profile[0],
  //     };
  //     const response = await fetch("http://127.0.0.1:3001/edit-profile", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     let result = await response.json();
  //     console.log(result);
  //   }
  // }
  useEffect(() => {
    console.log(profile);
  }, [profile]);

  useEffect(() => {
    if (password.length < 8 && password.length > 0) {
      document.getElementById("length-error").style.display = "block";
      seterrorform(true);
    } else {
      document.getElementById("length-error").style.display = "none";
      seterrorform(false);
    }
  }, [password]);

  useEffect(() => {
    if (password !== confirmpassword && confirmpassword.length > 0) {
      document.getElementById("confirm-pass-error").style.display = "block";
      setconfirmpasserrorform(true);
    } else {
      document.getElementById("confirm-pass-error").style.display = "none";
      setconfirmpasserrorform(false);
    }
  }, [confirmpassword, password]);

  return (
    <>
      {contextHolder}
      <div className="m-3 d-flex flex-column" style={{ width: "100%" }}>
        <div style={{ fontSize: "30px", fontWeight: "400" }}>
          Manage Profile
        </div>

        <Card className="card-stats">
          <Card.Body className="card-background">
            <div>
              <div>Basic Info</div>
              <hr />
            </div>
            <div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  type="text"
                  placeholder="Usama Akbar"
                  name="productName"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Your Phone</Form.Label>
                <div className="d-flex">
                  <InputGroup className="mb-3">
                    <div className="dropdown-div">
                      <DropdownButton
                        style={{ padding: "4px 8px" }}
                        className="number_dropdown"
                        variant="outline-secondary"
                        title={
                          <span>
                            <img style={{ width: "25px" }} src={flag} />
                            <span className="ml-1 mr-1"> +92</span>
                          </span>
                        }
                        id="input-group-dropdown-1"
                      >
                        <Dropdown.Item href="#">
                          <img style={{ width: "25px" }} src={flag} /> Pakistan
                          +92
                        </Dropdown.Item>
                      </DropdownButton>
                    </div>
                    <Form.Control
                      value={phone}
                      onChange={(e) => {
                        if (
                          e.target.value.length === 1 &&
                          e.target.value === "0"
                        ) {
                        } else if (e.target.value.length < 11) {
                          setphone(e.target.value);
                        }
                      }}
                      aria-label="Text input with dropdown button"
                    />
                  </InputGroup>

                  {/* {phone === newphone ? null : (
                    <MDBBtn
                      onClick={(Event) => {
                        Event.preventDefault();
                        setpassinput(true);
                        Send_Code();
                      }}
                      className="ml-4"
                    >
                      Verify
                    </MDBBtn>
                  )} */}
                </div>
              </Form.Group>
              {/* {passinput === true ? (
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Enter Verification Code</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      value={verificationcode}
                      onChange={(e) => {
                        if (e.target.value.length < 7) {
                          setverificationcode(e.target.value);
                        }
                      }}
                      type="number"
                      placeholder="Verification Code"
                      name="productName"
                    />
                  </div>
                </Form.Group>
              ) : null} */}

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Photo</Form.Label>
                <Form.Control
                  onChange={(e) => setprofile(e.target.files)}
                  type="file"
                  placeholder="Product Name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Your Password</Form.Label>
                <Form.Control
                  id="pass-error"
                  className={errorform === true ? "pass-error-form" : ""}
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  type="text"
                  placeholder="Your Password"
                  name="productName"
                />
                <div>
                  <span
                    id="length-error"
                    style={{ display: "none" }}
                    className="pass-error"
                  >
                    *Your Password is less than 8 charachters in length
                  </span>
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  className={
                    confirmpasserrorform === true ? "pass-error-form" : ""
                  }
                  value={confirmpassword}
                  onChange={(e) => setconfirmpassword(e.target.value)}
                  type="text"
                  placeholder="Confirm Password"
                  name="productName"
                />
                <div>
                  <span
                    style={{ display: "none" }}
                    id="confirm-pass-error"
                    className="pass-error"
                  >
                    *Your Confirm Password is not same as Password
                  </span>
                </div>
              </Form.Group>
            </div>
          </Card.Body>
        </Card>

        <div className="mt-2" style={{ textAlign: "right" }}>
          <MDBBtn onClick={EditProfile}>Update Profile</MDBBtn>
        </div>

        <Card className="card-stats mt-4">
          <Card.Body className="card-background">
            <div>
              <div>Address</div>
              <hr />
            </div>
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Col lg="5" sm="12">
                <Card>
                  <Card.Body className="card-background">
                    <div className="d-flex justify-content-between">
                      <div>
                        <div style={{ fontWeight: "500", fontSize: "15px" }}>
                          Address:{" "}
                          <span
                            style={{ fontWeight: "400", marginLeft: "5px" }}
                          >
                            Nishter Colony
                          </span>
                        </div>
                        <div style={{ fontWeight: "500", fontSize: "15px" }}>
                          Postal code:{" "}
                          <span
                            style={{ fontWeight: "400", marginLeft: "5px" }}
                          >
                            54000
                          </span>
                        </div>
                        <div style={{ fontWeight: "500", fontSize: "15px" }}>
                          City:{" "}
                          <span
                            style={{ fontWeight: "400", marginLeft: "5px" }}
                          >
                            Lahore
                          </span>
                        </div>
                        <div style={{ fontWeight: "500", fontSize: "15px" }}>
                          State:{" "}
                          <span
                            style={{ fontWeight: "400", marginLeft: "5px" }}
                          >
                            Punjab
                          </span>
                        </div>
                        <div style={{ fontWeight: "500", fontSize: "15px" }}>
                          Country:{" "}
                          <span
                            style={{ fontWeight: "400", marginLeft: "5px" }}
                          >
                            Pakistan
                          </span>
                        </div>
                        <div style={{ fontWeight: "500", fontSize: "15px" }}>
                          Phone:{" "}
                          <span
                            style={{ fontWeight: "400", marginLeft: "5px" }}
                          >
                            03214742469
                          </span>
                        </div>
                      </div>
                      <div>
                        <EllipsisOutlined
                          style={{ fontSize: "20px", cursor: "pointer" }}
                        />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg="5" sm="12">
                <Card>
                  <Card.Body className="card-background">
                    <div className="d-flex justify-content-between">
                      <div>
                        <div style={{ fontWeight: "500", fontSize: "15px" }}>
                          Address:{" "}
                          <span
                            style={{ fontWeight: "400", marginLeft: "5px" }}
                          >
                            Pajian Manik Rd, Lahore, Punjab, Pakistan
                          </span>
                        </div>
                        <div style={{ fontWeight: "500", fontSize: "15px" }}>
                          Postal code:{" "}
                          <span
                            style={{ fontWeight: "400", marginLeft: "5px" }}
                          >
                            54000
                          </span>
                        </div>
                        <div style={{ fontWeight: "500", fontSize: "15px" }}>
                          City:{" "}
                          <span
                            style={{ fontWeight: "400", marginLeft: "5px" }}
                          >
                            Lahore
                          </span>
                        </div>
                        <div style={{ fontWeight: "500", fontSize: "15px" }}>
                          State:{" "}
                          <span
                            style={{ fontWeight: "400", marginLeft: "5px" }}
                          >
                            Punjab
                          </span>
                        </div>
                        <div style={{ fontWeight: "500", fontSize: "15px" }}>
                          Country:{" "}
                          <span
                            style={{ fontWeight: "400", marginLeft: "5px" }}
                          >
                            Pakistan
                          </span>
                        </div>
                        <div style={{ fontWeight: "500", fontSize: "15px" }}>
                          Phone:{" "}
                          <span
                            style={{ fontWeight: "400", marginLeft: "5px" }}
                          >
                            03214742469
                          </span>
                        </div>
                      </div>
                      <div>
                        <EllipsisOutlined
                          style={{ fontSize: "20px", cursor: "pointer" }}
                        />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <div className="d-flex justify-content-center">
              <Row className="mt-3 w-100 justify-content-around">
                <Col lg="6" sm="6">
                  <Card
                    className="card-stats"
                    style={{ backgroundColor: "#f2f3f8", cursor: "pointer" }}
                  >
                    <Card.Body className="text-center">
                      <div className="numbers">
                        <p className="card-category">
                          {/* <imgsrc={DollarSymbol} alt="" /> */}
                          <PlusOutlined
                            style={{ fontSize: "20px", color: "black" }}
                          />
                        </p>
                      </div>
                      <div className="stats" style={{ fontSize: "15px" }}>
                        Add New Address
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>

        <Card className="card-stats mt-4">
          <Card.Body className="card-background">
            <div>
              <div>Change your email</div>
              <hr />
            </div>
            <div>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Your Email</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                    />
                    <InputGroup.Text id="inputGroup-sizing-default">
                      Verify
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Form>
            </div>

            <div className="mt-2" style={{ textAlign: "right" }}>
              <button className="btn btn-md custom-btn">Update Email</button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
