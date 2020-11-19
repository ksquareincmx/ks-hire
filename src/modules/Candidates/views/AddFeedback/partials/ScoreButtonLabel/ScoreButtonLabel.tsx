import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import styles from './ScoreButtonLabel.module.scss';
import clsx from 'clsx';

interface IScoreButtonLabelProps {
  checked: boolean;
  score: number;
}

const ScoreButtonLabel: FC<IScoreButtonLabelProps> = ({
  checked,
  score,
}) => {
  let scoreLabel;

  switch (score) {
    case -2:
      scoreLabel = 'Strong negative';
      break;
    case -1:
      scoreLabel = 'Negative';
      break;
    case 0:
      scoreLabel = 'Neutral';
      break;
    case 1:
      scoreLabel = 'Positive';
      break;
    case 2:
      scoreLabel = 'Strong Positive';
      break;
    default:
      scoreLabel = '';
      break;
  }

  return (
    <Typography
      variant="h6"
      className={clsx(styles.voteTitle, {
        [styles.voteTitleChecked]: checked,
      })}
    >
      {scoreLabel}
    </Typography>
  );
};

export default ScoreButtonLabel;
