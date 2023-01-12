import React, { useState, useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Icon, {
  HomeOutlined,
  PicRightOutlined,
  ShoppingCartOutlined,
  GiftTwoTone,
  UnorderedListOutlined,
} from "@ant-design/icons";
import "../styles/BottomBar.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
export default function LabelBottomNavigation(props) {
  const [value, setValue] = React.useState("recents");
  const [name, setname] = useState("");
  const [authtoken, setauthtoken] = useState("");
  const [email, setemail] = useState("");
  const [loggedin, setloggedin] = useState("");
  const [modalchanging, setmodalchanging] = useState(false);
  const [phone, setphone] = useState("");
  const [userid, setuserid] = useState("");
  const [avatar, setavatar] = useState("");
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
    setuserid(user_id);
    console.log(token);
  }, [null]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="bottom-tabs-bar">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          style={{ textDecoration: "none" }}
          component={Link}
          to="/"
          label="Home"
          icon={<HomeOutlined />}
        />

        <BottomNavigationAction
          style={{ textDecoration: "none" }}
          component={Link}
          to="/"
          label="Categories"
          icon={<UnorderedListOutlined />}
        />
        <BottomNavigationAction
          style={{ textDecoration: "none" }}
          component={Link}
          to="/cart"
          label="Cart"
          icon={<ShoppingCartOutlined />}
        />
        {loggedin === false ? (
          <BottomNavigationAction
            style={{ textDecoration: "none" }}
            onClick={() => {
              if (loggedin === false) {
                props.requirement(true);
              }
            }}
            label="Profile"
            icon={<AccountCircleIcon />}
          />
        ) : (
          <BottomNavigationAction
            style={{ textDecoration: "none" }}
            component={Link}
            to="/userdashboard"
            label="Profile"
            icon={<AccountCircleIcon />}
          />
        )}
      </BottomNavigation>
    </div>
  );
}
