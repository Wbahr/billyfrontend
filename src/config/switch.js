import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
// Layouts
import HeaderFooterLayout from '../layoutComponents/headerfooterLayout/headerfooterLayout'
// Components
import Home from '../pageComponents/Home/homePage'
import SearchResults from '../pageComponents/SearchResults/searchResultsPage'


function WrapperRoute({ component: Component, layout: LayoutWrapperComponent, ...otherProps }) {
  return (
    <Route
      {...otherProps}
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
        <WrapperRoute exact path='/' component={Home} layout={HeaderFooterLayout}/>
        <WrapperRoute exact path='/shop' component={SearchResults} layout={HeaderFooterLayout}/>
      </Switch>
    )
  }
}

export default withRouter(App)
