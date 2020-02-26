import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
// Layouts
import EmptyLayout from '../layoutComponents/emptyLayout'
import HeaderFooterHomepageLayout from '../layoutComponents/headerfooterLayout/headerfooterHomepageLayout'
import HeaderFooterLayout from '../layoutComponents/headerfooterLayout/headerfooterLayout'
import HeaderFooterLayoutExpanded from '../layoutComponents/headerfooterLayout/headerfooterLayoutExpanded'
// Components
import AccountDashboard from '../pageComponents/Account/accountDashboardPage'
import Blog from '../pageComponents/Blog/blogPage'
import Checkout from '../pageComponents/Checkout/checkoutPage'
import Home from '../pageComponents/Home/homePage'
import ItemDetail from '../pageComponents/ItemDetail/itemDetailPage'
import Login from '../pageComponents/Login/loginPage'
import PasswordReset from '../pageComponents/PasswordReset/passwordReset'
import ProductCategories from '../pageComponents/ProductCategories/productCategoriesPage'
import RedPallet from '../pageComponents/RedPallet/redPalletPage'
import SearchResults from '../pageComponents/SearchResults/searchResultsPage'
import ShoppingCart from '../pageComponents/ShoppingCart/shoppingCartPage'
import Signup from '../pageComponents/Signup/signupPage'
import generalMinimalBrand from '../pageComponents/Brands/generalMinimalBrand'
import generalFullBrand from '../pageComponents/Brands/generalFullBrand'

// Supporting Components
import Auth from './auth'
import FourOFour from '../pageComponents/FourOFour/fourOFourPage'

function WrapperRoute({auth, component: Component, layout: LayoutWrapperComponent, ...otherProps }) {
  return (
    <Route
      {...otherProps}
      render={routeProps => (
        <Auth authRequired={auth || false} {...routeProps}>
          <LayoutWrapperComponent {...routeProps}>
            <Component {...routeProps} />
          </LayoutWrapperComponent>
        </Auth>
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
        <WrapperRoute exact path='/' component={Home} layout={HeaderFooterHomepageLayout}/>
        <WrapperRoute exact path='/about' component={Home} layout={HeaderFooterLayout}/>
        <WrapperRoute exact path='/account/:page' auth component={AccountDashboard} layout={HeaderFooterLayoutExpanded}/>
        <WrapperRoute exact path='/blog' component={Blog} layout={HeaderFooterLayoutExpanded}/>
        <WrapperRoute exact path='/blog/:slug' component={Blog} layout={HeaderFooterLayoutExpanded}/>
        <WrapperRoute exact path='/brands/:brandName' component={generalMinimalBrand} layout={HeaderFooterLayoutExpanded}/>
        <WrapperRoute exact path='/brands/featured/:page' component={generalFullBrand} layout={HeaderFooterLayoutExpanded}/>
        <WrapperRoute exact path='/categories' component={ProductCategories} layout={HeaderFooterLayout}/>
        <WrapperRoute exact path='/checkout' component={Checkout} layout={HeaderFooterLayout}/>
        <WrapperRoute exact path='/contact' component={Home} layout={HeaderFooterLayout}/>
        <WrapperRoute exact path='/industries' component={Home} layout={HeaderFooterLayout}/>
        <WrapperRoute exact path='/login' component={Login} layout={EmptyLayout}/>
        <WrapperRoute exact path='/password-reset/:passwordToken' component={PasswordReset} layout={EmptyLayout}/>
        <WrapperRoute exact path='/product/:item/:itemId' component={ItemDetail} layout={HeaderFooterLayoutExpanded}/>
        <WrapperRoute exact path='/red-pallet' component={RedPallet} layout={EmptyLayout}/>
        <WrapperRoute exact path='/resources' component={Home} layout={HeaderFooterLayout}/>
        <WrapperRoute exact path='/search/' component={SearchResults} layout={HeaderFooterLayoutExpanded}/>
        <WrapperRoute exact path='/search/:searchTerm' component={SearchResults} layout={HeaderFooterLayoutExpanded}/>
        <WrapperRoute exact path='/search/categories/:parentCategory' component={SearchResults} layout={HeaderFooterLayoutExpanded}/>
        <WrapperRoute exact path='/search/categories/:parentCategory/:childCategory' component={SearchResults} layout={HeaderFooterLayoutExpanded}/>
        <WrapperRoute exact path='/services' component={Home} layout={HeaderFooterLayout}/>
        <WrapperRoute exact path='/signup' component={Signup} layout={EmptyLayout}/>
        <WrapperRoute exact path='/cart' component={ShoppingCart} layout={HeaderFooterLayoutExpanded}/>
        <WrapperRoute component={FourOFour} layout={HeaderFooterLayoutExpanded}/>
      </Switch>
    )
  }
}

export default withRouter(App)
