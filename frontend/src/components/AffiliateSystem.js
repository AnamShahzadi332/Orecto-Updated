import React from 'react';
import "../styles/AffiliateSystem.css";
import DollarSymbol from "../assets/userdashboard/dollar-symbol.png";
import Form from 'react-bootstrap/Form';
import WheelIcon from "../assets/userdashboard/steering-wheel.png"
import {
    Card,
    Row,
    Col,
  } from "react-bootstrap";
import {PlusOutlined} from "@ant-design/icons";
import Table from 'react-bootstrap/Table';
import sadEmoji from "../assets/userdashboard/sad.png";

export default function AffiliateSystem() {
  return (
    <>
      <Row className='mt-3'>
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
                            <img style={{width:"60px", backgroundColor:"#8f97ab", padding:"8px", borderRadius:"50px"}} src={WheelIcon} alt="" />
                        </p>
                        <Card.Title as="p" style={{fontWeight:"400", color:"#008c9c", marginTop:"20px"}}>Configure Payout</Card.Title>
                    </div>
                </Card.Body>
                </Card>
            </Col>
            <Col lg="3" sm="6">
                <Card className="card-stats" style={{cursor:"pointer"}}>
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
        <div className='mt-3'>
            <Card className="card-stats">
                <Card.Body className='text-center card-background'>
                    <input type="text" className="form-control mb-2 mr-sm-2" value={"Affiliation code"} disabled/>
                    <div style={{textAlign:"right"}}>
                        <div className='btn btn-sm btn-custom'>Copy Url</div>
                    </div>
                </Card.Body>
            </Card>
        </div>
        <div className='mt-3'>
            <Card className="card-stats">
                <Card.Body className='text-center card-background'>
                    <div className='d-flex flex-row justify-content-between'>
                        <div>Affiliate Stats</div>
                        <div className='d-flex'>
                            <Form.Select size='md'>
                                <option>Choose</option>
                                <option>Today</option>
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                            </Form.Select>
                            <div className='btn btn-custom'>Filter</div>
                        </div>
                    </div>
                    <hr />
                    <Row>
                        <Col lg="3" sm="6">
                            <Card>
                                <div className="numbers p-3">
                                    <p className="card-category d-flex flex-row justify-content-center">
                                        {/* <PlusOutlined style={{color:"white", fontSize:"45px", backgroundColor:"#8f97ab", padding:"8px", borderRadius:"50px"}} /> */}
                                        <div style={{width:"40px",color:"white", fontSize:"25px", backgroundColor:"#8f97ab", borderRadius:"50px"}}>1</div>
                                    </p>
                                    <Card.Title as="p" style={{fontWeight:"400", color:"#008c9c", marginTop:"20px"}}>No of Click</Card.Title>
                                </div>
                            </Card>
                        </Col>
                        <Col lg="3" sm="6">
                            <Card>
                                <div className="numbers p-3">
                                    <p className="card-category d-flex flex-row justify-content-center">
                                        {/* <PlusOutlined style={{color:"white", fontSize:"45px", backgroundColor:"#8f97ab", padding:"8px", borderRadius:"50px"}} /> */}
                                        <div style={{width:"40px",color:"white", fontSize:"25px", backgroundColor:"#8f97ab", borderRadius:"50px"}}>1</div>
                                    </p>
                                    <Card.Title as="p" style={{fontWeight:"400", color:"#008c9c", marginTop:"20px"}}>No of Item</Card.Title>
                                </div>
                            </Card>
                        </Col>
                        <Col lg="3" sm="6">
                            <Card>
                                <div className="numbers p-3">
                                    <p className="card-category d-flex flex-row justify-content-center">
                                        {/* <PlusOutlined style={{color:"white", fontSize:"45px", backgroundColor:"#8f97ab", padding:"8px", borderRadius:"50px"}} /> */}
                                        <div style={{width:"40px",color:"white", fontSize:"25px", backgroundColor:"#8f97ab", borderRadius:"50px"}}>0</div>
                                    </p>
                                    <Card.Title as="p" style={{fontWeight:"400", color:"#008c9c", marginTop:"20px"}}>No of delivered</Card.Title>
                                </div>
                            </Card>
                        </Col>
                        <Col lg="3" sm="6">
                            <Card>
                                <div className="numbers p-3">
                                    <p className="card-category d-flex flex-row justify-content-center">
                                        {/* <PlusOutlined style={{color:"white", fontSize:"45px", backgroundColor:"#8f97ab", padding:"8px", borderRadius:"50px"}} /> */}
                                        <div style={{width:"40px",color:"white", fontSize:"25px", backgroundColor:"#8f97ab", borderRadius:"50px"}}>0</div>
                                    </p>
                                    <Card.Title as="p" style={{fontWeight:"400", color:"#008c9c", marginTop:"20px"}}>No of Cancel</Card.Title>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
        <div className='mt-3'>
            <Card className="card-stats">
                <Card.Body className="card-background">
                    <Row>
                        <Col>
                            <p className="card-category" style={{color:"black", fontSize:"20px"}}>Affiliate Earning History</p>
                            <hr />
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Referral User</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody style={{display:"none"}}>
                                    <tr>
                                        <td style={{color:"black", fontSize:"13px", fontWeight:"400"}}></td>
                                        <td style={{color:"black", fontSize:"13px", fontWeight:"400"}}></td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className='d-flex justify-content-center'>
                                <div className='d-flex flex-column'>
                                    <div style={{textAlign:"center"}}><img style={{width:"40px"}} src={sadEmoji} alt="No-Data" /></div>
                                    <div style={{fontSize:"20px"}}>Nothing found</div>
                                </div>
                                
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    </>
  )
}
