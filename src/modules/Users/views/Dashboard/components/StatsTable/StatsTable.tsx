import React, { useEffect } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import styles from './StatsTable.module.scss';
import { getCandidatesStats } from 'store/candidates/candidatesSlice';
import { getJobStats } from 'store/jobs/jobsSlice';
import { sel_jobStats } from 'store/jobs/selectors';
import { sel_candidatesStats } from 'store/candidates/selectors';
import { useDispatch, useSelector } from 'react-redux';
import jobService from 'services/jobs.service';
import candidateService from 'services/candidates.service';

interface IStatsProps {}

const Stats: React.FC<IStatsProps> = (props: IStatsProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const statsJob = await jobService.getJobStatistics();
      const statsCandidate = await candidateService.getCandidateStatistics();
      dispatch(getCandidatesStats(statsCandidate));
      dispatch(getJobStats(statsJob));
    })();
  }, [dispatch]);

  const candidatesStats: any = useSelector(sel_candidatesStats);
  const activeCandidates = candidatesStats.active;
  const newCandidates = candidatesStats.prospective;

  const jobs: any = useSelector(sel_jobStats);
  const openJobs = jobs.open;
  const closedJobs = jobs.closed;

  return (
    <Grid
      container
      direction="column"
      style={{ width: '100%', marginBottom: '20px' }}
      alignItems="center"
    >
      <Paper className={styles.paper}>
        <Typography
          className={styles.statsTableHeader}
          gutterBottom
          variant="h5"
        >
          General Stats
        </Typography>
        <div className={styles.statsContainer}>
          <div className={styles.singleStat}>
            <div className={styles.statNumber}>{openJobs}</div>
            <div className={styles.statName}>Open Jobs</div>
          </div>
          <div className={styles.singleStat}>
            <div className={styles.statNumber}>{closedJobs}</div>
            <div className={styles.statName}>Closed Jobs</div>
          </div>
          <div className={styles.singleStat}>
            <div className={styles.statNumber}>
              {activeCandidates}
            </div>
            <div className={styles.statName}>Active Candidates</div>
          </div>
          <div className={styles.singleStat}>
            <div className={styles.statNumber}>{newCandidates}</div>
            <div className={styles.statName}>New Candidates</div>
          </div>
        </div>
      </Paper>
    </Grid>
  );
};

export default Stats;
