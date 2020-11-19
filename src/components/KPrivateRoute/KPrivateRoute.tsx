import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getRole, hasUserLocale } from 'utils/helpers/index';
import { useSelector } from 'react-redux';
import {
  selectorLoadingAuth,
  selectorisAuthenticated,
} from 'store/auth/selectors';

const KPrivateRoute = ({ children, roles, ...rest }: any) => {
  const isAuthenticated = useSelector(selectorisAuthenticated);
  const loading = useSelector(selectorLoadingAuth);
  return roles !== undefined && roles.length ? (
    <Route
      {...rest}
      render={({ location }) =>
        !loading && isAuthenticated && roles.includes(getRole())
          ? children
          : !loading &&
            hasUserLocale() && (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: location },
                }}
              />
            )
      }
    />
  ) : (
    <Route
      {...rest}
      render={({ location }) =>
        !loading && isAuthenticated && hasUserLocale()
          ? children
          : !loading && (
              <Redirect
                to={{
                  pathname: '/auth/login',
                  state: { from: location },
                }}
              />
            )
      }
    />
  );
};

export default KPrivateRoute;
