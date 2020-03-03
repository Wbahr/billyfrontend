import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '40px',
    height: '40px',
    backgroundColor: 'darkblue',
    color: 'white',
    fontSize: '18px',
    fontFamily: 'ProximaBold',
    textTransform: 'uppercase'
  }
}));


export default function AppHeader(props) {
  let { tool } = useParams()
  const classes = useStyles()

  let AdminTool
  switch(tool){
    case 'item-creation':
      AdminTool = 'Item Creation'
      break
    default:
      AdminTool = 'Welcome Back'
  }

  return (
    <div className={classes.root}>
      {AdminTool}
    </div>
  );
}
