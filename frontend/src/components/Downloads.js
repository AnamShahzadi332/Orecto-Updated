import React from "react";
import "../styles/Downloads.css";
import { Card, Row, Col } from "react-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import sadEmoji from "../assets/userdashboard/sad.png";

export default function Downloads() {
  return (
    <>
      <div className="m-3" style={{ width: "100%" }}>
        <Row>
          <Col lg="11" sm="12">
            <Card className="card-stats">
              <Card.Body className="card-background">
                <Row>
                  <Col>
                    <p
                      className="card-category"
                      style={{ color: "black", fontSize: "20px" }}
                    >
                      Download Your Product
                    </p>
                    <hr />
                    <Table striped>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th style={{ textAlign: "right" }}>Option</th>
                        </tr>
                      </thead>
                      <tbody style={{ display: "none" }}>
                        <tr>
                          <td
                            style={{
                              color: "black",
                              fontSize: "13px",
                              fontWeight: "400",
                            }}
                          ></td>
                          <td
                            style={{
                              color: "black",
                              fontSize: "13px",
                              fontWeight: "400",
                            }}
                          ></td>
                        </tr>
                      </tbody>
                    </Table>
                    <div className="d-flex justify-content-center">
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
        </Row>
      </div>
    </>
  );
}
