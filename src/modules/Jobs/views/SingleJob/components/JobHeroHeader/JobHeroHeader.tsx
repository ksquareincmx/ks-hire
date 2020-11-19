import React, { FC } from 'react';
import {
  useHistory,
  useRouteMatch,
  NavLink,
  useLocation,
} from 'react-router-dom';
import { ArrowBack, Room } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

import { editJobStatus } from 'store/jobs/thunks';
import { useDispatch } from 'react-redux';

import { getRole } from 'utils/helpers';
import { IJob } from 'modules/Jobs/typings';
import { ITab } from 'modules/Jobs/views/SingleJob/SingleJob';
import KButton from 'components/KButton';
import KSwitch from 'components/KSwitch';
import styles from './JobHeroHeader.module.scss';

interface MatchParams {
  jobId?: string;
}

interface IJobHeroHeaderProps {
  jobData: IJob;
  tabs: Array<ITab>;
}

const JobHeroHeader: FC<IJobHeroHeaderProps> = (props) => {
  const { id: jobId, title, location, status } = props.jobData;
  const dispatch = useDispatch();
  const history = useHistory();
  const locationTab = useLocation();
  const match = useRouteMatch<MatchParams>();

  const tabStyles = {
    root: styles.tab,
  };

  const roomIconStyles = {
    marginRight: '0.5rem',
  };

  const handleClick = () => {
    const id: string = jobId || '';
    const {
      departmentId,
      details,
      externalManager,
      hiringManagers,
      isJobRemote,
      jobSeniority,
      jobTime,
      jobType,
      jobUrgency,
      location,
      salaryCurrency,
      salaryGross,
      salaryLower,
      salaryPeriod,
      salaryPublic,
      salaryUpper,
      status,
      title,
      requiredPositions,
    } = props.jobData;

    const response = {
      departmentId,
      details,
      externalManager,
      hiringManagers: hiringManagers.map((value: any) => value.id),
      isJobRemote,
      jobSeniority,
      jobTime,
      jobType,
      jobUrgency,
      location,
      salaryCurrency,
      salaryGross,
      salaryLower,
      salaryPeriod,
      salaryPublic,
      salaryUpper,
      status: status === 'Open' ? 'Closed' : 'Open',
      title,
      requiredPositions,
    };

    dispatch(editJobStatus(id, response));
  };

  const tabComponent = props.tabs.map((tab) => (
    <Tab
      classes={tabStyles}
      component={NavLink}
      exact
      key={tab.tab}
      label={tab.tab}
      to={tab.to}
      value={tab.to}
    />
  ));

  return (
    <Grid container className={styles.heroHeader}>
      <Grid className={styles.buttonsContainer} item xs={12}>
        <IconButton
          aria-label="Back"
          classes={{ root: styles.backArrowIcon }}
          onClick={() => history.goBack()}
        >
          <ArrowBack />
        </IconButton>
        <div className={styles.jobPath}>
          {['ADMINISTRATOR', 'MANAGER', 'RECRUITER'].includes(
            getRole(),
          ) && (
            <KButton
              classes={{ root: styles.optionsIcon }}
              variant="outlined"
            >
              <a
                className={styles.formLink}
                href={`${window.location.origin}/vacancy/${match.params?.jobId}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                GO TO JOB FORM
              </a>
            </KButton>
          )}
        </div>
      </Grid>

      <Grid className={styles.jobInfo} item xs={12}>
        <h2 className={styles.jobTitle}>{title}</h2>
        <div className={styles.locationText}>
          <Room fontSize="small" style={roomIconStyles} />
          <Typography variant="subtitle2" className={styles.jobText}>
            {location}
          </Typography>
        </div>
        <div className={styles.chipContainer}>
          {/* <KChip
            className={status && styles[status]}
            label={status}
          /> */}
          <KSwitch
            label={status}
            checked={status === 'Open'}
            onChange={handleClick}
          />
        </div>
      </Grid>

      <Grid className={styles.tabs} item xs={12}>
        <Tabs
          indicatorColor="secondary"
          textColor="inherit"
          value={locationTab.pathname}
        >
          {tabComponent}
        </Tabs>
      </Grid>
    </Grid>
  );
};

export default JobHeroHeader;
