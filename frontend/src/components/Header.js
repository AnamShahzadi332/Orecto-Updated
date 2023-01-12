import React, { useEffect, useState, useCallback, useRef } from "react";
import { Link, Router } from "react-router-dom";
import "../styles/Header.css";
import dropdown_arrow from "../assets/dropdownArrow.svg";
import { signin, signout } from "../actions/USerAction";
import profile from "../assets/profile.png";
import order from "../assets/order.png";
import fav from "../assets/heart.png";
import pakistan_flag from "../assets/pakistan.png";
import search from "../assets/search.svg";
import dropdownimg from "../assets/dropdown.svg";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import mobile from "../assets/mobike.jpg";
import logo from "../assets/logo.svg";
import cart_logo from "../assets/cart.svg";
import "rsuite/dist/rsuite.min.css";
import orectosvg from "../assets/orectosvg.svg";
import { Dropdown, DropdownButton } from "react-bootstrap";
import List from "@material-ui/core/List";
import cart_img from "../assets/empty-cart.png";
import ReactInputVerificationCode from "react-input-verification-code";
import { Rate, Progress, notification, Space } from "antd";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import {
  Button,
  Grid,
  Box,
  Dialog,
  TextField,
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import {
  LoginSocialGoogle,
  LoginSocialAmazon,
  LoginSocialFacebook,
  LoginSocialGithub,
  LoginSocialInstagram,
  LoginSocialLinkedin,
  LoginSocialMicrosoft,
  LoginSocialPinterest,
  LoginSocialTwitter,
  LoginSocialApple,
  IResolveParams,
} from "reactjs-social-login";

import {
  FacebookLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
  AmazonLoginButton,
  InstagramLoginButton,
  LinkedInLoginButton,
  MicrosoftLoginButton,
  TwitterLoginButton,
  AppleLoginButton,
} from "react-social-login-buttons";
import { UserOutlined } from "@ant-design/icons";
import ProfileIconForNav from "../assets/user.png";
import OrdersListForNav from "../assets/to-do-list.png";
import trash from "../assets/trash.png";
const Header = (props) => {
  const [api, contextHolder] = notification.useNotification();
  const [dropdown, setDropDown] = useState(false);
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [avatar, setavatar] = useState("");
  const [password, setpassword] = useState("");
  const [authtoken, setauthtoken] = useState("");
  const [loggedin, setloggedin] = useState(false);
  const [userdetails, setuserdetails] = useState([]);
  const [secondDropdown, setSecondDropdown] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [query, setQuery] = useState("");
  const [AllCategories, setAllcategories] = useState([]);
  const [newuserdetails, setnewuserdetails] = useState([]);
  const [cartdetails, setcartdetails] = useState([]);
  const [newname, setnewname] = useState("");
  const [newemail, setnewemail] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [newphone, setnewphone] = useState("");
  const [phoneError, setphoneError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const [nameError, setnameError] = useState(false);
  const [otp, setotp] = useState("");
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
    setTimer("00:60");

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

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 60);
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
  const openNotification_Error = () => {
    api["error"]({
      message: "Error",
      description: "User not found.",
    });
  };

  const openNotification_VerifyError = () => {
    api["error"]({
      message: "Error",
      description: "User not verified.",
    });
  };
  const openNotification_OTPVerifyError = () => {
    api["error"]({
      message: "Error",
      description: "OTP is incorrect.",
    });
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    let name = localStorage.getItem("name");
    let avatar = localStorage.getItem("image");
    console.log(token);
    if (token === null || token === "" || token === "undefined") {
      setloggedin(false);
    } else {
      setloggedin(true);
    }

    setname(name);
    setavatar(avatar);
    setauthtoken(token);
    console.log(token);
  }, [null]);
  async function GetCategories() {
    console.log("categpry started");
    const response = await fetch("http://127.0.0.1:3001/categories", {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let result = await response.json();
    setAllcategories(result.data);
    console.log("Categories", result.data);
  }
  async function LogIN() {
    if (email.length === 0) {
      setphoneError(true);
      setTimeout(() => {
        setphoneError(false);
      }, 2000);
    } else if (password.length === 0) {
      setpasswordError(true);
      setTimeout(() => {
        setpasswordError(false);
      }, 2000);
    } else {
      let data = {
        email: email,
        password: password,
        identity_matrix: "AIzaSyBV4kEA8pVM3uEsz5bwIWmgdtHEOKNgsCU",
      };
      const response = await fetch("http://127.0.0.1:3001/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      console.log("User Details are", result);
      if (result.message === "Unauthorized") {
        openNotification_Error();
      } else if (result.message === "Please verify your account") {
        openNotification_VerifyError();
      } else {
        setname(result.user.name);
        localStorage.setItem("token", result.access_token);
        localStorage.setItem("id", result.user.id);
        localStorage.setItem("name", result.user.name);
        localStorage.setItem("image", result.user.avatar);
        localStorage.setItem("email", result.user.email);
        localStorage.setItem("phone", result.user.phone);
        setauthtoken(result.access_token);
        setuserdetails(result.user);
        if (result.result === true) {
          setloggedin(true);
          setBasicModalTwo(false);
          setBasicModal(false);
        } else {
          setloggedin(false);
        }
      }
    }
  }

  useEffect(() => {
    if (props.require === true) toggleShowTwo();
  }, [props.require]);

  async function Cart() {
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
      if (result.length === 0 || result.message === "Unauthenticated.") {
        console.log("cart is empty");
      } else {
        setcartdetails(result[0].cart_items[0]);
      }
      console.log("cart", result);
    }
  }

  useEffect(() => {
    Cart();
  }, [authtoken, loggedin]);

  async function LogOut() {
    let data = {
      token: authtoken,
    };
    const response = await fetch("http://127.0.0.1:3001/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    let result = await response.json();
    console.log(result);
    localStorage.setItem("token", "");
    setloggedin(false);
    localStorage.setItem("token", "");
    localStorage.setItem("id", "");
    localStorage.setItem("name", "");
    localStorage.setItem("image", "");
    localStorage.setItem("email", "");
    handleClose();
  }
  const [provider, setProvider] = useState("");
  const [Profile, setProfile] = useState("");
  const [FacebookProfile, setFacebookProfile] = useState("");

  useEffect(() => {
    if (Profile !== "") GoogleSocialsignin(Profile);
  }, [Profile]);
  useEffect(() => {
    if (FacebookProfile !== "") FacebookSocialsignin(profile);
  }, [FacebookProfile]);

  async function GoogleSocialsignin(profile_data) {
    console.log(profile_data);
    let data = {
      access_token: profile_data.access_token,
      name: profile_data.name,
      email: profile_data.email,
      provider: profile_data.sub,
      social_provider: "google",
    };
    const response = await fetch("http://127.0.0.1:3001/social-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    let result = await response.json();
    console.log("GOOGLE PROFILE IS", result);
    setname(profile_data.name);
    localStorage.setItem("token", result.access_token);
    localStorage.setItem("id", result.user.id);
    localStorage.setItem("name", result.user.name);
    localStorage.setItem("image", result.user.avatar);
    localStorage.setItem("email", result.user.email);
    localStorage.setItem("phone", result.user.phone);
    setauthtoken(profile_data.access_token);
    setuserdetails(result.user);
    if (result.result === true) {
      setloggedin(true);
      setBasicModalTwo(false);
      setBasicModal(false);
    } else {
      setloggedin(false);
    }
  }
  async function FacebookSocialsignin(profile_data) {
    console.log(profile_data);
    let data = {
      access_token: profile_data.access_token,
      name: profile_data.name,
      email: profile_data.email,
      provider: profile_data.sub,
      social_provider: "facebook",
    };
    const response = await fetch("http://127.0.0.1:3001/social-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    let result = await response.json();
    localStorage.setItem("token", result.access_token);
    localStorage.setItem("id", result.user.id);
    localStorage.setItem("name", result.user.name);
    localStorage.setItem("image", result.user.avatar);
    localStorage.setItem("email", result.user.email);
    localStorage.setItem("phone", result.user.phone);
    setauthtoken(result.access_token);
    setuserdetails(result.user);
    if (result.result === true) {
      setloggedin(true);
      toggleShowTwo();
    } else {
      setloggedin(false);
    }
  }

  async function SignUp() {
    if (newname.length === 0) {
      setnameError(true);
      setTimeout(() => {
        setnameError(false);
      }, 2000);
    } else if (newemail.length === 0 && newphone.length === 0) {
      setphoneError(true);
      setTimeout(() => {
        setphoneError(false);
      }, 2000);
    } else if (newpassword.length === 0) {
      setpasswordError(true);
      setTimeout(() => {
        setpasswordError(false);
      }, 2000);
    } else {
      let data = {
        name: newname,
        value: newemail,
        password: newpassword,
        type: switchlogin === false ? "phone" : "email",
      };
      const response = await fetch("http://127.0.0.1:3001/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      console.log(result);
      setnewuserdetails(result);
      toggleShow();
      toggleShowThree();
      onClickReset();
    }
  }

  async function VerifyOTP() {
    let data = {
      id: newuserdetails.user_id,
      otp: otp,
    };
    const response = await fetch("http://127.0.0.1:3001/verify-otp", {
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
      toggleShowThree();
      toggleShowTwo();
    } else {
      openNotification_OTPVerifyError();
    }
  }
  useEffect(() => {
    GetCategories();
    let search = localStorage.getItem("query");
    setQuery(search);
  }, [null]);

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };
  const handleClickOpenReg = () => {
    setOpen(true);
    handleJustifyClick("tab2");
  };
  const handleClickOpen = () => {
    setOpen(true);
    handleJustifyClick("tab1");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const showDropDown = () => {
    if (dropdown) setDropDown(false);
    else setDropDown(true);
  };

  const showSecondDropDown = () => {
    if (secondDropdown) setSecondDropdown(false);
    else setSecondDropdown(true);
  };

  async function DeleteCartItem(ID) {
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
    Cart();
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      localStorage.setItem("query", query);
      window.location.href = `/searchresults?name=${query}`;
    }
  };

  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  const [basicModalTwo, setBasicModalTwo] = useState(false);
  const [basicModalThree, setBasicModalThree] = useState(false);
  const toggleShowTwo = () => setBasicModalTwo(!basicModalTwo);
  const toggleShowThree = () => setBasicModalThree(!basicModalThree);

  const [isChecked, setIsChecked] = useState(true);

  const [phoneNoField, setPhoneNoField] = useState("flex");
  const [emailField, setEmailField] = useState("none");
  const [buttonSwitchField, setButtonSwitchField] = useState("Email");
  const [switchlogin, setswitchlogin] = useState(true);

  function handleRegistrationField() {
    setswitchlogin(!switchlogin);
  }
  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  const REDIRECT_URI = "";
  return (
    <header>
      {contextHolder}
      <div className="container-main">
        <div className="inner-content">
          <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
            <MDBModalDialog className="modal-dialog">
              <MDBModalContent className="modal-content">
                <MDBModalHeader className="modal-header">
                  <div className="d-flex flex-row justify-content-between w-100">
                    <div
                      style={{
                        fontSize: "19px",
                        fontWeight: "600",
                        color: "rgb(64, 69, 83)",
                      }}
                    >
                      Create an account
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      <div className="mr-1">Already have an account?</div>
                      <div
                        onClick={() => {
                          toggleShowTwo();
                          toggleShow();
                        }}
                        style={{
                          fontWeight: "600",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        Sign In
                      </div>
                    </div>
                  </div>
                </MDBModalHeader>
                <MDBModalBody className="modal-body">
                  <div className="d-flex flex-row justify-content-between">
                    <div className="m-2 w-50">
                      <div
                        id="fullName-style"
                        className={
                          nameError === true
                            ? `formDiv-error d-flex flex-column`
                            : `formDiv d-flex flex-column`
                        }
                      >
                        <label htmlFor="">Full Name*</label>
                        <input
                          value={newname}
                          onChange={(e) => setnewname(e.target.value)}
                          className="input_fields_settings"
                          type="text"
                        />
                      </div>
                      {switchlogin === false ? (
                        <div
                          id="phone-style"
                          className={
                            phoneError === true
                              ? `formDiv-error d-flex flex-column`
                              : `formDiv d-flex flex-column`
                          }
                        >
                          <label htmlFor="">Phone No*</label>
                          <input
                            value={newphone}
                            onChange={(e) => setnewphone(e.target.value)}
                            className="input_fields_settings"
                            type="text"
                          />
                        </div>
                      ) : (
                        <div
                          id="email-style"
                          className={
                            phoneError === true
                              ? `formDiv-error d-flex flex-column`
                              : `formDiv d-flex flex-column`
                          }
                        >
                          <label htmlFor="">Email*</label>
                          <input
                            value={newemail}
                            onChange={(e) => setnewemail(e.target.value)}
                            className="input_fields_settings"
                            type="email"
                          />
                        </div>
                      )}

                      <div
                        id="password-style"
                        className={
                          passwordError === true
                            ? `formDiv-error d-flex flex-column`
                            : `formDiv d-flex flex-column`
                        }
                      >
                        <label htmlFor="">Password*</label>
                        <input
                          value={newpassword}
                          onChange={(e) => setnewpassword(e.target.value)}
                          className="input_fields_settings"
                          type="password"
                        />
                      </div>
                    </div>

                    <div className="w-50">
                      <div className="mt-2 d-flex flex-row">
                        <div style={{ fontSize: "15px" }}>
                          <span>
                            <input
                              style={{
                                backgroundColor: "red",
                                fontSize: "20px",
                              }}
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => setIsChecked(!isChecked)}
                            />
                          </span>{" "}
                          I'd like to receive exclusive offers and promotions
                          via SMS
                        </div>
                      </div>
                      <div
                        onClick={SignUp}
                        className="mt-2 btn custom_form_button btn-lg w-100"
                      >
                        Sign Up
                      </div>
                      <div className="mt-4 d-flex flex-row">
                        <div style={{ fontSize: "12px" }}>
                          By clicking "SIGN UP", I agree to Orecto's{" "}
                          <span style={{ color: "skyblue", cursor: "pointer" }}>
                            Terms of use
                          </span>{" "}
                          and{" "}
                          <span style={{ color: "skyblue", cursor: "pointer" }}>
                            Privacy Policy
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 d-flex flex-column">
                        <div style={{ fontSize: "12px" }}>Or, sign up with</div>
                        <div
                          className="mt-1 btn custom_form_button_two btn-lg w-100"
                          onClick={handleRegistrationField}
                        >
                          Sign Up with{" "}
                          {switchlogin === true ? "Phone" : "Email"}
                        </div>
                      </div>
                      <div
                        style={{ justifyContent: "space-evenly" }}
                        className="mt-4 d-flex flex-row"
                      >
                        <LoginSocialFacebook
                          appId={"1334850153698990"}
                          fieldsProfile={
                            "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
                          }
                          redirect_uri={REDIRECT_URI}
                          onResolve={({ provider, data }: IResolveParams) => {
                            setProvider(provider);
                            setFacebookProfile(data);
                          }}
                          onReject={(err) => {
                            console.log(err);
                          }}
                        >
                          <div className="mr-1 mt-1 btn custom_form_button_facebook btn-lg w-100">
                            Facebook
                          </div>
                        </LoginSocialFacebook>
                        <LoginSocialGoogle
                          client_id={
                            "168861632723-ficm3nt5td10b1g31spmcipieceefran.apps.googleusercontent.com"
                          }
                          redirect_uri={REDIRECT_URI}
                          scope="openid profile email"
                          discoveryDocs="claims_supported"
                          access_type="online"
                          onResolve={({ provider, data }: IResolveParams) => {
                            setProvider(provider);
                            setProfile(data);
                          }}
                          onReject={(err) => {
                            console.log(err);
                          }}
                        >
                          <div className="ml-1 mt-1 btn custom_form_button_google btn-lg w-100">
                            Google
                          </div>
                        </LoginSocialGoogle>
                      </div>
                    </div>
                  </div>
                </MDBModalBody>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>

          {/* Login MODAL */}
          <MDBModal
            show={basicModalTwo}
            setShow={setBasicModalTwo}
            tabIndex="-1"
          >
            <MDBModalDialog className="modal-dialog">
              <MDBModalContent className="modal-content">
                <MDBModalHeader className="modal-header">
                  <div className="login-heading">
                    <div
                      style={{
                        fontSize: "19px",
                        fontWeight: "600",
                        color: "rgb(64, 69, 83)",
                      }}
                    >
                      Welcome to Orecto! Please login
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      <div className="mr-1">New member?</div>
                      <div>
                        <span
                          onClick={() => {
                            toggleShow();
                            toggleShowTwo();
                          }}
                          style={{
                            fontWeight: "600",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                        >
                          Register
                        </span>{" "}
                        here
                      </div>
                    </div>
                  </div>
                </MDBModalHeader>
                <MDBModalBody className="modal-body">
                  <div className="modal-body-inner">
                    <div className="m-2 w-50">
                      <div
                        className={
                          phoneError === true
                            ? `formDiv-error d-flex flex-column`
                            : `formDiv d-flex flex-column`
                        }
                      >
                        <label htmlFor="">Phone No or Email*</label>
                        <input
                          onChange={(e) => setemail(e.target.value)}
                          value={email}
                          className="input_fields_settings"
                          type="text"
                        />
                      </div>
                      <div
                        className={
                          passwordError === true
                            ? `formDiv-error d-flex flex-column`
                            : `formDiv d-flex flex-column`
                        }
                      >
                        <label htmlFor="">Password*</label>
                        <input
                          onChange={(e) => setpassword(e.target.value)}
                          value={password}
                          className="input_fields_settings"
                          type="password"
                        />
                      </div>
                      <div className="mt-2 d-flex justify-content-end">
                        <div className="forgotLink">Forgot Password?</div>
                      </div>
                    </div>

                    <div className="w-50">
                      <div
                        onClick={LogIN}
                        className="mt-2 btn custom_form_button btn-lg w-100"
                      >
                        Login
                      </div>
                      <div className="mt-4 d-flex flex-column">
                        <div style={{ fontSize: "12px" }}>Or, login with</div>
                        <LoginSocialFacebook
                          appId={"1334850153698990"}
                          fieldsProfile={
                            "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
                          }
                          redirect_uri={REDIRECT_URI}
                          onResolve={({ provider, data }: IResolveParams) => {
                            setProvider(provider);
                            setFacebookProfile(data);
                          }}
                          onReject={(err) => {
                            console.log(err);
                          }}
                        >
                          <FacebookLoginButton />
                        </LoginSocialFacebook>
                        <LoginSocialGoogle
                          client_id={
                            "168861632723-ficm3nt5td10b1g31spmcipieceefran.apps.googleusercontent.com"
                          }
                          redirect_uri={REDIRECT_URI}
                          scope="openid profile email"
                          discoveryDocs="claims_supported"
                          access_type="online"
                          onResolve={({ provider, data }: IResolveParams) => {
                            setProvider(provider);
                            setProfile(data);
                          }}
                          onReject={(err) => {
                            console.log(err);
                          }}
                        >
                          <div className="ml-1 mt-1 btn custom_form_button_google btn-lg w-100">
                            Google
                          </div>
                        </LoginSocialGoogle>
                      </div>
                    </div>
                  </div>
                </MDBModalBody>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>

          {/* Verification Code */}
          <MDBModal
            show={basicModalThree}
            setShow={setBasicModalThree}
            tabIndex="-1"
          >
            <MDBModalDialog className="modal-dialog">
              <MDBModalContent className="modal-content">
                <MDBModalHeader
                  style={{ textAlign: "center" }}
                  className="modal-header"
                >
                  <div className="d-flex flex-row justify-content-between w-100">
                    <div
                      style={{
                        fontSize: "19px",
                        fontWeight: "600",
                        color: "rgb(64, 69, 83)",
                      }}
                    >
                      Verify Here
                    </div>
                  </div>
                </MDBModalHeader>
                <MDBModalBody className="modal-body">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="formDiv d-flex flex-column">
                      <p>Enter Your Verification Code : </p>
                      <ReactInputVerificationCode
                        autoFocus
                        placeholder=""
                        onChange={(e) => {
                          setotp(e);
                          console.log(e);
                        }}
                        length={6}
                      />
                      {timer === "00:00" ? (
                        <span className="resend-text">Resend Code</span>
                      ) : (
                        <span className="timer">
                          Get a new code in : {timer}
                        </span>
                      )}

                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                        className="mt-4"
                      >
                        <MDBBtn onClick={VerifyOTP}>Verify</MDBBtn>
                      </div>
                    </div>
                  </div>
                </MDBModalBody>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>

          {/* <div className="brand">
            <Link style={{ color: "white" }} to="/"></Link>
          </div> */}

          <img
            onClick={() => {
              localStorage.setItem("query", "");
              window.location.href = "/";
            }}
            className="logo"
            // style={{ cursor: "pointer", width: "8%", marginLeft: "10px" }}
            src={logo}
          />
          <div
            className="ml-1 deliver-div"
            style={{ display: "flex", cursor: "pointer" }}
          >
            <img
              style={{ width: "40px", borderRadius: "5px" }}
              src={pakistan_flag}
            />
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <div
                className="ml-2"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <span style={{ fontSize: "12px" }}>Deliver to </span>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  Pakistan
                </span>
              </div>
              <img
                className="ml-2"
                style={{ width: "20px" }}
                src={dropdown_arrow}
              />
            </div>
          </div>
          <div className="search-bar">
            <input
              onKeyDown={handleKeyDown}
              className="search-input"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you looking for?"
              value={query}
            ></input>

            <div className="">
              <img
                onClick={() => {
                  window.location.href = `/searchresults?name=${query}`;
                  localStorage.setItem("query", query);
                }}
                style={{
                  cursor: "pointer",
                  width: "25px",
                  marginRight: "13px",
                }}
                src={search}
              />
            </div>
          </div>

          <ul className="nav-links">
            <li>
              {loggedin === true ? (
                <div class="navigation">
                  <MDBDropdown>
                    <MDBDropdownToggle className="onNavigation_login_button">
                      {name === "" ? userdetails.name : name}
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <Link to="/userdashboard">
                        <MDBDropdownItem>
                          <img
                            src={ProfileIconForNav}
                            style={{ width: "15%", marginRight: "5%" }}
                          />
                          Profile
                        </MDBDropdownItem>
                      </Link>
                      <Link to="/userdashboard?name=order">
                        <MDBDropdownItem>
                          <img
                            src={OrdersListForNav}
                            style={{ width: "15%", marginRight: "5%" }}
                          />
                          Orders
                        </MDBDropdownItem>
                      </Link>
                      <Link to="/userdashboard?name=wishlist">
                        <MDBDropdownItem>
                          <img
                            src={fav}
                            style={{ width: "15%", marginRight: "5%" }}
                          />
                          Wishlist
                        </MDBDropdownItem>
                      </Link>
                      <div className="user-menu-heading">
                        <Button
                          onClick={LogOut}
                          style={{
                            color: "black",
                            width: "100%",
                            backgroundColor: "#fff701",
                          }}
                          variant="contained"
                        >
                          Log Out
                        </Button>
                      </div>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </div>
              ) : (
                <div class="navigation">
                  {/* <div className="Signin">
                    <span
                      className="singintext"
                      style={{
                        color: "#393B42",
                        marginLeft: "5px",
                        marginTop: "12px",
                      }}
                    >
                      Sign In / Sign Up
                      <AccountCircleIcon className="accounticon" />
                    </span>
                  </div> */}
                  {/* <Button
                    onClick={toggleShowTwo}
                    style={{
                      color: "white",
                      width: "100%",
                      backgroundColor: "#008c9c",
                    }}
                    variant="contained"
                    >
                    Log In
                    </Button> */}
                  <div
                    onClick={toggleShowTwo}
                    className="onNavigation_login_button"
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span className="sign-in"> Sign In</span>
                      <UserOutlined
                        style={{ fontSize: "20px", marginLeft: "5px" }}
                      />
                    </div>
                  </div>
                  <div>
                    {/* <div class="navigation-content">
                      <a className="menu-options" href="#">
                        <img src={profile} style={{ margin: "0px 10px" }} />
                        Your Account
                      </a>
                      <a className="menu-options" href="#">
                        <img src={order} style={{ margin: "0px 10px" }} />
                        Your Order
                      </a>
                      <a className="menu-options" href="#">
                        <img src={fav} style={{ margin: "0px 10px" }} />
                        Wishlist
                      </a>

                      <hr />

                      <div className="user-menu-heading">
                        <span className="user-menu-option">
                          If you're a new user
                        </span>
                        <Button
                          onClick={toggleShow}
                          style={{
                            color: "#008c9c",
                            margin: "5px 0px",
                            width: "100%",
                          }}
                        >
                          Register
                        </Button>
                        <Button
                          onClick={toggleShowTwo}
                          style={{
                            color: "white",
                            width: "100%",
                            backgroundColor: "#008c9c",
                          }}
                          variant="contained"
                        >
                          Log In
                        </Button>
                      </div>
                    </div> */}
                  </div>
                </div>
              )}

              {/* {cartItems.length > 0 && (
                <p className="badge">{cartItems.length}</p>
              )} */}
            </li>
            <div class="vertical-sign"></div>
            <li>
              {cartdetails.length === 0 || loggedin === false ? (
                <div class="cart-navigation">
                  {/* <div className="Signin"> */}
                  <div className="onNavigation_cart_button">
                    <span
                      className="sign-in"
                      style={{
                        color: "#393b42",
                        marginLeft: "5px",
                        marginTop: "12px",
                      }}
                    >
                      Cart
                      <img
                        style={{ width: "20px" }}
                        src={cart_logo}
                        className="accounticon"
                      />
                    </span>
                  </div>
                  {/* </div> */}
                  <div>
                    <div class="cart-navigation-content">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                        className="p-3"
                      >
                        <img style={{ width: "45%" }} src={cart_img} />
                        <span style={{ color: "black" }}>No Product Yet</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div class="cart-navigation">
                  {/* <div className="Signin"> */}
                  <div className="onNavigation_cart_button">
                    <span
                      className="sign-in"
                      style={{
                        color: "#393b42",
                        marginLeft: "5px",
                        marginTop: "12px",
                      }}
                    >
                      Cart
                      <img
                        style={{ width: "25px" }}
                        src={cart_logo}
                        className="accounticon"
                      />
                    </span>
                  </div>
                  {/* </div> */}
                  <div>
                    <div class="cart-navigation-content">
                      <div className="p-3">
                        <span style={{ color: "black" }}>Shopping Cart</span>
                      </div>
                      <div className="d-flex">
                        <img
                          className="cart-item-image"
                          src={cartdetails.product_thumbnail_image}
                        />

                        <div>
                          <span
                            className="title_name"
                            style={{ margin: "10px", color: "black" }}
                          >
                            {cartdetails.product_name}
                          </span>
                          <div
                            style={{
                              width: "10vw",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <h6
                              style={{
                                margin: "10px",
                                color: "black",
                              }}
                            >
                              Rs. {cartdetails.price}
                            </h6>
                            <div style={{}}>
                              <span
                                style={{
                                  color: "white",
                                  fontSize: "12PX",
                                  color: "grey",
                                }}
                              >
                                Qty {cartdetails.quantity}
                              </span>
                            </div>
                          </div>
                          <div
                            style={{
                              padding: "0px 10px",
                              textAlign: "right",
                            }}
                          >
                            <img
                              onClick={() => DeleteCartItem(cartdetails.id)}
                              style={{
                                cursor: "pointer",
                                width: "20px",
                              }}
                              src={trash}
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          margin: "10px 0px",
                          backgroundColor: "#e7e7e7",
                        }}
                      >
                        <span
                          style={{
                            margin: "10px",
                            color: "black",
                          }}
                        >
                          Total
                        </span>
                        <h6
                          style={{
                            margin: "10px",
                            color: "black",
                          }}
                        >
                          {parseFloat(cartdetails.price) *
                            parseFloat(cartdetails.quantity)}
                        </h6>
                      </div>
                      <div style={{ padding: "10px" }}>
                        <Link
                          style={{ padding: "0px", margin: "0px" }}
                          to="/cart"
                        >
                          <Button
                            style={{
                              color: "#008c9c",
                              margin: "5px 0px",
                              width: "100%",
                            }}
                          >
                            View Cart
                          </Button>
                        </Link>
                        <Link
                          style={{ padding: "0px", margin: "0px" }}
                          to="/checkout"
                        >
                          <Button
                            style={{
                              color: "white",
                              width: "100%",
                              backgroundColor: "#008c9c",
                            }}
                            variant="contained"
                          >
                            Checkout
                          </Button>
                        </Link>
                      </div>
                      <div className="user-menu-heading"></div>
                    </div>
                  </div>
                </div>
              )}
            </li>

            {/* {userInfo && userInfo.isAdmin && (
              <li>
                <div className="header-dropdown">
                  <p onClick={showSecondDropDown}>
                    Admin
                    <ArrowDropDownIcon />
                  </p>

                  <ul
                    className={
                      secondDropdown
                        ? "dropdown-content show"
                        : "dropdown-content"
                    }
                  >
                    <li>
                      <Link to="/productlist">Products</Link>
                    </li>
                  </ul>
                </div>
              </li>
            )} */}
          </ul>
        </div>

        <div className="category-container">
          <ul>
            <div class="category-navigation">
              <div>
                <li className="menu">
                  <div
                    className="link-category"
                    style={{ cursor: "pointer", padding: "10px" }}
                  >
                    <div className="category-menu">
                      <span>ALL CATEGORIES</span>
                      <img
                        style={{
                          filter:
                            "invert(8%) sepia(100%) saturate(6481%) hue-rotate(246deg) brightness(102%) contrast(143%)",
                          width: "35px",
                          marginLeft: "37px",
                        }}
                        src={dropdownimg}
                      />
                    </div>
                  </div>
                </li>
              </div>
              <div>
                <div class="category-navigation-content">
                  <List className="bannerCategory__list">
                    {AllCategories.length > 0
                      ? AllCategories.map((d, i) => (
                          <Link
                            style={{ padding: "0px" }}
                            onClick={() => {
                              localStorage.setItem("query", "");
                              window.location.href = `/categorybased?id=${d.id}`;
                            }}
                          >
                            <a style={{ cursor: "pointer", fontSize: "14px" }}>
                              {d.name}
                            </a>
                          </Link>
                        ))
                      : null}
                  </List>
                </div>
              </div>
            </div>

            <li onClick={() => (window.location.href = "/categorybased?id=1")}>
              <Button className="category-button">Electrnoics</Button>
            </li>
            <li onClick={() => (window.location.href = "/categorybased?id=4")}>
              <Button className="category-button">Women</Button>
            </li>
            <li onClick={() => (window.location.href = "/categorybased?id=2")}>
              <Button className="category-button">Home</Button>
            </li>
            <li onClick={() => (window.location.href = "/categorybased?id=5")}>
              <Button className="category-button">Beauty and Fragrance</Button>
            </li>
            <li onClick={() => (window.location.href = "/categorybased?id=6")}>
              <Button className="category-button">Baby and Toys</Button>
            </li>
            <li onClick={() => (window.location.href = "/categorybased?id=9")}>
              <Button className="category-button">Sports</Button>
            </li>

            {loggedin === true ? (
              <li>
                <Button
                  onClick={() =>
                    (window.location.href = "https://orecto.pk/shops/create")
                  }
                  className="category-button"
                >
                  Sell on Orecto
                </Button>
              </li>
            ) : (
              <li>
                <Button onClick={toggleShowTwo} className="category-button">
                  Sell on Orecto
                </Button>
              </li>
            )}
          </ul>
          <img style={{ width: "7%" }} src={orectosvg} />
        </div>
      </div>
    </header>
  );
};

export default Header;
