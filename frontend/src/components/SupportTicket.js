import React from "react";
import "../styles/SupportTicket.css";
import { Card, Row, Col } from "react-bootstrap";
import DollarSymbol from "../assets/userdashboard/dollar-symbol.png";
import { PlusOutlined } from "@ant-design/icons";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import sadEmoji from "../assets/userdashboard/sad.png";

export default function SupportTicket() {
  return (
    <>
      <div className="m-3 d-flex flex-column" style={{ width: "100%" }}>
        <div style={{ fontSize: "30px", fontWeight: "400" }}>
          Support Ticket
        </div>
        <div className="d-flex justify-content-center">
          <Row className="mt-3 w-100 justify-content-around">
            <Col lg="3" sm="6">
              <Card className="card-stats">
                <Card.Body className="text-center card-background">
                  <div className="numbers">
                    <p className="card-category">
                      {/* <imgsrc={DollarSymbol} alt="" /> */}
                      <PlusOutlined
                        style={{
                          fontSize: "40px",
                          backgroundColor: "#8f97ab",
                          padding: "8px",
                          borderRadius: "50px",
                          color: "white",
                        }}
                      />
                    </p>
                  </div>
                  <div
                    className="stats"
                    style={{ color: "#008c9c", fontSize: "20px" }}
                  >
                    Create a Ticket
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        <div className="mt-3">
          <Card className="card-stats">
            <Card.Body className="card-background">
              <Row>
                <Col>
                  <p
                    className="card-category"
                    style={{ color: "black", fontSize: "20px" }}
                  >
                    Tickets
                  </p>
                  <hr />
                  <Table striped>
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Status</th>
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
                        >
                          1
                        </td>
                        <td
                          style={{
                            color: "black",
                            fontSize: "13px",
                            fontWeight: "400",
                          }}
                        >
                          03-11-2022
                        </td>
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
          </Card>
        </div>
      </div>
    </>
  );
}
