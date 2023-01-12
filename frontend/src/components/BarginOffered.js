import React, { useState } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import "../styles/BarginOffered.css";
import MyBarginOffered from "./MyBarginOffered";
import SellerBarginOffered from "./SellerBarginOffered";

export default function BarginOffered() {
  const [basicActive, setBasicActive] = useState("tab1");

  const handleBasicClick = (value: string) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  return (
    <>
      <div className="m-3 d-flex flex-column" style={{ width: "100%" }}>
        <div style={{ fontSize: "40px", fontWeight: "500" }}>
          Bargin Offered
        </div>
        {/* tabs are here */}
        <MDBTabs className="mb-3">
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleBasicClick("tab1")}
              active={basicActive === "tab1"}
            >
              My Offered
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={basicActive === "tab1"}>
            <MyBarginOffered />
          </MDBTabsPane>
        </MDBTabsContent>
      </div>
    </>
  );
}
