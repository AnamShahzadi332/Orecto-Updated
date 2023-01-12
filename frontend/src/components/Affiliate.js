import React, { useState } from 'react';
import "../styles/Affiliate.css";
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
  } from 'mdb-react-ui-kit';
import AffiliateSystem from './AffiliateSystem';
import PaymentHistory from './PaymentHistory';
import WithdrawRequestHistory from './WithdrawRequestHistory';


export default function Affiliate() {
    const [basicActive, setBasicActive] = useState('tab1');

    const handleBasicClick = (value: string) => {
        if (value === basicActive) {
            return;
        }

    setBasicActive(value);
    };
  return (
    <div className='m-3 d-flex flex-column' style={{width:"100%"}}>
            <div style={{fontSize:"40px", fontWeight:"500"}}>Affiliate</div>
            {/* tabs are here */}
            <MDBTabs className='mb-3'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
                        Affiliate System
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
                        Payment History
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
                        Withdraw Request History
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
                <MDBTabsPane show={basicActive === 'tab1'}>
                    <AffiliateSystem/>
                </MDBTabsPane>
                <MDBTabsPane show={basicActive === 'tab2'}>
                    <PaymentHistory />
                </MDBTabsPane>
                <MDBTabsPane show={basicActive === 'tab3'}>
                    <WithdrawRequestHistory/>
                </MDBTabsPane>
            </MDBTabsContent>
        </div>
  )
}