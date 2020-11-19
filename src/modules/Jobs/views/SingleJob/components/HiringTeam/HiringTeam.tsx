import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography';
import styles from './HiringTeam.module.scss';
import { IInterviews } from 'modules/Candidates/typings';

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}
interface IHiringTeamProps {
  processInterviews?: Array<IInterviews>;
  managers?: Array<{
    id: string;
    firstName: string;
    lastName: string;
  }>;
  recruiter?: {
    id: string;
    firstName: string;
    lastName: string;
  };
  externalManager?: boolean;
}

const HiringTeam: FC<IHiringTeamProps> = (props) => {
  const managers = props.externalManager ? (
    <div className={styles.hiringTeam}>
      <Typography variant="body2">External Manager</Typography>
    </div>
  ) : props.managers?.length === 0 ? (
    <div className={styles.hiringTeam}>
      <Typography variant="body2">Not assigned</Typography>
    </div>
  ) : (
    props.managers?.map((manager) => (
      <div className={styles.hiringTeam} key={manager.id}>
        <div className={styles.teamPicture}>
          <span>
            {manager.firstName[0]}
            {manager.lastName[0]}
          </span>
        </div>
        <Typography variant="body2" className={styles.teamName}>
          {manager.firstName} {manager.lastName}
        </Typography>
      </div>
    ))
  );

  const recruiter = (
    <div className={styles.hiringTeam}>
      <div className={styles.teamPicture}>
        <span>
          {props.recruiter?.firstName[0]}
          {props.recruiter?.lastName[0]}
        </span>
      </div>
      <Typography variant="body2" className={styles.teamName}>
        {props.recruiter?.firstName} {props.recruiter?.lastName}
      </Typography>
    </div>
  );

  let firstInterview: IUser[] = [];
  let technical1: IUser[] = [];
  let technical2: IUser[] = [];

  props.processInterviews?.forEach((process: IInterviews) => {
    if (process.label === 'First Contact') {
      firstInterview = process.users;
    }
    if (process.label === 'Technical 1') {
      technical1 = process.users;
    }
    if (process.label === 'Technical 2') {
      technical2 = process.users;
    }
  });

  const interviewers = (
    <>
      <Typography
        variant="subtitle2"
        className={styles.teamInterviewers}
      >
        First Contact
      </Typography>
      {firstInterview.length === 0 ? (
        <div className={styles.hiringTeam}>
          <Typography variant="body2">Not assigned</Typography>
        </div>
      ) : (
        firstInterview.map((user) => (
          <div className={styles.hiringTeam} key={user.id}>
            <div className={styles.teamPicture}>
              <span>
                {user.firstName[0]}
                {user.lastName[0]}
              </span>
            </div>
            <Typography variant="body2" className={styles.teamName}>
              {user.firstName} {user.lastName}
            </Typography>
          </div>
        ))
      )}

      <Typography
        variant="subtitle2"
        className={styles.teamInterviewers}
      >
        Technical 1
      </Typography>
      {technical1.length === 0 ? (
        <div className={styles.hiringTeam}>
          <Typography variant="body2">Not assigned</Typography>
        </div>
      ) : (
        technical1.map((user) => (
          <div className={styles.hiringTeam} key={user.id}>
            <div className={styles.teamPicture}>
              <span>
                {user.firstName[0]}
                {user.lastName[0]}
              </span>
            </div>
            <Typography variant="body2" className={styles.teamName}>
              {user.firstName} {user.lastName}
            </Typography>
          </div>
        ))
      )}
      <Typography
        variant="subtitle2"
        className={styles.teamInterviewers}
      >
        Technical 2
      </Typography>
      {technical2.length === 0 ? (
        <div className={styles.hiringTeam}>
          <Typography variant="body2">Not assigned</Typography>
        </div>
      ) : (
        technical2.map((user) => (
          <div className={styles.hiringTeam} key={user.id}>
            <div className={styles.teamPicture}>
              <span>
                {user.firstName[0]}
                {user.lastName[0]}
              </span>
            </div>
            <Typography variant="body2" className={styles.teamName}>
              {user.firstName} {user.lastName}
            </Typography>
          </div>
        ))
      )}
    </>
  );

  return (
    <div className={styles.hiringTeamContainer}>
      <Typography variant="h5">
        {props.recruiter || managers ? (
          <span>Hiring team</span>
        ) : (
          <span>Interviewers</span>
        )}
      </Typography>

      {managers && (
        <div className={styles.item}>
          <Typography variant="subtitle2" className={styles.team}>
            Hiring Managers
          </Typography>
          {managers}
        </div>
      )}

      {props.recruiter && (
        <div className={styles.item}>
          <Typography variant="subtitle1" className={styles.team}>
            Recruiter
          </Typography>
          {recruiter}
        </div>
      )}

      {props.processInterviews && (
        <div className={styles.item}>
          {props.recruiter && (
            <Typography variant="subtitle1" className={styles.team}>
              Interviewers
            </Typography>
          )}
          {interviewers}
        </div>
      )}
    </div>
  );
};

export default HiringTeam;
