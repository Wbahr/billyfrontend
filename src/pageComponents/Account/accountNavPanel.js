import React, { useContext } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import Context from '../../setup/context'
import { useNavigate } from 'react-router'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  margin-left: 50px;
`

const DivNavSection = styled.div`
  border-top: 1px solid whitesmoke;
  margin: 8px 0;
  padding: 4px 8px;
  h5 {
    font-size: 18px;
    font-weight: 700;
    color: rgb(33,37,41);
    margin: 0;
    padding-top: 4px;
  }
  p {
    cursor: pointer;
    font-size: 14px;
    font-weight: 300;
    color: grey;
    margin: 0;
    margin-left: 4px;
    margin-right: auto;
    line-height: 1.5;
    &:hover {
      color: #328EFC;
    }
  }
`

const UserName = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: black;
  margin: 0;
  margin-left: 4px;
  margin-right: auto;
  line-height: 1.5;
`

const CompanyName = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: grey;
  margin: 0;
  margin-left: 4px;
  margin-right: auto;
  line-height: 1.5;
`

const CustomerId = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: grey;
  margin: 0;
  margin-left: 4px;
  margin-right: auto;
  line-height: 1.5;
`

export default function AccountManagementPage() {
    const navigate = useNavigate()
    const context = useContext(Context)

    return (
        <Container>
            <div>
                <UserName>{_.get(context, 'userInfo.firstName', 'My Account')}</UserName>
                <CompanyName>{_.get(context, 'userInfo.companyName', '')}</CompanyName>
                <CustomerId> Customer ID: {_.get(context, 'userInfo.companyId', '')}</CustomerId>
            </div>
            <DivNavSection>
                <h5>Manage Account</h5>
                {context.userInfo?.isAirlineEmployee && <p onClick={() => navigate('/admin-dashboard')}>Admin Tools</p>}
                <p onClick={() => navigate('/account/dashboard')}>Account Settings</p>
                <p onClick={() => navigate('/account/shopping-lists')}>Shopping Lists</p>
                <p onClick={() => navigate('/account/my-ordered-items')}>Item Purchase History</p>
            </DivNavSection>
            <DivNavSection>
                <h5>Order Information</h5>
                <p onClick={() => navigate('/account/orders')}>Orders</p>
                <p onClick={() => navigate('/account/open-orders-report')}>Open Orders Report</p>
            </DivNavSection>
            <DivNavSection>
                <h5>Quotes</h5>
                <p onClick={() => navigate('/account/open-quotes')}>Open Quotes</p>
                <p onClick={() => navigate('/pages/contact/contact-us')}>Request a Quote</p>
            </DivNavSection>
            <DivNavSection>
                <h5>Invoices</h5>
                <p onClick={() => navigate('/account/invoices')}>Invoices</p>
            </DivNavSection>      
            <DivNavSection>
                <h5>Customer Service</h5>
                <p onClick={() => navigate('/pages/contact/contact-us')}>Contact Us</p>
            </DivNavSection>
        </Container>
    )
}
