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

export const NavigationItemContainer = React.forwardRef(({children, to, text}, ref) => (
	<NavigationItemContainerElement ref={ref}>
      <Link to={to} className="nav-link">{text}
        {!!children?.props?.children?.length && (
          <span style={{position: 'absolute', right: '0.25rem'}}>
            <FontAwesomeIcon icon='caret-down' color="black" />
          </span>
        )}
      </Link>
		{children}
	</NavigationItemContainerElement>
))

// NavigationItemContainer.propTypes = {
//     children: function (props, propName, componentName){
//         const prop = props[propName]
//
//         let error = null
//
//         //Allow only DropdownMenu children
//         React.Children?.forEach(prop, function(child) {
//             if(child.type !== DropdownMenu){
//                 error = `${componentName} children should be of type '${DropdownMenu.name}'`
//             }
//         })
//
//         if(!error && prop.length > 1) error = `Only one ${DropdownMenu.name} component should be in ${componentName}`
//
//         return error ? new Error(error) : null
//     }
// }

export function DropdownMenu({children, className}) {
    return <DropdownElement className={'nav-dropdown ' + className}>
        {children}
    </DropdownElement>
}
// DropdownMenu.propTypes = {
//     children: function (props, propName, componentName){
//         const prop = props[propName]
//
//         let error = null
//         React.Children?.forEach(prop, function(child) {
//             if(child.type !== DropdownMenuItem && child.type !== DropdownMenuItemExternal){
//                 error = `${componentName} children should be of type '${DropdownMenuItem}'`
//             }
//         })
//
//         return error ? new Error(error) : null
//     }
// }

export const DropdownMenuItem = React.forwardRef(({ children: linkText, to }, ref) => (
  <DropdownLink ref={ref}>
    <Link to={to}>{linkText}</Link>
  </DropdownLink>
))

export function DropdownMenuItemExternal({ children: linkText, to }) {
    return <div className="dropdown-link">
        <a href={to} target="_blank">{linkText}</a>
    </div>
}