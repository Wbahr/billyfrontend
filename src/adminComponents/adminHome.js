import React from 'react'
import { Link as RouterLink, Outlet } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import { Drawer, AppBar, CssBaseline, Toolbar, Link, List, ListItem, Divider, ListItemText, ListItemIcon, Typography as Text } from '@mui/material'
import { AddBox as AddBoxIcon, Dashboard as DashboardIcon, Code as CodeIcon, ContactMail, CreditCard, FlashOn, MonetizationOn } from '@mui/icons-material'
import AirlineLogo from '../imgs/airline/airline_vector.png'

import { PERMISSION_ACCOUNTING_VIEW_ORDERS } from 'pageComponents/_common/constants/permissionConstants'
import AppHeader from './appHeader'
import DemandPermissionComponent from 'pageComponents/_common/security/DemandPermissionComponent'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flex: 1
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: 'white',
        color: 'black',
        fontFamily: 'ProximaBold'
    },
    appSubBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: 'white',
        color: 'black',
        fontFamily: 'ProximaBold'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        '& a': {
            color: 'unset',
        },
        '& a:hover': {
            textDecoration: 'none'
        }
    },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto'
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
        height: '27px',
        width: '27px'
    },
    listAvatar: {
        minWidth: '40px'
    },
    linkItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '0',
        height: '50px'
    }
}))

function ListItemLink(props) {
    const { icon, primary, to } = props
    return (
        <ListItem button to={to} component={RouterLink}>
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText primary={primary} />
        </ListItem>
    )
}

export default function AdminHome() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Link component={RouterLink} to="/">
                        <img src={AirlineLogo} height="50px" style={{ marginRight: 20 }} alt="Airline Hydraulics" />
                    </Link>

                    <Text variant="h4" style={{ marginTop: 10 }}>
                        Admin Tools
                    </Text>
                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{ paper: classes.drawerPaper }}
            >
                <div className={classes.toolbar} />
                <List aria-label="main mailbox folders">
                    <ListItemLink to="/admin-dashboard" primary="Dashboard" icon={<DashboardIcon />} />
                    <Divider />
                    <ListItemLink to="/admin-dashboard/item-creation" primary="Item Creation" icon={<AddBoxIcon />} />
                    <Divider />
                    <ListItemLink to="/admin-dashboard/open-orders" primary="Open Orders" icon={<CodeIcon />} />
                    <Divider />
                    <ListItemLink to="/admin-dashboard/downpayments" primary="Downpayments" icon={<CreditCard />} />
                    <Divider />
                    <ListItemLink to="/admin-dashboard/new-customers" primary="New Customers" icon={<ContactMail />} />
                    <Divider />
                    <ListItemLink to="/admin-dashboard/settings" primary="System Settings" icon={<FlashOn />} />
                    <Divider />
                    <DemandPermissionComponent permission={PERMISSION_ACCOUNTING_VIEW_ORDERS}>
                        <ListItemLink to="/admin-dashboard/order-payment-methods" primary="Order Payment Methods" icon={<MonetizationOn />} />
                        <Divider />
                    </DemandPermissionComponent>

                </List>
            </Drawer>

            <main className={classes.content}>
                <AppHeader />
                <Outlet />
            </main>
        </div>
    )
}