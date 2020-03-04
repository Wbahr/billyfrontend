import React from 'react'
import _ from 'lodash'

export default function Auth(props) {

  let userInfo = localStorage.getItem('userInfo')

  if(props.authRequired && !_.isNil(userInfo) && _.isNil(props.roles)){
    // If the user is signed in and the route doesn't have role restrictions, take them to the requested page
    return(
      <>
        {props.children}
      </>
    )
  } else if (props.authRequired && _.isNil(userInfo)) {
    // If the user isnt signed in and the route required login, take them to the login page
    props.history.push(`/login?next=${props.history.location.pathname}`)
    return(null)
  } else if (!_.isNil(userInfo) && !_.isNil(props.roles) && !props.roles.includes(userInfo.role)){
    // If the user is signed in, the route has roles but the users role doesn't match
    props.history.push('/permission-denied')
    return(null)
  } else {
    console.log('ehh role error')
    return(
      <div {...props}>
        {props.children}
      </div>
    )
  }
}