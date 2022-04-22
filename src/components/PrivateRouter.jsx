import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

function PrivateRouter({ component: Component, ...rest }) {
  const token = useSelector((state) => state.token.token);

  return (
    <Route
      {...rest}
      render={(props) => (token ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      ))}
    />
  );
}

export default PrivateRouter;
