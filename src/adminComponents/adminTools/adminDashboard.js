import React from 'react'
import { Grid, Paper, Typography as Text } from '@material-ui/core'
import { AddBox as AddBoxIcon, Code as CodeIcon, ContactMail, FlashOn, CreditCard } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import AirlineLogo from '../../imgs/airline/airline_vector.png'
import { PRIMARY_RED } from '../../pageComponents/_common/constants/colors'

const minWidth = 340
const minHeight = 280

export default function AdminDashboard() {

    return (
        <Grid container justify="center">
            <Grid container direction="column" style={{ marginTop: 10, maxWidth: 700, minWidth }}>
                <Paper style={{ padding: 10, borderBottom: `3px solid ${PRIMARY_RED}` }}>
                    <Grid container justify="center">
                        <Link to="/">
                            <img src={AirlineLogo} height="50px" style={{ marginTop: 4, marginRight: 20 }} />
                        </Link>
    
                        <Text align="center" variant="h3" style={textStyle}>
                            ADMIN DASHBOARD
                        </Text>
                    </Grid>
                </Paper>

                <Grid container justify="space-between">
                    <Link to="/admin-dashboard/item-creation" style={{ textDecoration: 'none' }}>
                        <GridItem title="ITEM CREATION" Icon={AddBoxIcon} />
                    </Link>
                    
                    <Link to="/admin-dashboard/open-orders" style={{ textDecoration: 'none' }}>
                        <GridItem title="OPEN ORDERS" Icon={CodeIcon} />
                    </Link>

                    <Link to="/admin-dashboard/downpayments" style={{ textDecoration: 'none' }}>
                        <GridItem title="DOWNPAYMENTS" Icon={CreditCard} />
                    </Link>
                    
                    <Link to="/admin-dashboard/new-customers" style={{ textDecoration: 'none' }}>
                        <GridItem title="NEW CUSTOMERS" Icon={ContactMail} />
                    </Link>
                    
                    <Link to="/admin-dashboard/settings" style={{ textDecoration: 'none' }}>
                        <GridItem title="SYSTEM SETTINGS" Icon={FlashOn} />
                    </Link>

                    <Link to="/admin-dashboard/order-payment-methods" style={{ textDecoration: 'none' }}>
                        <GridItem title="ORDER PAYMENT METHODS" Icon={FlashOn} />
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    )
}

const GridItem = ({ title, Icon }) => {
    const classes = useStyles()
    return (
        <Paper className={classes.gridItem}>
            <Icon style={{ fontSize: 100, flex: 1, color: '#333' }}/>
            <Text align="center" variant="h5" className={classes.gridText}>{title}</Text>
        </Paper>
    )
}

const textStyle = {
    fontFamily: 'Verdana',
    letterSpacing: 1,
    color: '#333'
}

const useStyles = makeStyles(() => ({
    gridItem: {
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30%',
        width: '30%',
        minWidth,
        minHeight,
        margin: '10px 0',
        padding: 20,
        transition: 'all 100ms ease',
        '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: 'whitesmoke'
        }
    },
    gridText: {
        ...textStyle,
        lineHeight: 1.8,
        maxWidth: '241px',
        borderBottom: `3px solid ${PRIMARY_RED}`
    }
}))
