import React from 'react'
import styled from 'styled-components'

const IDButton = styled.button`
    box-shadow: none;
    border: none;
    color: ${props => props.theme.buttons.secondary.textColor};
    background-color: ${props => props.theme.buttons.secondary.backgroundColor};
    margin: 0;
    padding: 0;
    font-size: 1.5rem;
    line-height: 0;
    height: 30px;
    font-weight: bold;
    width: 17px;
`

export default function IncrementDecrementButton(props) {
    const { children, onClick, style } = props

    return (
        <IDButton {...{ onClick, style }}>
            {children}
        </IDButton>
    )
}