import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import "../styles/UpgradePlan.css";
import FreePlan from "../assets/userdashboard/sxFH9r5VnA0Huw7NV0NPS9yudbatp5yoR43nYOtO.png";
import GoldPlan from "../assets/userdashboard/DSmRk3y9S8ATHkdvPW59BZf2ENvptLgUAufPjdTZ.png";

export default function UpgradePlan() {
  return (
    <>
      <Row className="mt-3 package-cards">
        <Col lg="3" sm="6">
          <div className="card-stats back-ground-card">
            <div className="text-center">
              <img style={{ width: "100px" }} src={FreePlan} alt="Free_Plan" />
              <div className="firstHeadingPlan">Free</div>
              <div className="secondHeadingPlan">3 Product Upload</div>
              <div className="thirdHeadingPlan">Free</div>
              <div className="btn custom-package-buttons">Free Package</div>
            </div>
          </div>
        </Col>

        <Col lg="3" sm="6">
          <div className="card-stats back-ground-card">
            <div className="text-center">
              <img style={{ width: "100px" }} src={GoldPlan} alt="Free_Plan" />
              <div className="firstHeadingPlan">Free</div>
              <div className="secondHeadingPlan">7 Product Upload</div>
              <div className="thirdHeadingPlan">Rs500.00</div>
              <div className="btn custom-package-buttons">Free Package</div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
