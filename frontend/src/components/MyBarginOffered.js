import React, { useState, useEffect } from "react";
import "../styles/MyBarginOffered.css";
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
import {
  DeleteOutlined,
  ShoppingCartOutlined,
  CheckCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import sadEmoji from "../assets/userdashboard/sad.png";
import { Pagination } from "antd";
import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
export default function MyBarginOffered() {
  const [authtoken, setauthtoken] = useState("");
  const [email, setemail] = useState("");
  const [loggedin, setloggedin] = useState("");
  const [phone, setphone] = useState("");
  const [name, setname] = useState("");
  const [avatar, setavatar] = useState("");
  const [summary, setsummary] = useState([]);
  const [paginate, setpaginate] = useState(1);
  const [lastpage, setlastpage] = useState(1);
  const [myoffers, setmyoffers] = useState([]);
  useEffect(() => {
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
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);
  useEffect(() => {
    GetBargainOffers();
  }, [authtoken]);
  useEffect(() => {
    GetBargainOffers();
  }, [paginate]);

  async function GetBargainOffers() {
    if (authtoken === "" || authtoken === null) {
    } else {
      let data = { token: authtoken, page: paginate };
      const response = await fetch("http://127.0.0.1:3001/userbargainoffers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      console.log("My Bargain offers are", result.my_offers);
      setmyoffers(result.my_offers.data);
      setlastpage(result.my_offers.total);
    }
  }

  async function DeleteBargainOffer(ID) {
    if (authtoken === "" || authtoken === null) {
    } else {
      let data = { token: authtoken, id: ID };
      const response = await fetch(
        "http://127.0.0.1:3001/delete-userbargainoffer",
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
      console.log(result);
      GetBargainOffers();
    }
  }

  async function EditBargainOffer(ID) {
    if (authtoken === "" || authtoken === null) {
    } else {
      let data = { token: authtoken, id: ID };
      const response = await fetch("http://127.0.0.1:3001/edit-offer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      console.log(result);
      GetBargainOffers();
    }
  }

  function createData(seller, Product, MyOffer, Status, CreatedAt, Action) {
    return { seller, Product, MyOffer, Status, CreatedAt, Action };
  }

  const rows =
    myoffers.length > 0
      ? myoffers.map((d, i) =>
          createData(
            <div>{d.seller_offer === "" ? "N/A" : d.seller_offer}</div>,
            <div>{d.product === null ? "N/A" : d.product.meta_title}</div>,

            <div>Rs.{d.user_offer}</div>,
            <div>
              <Badge
                style={{ width: "65px" }}
                bg={d.status === "Pending" ? "danger" : "success"}
              >
                {d.status}
              </Badge>
            </div>,
            <div>{d.created_at}</div>,
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {d.status === "Pending" ? (
                <div style={{ cursor: "pointer" }} className="mr-2">
                  <EditOutlined
                    onClick={toggleShow}
                    className="PurchaseHistoryDownloadIcon mr-3"
                  />
                  <DeleteOutlined
                    onClick={() => DeleteBargainOffer(d.id)}
                    className="PurchaseHistoryDeleteIcon"
                  />
                </div>
              ) : (
                <div style={{ cursor: "pointer" }} className="mr-2">
                  <CheckCircleOutlined className="AcceptIcon mr-3" />
                  <EditOutlined
                    onClick={toggleShow}
                    className="PurchaseHistoryDownloadIcon mr-3"
                  />
                  <ShoppingCartOutlined className="PurchaseHistoryEyeIcon mr-3" />
                  <DeleteOutlined
                    onClick={() => DeleteBargainOffer(d.id)}
                    className="PurchaseHistoryDeleteIcon"
                  />
                </div>
              )}
            </div>
          )
        )
      : [];
  return (
    <>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>...</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <Row>
        <Col lg="12" sm="12">
          <Card className="card-stats">
            <Card.Body className="card-background">
              <Row>
                <Col>
                  <p
                    className="card-category"
                    style={{ color: "black", fontSize: "20px" }}
                  >
                    My Offers
                  </p>
                  <hr />
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell className="heading" align="left">
                            Product
                          </TableCell>
                          <TableCell className="heading" align="center">
                            Created At
                          </TableCell>
                          <TableCell className="heading" align="right">
                            My Offer
                          </TableCell>
                          <TableCell className="heading" align="center">
                            Seller Offer
                          </TableCell>
                          <TableCell className="heading" align="right">
                            Status
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
                              <TableCell align="right">
                                {row.CreatedAt}
                              </TableCell>

                              <TableCell align="right">{row.MyOffer}</TableCell>
                              <TableCell
                                align="center"
                                component="th"
                                scope="row"
                              >
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
                      pageSize={10}
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
    </>
  );
}
