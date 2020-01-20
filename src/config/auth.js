import React from 'react'
import _ from 'lodash'

export default function Auth(props) {
  let userInfo = localStorage.getItem('userInfo')
  console.log('authRequired:', props.authRequired)
  console.log('userInfo:', _.isNil(userInfo))
  console.log('props', props)
  if(props.authRequired && !_.isNil(userInfo)){
    return(
      <div {...props}>
        {props.children}
      </div>
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