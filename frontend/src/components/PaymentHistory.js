import React from 'react'
import "../styles/PaymentHistory.css";
import DollarSymbol from "../assets/userdashboard/dollar-symbol.png";
import {
    Card,
    Row,
    Col,
  } from "react-bootstrap";
import {PlusOutlined} from "@ant-design/icons";
import Table from 'react-bootstrap/Table';

export default function PaymentHistory() {
  return (
    <>
        <div className='d-flex justify-content-center'>
            <Row className='mt-3 w-100 justify-content-around'>
                <Col lg="3" sm="6">
                    <Card className="card-stats" style={{backgroundImage:"linear-gradient(110deg, #b854a6, #e6498a)"}}>
                        <Card.Body className='text-center'>
                            <div className="numbers">
                                <p className="card-category">
                                    <img style={{width:"35px", backgroundColor:"#a75a9d", padding:"8px", borderRadius:"50px"}} src={DollarSymbol} alt="" />
                                </p>
                                <Card.Title as="h4" style={{color:"white", fontWeight:"500"}}>Rs0.00</Card.Title>
                            </div>
                            <div className="stats" style={{color:"#efefef", fontSize:"15px"}}>Affiliate Balance</div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg="3" sm="6">
                    <Card className="card-stats">
                        <Card.Body className='text-center card-background' style={{cursor:"pointer"}}>
                            <div className="numbers">
                                <p className="card-category">
                                    <PlusOutlined style={{color:"white", fontSize:"45px", backgroundColor:"#8f97ab", padding:"8px", borderRadius:"50px"}} />
                                </p>
                                <Card.Title as="p" style={{fontWeight:"400", color:"#008c9c", marginTop:"20px"}}>Affiliate Withdraw Request</Card.Title>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
        <div className='mt-3'>
            <Card className="card-stats">
                <Card.Body className="card-background">
                    <Row>
                        <Col>
                            <p className="card-category" style={{color:"black", fontSize:"20px"}}>Affiliate payment history</p>
                            <hr />
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Payment Method</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{color:"black", fontSize:"13px", fontWeight:"400"}}>1</td>
                                        <td style={{color:"black", fontSize:"13px", fontWeight:"400"}}>03-11-2022</td>
                                        <td style={{color:"black", fontSize:"13px", fontWeight:"400"}}>Rs30.00</td>
                                        <td style={{color:"black", fontSize:"13px", fontWeight:"400"}}>Paypal</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    </>
  )
}
