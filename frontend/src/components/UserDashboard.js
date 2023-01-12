import React, { useState, useEffect } from "react";
import "../styles/UserDashboard.css";
// import { HomeOutlined, MailOutlined, } from '@ant-design/icons';
import userAvatar from "../assets/userdashboard/useravataar.png";
import DashboardIcon from "../assets/userdashboard/home.png";
import PurchaseHistoryIcon from "../assets/userdashboard/google-docs.png";
import DownloadIcon from "../assets/userdashboard/download.png";
import RefundIcon from "../assets/userdashboard/rewind.png";
import WishlistIcon from "../assets/userdashboard/wishlist.png";
import CompareIcon from "../assets/userdashboard/compare.png";
import ClassifiedProductsIcon from "../assets/userdashboard/diamond.png";
import BargaingIcon from "../assets/userdashboard/hammer.png";
import ConversationIcon from "../assets/userdashboard/comment.png";
import EarningPointsIcon from "../assets/userdashboard/dollar-sign.png";
// import MyWalletIcon from "../assets/userdashboard/wallet.png";
import SupportTicketIcon from "../assets/userdashboard/atom-symbol.png";
import ManageProfileIcon from "../assets/userdashboard/user.png";
import { Menu } from "antd";
import PurchaseHistory from "./PurchaseHistory";
import Downloads from "./Downloads";
import Dashboard from "./Dashboard";
import Refund from "./Refund";
import Wishlist from "./Wishlist";
import Compare from "./Compare";
import ClassifiedProducts from "./ClassifiedProducts";
import BarginOffered from "./BarginOffered";
import Conversations from "./Conversations";
import EarningPoints from "./EarningPoints";
import Affiliate from "./Affiliate";
import SupportTicket from "./SupportTicket";
import ManageProfile from "./ManageProfile";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  // getItem('Navigation One', 'sub1', <MailOutlined />, [
  //   getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
  //   getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
  // ]),

  getItem(
    "Dashboard",
    "sub1",
    <img src={DashboardIcon} style={{ width: "15px" }} />
  ),
  getItem(
    "Purchase History",
    "sub2",
    <img src={PurchaseHistoryIcon} style={{ width: "15px" }} />
  ),
  getItem(
    "Downloads",
    "sub3",
    <img src={DownloadIcon} style={{ width: "15px" }} />
  ),
  getItem(
    "Sent Refund Request",
    "sub4",
    <img src={RefundIcon} style={{ width: "15px" }} />
  ),
  getItem(
    "Wishlist",
    "sub5",
    <img src={WishlistIcon} style={{ width: "15px" }} />
  ),
  getItem(
    "Compare",
    "sub6",
    <img src={CompareIcon} style={{ width: "15px" }} />
  ),
  getItem(
    "Classified Products",
    "sub7",
    <img src={ClassifiedProductsIcon} style={{ width: "15px" }} />
  ),
  getItem(
    "Bargin Offered",
    "sub8",
    <img src={BargaingIcon} style={{ width: "15px" }} />
  ),
  getItem(
    "Conversations",
    "sub9",
    <img src={ConversationIcon} style={{ width: "15px" }} />
  ),
  getItem(
    "Earning Points",
    "sub10",
    <img src={EarningPointsIcon} style={{ width: "15px" }} />
  ),
  getItem(
    "Affiliate",
    "sub11",
    <img src={EarningPointsIcon} style={{ width: "15px" }} />
  ),
  getItem(
    "Support Ticket",
    "sub12",
    <img src={SupportTicketIcon} style={{ width: "15px" }} />
  ),
  getItem(
    "Manage Profile",
    "sub13",
    <img src={ManageProfileIcon} style={{ width: "15px" }} />
  ),

  // getItem('Navigation Two', 'sub2', <HomeOutlined />, [
  //   getItem('Option 5', '5'),
  //   getItem('Option 6', '6'),
  //   getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  // ]),

  // getItem('My Purchase', 'sub2', <HomeOutlined />),

  // getItem('Navigation Three', 'sub4', <SettingOutlined />, [
  //   getItem('Option 9', '9'),
  //   getItem('Option 10', '10'),
  //   getItem('Option 11', '11'),
  //   getItem('Option 12', '12'),
  // ]),

  // getItem('Notifications', 'sub4', <SettingOutlined />),
  // getItem('Group', 'sub5', <SettingOutlined />),

  // getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
];

