import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
// Layouts
import HeaderFooterLayout from '../layoutComponents/headerfooterLayout/headerfooterLayout'
import EmptyLayout from '../layoutComponents/emptyLayout'
// Components
import Home from '../pageComponents/Home/homePage'
import SearchResults from '../pageComponents/SearchResults/searchResultsPage'
import RedPallet from '../pageComponents/RedPallet/redPalletPage'


function WrapperRoute({ component: Component, layout: LayoutWrapperComponent, ...otherProps }) {
  return (
    <Route
      {...otherProps}
      render={routeProps => (
        <LayoutWrapperComponent {...routeProps}>
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
        <WrapperRoute exact path='/search/' component={SearchResults} layout={HeaderFooterLayout}/>
        <WrapperRoute exact path='/search/:searchTerm' component={SearchResults} layout={HeaderFooterLayout}/>
        <WrapperRoute exact path='/shop' component={Home} layout={HeaderFooterLayout}/>
        <WrapperRoute exact path='/services' component={Home} layout={HeaderFooterLayout}/>
        <WrapperRoute exact path='/industries' component={Home} layout={HeaderFooterLayout}/>
        <WrapperRoute exact path='/brands' component={Home} layout={HeaderFooterLayout}/>
        <WrapperRoute exact path='/resources' component={Home} layout={HeaderFooterLayout}/>
        <WrapperRoute exact path='/about' component={Home} layout={HeaderFooterLayout}/>
        <WrapperRoute exact path='/contact' component={Home} layout={HeaderFooterLayout}/>
        <WrapperRoute exact path='/red-pallet' component={RedPallet} layout={EmptyLayout}/>
      </Switch>
    )
  }
}

export default withRouter(App)
