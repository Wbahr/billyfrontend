import React from 'react'
import { Close as CloseIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const containerStyle = {
    display: 'flex',
    backgroundColor: 'hsl(0,0%,90%)',
    borderRadius: '2px',
    margin: '0px 2px',
    height: '25px'
}

const icon = {
    fontSize: '15px',
    margin: 'auto'
}

const useStyles = makeStyles(() => ({
    label: {
        color: 'hsl(0,0%,20%)',
        fontSize: '85%',
        overflow: 'hidden',
        margin: 'auto',
        padding: '3px',
        paddingLeft: '6px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        boxSizing: 'border-box'
    },
    iconContainer: {
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#FFBDAD',
            color: '#DE350B'
        }
    }
}))

export default ({ label, onClose }) => {
    const classes = useStyles()
    return (
        <div style={containerStyle}>
            <div className={classes.label}>{label}</div>
            <div className={classes.iconContainer} onClick={onClose}>
                <CloseIcon style={icon}/>
            </div>
        </div>
    )
}