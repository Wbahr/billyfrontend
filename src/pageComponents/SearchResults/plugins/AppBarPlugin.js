import React from 'react'
import { IconButton, Typography } from '@mui/material'
import { ChevronLeft as ChevronLeftIcon, Tune as FilterIcon } from '@mui/icons-material'
import clsx from 'clsx'
import styled from 'styled-components'
import { makeStyles } from '@mui/styles'

const AppBar = styled.div`
	z-index: 1;
	display: flex;
	width: 100%;
	background-color: #cddee7;
`

export default function AppBarPlugin({ title, drawerOpen, setDrawerOpen }) {
    const classes = useStyles()
	
    const toggleDrawer = () => setDrawerOpen(!drawerOpen)
	
    return (
        <AppBar className={classes.sticky}>
            <IconButton
                aria-label="toggle drawer"
                onClick={toggleDrawer}
                className={classes.menuButton}
            >
                <FilterIcon />
                <ChevronLeftIcon className={clsx({
                    [classes.chevronRight]: !drawerOpen,
                    [classes.chevronLeft]: drawerOpen
                })}
                />
            </IconButton>
            <Typography variant="h6" noWrap style={{ margin: 'auto 0', color: '#353536' }}>
                {title}
            </Typography>
        </AppBar>
    )
}

const useStyles = makeStyles((theme) => ({
    sticky: {
        position: 'sticky',
        '-webkit-sticky': 'sticky',
        width: '100%',
        top: window.innerWidth > 750 ? 85 : 0, //at 750px the header becomes relative for better mobile experience
        alignSelf: 'flex-start'
    },
    menuButton: {
        marginRight: 24,
        color: '#353536'
    },
    chevronLeft: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            easing: theme.transitions.easing.sharp,
            duration: 300,
        }),
    },
    chevronRight: {
        transform: 'rotate(180deg)',
        transition: theme.transitions.create('transform', {
            easing: theme.transitions.easing.sharp,
            duration: 300,
        }),
    }
}))