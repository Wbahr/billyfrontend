import React, {useState, useContext} from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import Context from '../../../config/context'

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
      </div>
    </div>
  )
}

