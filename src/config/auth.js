import React, { useContext } from 'react'
import _ from 'lodash'
import Context from '../config/context'

export default function Auth(props) {
  const context = useContext(Context)

  const {
    userInfo
  } = context

  const {
    auth,
    history,
    roles
  } = props

  if(auth && !_.isNil(userInfo) && _.isNil(roles)){
    // If the user is signed in and the route doesn't have role restrictions, take them to the requested page
    return(
      <>
        {props.children}
      </>
    )
  } else if (auth && _.isNil(userInfo)) {
    // If the user isnt signed in and the route required login, take them to the login page
    history.push(`/login?next=${history.location.pathname}`)
    return(null)
  } else if (!_.isNil(userInfo) && !_.isNil(roles) && !roles.includes(userInfo.role)){
    // If the user is signed in, the route has roles but the users role doesn't match
    history.push('/permission-denied')
    return(null)
  } else {
    return(
      <div {...props}>
        {props.children}
      </div>
    )
  }
}