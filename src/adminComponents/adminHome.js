import React from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
// import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom'
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

function getAdminTool(tool) {
	switch(tool){
	case 'item-creation':
		return (<ItemCreation />);
	case 'open-orders':
		return (<OpenOrders />);
	case 'new-customers':
		return (<NewCustomerAdmin />);
	case 'settings':
		return (<Settings />);
	default:
		return (<AdminDashboard />);
	}
}


export default function AdminHome() {
	let { tool } = useParams()
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<Link component={RouterLink} to="/">
						<img src={AirlineLogo} height="50px" style={{'paddingRight': '20px'}}/>
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
					<ListItemLink to="/admin-dashboard" primary="Dashboard" icon={<DashboardIcon />} />
					<Divider/>
					<ListItemLink to="/admin-dashboard/item-creation" primary="Item Creation" icon={<AddBoxIcon />} />
					<Divider/>
					<ListItemLink to="/admin-dashboard/open-orders" primary="Open Orders" icon={<CodeIcon />} />
					<Divider/>
					<ListItemLink to="/admin-dashboard/new-customers" primary="New Customers" icon={<ContactMail />} />
					<Divider/>
					<ListItemLink to="/admin-dashboard/settings" primary="System Settings" icon={<FlashOn />} />
					<Divider/>
				</List>
			</Drawer>
			<main className={classes.content}>
				<AppHeader />
				{getAdminTool(tool)}
			</main>
		</div>
	)
}
