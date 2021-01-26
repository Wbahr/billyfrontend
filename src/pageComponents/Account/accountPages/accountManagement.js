import React, { useContext } from 'react'
import _ from 'lodash'
import Context from '../../../setup/context'

export default function AccountManagementPage() {
    const context = useContext(Context)

    return (
        <div>
            <div>
                <p>Hi {_.get(context, 'userInfo.firstName', '')}</p>
            </div>
            <div>
                <p>Account Info</p>
                <p>Company: {_.get(context, 'userInfo.companyName', '')} - {_.get(context, 'userInfo.companyId', '')}</p>
            </div>
        </div>
    )
}

