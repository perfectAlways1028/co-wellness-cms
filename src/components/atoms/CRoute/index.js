import React              from 'react';
import {Route, Redirect}  from 'react-router-dom';


const CRoute = ({ component: Component, isAuthenticated: isAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
);
export default CRoute;