import React, { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import AddCandidate from 'modules/Candidates/views/AddCandidate';
import AddFeedback from './views/AddFeedback';
import AddNote from './views/AddNote';
import EditNote from './views/EditNote';
import CandidateListing from './views/CandidateListing';
import EditCandidate from './views/EditCandidate';
import EditFeedback from './views/EditFeedback';
import SingleCandidateView from './views/SingleCandidateView';

const CandidatesModule: FC = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}/`}>
        <CandidateListing />
      </Route>

      <Route exact path={`${match.url}/create`}>
        <AddCandidate />
      </Route>

      <Route path={`${match.url}/edit/:candidateId`}>
        <EditCandidate />
      </Route>

      <Route exact path={`${match.url}/:candidateId/add-feedback`}>
        <AddFeedback />
      </Route>

      <Route exact path={`${match.url}/:feedbackId/edit-feedback`}>
        <EditFeedback />
      </Route>

      <Route exact path={`${match.url}/:candidateId/add-note`}>
        <AddNote />
      </Route>

      <Route exact path={`${match.url}/:noteId/edit-note`}>
        <EditNote />
      </Route>

      <Route path={`${match.url}/:candidateId`}>
        <SingleCandidateView />
      </Route>
    </Switch>
  );
};

export default CandidatesModule;
