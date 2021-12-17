import React from 'react'
import { Routes, Route, useLocation, Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer, AppBar, CssBaseline, Toolbar, Link, List, ListItem, Divider, ListItemText, ListItemIcon, Typography as Text } from '@material-ui/core'
import { AddBox as AddBoxIcon, Dashboard as DashboardIcon, Code as CodeIcon, ContactMail, CreditCard, FlashOn } from '@material-ui/icons'
import AirlineLogo from '../imgs/airline/airline_vector.png'
import AdminDashboard from './adminTools/adminDashboard'
import ItemCreation from './adminTools/ItemCreation/itemCreation'
import OpenOrders from './adminTools/OpenOrders/openOrders'
import DownpaymentsTable from './adminTools/Downpayments/downpaymentsTable'
import AddDownpayment from './adminTools/Downpayments/addDownpayment'
import AppHeader from './appHeader'
import Settings from './adminTools/Settings/settings'
import NewCustomerAdmin from './adminTools/NewCustomers/newCustomerAdmin'
import EditNewCustomer from './adminTools/NewCustomers/editNewCustomer'

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
    const location = useLocation()
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
                    <ListItemLink to="/admin-dashboard" primary="Dashboard" icon={<DashboardIcon/>}/>
                    <Divider/>
                    <ListItemLink to="/admin-dashboard/item-creation" primary="Item Creation" icon={<AddBoxIcon/>}/>
                    <Divider/>
                    <ListItemLink to="/admin-dashboard/open-orders" primary="Open Orders" icon={<CodeIcon/>}/>
                    <Divider/>
                    <ListItemLink to="/admin-dashboard/downpayments" primary="Downpayments" icon={<CreditCard/>}/>
                    <Divider/>
                    <ListItemLink to="/admin-dashboard/new-customers" primary="New Customers" icon={<ContactMail/>}/>
                    <Divider/>
                    <ListItemLink to="/admin-dashboard/settings" primary="System Settings" icon={<FlashOn/>}/>
                    <Divider/>
                </List>
            </Drawer>
            
            <main className={classes.content}>
                <AppHeader />
                <Routes>
                    <Route exact path={location}>
                        <AdminDashboard />
                    </Route>
                    
                    <Route path="/admin-dashboard/item-creation">
                        <ItemCreation />
                    </Route>
                    
                    <Route path="/admin-dashboard/open-orders">
                        <OpenOrders />
                    </Route>
                    
                    <Route exact path="/admin-dashboard/downpayments">
                        <DownpaymentsTable />
                    </Route>

                    <Route exact path="/admin-dashboard/downpayments/add">
                        <AddDownpayment />
                    </Route>

                    <Route exact path="/admin-dashboard/new-customers">
                        <NewCustomerAdmin />
                    </Route>
                    
                    <Route exact path="/admin-dashboard/new-customers/:regId">
                        <EditNewCustomer />
                    </Route>
                    
                    <Route path="/admin-dashboard/settings">
                        <Settings />
                    </Route>
                </Routes>
            </main>
        </div>
    )
}