import React from 'react';
import { Card } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import { IFeedback } from 'modules/Candidates/typings';
import styles from './FeedbackCardsList.module.scss';
/* import { IOptions } from '../LongMenu/typings'; */
import KAvatar from 'components/KAvatar';
import LongMenu from '../LongMenu';
import format from 'date-fns/format';
import Emptiness from 'components/Emptiness';
import { getRole } from 'utils/helpers';

interface IFeedbackProps {
  feedbacks: IFeedback[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentId: React.Dispatch<React.SetStateAction<string | null>>;
}

const cardStyles = makeStyles({
  card: {
    position: 'relative',
    maxWidth: '100%',
    marginBottom: 20,
    padding: 22,
    boxShadow: '0 5px 30px -12px rgba(0,0,0,0.3)',
    whiteSpace: 'pre-line',
  },
});

const FeedbackCardsList: React.FC<IFeedbackProps> = ({
  feedbacks,
  setOpen,
  setCurrentId,
}: IFeedbackProps) => {
  const classes = cardStyles();
  const { user } = JSON.parse(String(sessionStorage.getItem('user')));

  const handleOpen = (id: string) => {
    setCurrentId(id);
    setOpen(true);
  };

  const feedbackCardsList = feedbacks.map((feedback: any) => {
    const userName = feedback.user
      ? `${
          feedback.user.firstName &&
          feedback.user.firstName.split(' ')[0]
        } ${
          feedback.user.lastName &&
          feedback.user.lastName.split(' ')[0]
        }`
      : '';

    return (
      <Card key={feedback.id} className={classes.card}>
        <div className={styles.reviewerFeedbackHeader}>
          <div className={styles.displaySmallInlineBlock}>
            <div className={styles.feedbackKAvatar}>
              <KAvatar name={userName} />
            </div>
          </div>
          <h5>
            {userName}
            <small className={styles.neutralVoteColor}>
              &nbsp; left interviewer feedback
            </small>
            <time
              className={styles.reviewerFeedbackDate}
              dateTime="2008-02-14 20:00"
            >
              {format(new Date(feedback.createdAt as Date), 'PPp')}
            </time>
          </h5>
        </div>
        <div className={styles.reviewerVote}>
          <Rating name="read-only" value={feedback.score} readOnly />
        </div>

        <p>{feedback.comment}</p>

        <div className={styles.longMenuPosition}>
          {(feedback?.user?.id === user.id ||
            getRole() === 'ADMINISTRATOR') && (
            <LongMenu
              options={
                getRole() === 'ADMINISTRATOR' &&
                feedback?.user?.id !== user.id
                  ? [
                      {
                        type: 'DELETE',
                        deleteFn: (id: string) => {
                          handleOpen(id);
                        },
                      },
                    ]
                  : [
                      { type: 'EDIT', path: '/edit-feedback/' },
                      {
                        type: 'DELETE',
                        deleteFn: (id: string) => {
                          handleOpen(id);
                        },
                      },
                    ]
              }
              feedbackId={feedback.id as string}
            />
          )}
        </div>
      </Card>
    );
  });

  return feedbacks.length >= 1 ? (
    <div className="card-list-container">{feedbackCardsList}</div>
  ) : (
    <Emptiness message="This candidate has no feedback" />
  );
};

export default FeedbackCardsList;
