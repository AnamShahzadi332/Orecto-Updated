import React, { useEffect, useState } from "react";
import { detailsUser, updateUserProfile } from "../actions/USerAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/UserConstant";
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
import "../styles/UserProfile.css";
import Carousel from "react-elastic-carousel";
const Featurecategories = () => {
  return (
    <div className="">
      <Carousel enableSwipe enableMouseSwipe showArrows={false} itemsToShow={7}>
        <div
          className="container-category"
          style={{
            display: "flex",
            marginLeft: "10px",
            marginTop: "10px",
          }}
        >
          <img className="item" data-value="1" src={category1} />
          <img className="item" data-value="1" src={category2} />
          <img className="item" data-value="1" src={category3} />
          {/* <img
        className="item"
        data-value="1"

      <img
        className="item"
        data-value="1"
         */}
          <img className="item" data-value="1" src={category6} />
          <img className="item" data-value="1" src={category7} />
          <img className="item" data-value="1" src={category8} />
          <img className="item" data-value="1" src={category9} />
          <img className="item" data-value="1" src={category10} />
          <img className="item" data-value="1" src={category11} />
          <img className="item" data-value="1" src={category12} />
          <img className="item" data-value="1" src={category13} />
          <img className="item" data-value="1" src={category14} />
          <img className="item" data-value="1" src={category15} />
          <img className="item" data-value="1" src={category16} />
        </div>
      </Carousel>
    </div>
  );
};

export default Featurecategories;
