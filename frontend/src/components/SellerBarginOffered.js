import React from "react";
import "../styles/SellerBarginOffered.css";
import { Card, Row, Col } from "react-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Badge from "react-bootstrap/Badge";
import { EyeOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";

export default function SellerBarginOffered() {
  return (
    <>
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
                    Seller Offers
                  </p>
                  <hr />
                  <Table striped>
                    <thead>
                      <tr>
                        <th>Seller</th>
                        <th>Product</th>
                        <th>Seller Offer</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: "400" }}>Kashee</td>
                        <td style={{ color: "black", fontSize: "12px" }}>
                          8.5/ 12 inch Writing Board Drawing Tablet LCD Screen
                          Writing Digital Graphic Tablets Electronic Handwriting
                          Pad Toys Gifts Child
                        </td>
                        <td
                          style={{
                            color: "black",
                            fontSize: "13px",
                            fontWeight: "400",
                          }}
                        >
                          5550
                        </td>
                        <td
                          style={{
                            color: "black",
                            fontSize: "13px",
                            fontWeight: "400",
                          }}
                        >
                          <Badge
                            bg="danger"
                            style={{
                              fontSize: "10px",
                              display: "none",
                            }}
                          >
                            Pending
                          </Badge>
                          <Badge
                            bg="success"
                            style={{
                              fontSize: "10px",
                              display: "inline-block",
                            }}
                          >
                            Approved
                          </Badge>
                        </td>
                        <td
                          style={{
                            color: "black",
                            fontSize: "13px",
                            fontWeight: "400",
                          }}
                        >
                          2022-10-15 19:11:55
                        </td>
                        <td>
                          <div className="d-flex flex-column justify-content-between">
                            <div>
                              <EyeOutlined className="PurchaseHistoryEyeIcon" />
                            </div>
                            <div>
                              <DeleteOutlined className="PurchaseHistoryDeleteIcon" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
