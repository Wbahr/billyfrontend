import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

const HeaderDetail = styled.div`
`
const Detail = styled.p`
`
export default function subDetail(props) {
    const {
        text,
    } = props
    return (
        <>
            <HeaderDetail>
                <Detail>{text}</Detail>
            </HeaderDetail>
        </>
    )
}
