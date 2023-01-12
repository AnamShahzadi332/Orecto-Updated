import React from 'react';
import "../styles/Compare.css";
import {
    Card,
    Row,
    Col,
  } from "react-bootstrap";

export default function Compare() {
  return (
    <>
      <div className='m-3' style={{width:"100%"}}>
        <div style={{display:"block"}}>
        <Row>
            <Col lg="11" sm="12">
                <Card className="card-stats">
                    <Card.Body className="card-background">
                        <Row>
                            <Col>
                                <div className='d-flex flex-row justify-content-between'>
                                    <p className="card-category" style={{color:"black", fontSize:"20px"}}>Comparison</p>
                                    <div className='btn btn-sm resetCompareButton'>Reset Compare List</div>
                                </div>
                                <hr />
                                <div className='p-3'>
                                    <div className='text-center' style={{fontSize:"18px"}}>Your comparison list is empty</div>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        </div>
    </div>
    </>
  )
}
