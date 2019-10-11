import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
// Layouts
import HeaderFooterLayout from '../layoutComponents/headerfooterLayout/headerfooterLayout'
// Components
import Homepage from '../layoutComponents/contentScreen'


function WrapperRoute({ component: Component, layout: LayoutWrapperComponent }) {
  return (
    <Route
      render={routeProps => (
        <LayoutWrapperComponent>
          <Component {...routeProps} />
        </LayoutWrapperComponent>
      )}
    />
  );
}

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
        <WrapperRoute exact path='/' component={Homepage} layout={HeaderFooterLayout}/>
      </Switch>
    )
  }
}

export default withRouter(App)
