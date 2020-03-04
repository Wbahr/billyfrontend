import React, {useState, useContext} from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import Context from '../../../config/context'

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'ProximaBold';
  cursor: pointer;
  width: 150px;
  height: 50px;
  box-shadow: 0 2px 5px 0 rgba(0,123,255,.5);
`

export default function AccountManagementPage({history}) {
  const context = useContext(Context);

  return(
    <div>
      <div>
        <p>Hi {_.get(context,`userInfo.firstName`,'')}</p>
      </div>
      <div>
        <p>Account Info</p>
        <p>Company: {_.get(context,`userInfo.companyName`,'')} - {_.get(context,`userInfo.companyId`,'')}</p>
        <Card onClick={()=> history.push('/admin-dashboard')}>
          Admin Tools
        </Card>
      </div>
    </div>
  )
}

