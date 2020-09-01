import React, { useContext } from 'react'
import _ from 'lodash'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Context from '../config/context'

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
	let { tool } = useParams()
	const classes = useStyles()
	const context = useContext(Context)
  

	let AdminTool
	switch(tool){
	case 'item-creation':
		AdminTool = 'Item Creation'
		break
	case 'open-orders':
		AdminTool = 'Open Orders'
		break
	case 'new-customers':
		AdminTool = 'New Customers'
		break
	case 'settings':
		AdminTool = 'System Settings'
		break
	default:
		AdminTool = `Welcome Back, ${_.get(context,'userInfo.firstName','Airline Employee')}`
	}

	return (
		<div className={classes.root}>
			{AdminTool}
		</div>
	)
}
