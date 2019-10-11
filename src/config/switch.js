import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import Homepage from '../containerComponents/contentScreen'
import Main from '../containerComponents/mainScreen'

class App extends React.Component {
  // componentDidUpdate (prevProps) {
    // if (this.props.location !== prevProps.location) {
    //   // track google analytics page view
    //   window.gtag('config', 'UA-57868840-4', {
    //     'page_path': this.props.location.pathname
    //   })

    //   // track adwords page view
    //   window.gtag('config', 'AW-798297408', {
    //     'page_path': this.props.location.pathname
    //   })

    //   // track facebook page view
    //   window.fbq('track', 'PageView')
    // }
  // }

  render () {
    return (
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/shop' component={Main} />
        {/* <Route exact path='/reset-password/:reset_token' component={ResetPasswordScreen} /> */}
      </Switch>
    )
  }
}

export default withRouter(App)
