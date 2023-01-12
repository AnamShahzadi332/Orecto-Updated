import React from "react";
import "../styles/EarningPoints.css";
import { Card, Row, Col } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import sadEmoji from "../assets/userdashboard/sad.png";

export default function EarningPoints() {
  function createData(id, code, Points, Converted, Date, Action) {
    return { id, code, Points, Converted, Date, Action };
  }
  const rows = createData(
    <div>{"d.seller_offer"}</div>,
    <div>{"d.product "}</div>,

    <div>Rs.{"d.user_offer"}</div>,
    <div>
      <Badge style={{ width: "65px" }} bg="success">
        {"d.status"}
      </Badge>
    </div>,
    <div>{"d.created_at"}</div>
  );
  return (
    <>
      <div className="m-3 d-flex flex-column" style={{ width: "100%" }}>
        <div style={{ fontSize: "20px", fontWeight: "500" }}>My Points</div>
        <div className="d-flex justify-content-center">
          <Row className="mt-3 w-100 justify-content-center">
            <Col lg="7" sm="6">
              <Card className="card-stats ">
                <Card.Body className="text-center earning-points-card">
                  <div className="numbers">
                    <Card.Title
                      as="h4"
                      style={{ color: "white", fontWeight: "600" }}
                    >
                      50 Points = Rs1.00 Wallet Money
                    </Card.Title>
                  </div>
                  <div
                    className="stats"
                    style={{
                      color: "#efefef",
                      opacity: "0.5",
                      fontSize: "15px",
                    }}
                  >
                    Exchange Rate
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
        {/* table start from here */}
        <div className="mt-3">
          <Card className="card-stats">
            <Card.Body className="card-background">
              <p
                className="card-category"
                style={{ color: "black", fontSize: "15px" }}
              >
                Point Earning history
              </p>
              <hr />
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="heading" align="left">
                        #
                      </TableCell>
                      <TableCell className="heading" align="center">
                        Order Code:
                      </TableCell>
                      <TableCell className="heading" align="right">
                        Points
                      </TableCell>
                      <TableCell className="heading" align="center">
                        Converted
                      </TableCell>
                      <TableCell className="heading" align="right">
                        Date
                      </TableCell>

                      <TableCell className="heading" align="center">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.length > 0 ? (
                      rows.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell align="left">{row.Product}</TableCell>
                          <TableCell align="right">{row.CreatedAt}</TableCell>

                          <TableCell align="right">{row.MyOffer}</TableCell>
                          <TableCell align="center" component="th" scope="row">
                            {row.seller}
                          </TableCell>
                          <TableCell align="right">{row.Status}</TableCell>

                          <TableCell align="right">{row.Action}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <div className="d-flex justify-content-center empty-table">
                        <div className="d-flex flex-column">
                          <div style={{ textAlign: "center" }}>
                            <img
                              style={{ width: "40px" }}
                              src={sadEmoji}
                              alt="No-Data"
                            />
                          </div>
                          <div style={{ fontSize: "20px" }}>Nothing found</div>
                        </div>
                      </div>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card.Body>
          </Card>
        </div>
        {/* table end here */}
      </div>
    </>
  );
}
