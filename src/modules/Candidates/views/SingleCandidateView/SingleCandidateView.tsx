import * as React from 'react';
import { FC, useEffect } from 'react';
import {
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import { getOneCandidate } from 'store/candidates/thunks';
import { addDocuments } from 'store/documents/documentSlice';
import { Grid } from '@material-ui/core';
import {
  ICandidate,
  IFeedbackRead,
  INoteRead,
} from 'modules/Candidates/typings';
import { sel_candidateData } from 'store/candidates/selectors';
import { useDispatch, useSelector } from 'react-redux';
import CandidateDetails from 'modules/Candidates/Components/CandidateDetails';
import CandidateHeroHeader from 'modules/Candidates/views/SingleCandidateView/partials/CandidateHeroHeader';
import DocumentsView from 'modules/Candidates/views/DocumentsView';
import Feedback from 'modules/Candidates/views/Feedback';
import HiringTeam from 'modules/Jobs/views/SingleJob/components/HiringTeam';
import Note from 'modules/Candidates/views/Note';
import { getRole } from 'utils/helpers';
import KPrivateRoute from 'components/KPrivateRoute';
import styles from './SingleCandidateView.module.scss';

export interface ITab {
  tab: string;
  to: string;
}

interface ParamTypes {
  candidateId: string;
}

const SingleCandidateView: FC = () => {
  const candidate: ICandidate = useSelector(sel_candidateData);
  const { candidateId } = useParams<ParamTypes>();
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const tabs: ITab[] =
    getRole() === 'INTERVIEWER'
      ? [
          { tab: 'feedback', to: `${match.url}` },
          { tab: 'documents', to: `${match.url}/documents` },
        ]
      : [
          { tab: 'feedback', to: `${match.url}` },
          { tab: 'notes', to: `${match.url}/notes` },
          { tab: 'documents', to: `${match.url}/documents` },
        ];

  const candidateHeaderData = {
    name: `${candidate.firstName} ${candidate.lastName}`,
    status: candidate?.jobs?.length ? candidate.jobs[0].status : '',
    position: candidate?.jobs?.length ? candidate.jobs[0].title : '',
    stage: candidate.stage?.name,
    id: candidate.id,
    referral: candidate.referral,
  };

  useEffect(() => {
    if (candidate.documents !== undefined) {
      dispatch(addDocuments(candidate.documents));
    }
    // eslint-disable-next-line
  }, [candidate]);
  useEffect(() => {
    dispatch(getOneCandidate(candidateId || ''));
  }, [dispatch, candidateId]);

  return (
    <Grid container direction="column" className={styles.container}>
      <Grid
        container
        item
        direction="column"
        className={styles.header}
      >
        <CandidateHeroHeader
          candidateData={candidateHeaderData}
          tabs={tabs}
        />
      </Grid>
      <Grid
        container
        className={styles.components}
        //xs={12} md={8}
      >
        <Grid item container className={styles.mainContainer}>
          <Switch>
            <Route exact path={`${match.url}`}>
              <Grid item xs={12} md={7}>
                <Feedback
                  feedbacks={candidate.feedbacks as IFeedbackRead[]}
                  candidateId={candidateId}
                />
              </Grid>
            </Route>

            <KPrivateRoute
              exact
              path={`${match.url}/notes`}
              roles={['ADMINISTRATOR', 'RECRUITER', 'MANAGER']}
            >
              <Grid item xs={12} md={7}>
                <Note
                  notes={candidate.notes as INoteRead[]}
                  candidateId={candidateId}
                />
              </Grid>
            </KPrivateRoute>

            <Route exact path={`${match.url}/documents`}>
              <Grid item xs={12} md={7}>
                <DocumentsView />
              </Grid>
            </Route>
          </Switch>
          <Grid item xs={false} md={1}></Grid>
          <Grid item xs={12} md={4}>
            <div className={styles.info}>
              <CandidateDetails candidateDetails={candidate} />
            </div>
            <div className={styles.hiringTeam}>
              <HiringTeam
                recruiter={candidate.recruiter}
                processInterviews={candidate.processInterviews}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SingleCandidateView;
