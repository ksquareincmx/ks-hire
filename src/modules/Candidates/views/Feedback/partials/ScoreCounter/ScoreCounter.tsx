import React, { FC, useState, useEffect } from 'react';
import { Card } from '@material-ui/core';
import { IFeedbackRead } from 'modules/Candidates/typings';
import { makeStyles } from '@material-ui/core/styles';
import styles from './ScoreCounter.module.scss';

interface IScoreCounterProps {
  candidateId: string | null;
  feedbacks: IFeedbackRead[];
}

interface ICountingPoints {
  [key: number]: number;
}

const cardStyles = makeStyles({
  card: {
    boxShadow: '0 5px 30px -12px rgba(0,0,0,0.3)',
    marginBottom: 20,
    maxWidth: '100%',
    padding: 22,
    position: 'relative',
  },
});

const baseCountingPoints: ICountingPoints = {
  '-2': 0,
  '-1': 0,
  '0': 0,
  '1': 0,
  '2': 0,
};

// This is a legacy Feedback component, it works alongside Feedback "ScoreForm",
// importing "Candidates/Components/FeedbackForm/ScoreForm" is recomended.
// The newer Feedback "RatingForm" does not work with negative values. This one does.
const ScoreCounter: FC<IScoreCounterProps> = ({
  feedbacks,
}: IScoreCounterProps) => {
  const [points, setPoints] = useState(baseCountingPoints);

  useEffect(() => {
    if (feedbacks.length) {
      const countedPoints: ICountingPoints = (feedbacks as IFeedbackRead[]).reduce(
        (accumulator: ICountingPoints, current: IFeedbackRead) => {
          if (accumulator[current.score]) {
            accumulator[current.score] += 1;
          } else {
            accumulator[current.score] = 1;
          }
          return accumulator;
        },
        { ...baseCountingPoints },
      );

      setPoints(countedPoints);
    }
  }, [feedbacks]);

  const classes = cardStyles();

  return (
    <Card className={classes.card}>
      <h3 className={styles.containerTitle}>Feedback</h3>
      <div className={styles.voteContainer}>
        <ul className={styles.votes}>
          <li className={styles.positiveVoteColor}>
            +2 Strong Positive
          </li>
          <li>Votes: ({points[2]})</li>

          <li className={styles.positiveVoteColor}>+1 Positive</li>
          <li>Votes: ({points[1]})</li>

          <li className={styles.neutralVoteColor}>±0 Neutral</li>
          <li>Votes: ({points[0]})</li>

          <li className={styles.negativeVoteColor}>-1 Negative</li>
          <li>Votes: ({points[-1]})</li>

          <li className={styles.negativeVoteColor}>
            -2 Strong Negative
          </li>
          <li>Votes: ({points[-2]})</li>
        </ul>
      </div>
    </Card>
  );
};
export default ScoreCounter;