export default function UserDashboard() {
  const [tabid, settabid] = useState("sub1");
  const [authtoken, setauthtoken] = useState("");
  const [email, setemail] = useState("");
  const [loggedin, setloggedin] = useState("");
  const [phone, setphone] = useState("");
  const [name, setname] = useState("");
  const [avatar, setavatar] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const onClick = (e) => {
    settabid(e.key);
    closeNav();
  };

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
    let pre_selected_tab = window.location.search.split("=")[1];
    console.log(pre_selected_tab);
    if (pre_selected_tab === "order") {
      settabid("sub2");
    } else if (pre_selected_tab === "wishlist") {
      settabid("sub5");
    } else {
      settabid("sub1");
    }
  }, [null]);

  useEffect(() => {
    console.log(tabid);
  }, [tabid]);
  function openNav() {
    document.getElementById("mySidenav").style.width = "350px";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  return (
    <>
      <div className="dashboard-padding" style={{ padding: "50px 70px" }}>
        <div id="mySidenav" class="sidenav">
          <div className="d-flex ">
            <div className="" style={{ borderRadius: "5px" }}>
              <div
                className="p-4"
                style={{
                  width: 350,
                  backgroundColor: "#feee00",
                }}
              >
                <div className="userDashboardAvatar">
                  <a
                    href="javascript:void(0)"
                    class="closebtn"
                    onClick={closeNav}
                  >
                    &times;
                  </a>
                  <div>
                    <img
                      src={avatar}
                      alt="Profile_Name"
                      style={{ width: "100px", borderRadius: "50px" }}
                    />
                  </div>
                  <div
                    style={{
                      color: "#393B42",
                      fontWeight: "500",
                      fontSize: "22px",
                    }}
                  >
                    {name}
                  </div>
                  <div
                    style={{
                      color: "#393B42",
                      fontWeight: "500",
                      fontSize: "15px",
                    }}
                  >
                    {phone}
                  </div>
                </div>
              </div>
              <Menu
                onClick={onClick}
                style={{
                  width: 350,
                }}
                defaultSelectedKeys={[tabid]}
                defaultOpenKeys={[tabid]}
                mode="inline"
                items={items}
              />
            </div>
          </div>
        </div>

        <span
          className="open-menu-button"
          style={{ marginLeft: "10px", fontSize: "25px", cursor: "pointer" }}
          onClick={openNav}
        >
          &#9776;
        </span>
        <div className="d-flex ">
          <div className="dashboard-menu-bar" style={{ borderRadius: "5px" }}>
            <div
              className="p-4"
              style={{
                width: 290,
                backgroundColor: "#feee00",
              }}
            >
              <div className="userDashboardAvatar">
                <div>
                  <img
                    src={avatar}
                    alt="Profile_Name"
                    style={{ width: "100px", borderRadius: "50px" }}
                  />
                </div>
                <div
                  style={{
                    color: "#393B42",
                    fontWeight: "500",
                    fontSize: "22px",
                  }}
                >
                  {name}
                </div>
                <div
                  style={{
                    color: "#393B42",
                    fontWeight: "500",
                    fontSize: "15px",
                  }}
                >
                  {phone}
                </div>
              </div>
            </div>
            <Menu
              onClick={onClick}
              style={{
                width: 290,
              }}
              defaultSelectedKeys={[tabid]}
              defaultOpenKeys={[tabid]}
              mode="inline"
              items={items}
            />
          </div>
          {tabid === "sub1" ? <Dashboard /> : null}
          {tabid === "sub2" ? <PurchaseHistory /> : null}
          {tabid === "sub3" ? <Downloads /> : null}
          {tabid === "sub4" ? <Refund /> : null}
          {tabid === "sub5" ? <Wishlist /> : null}
          {tabid === "sub6" ? <Compare /> : null}
          {tabid === "sub7" ? <ClassifiedProducts /> : null}
          {tabid === "sub8" ? <BarginOffered /> : null}
          {tabid === "sub9" ? <Conversations /> : null}
          {tabid === "sub10" ? <EarningPoints /> : null}
          {tabid === "sub11" ? <Affiliate /> : null}
          {tabid === "sub12" ? <SupportTicket /> : null}
          {tabid === "sub13" ? <ManageProfile /> : null}
        </div>
      </div>
    </>
  );
}
