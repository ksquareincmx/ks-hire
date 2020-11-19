import React from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import Job from 'modules/Vacancy/views/Job';
import CandidateApplied from 'modules/Vacancy/views/CandidateApplied';

const VacancyModule = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.url}/applied`}>
        <CandidateApplied />
      </Route>
      <Route exact path={`${match.url}/:jobId`}>
        <Job />
      </Route>
    </Switch>
  );
};

export default VacancyModule;
