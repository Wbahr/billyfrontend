import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavigationItemContainerElement = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;

    &:hover {
        background-color: #535353;
        cursor: pointer;

        .nav-link {
            color: white;
        }

        .nav-dropdown {
            visibility: visible;
        }
    }

    .nav-link {
        text-decoration: none;
        font-weight: 500;
        font-size: 1rem;
        color: black;
    }
`

const DropdownElement = styled.div`
		z-index: 1;
    position: absolute;
    display: block;
    height: auto;
    background-color: #535353;
    display: block;
    visibility: hidden;
    border-top: 1px solid black;

    &:hover {
        visibility: visible;
    }

    &.visible {
        visibility: visible;
    }

    .dropdown-link {
        padding: 0.5rem 1rem;
        text-align: center;

        a {
            color: white;
            display: block;
            white-space: nowrap;
        }

        &:hover {
            background-color: #007bff;
            cursor: pointer;
        }
    }
`

const DropdownLink = styled.div`
    padding: 0.5rem 1rem;
    text-align: center;
    background-color: #535353;
    a {
        color: white;
        display: block;
        white-space: nowrap;
    }
    &:hover {
        background-color: #007bff;
        cursor: pointer;
    }
`

export const NavigationItemContainer = React.forwardRef(({ children, to, text }, ref) => (
    <NavigationItemContainerElement ref={ref}>
        <Link to={to} className="nav-link">{text}
            {!!children?.props?.children?.length && (
                <span style={{ position: 'absolute', right: '0.25rem' }}>
                    <FontAwesomeIcon icon='caret-down' color="black" />
                </span>
            )}
        </Link>
        {children}
    </NavigationItemContainerElement>
))

export const MyAccountDropdownMenu = ({ children, className }) => (
    <DropdownElement className={'nav-dropdown ' + className} style={{ marginLeft: -14 }}>
        {children}
    </DropdownElement>
)

export const CartsDropdownMenu =  ({ children, className }) => (
    <DropdownElement className={'nav-dropdown ' + className} style={{ top: '2rem' }} >
        {children} 
    </DropdownElement>
)

export const DropdownMenu = ({ children, className }) => (
    <DropdownElement className={'nav-dropdown ' + className} style={{ top: '100%', left: '50%', transform: 'translateX(-50%)' }}>
        {children}
    </DropdownElement>
)

export const DropDownMenuAction = React.forwardRef(({ linkText, onClick }, ref) => (
    <DropdownLink ref={ref}>
        <Link to="#" onClick={onClick}>{linkText}</Link>
    </DropdownLink>
))

export const DropdownMenuItem = React.forwardRef(({ children: linkText, to }, ref) => (
    <DropdownLink ref={ref}>
        <Link to={to}>{linkText}</Link>
    </DropdownLink>
))