import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={(props) => context.authenticatedUser
            ? (<Component {...props} />)   // an authenticated user exists --> render component
            : (<Redirect to={{   // an authenticated user doesn't exist --> redirect to Sign-In screen
              pathname: "/signin",
              state: { from: props.location }
            }} />)
          }
        />
      )}
    </Consumer>
  );
};
