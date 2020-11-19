import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import EditUser from './views/EditUser';
import UserListing from './views/UserListing';

const UsersModule = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.url}`}>
        <UserListing />
      </Route>

      <Route path={`${match.url}/edit/:userId`}>
        <EditUser />
      </Route>
    </Switch>
  );
};

export default UsersModule;
