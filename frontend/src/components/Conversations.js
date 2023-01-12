import React from 'react';
import "../styles/Conversations.css";
import {
  Card,
  Row,
  Col,
} from "react-bootstrap";
import ProfileDP from "../assets/userdashboard/useravataar.png"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

export default function Conversations() {
  return (
    <>
    <div style={{display:"none"}}>
      <div className='m-3 d-flex flex-column' style={{width:"100%"}}>
          <div style={{fontSize:"30px", fontWeight:"300"}}>Conversations</div>
          {/* Conversation is here */}
          <Row>
            <Col lg="11" sm="12">
              <Card className="card-stats">
                <Card.Body className="card-background">
                  <div className='d-flex flex-row'>
                    <div className='p-1' style={{width:"10%"}}><img style={{width:"60px"}} src={ProfileDP} alt="Profile" /></div>
                    <div className='p-1 d-flex flex-column' style={{width:"30%"}}>
                      <div style={{fontSize:"16px"}}>Muhammad Amjad Khokhar</div>
                      <div style={{fontSize:"12px"}}>06:15:11 28-11-2022</div>
                    </div>
                    <div className='p-1 d-flex flex-column' style={{width:"80%"}}>
                      <div style={{fontSize:"17px", fontWeight:"600"}}>i7s earpods White Wireless Stereo Earbuds Touch Control Bluetooth 5.0</div>
                      {/* this div is for the last sent message */}
                      <div style={{fontSize:"12px"}}>Yes</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
      </div>
    </div>

    {/* chatbox */}
    <div style={{display:"block"}}>
      <div className='m-3 d-flex flex-column' style={{width:"100%"}}>
        <div style={{fontSize:"16px",color:"black", fontWeight:"300"}}>Conversations With <span style={{color:"#008c9c", fontWeight:"400"}}>T.H Trader</span></div>
        <Row className='mt-3'>
          <Col lg="11" sm="12">
            <Card className="card-stats">
              <Card.Body className="card-background">
                {/* there will be product and the discussion between persons */}
                <div style={{color:"black", fontWeight:"500"}}>#i7s earpods White Wireless Stereo Earbuds Touch Control Bluetooth 5.0 <span>( Between you and Muhammad Amjad Khokhar )</span></div>
                <hr />
                {/* sender details */}
                <div className='d-flex flex-row'>
                    <div className='p-1' style={{width:"10%"}}><img style={{width:"60px"}} src={ProfileDP} alt="Profile" /></div>
                    <div className='p-1 d-flex flex-column' style={{width:"30%"}}>
                      <div style={{fontSize:"16px",color:"black",fontWeight:"500"}}>Usama Akbar</div>
                      <div style={{fontSize:"13px"}}>06:15:11 28-11-2022</div>
                    </div>
                </div>
                {/* sender details */}
                {/* sender message */}
                <div className='mt-3 mb-3'>
                  <div style={{color:"black",fontSize:"14px"}}>https://orecto.pk/product/i7s-earpods-white-wireless-stereo-earbuds-touch-control-bluetooth-50 test</div>
                </div>
                <hr />
                {/* sender message */}
                

                
                {/* receiver details */}
                <div className='d-flex flex-row'>
                    <div className='p-1' style={{width:"10%"}}><img style={{width:"60px"}} src={ProfileDP} alt="Profile" /></div>
                    <div className='p-1 d-flex flex-column' style={{width:"30%"}}>
                      <div style={{fontSize:"16px",color:"black",fontWeight:"500"}}>Seller</div>
                      <div style={{fontSize:"13px"}}>06:15:11 28-11-2022</div>
                    </div>
                </div>
                {/* receiver details */}
                {/* receiver message */}
                <div className='mt-3 mb-3'>
                  <div style={{color:"black",fontSize:"14px"}}>https://orecto.pk/product/i7s-earpods-white-wireless-stereo-earbuds-touch-control-bluetooth-50 test</div>
                </div>
                {/* receiver message */}
                {/* Messages Box */}
                <FloatingLabel controlId="floatingTextarea2" label="Message">
                  <Form.Control
                    as="textarea"
                    placeholder="Your message here"
                    style={{ height: '100px' }}
                  />
                </FloatingLabel>
                {/* Messages Box */}
                {/* send button */}
                <div style={{textAlign:"right"}}>
                  <div className='btn btn-custom'>Send</div>
                </div>
                {/* send button */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>

    </>
  )
}
