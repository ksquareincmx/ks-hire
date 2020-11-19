import React from 'react';
import {
  useRouteMatch,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from 'modules/Auth/views/Login';

const AuthModule = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.url}/login`}>
        <Login />
      </Route>
      <Redirect to={`${match.url}/login`} />
    </Switch>
  );
};

export default AuthModule;
