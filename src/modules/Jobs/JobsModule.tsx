import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import AddJob from './views/AddJob';
import EditJob from './views/EditJob';
import JobListing from './views/JobListing';
import SingleJob from './views/SingleJob';

const JobsModule = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}/`}>
        <JobListing />
      </Route>

      <Route exact path={`${match.url}/create`}>
        <AddJob />
      </Route>

      <Route path={`${match.url}/edit/:jobId`}>
        <EditJob />
      </Route>

      <Route path={`${match.url}/:jobId`}>
        <SingleJob />
      </Route>
    </Switch>
  );
};

export default JobsModule;
