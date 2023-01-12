import React, { useState, useEffect } from "react";
import "../styles/PurchaseHistory.css";
import { Card, Row, Col } from "react-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { EyeOutlined } from "@ant-design/icons";
import { DownloadOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import sadEmoji from "../assets/userdashboard/sad.png";
import { MDBBtn } from "mdb-react-ui-kit";
// import { MDBIcon } from 'mdb-react-ui-kit';
import { Pagination, Select, Tree } from "antd";
import Loading from "./Loading";
export default function PurchaseHistory() {
  const [id, setid] = useState("");
  const [authtoken, setauthtoken] = useState("");
  const [email, setemail] = useState("");
  const [loggedin, setloggedin] = useState("");
  const [phone, setphone] = useState("");
  const [name, setname] = useState("");
  const [avatar, setavatar] = useState("");
  const [loading, setloading] = useState(true);
  const [total_checkout, settotal_checkout] = useState("");
  const [history, sethistory] = useState([]);
  const [itemdetails, setitemdetails] = useState([]);
  const [shippingdetails, setshippingdetails] = useState([]);
  const [orderdetails, setorderdetails] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [paginate, setpaginate] = useState(1);
  const [lastpage, setlastpage] = useState(1);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setloading(true);
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
  }, [null]);
  useEffect(() => {
    setid("");
  }, [null]);

  function createData(name, calories, fat, carbs, protein, options) {
    return { name, calories, fat, carbs, protein, options };
  }

  const rows =
    history.length > 0
      ? history.map((d, i) =>
          createData(
            <a
              onClick={() => setid(d.id)}
              style={{ color: "#008c9c", cursor: "pointer" }}
            >
              {d.code}
            </a>,
            <div>{d.date}</div>,
            <div>{d.grand_total}</div>,
            <div>{d.delivery_status}</div>,
            <div>
              <Badge bg={d.payment_status === "paid" ? "success" : "danger"}>
                {d.payment_status}
              </Badge>
            </div>,
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                onClick={() => setid(d.id)}
                style={{ cursor: "pointer" }}
                className="mr-2"
              >
                <EyeOutlined className="PurchaseHistoryEyeIcon" />
              </div>
              <div style={{ cursor: "pointer" }}>
                <DownloadOutlined className="PurchaseHistoryDownloadIcon" />
              </div>
            </div>
          )
        )
      : [];

  useEffect(() => {
    setloading(true);
    HistoryItems();
    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, [authtoken]);

  useEffect(() => {
    HistoryItems();
  }, [paginate]);

  async function HistoryItems() {
    if (authtoken === "" || authtoken === null) {
      sethistory([]);
    } else {
      let data = { token: authtoken, page: paginate };
      const response = await fetch("http://127.0.0.1:3001/purchasehistory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      sethistory(result.data);
      setlastpage(String(result.meta.total));
      console.log(result.meta.total);
      console.log("History is", result.data);
    }
  }

  useEffect(() => {
    console.log(id);
    HistoryItemsDetails();
    HistoryOrderDetails();
  }, [id]);

  async function HistoryItemsDetails() {
    if (id === "" || id === null) {
    } else {
      let data = { id: id, token: authtoken };
      const response = await fetch("http://127.0.0.1:3001/historyitemdetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();

      setitemdetails(result.data[0]);
      console.log("Item details are", result.data[0]);
      setshippingdetails(result.data[0].shipping_address);
      console.log(result.data[0].shipping_address);
    }
  }

  async function HistoryOrderDetails() {
    if (id === "" || id === null) {
    } else {
      let data = { id: id, token: authtoken };
      const response = await fetch(
        "http://127.0.0.1:3001/historyorderdetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      let result = await response.json();
      // console.log("Item Order Details are", result);
      setorderdetails(result.data[0]);
      console.log("Item details are", result.data[0]);
      let shipping_cost = result.data[0].shipping_cost.split("s")[1];
      let tota_price = result.data[0].price.split("s")[1];
      let coupon = result.data[0].coupon_discount.split("s")[1];
      let tax = result.data[0].tax.split("s")[1];

      let formated_price = parseFloat(tota_price.replaceAll(",", ""));
      let formated_shipping = parseFloat(shipping_cost.replaceAll(",", ""));
      let formatted_coupon = parseFloat(coupon.replaceAll(",", ""));
      let formatted_tax = parseFloat(tax.replaceAll(",", ""));
      let final_price =
        formated_shipping + formated_price + formatted_tax - formatted_coupon;
      settotal_checkout(final_price.toLocaleString("en-US"));
      // setshippingdetails(result.data[0].shipping_address);
      // console.log(result.data[0].shipping_address);
    }
  }

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <div className="m-3" style={{ width: "100%" }}>
          <div style={{ textAlign: "right", cursor: "pointer" }}>
            <span onClick={() => setid("")}> Purchase History /</span>
          </div>
          <div className="mt-4" style={{ display: "block" }}>
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
                          Purchase History
                        </p>
                        <hr />
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 650 }}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell className="heading">Code</TableCell>
                                <TableCell className="heading" align="right">
                                  Date
                                </TableCell>
                                <TableCell className="heading" align="right">
                                  Amount
                                </TableCell>
                                <TableCell className="heading" align="right">
                                  Delivery Status
                                </TableCell>
                                <TableCell className="heading" align="right">
                                  Payment Status
                                </TableCell>
                                <TableCell className="heading" align="right">
                                  Options
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
                                    <TableCell align="right">
                                      {row.fat}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.carbs}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.protein}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.options}
                                    </TableCell>
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
                                    <div style={{ fontSize: "20px" }}>
                                      Nothing found
                                    </div>
                                  </div>
                                </div>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <div style={{ textAlign: "end" }}>
                          <Pagination
                            pageSize={5}
                            showSizeChanger={false}
                            onChange={(e) => setpaginate(e)}
                            defaultCurrent={1}
                            total={20}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
          {/* Order Summary*/}
          {id !== "" ? (
            <div style={{ display: "block" }}>
              <Row className="mt-3">
                <Col lg="11" sm="12" className="mt-3">
                  <div
                    className="mb-3"
                    style={{ fontSize: "20px", color: "black" }}
                  >
                    Order Id: {itemdetails.code}
                  </div>
                  <Card className="card-stats">
                    <Card.Body className="card-background">
                      <Row>
                        <Col>
                          <p
                            className="card-category"
                            style={{ color: "black", fontSize: "20px" }}
                          >
                            Order Summary
                          </p>
                          <hr />
                          {/* row 1 */}
                          <Row className="mt-4">
                            <Col lg="3" sm="12">
                              <div className="PurchaseSlipHeadings">
                                Order Code:
                              </div>
                            </Col>
                            <Col lg="3" sm="12">
                              <div>{itemdetails.code}</div>
                            </Col>
                            <Col lg="3" sm="12">
                              <div className="PurchaseSlipHeadings">
                                Order date:
                              </div>
                            </Col>
                            <Col lg="2" sm="12">
                              <div>{itemdetails.date}</div>
                            </Col>
                          </Row>
                          {/* Row 2 */}
                          <Row className="mt-4">
                            <Col lg="3" sm="12">
                              <div className="PurchaseSlipHeadings">
                                Customer:
                              </div>
                            </Col>
                            <Col lg="3" sm="12">
                              <div>{shippingdetails.name}</div>
                            </Col>
                            <Col lg="3" sm="12">
                              <div className="PurchaseSlipHeadings">
                                Order status:
                              </div>
                            </Col>
                            <Col lg="2" sm="12">
                              <div>{itemdetails.delivery_status}</div>
                            </Col>
                          </Row>
                          {/* Row 3 */}
                          <Row className="mt-4">
                            <Col lg="3" sm="12">
                              <div className="PurchaseSlipHeadings">Email:</div>
                            </Col>
                            <Col lg="3" sm="12">
                              <div>{shippingdetails.email}</div>
                            </Col>
                            <Col lg="3" sm="12">
                              <div className="PurchaseSlipHeadings">
                                Total order amount:
                              </div>
                            </Col>
                            <Col lg="2" sm="12">
                              <div>{itemdetails.grand_total}</div>
                            </Col>
                          </Row>
                          {/* Row 4 */}
                          <Row className="mt-4">
                            <Col lg="3" sm="12">
                              <div className="PurchaseSlipHeadings">
                                Shipping address:
                              </div>
                            </Col>
                            <Col lg="3" sm="12">
                              <div>{shippingdetails.address}</div>
                            </Col>
                            <Col lg="3" sm="12">
                              <div className="PurchaseSlipHeadings">
                                Shipping method:
                              </div>
                            </Col>
                            <Col lg="2" sm="12">
                              <div>Flat shipping rate</div>
                            </Col>
                          </Row>
                          {/* Row 5 */}
                          <Row className="mt-4">
                            <Col lg="3" sm="12">
                              <div className="PurchaseSlipHeadings">
                                Additional Info:
                              </div>
                            </Col>
                            <Col lg="3" sm="12">
                              <div>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Cupiditate, blanditii
                              </div>
                            </Col>
                            <Col lg="3" sm="12">
                              <div className="PurchaseSlipHeadings">
                                Payment method:
                              </div>
                            </Col>
                            <Col lg="2" sm="12">
                              <div>{itemdetails.payment_type}</div>
                            </Col>
                          </Row>
                          <Row className="mt-4">
                            <Col lg="3" sm="12">
                              <div className="PurchaseSlipHeadings">
                                Tracking id:
                              </div>
                            </Col>
                            <Col lg="3" sm="12">
                              <div>
                                {itemdetails.tracking_code === null
                                  ? "N/A"
                                  : itemdetails.tracking_code}
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col lg="11" sm="12">
                  <Card className="card-stats">
                    <Card.Body className="card-background">
                      <Row>
                        <Col>
                          <p
                            className="card-category"
                            style={{ color: "black", fontSize: "20px" }}
                          >
                            Order Details
                          </p>
                          <hr />
                          <Table striped>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Variation</th>
                                <th>Quantity</th>
                                <th>Delivery Type</th>
                                <th>Price</th>
                                <th>Refund</th>
                                <th>Review</th>
                              </tr>
                            </thead>
                            <tbody className="mt-4">
                              <tr>
                                <td>
                                  <Link style={{ color: "#008c9c" }}>
                                    {orderdetails.id}
                                  </Link>
                                </td>
                                <td
                                  style={{
                                    width: "30%",
                                    padding: "0px 10px",
                                    color: "black",
                                    fontSize: "13px",
                                    fontWeight: "400",
                                  }}
                                >
                                  {orderdetails.product_name}
                                </td>
                                <td
                                  style={{
                                    color: "black",
                                    fontSize: "13px",
                                    fontWeight: "400",
                                  }}
                                >
                                  {orderdetails.variation === null
                                    ? "N/A"
                                    : orderdetails.variation}
                                </td>
                                <td
                                  style={{
                                    color: "black",
                                    fontSize: "13px",
                                    fontWeight: "400",
                                  }}
                                >
                                  {orderdetails.quantity}
                                </td>
                                <td
                                  style={{
                                    color: "black",
                                    fontSize: "13px",
                                    fontWeight: "400",
                                  }}
                                >
                                  {itemdetails.shipping_type}
                                </td>
                                <td
                                  style={{
                                    color: "black",
                                    fontSize: "13px",
                                    fontWeight: "400",
                                  }}
                                >
                                  {orderdetails.price}
                                </td>
                                <td
                                  style={{
                                    color: "black",
                                    fontSize: "13px",
                                    fontWeight: "800",
                                  }}
                                >
                                  {orderdetails.refund_label}
                                </td>
                                <td
                                  style={{
                                    color: "#f28aa3",
                                    fontSize: "13px",
                                    fontWeight: "400",
                                  }}
                                >
                                  {itemdetails.delivery_status === "pending" ? (
                                    "Not Delivered Yet"
                                  ) : (
                                    <MDBBtn>Review</MDBBtn>
                                  )}
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
              {/* Order Amount */}
              <Row className="mt-3">
                <Col lg="3" sm="12">
                  <Card className="card-stats">
                    <Card.Body className="card-background">
                      <Row>
                        <Col>
                          <p
                            className="card-category"
                            style={{ color: "black", fontSize: "20px" }}
                          >
                            Order Amount
                          </p>
                          <hr />
                          <div className="d-flex justify-content-between mt-2">
                            <div style={{ fontWeight: "600" }}>Subtotal</div>
                            <div>{orderdetails.price}</div>
                          </div>
                          <div className="d-flex justify-content-between mt-2">
                            <div style={{ fontWeight: "600" }}>Shipping</div>
                            <div>{orderdetails.shipping_cost}</div>
                          </div>
                          <div className="d-flex justify-content-between mt-2">
                            <div style={{ fontWeight: "600" }}>Tax</div>
                            <div>{orderdetails.tax}</div>
                          </div>
                          <div className="d-flex justify-content-between mt-2">
                            <div style={{ fontWeight: "600" }}>Coupon</div>
                            <div>{orderdetails.coupon_discount}</div>
                          </div>
                          <div className="d-flex justify-content-between mt-2">
                            <div style={{ fontWeight: "600" }}>Total</div>
                            <div>Rs.{total_checkout}</div>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}
