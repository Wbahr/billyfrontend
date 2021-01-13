import React from 'react'
import { airlineRedTheme } from 'styles/theme'

const AirlineChip = (props) => {

    console.log(props)

    const {
        style
    } = props

    const defaultStyles = {
        display: 'inline-block',
        margin: '0',
        marginRight: '1rem',
        padding: '3px 0.5rem',
        borderRadius: '5px',
        backgroundColor: airlineRedTheme.backgrounds.blue.main,
        color: airlineRedTheme.backgrounds.blue.contrastText,
        fontSize: '0.75rem'
    }

    const stylesToApply = style ? {
        ...defaultStyles,
        ...style
    } : defaultStyles

    return <span style={stylesToApply}>{props.children}</span>
}

export default AirlineChip