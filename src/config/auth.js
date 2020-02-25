import React from 'react'
import _ from 'lodash'

export default function Auth(props) {
  let userInfo = localStorage.getItem('userInfo')
  if(props.authRequired && !_.isNil(userInfo)){
    return(
      <>
        {props.children}
      </>
    )
  } else if (props.authRequired && _.isNil(userInfo)) {
    props.history.push(`/login?next=${props.history.location.pathname}`)
    return(null)
  } else {
    return(
      <div {...props}>
        {props.children}
      </div>
    )
  }
}