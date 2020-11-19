import React from 'react';
import Notifications from './components/Notifications';
import StatsTable from './components/StatsTable';
import { Typography, Grid } from '@material-ui/core';
import { getRole } from 'utils/helpers';
import styles from './Dashboard.module.scss';
import KBaseContainer from 'components/KBaseContainer';

const Dashboard = () => {
  const user = JSON.parse(String(sessionStorage.getItem('user')))
    .user;

  return (
    <KBaseContainer whole>
      <Grid
        container
        direction="column"
        style={{ width: '100%' }}
        alignItems="center"
      >
        <Typography variant="h1" className={styles.textContainer}>
          Welcome, {user.firstName}
        </Typography>
      </Grid>
      {getRole() !== 'INTERVIEWER' && <StatsTable />}
      <Notifications />
    </KBaseContainer>
  );
};

Dashboard.defaultProps = {
  notifications: [],
  stats: [],
};

export default Dashboard;
