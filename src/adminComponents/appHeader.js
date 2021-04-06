import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Context from '../setup/context'

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: '40px',
        height: '40px',
        backgroundColor: '#007bff',
        color: 'white',
        fontSize: '18px',
        fontFamily: 'ProximaBold',
        textTransform: 'uppercase',
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)'

    }
}))


export default function AppHeader() {
    const { tool } = useParams()
    const classes = useStyles()
    const context = useContext(Context)
  
    const getTitle = () => {
        switch (tool){
        case 'item-creation':
            return 'Item Creation'
        case 'open-orders':
            return 'Open Orders'
        case 'new-customers':
            return 'New Customers'
        case 'settings':
            return 'System Settings'
        default:
            return `Welcome Back, ${context?.userInfo?.firstName || 'Airline Employee'}`
        }
    }

    return (
        <div className={classes.root}>
            {getTitle()}
        </div>
    )
}
