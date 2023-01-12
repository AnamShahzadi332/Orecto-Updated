import React, { useState, useEffect } from "react";
import "../styles/ClassifiedProducts.css";
import FreePlan from "../assets/userdashboard/sxFH9r5VnA0Huw7NV0NPS9yudbatp5yoR43nYOtO.png";
import { Card, Row, Col } from "react-bootstrap";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import sadEmoji from "../assets/userdashboard/sad.png";
import AddProductForm from "./AddProductForm";
import UpgradePlan from "./UpgradePlan";

export default function ClassifiedProducts() {
  const [tab1, settab1] = useState(true);
  const [tab2, settab2] = useState(false);
  const [tab3, settab3] = useState(false);

  function Tab1() {
    settab1(true);
    settab2(false);
    settab3(false);
  }
  function Tab2() {
    settab1(false);
    settab2(true);
    settab3(false);
  }
  function Tab3() {
    settab1(false);
    settab2(false);
    settab3(true);
  }

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
  return (
    <>
      <div className="m-3  d-flex flex-column" style={{ width: "100%" }}>
        <Row className="product-cards mt-3">
          <Col onClick={Tab1} lg="3" sm="6">
            <div
              className={
                tab1 === true
                  ? "selected-back-ground-card"
                  : " back-ground-card"
              }
            >
              <div className="text-center">
                <div className="numbers">
                  <p className="card-category">
                    <UploadOutlined
                      style={{
                        color: "white",
                        fontSize: "20px",
                        backgroundColor: "#a75a9d",
                        padding: "8px",
                        borderRadius: "50px",
                      }}
                    />
                  </p>
                  <Card.Title
                    className={
                      tab1 === true
                        ? "selected-card-title-tabs"
                        : " card-title-tabs"
                    }
                    as="h4"
                  >
                    15
                  </Card.Title>
                </div>
                <div
                  className={
                    tab1 === true
                      ? "selected-card-title-tabs"
                      : " card-title-tabs"
                  }
                >
                  Remaining Uploads
                </div>
              </div>
            </div>
          </Col>
          <Col onClick={Tab2} lg="3" sm="6">
            <div
              className={
                tab2 === true
                  ? "selected-back-ground-card mt-1"
                  : " back-ground-card mt-1"
              }
            >
              <div className="text-center" style={{ cursor: "pointer" }}>
                <div className="numbers">
                  <p className="card-category">
                    <PlusOutlined
                      style={{
                        color: "white",
                        fontSize: "45px",
                        backgroundColor: "#8f97ab",
                        padding: "8px",
                        borderRadius: "50px",
                      }}
                    />
                    {/* <UploadOutlined/> */}
                  </p>
                  <Card.Title
                    className={
                      tab2 === true
                        ? "selected-card-title-tabs"
                        : " card-title-tabs"
                    }
                    as="p"
                  >
                    Add New Product
                  </Card.Title>
                </div>
              </div>
            </div>
          </Col>
          <Col onClick={Tab3} lg="3" sm="6">
            <div
              className={
                tab3 === true
                  ? "selected-back-ground-card"
                  : " back-ground-card"
              }            >
              <div className="text-center">
                <div className="numbers">
                  <p className="card-category">
                    <div>
                      <img
                        style={{ width: "50px" }}
                        src={FreePlan}
                        alt="plan"
                      />
                    </div>
                    <Card.Title
                      as="p"
                      className={
                        tab3 === true
                          ? "selected-card-title-tabs3"
                          : " card-title-tabs3"
                      }
                    >
                      Current Package: Free
                    </Card.Title>
                    <div
                      className={
                        tab3 === true
                          ? "btn btn-sm selected-upgradeButton"
                          : "btn btn-sm upgradeButton"
                      }
                    >
                      Upgrade Package
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {/* end */}
        {/* all products code */}
        <div className={tab1 === true ? "display-block" : "display-hidden"}>
          <div style={{ fontSize: "20px", fontWeight: "500" }}>Products</div>
          <Row className="mt-2">
            <Col lg="12" sm="12">
              <Card className="card-stats back-ground-card">
                <Card.Body>
                  <Row>
                    <Col>
                      <p
                        className="card-category"
                        style={{ color: "black", fontSize: "15px" }}
                      >
                        All products
                      </p>
                      <hr />
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell className="heading">
                                Dessert (100g serving)
                              </TableCell>
                              <TableCell className="heading" align="right">
                                Calories
                              </TableCell>
                              <TableCell className="heading" align="right">
                                Fat&nbsp;(g)
                              </TableCell>
                              <TableCell className="heading" align="right">
                                Carbs&nbsp;(g)
                              </TableCell>
                              <TableCell className="heading" align="right">
                                Protein&nbsp;(g)
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.length > 0 ? (
                              rows.map((row) => (
                                <TableRow
                                  key={row.name}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    {row.name}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row.calories}
                                  </TableCell>
                                  <TableCell align="right">{row.fat}</TableCell>
                                  <TableCell align="right">
                                    {row.carbs}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row.protein}
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <div className="d-flex justify-content-center">
                                <div className="d-flex flex-column">
                                  <div style={{ textAlign: "center" }}>
                                    <img
                                      style={{ width: "40px" }}
                                      src={sadEmoji}
                                      alt="No-Data"
                                    />
                                  </div>
                                  <div style={{ fontSize: "20px" }}>
                                    Nothing found
                                  </div>
                                </div>
                              </div>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
        {/* all products code */}
        {/* add new product */}
        <div className={tab2 === true ? "display-block" : "display-hidden"}>
          <div className="mt-2">
            <div style={{ fontWeight: "500", fontSize: "20px" }}>
              Add Your Product
            </div>
          </div>
          {/* form start */}
          <div className="mt-2">
            <AddProductForm />
          </div>
          {/* form start */}
        </div>
        {/* add new product */}
        {/* add new product */}
        <div className={tab3 === true ? "display-block" : "display-hidden"}>
          <div className="mt-2">
            <div style={{ fontWeight: "500", fontSize: "20px" }}>
              Premium Packages for Customers
            </div>
          </div>
          {/* form start */}
          <div className="mt-2">
            <UpgradePlan />
          </div>
          {/* form start */}
        </div>
        {/* add new product */}
      </div>
    </>
  );
}
