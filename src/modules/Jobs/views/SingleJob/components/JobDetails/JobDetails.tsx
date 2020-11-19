import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import { format } from 'date-fns';
import styles from './JobDetails.module.scss';
import { useHistory } from 'react-router-dom';

interface IJobDetailsProps {
  details: {
    id: string;
    jobId?: string;
    aplicationForm?: string;
    clientJobId?: string | null;
    clientName?: string | null;
    department?: string;
    groupHiringFor?: string | null;
    jobCreator?: string;
    jobDepartment?: string;
    jobSeniority?: string;
    jobTime?: string;
    jobType?: string;
    jobUrgency?: string;
    location: string;
    practiceDepartment?: string | null;
    priority?: string | null;
    salaryCurrency: string;
    salaryGross?: string;
    salaryLower: string;
    salaryPeriod: string;
    salaryUpper: string;
    title: string;
    createdAt?: Date;
    updatedAt?: Date;
    openAt?: Date;
    closedAt?: Date;
    status: string;
    requiredPositions?: string;
    hiredCandidates?: string;
  };
}

const JobDetails: FC<IJobDetailsProps> = (props) => {
  const {
    id,
    clientJobId,
    clientName,
    jobCreator,
    jobDepartment,
    jobSeniority,
    jobTime,
    jobType,
    jobUrgency,
    location,
    salaryCurrency,
    salaryGross,
    salaryLower,
    salaryPeriod,
    salaryUpper,
    status,
    title,
    jobId,
    createdAt,
    updatedAt,
    openAt,
    closedAt,
    requiredPositions,
    hiredCandidates,
  } = props.details;
  const history = useHistory();

  const jobCreatorRender = jobCreator ? (
    <Typography variant="body2">{jobCreator}</Typography>
  ) : (
    <Typography variant="body2">No job creator specified</Typography>
  );

  const jobTimeRender = jobTime ? (
    <Typography variant="body2">{jobTime}</Typography>
  ) : (
    <Typography variant="body2">No job time specified</Typography>
  );

  const jobTypeRender = jobType ? (
    <Typography variant="body2">{jobType}</Typography>
  ) : (
    <Typography variant="body2">No job type specified</Typography>
  );

  const clientJobIdRender = clientJobId ? (
    <Typography variant="body2">{clientJobId}</Typography>
  ) : (
    <Typography variant="body2">
      No client Job ID specified
    </Typography>
  );

  const clientNameRender = clientName ? (
    <Typography variant="body2">{clientName}</Typography>
  ) : (
    <Typography variant="body2">No client specified</Typography>
  );

  return (
    <Paper className={styles.jobDetails}>
      <div className={styles.cardHeader}>
        <Typography variant="h5">Job Details</Typography>
        <IconButton
          aria-label="edit"
          style={{ marginRight: '-12px' }}
          onClick={() => {
            history.push(`/jobs/edit/${id}`);
          }}
        >
          <EditIcon />
        </IconButton>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.item}>
            <Typography variant="subtitle2">Job Title</Typography>
            <Typography variant="body2">{title}</Typography>
          </div>

          <div className={styles.item}>
            <Typography variant="subtitle2">Job Urgency</Typography>
            <Typography variant="body2">{jobUrgency}</Typography>
          </div>

          <div className={styles.item}>
            <Typography variant="subtitle2">Job Seniority</Typography>
            <Typography variant="body2">{jobSeniority}</Typography>
          </div>

          <div className={styles.item}>
            <Typography variant="subtitle2">
              Job Department
            </Typography>
            <Typography variant="body2">{jobDepartment}</Typography>
          </div>

          <div className={styles.item}>
            <Typography variant="subtitle2">Job ID</Typography>
            <Typography variant="body2">
              {jobId ? jobId : id}
            </Typography>
          </div>

          <div className={styles.item}>
            <Typography variant="subtitle2">Location</Typography>
            <Typography variant="body2">{location}</Typography>
          </div>
          <div className={styles.item}>
            <Typography variant="subtitle2">
              Required Positions
            </Typography>
            <Typography variant="body2">
              {requiredPositions
                ? requiredPositions
                : 'No information'}
            </Typography>
          </div>
          <div className={styles.item}>
            <Typography variant="subtitle2">Created at</Typography>
            {createdAt &&
              format(new Date(createdAt as Date), 'dd/MM/yy')}
          </div>
          <div className={styles.item}>
            <Typography variant="subtitle2">Open at</Typography>
            {openAt && format(new Date(openAt as Date), 'dd/MM/yy')}
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.item}>
            <Typography variant="subtitle2">Job Creator</Typography>
            {jobCreatorRender}
          </div>

          <div className={styles.item}>
            <Typography variant="subtitle2">Job type</Typography>
            {jobTypeRender}
          </div>

          <div className={styles.item}>
            <Typography variant="subtitle2">Job time</Typography>
            {jobTimeRender}
          </div>

          <div className={styles.item}>
            <Typography variant="subtitle2">Client</Typography>
            {clientNameRender}
          </div>

          <div className={styles.item}>
            <Typography variant="subtitle2">Client Job ID</Typography>
            {clientJobIdRender}
          </div>

          <div className={styles.item}>
            <Typography variant="subtitle2">Salary</Typography>
            <Typography variant="body2" display="inline">
              ${salaryLower} - ${salaryUpper} {salaryCurrency} /{' '}
              {salaryPeriod} - {salaryGross}
            </Typography>
          </div>
          <div className={styles.item}>
            <Typography variant="subtitle2">
              Hired Candidates
            </Typography>
            <Typography variant="body2">{hiredCandidates}</Typography>
          </div>
          <div className={styles.item}>
            <Typography variant="subtitle2">Updated at</Typography>
            {updatedAt &&
              format(new Date(updatedAt as Date), 'dd/MM/yy')}
          </div>
          <div className={styles.item}>
            <Typography variant="subtitle2">Closed at</Typography>
            {closedAt &&
              status === 'Closed' &&
              format(new Date(closedAt as Date), 'dd/MM/yy')}
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default JobDetails;
