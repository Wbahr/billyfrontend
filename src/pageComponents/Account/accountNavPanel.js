import React, {useState, useContext} from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import Context from '../../config/context'

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

export default function AccountManagementPage({history}) {
  const context = useContext(Context);

  return(
    <Container>
      <div>
        <UserName>{_.get(context,`userInfo.firstName`,'My Account')}</UserName>
        <CompanyName>{_.get(context,`userInfo.companyName`,'')}</CompanyName>
        <CustomerId> Customer ID: {_.get(context,`userInfo.companyId`,'')}</CustomerId>
      </div>
      <DivNavSection>
        <h5>Manage Account</h5>
        <p onClick={()=> history.push('/account/dashboard')}>Account Settings</p>
        <p onClick={()=> history.push('/account/shopping-lists')}>Shopping Lists</p>
        <p onClick={()=> history.push('/account/my-ordered-items')}>Item Purchase History</p>
      </DivNavSection>
      <DivNavSection>
        <h5>Order Information</h5>
        <p onClick={()=> history.push('/account/my-orders')}>Orders</p>
        <p onClick={()=> history.push('/account/my-orders')}>Open Orders Report</p>
        {/* <p onClick={()=> history.push('/account/my-orders')}>Open Payables</p>
        <p onClick={()=> history.push('/account/my-orders')}>Suspended Orders</p> */}
      </DivNavSection>
      <DivNavSection>
        <h5>Quotes</h5>
        <p onClick={()=> history.push('/account/open-quotes')}>Open Quotes</p>
        <p onClick={()=> history.push('/account/open-quotes')}>Request a Quote</p>
      </DivNavSection>
      <DivNavSection>
        <h5>Invoices</h5>
        <p onClick={()=> history.push('/account/invoices')}>Invoices</p>
      </DivNavSection>      
      <DivNavSection>
        <h5>Customer Service</h5>
        <p onClick={()=> history.push('/contact-us')}>Contact Us</p>
      </DivNavSection>
    </Container>
  )
}
