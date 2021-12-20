import clsx from 'clsx'
import { Drawer } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { onWindowResize } from '../../_common/helpers/generalHelperFunctions'
import CategoriesPlugin from './CategoriesPlugin'
import BrandsPlugin from './BrandsPlugin'
import AttributesPlugin from './AttributesPlugin'

const PLUGIN_TYPES = [CategoriesPlugin, BrandsPlugin, AttributesPlugin]

export default function DrawerPlugin(props) {
    const { drawerOpen, children } = props
	
    const classes = useStyles()
	
    const filterValidTypes = child => PLUGIN_TYPES.includes(child.type)
    const injectProps = child => React.cloneElement(child, { ...props, classes })
    const childArray = React.Children.map(React.Children.toArray(children).filter(filterValidTypes), injectProps)
	
    const [contentHeight, setContentHeight] = useState(window.innerHeight - 48)
	
    useEffect(() => {
        onWindowResize(() => setContentHeight(window.innerHeight - 48))
    }, [])
	
    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: drawerOpen,
                [classes.drawerClose]: !drawerOpen,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: drawerOpen,
                    [classes.drawerClose]: !drawerOpen,
                }),
            }}
            PaperProps={{ style: { position: 'relative' } }}
            style={{ height: contentHeight }}
        >
            {childArray}
        </Drawer>
    )
}

const drawerWidth = 290

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        position: 'sticky',
        alignSelf: 'flex-start',
        top: 133,
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(6) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(6) + 1,
        },
    },
    expand: {
        overflow: 'hidden',
        transition: theme.transitions.create('max-height', {
            easing: theme.transitions.easing.sharp,
            duration: 300,
        }),
    },
    collapse: {
        maxHeight: 0,
        overflow: 'hidden',
        transition: theme.transitions.create('max-height', {
            easing: theme.transitions.easing.sharp,
            duration: 300,
        }),
    }
}))