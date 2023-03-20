
import React, { Fragment, Component } from 'react';
import { Provider as StoreProvider } from 'mobx-react';
import { inject, observer } from "mobx-react";
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import { HelmetProvider } from 'react-helmet-async';
import { createGenerateClassName } from '@material-ui/styles';
import { LoginPage, MainFramePage, ErrorPage } from './pages'
import ErrorBoundry from './pages/Error/ErrorBoundry';
import { CRoute } from './components/atoms';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import DatePicker css
// import 'react-datepicker/dist/react-datepicker.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
// import 'simple-line-icons/css/simple-line-icons.css';
import 'react-block-ui/style.css';
// Import Main styles for this application
import './scss/style.scss';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
});


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("authenticated", this.props.authStore.isAuthorized);
    return (
      <ErrorBoundry>
        <JssProvider generateClassName={generateClassName}>
            <HelmetProvider>
              <Fragment>
                <BrowserRouter>
                  <Switch>
                    <Route exact path="/" name="Login" component={LoginPage} />
                    <Route exact path="/login" name="Login" component={LoginPage} />
                    <CRoute path="/main" name="MainFrame" component={MainFramePage} isAuthenticated={this.props.authStore.isAuthorized} />
                    <Route component={ErrorPage} />
                  </Switch>
                </BrowserRouter>
              </Fragment>
            </HelmetProvider>
        </JssProvider>
      </ErrorBoundry>
    );
  }
}

export default inject('authStore')(observer(App));