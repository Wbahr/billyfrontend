import React from 'react'
import { Switch, Route, useRouteMatch, Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Link from '@material-ui/core/Link'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AddBoxIcon from '@material-ui/icons/AddBox'
import DashboardIcon from '@material-ui/icons/Dashboard'
import CodeIcon from '@material-ui/icons/Code'
import AirlineLogo from '../imgs/airline/airline_vector.png'
import AdminDashboard from './adminTools/adminDashboard'
import ItemCreation from './adminTools/ItemCreation/itemCreation'
import OpenOrders from './adminTools/OpenOrders/openOrders'
import AppHeader from './appHeader'
import ContactMail from '@material-ui/icons/ContactMail'
import FlashOn from '@material-ui/icons/FlashOn'
import Settings from './adminTools/Settings/settings'
import NewCustomerAdmin from './adminTools/NewCustomers/newCustomerAdmin'
import EditNewCustomer from './adminTools/NewCustomers/editNewCustomer'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
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
    // backgroundColor: 'rgb(33,33,33,.75)',
  },
  content: {
    flexGrow: 1,
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

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  )

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  )
}

export default function AdminHome() {
  const { path, url } = useRouteMatch()
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link component={RouterLink} to="/">
            <img src={AirlineLogo} height="50px" style={{ paddingRight: '20px' }} />
          </Link>
          <h4>Admin Tools</h4>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List aria-label="main mailbox folders">
          <ListItemLink to={`${url}`} primary="Dashboard" icon={<DashboardIcon />} />
          <Divider />
          <ListItemLink to={`${url}/item-creation`} primary="Item Creation" icon={<AddBoxIcon />} />
          <Divider />
          <ListItemLink to={`${url}/open-orders`} primary="Open Orders" icon={<CodeIcon />} />
          <Divider />
          <ListItemLink to={`${url}/new-customers`} primary="New Customers" icon={<ContactMail />} />
          <Divider />
          <ListItemLink to={`${url}/settings`} primary="System Settings" icon={<FlashOn />} />
          <Divider />
        </List>
      </Drawer>
      <main className={classes.content}>
        <AppHeader />
        <Switch>
          <Route exact path={path}>
            <AdminDashboard />
          </Route>
          <Route path={`${path}/item-creation`}>
            <ItemCreation />
          </Route>
          <Route path={`${path}/open-orders`}>
            <OpenOrders />
          </Route>
          <Route exact path={`${path}/new-customers`}>
            <NewCustomerAdmin />
          </Route>
          <Route path={`${path}/new-customers/:regId`}>
            <EditNewCustomer />
          </Route>
          <Route path={`${path}/settings`}>
            <Settings />
          </Route>
        </Switch>
      </main>
    </div>
  )
}