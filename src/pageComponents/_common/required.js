import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Space = styled.div`
    display: inline-block;
    width: 10px;
`

export default function Required() {
    return (
        <>
            <Space />
            <FontAwesomeIcon icon='asterisk' color='#cf2432' style={{ fontSize: 12, marginBottom: 3 }} />
        </>
    )
}
