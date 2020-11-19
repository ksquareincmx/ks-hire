import React, { FC } from 'react';
import { Grid, Box } from '@material-ui/core';
import ScoreButton from '../ScoreButton';
import ScoreButtonLabel from '../ScoreButtonLabel';
import styles from './ScoreButtonsList.module.scss';

interface IScoreButtonsProps {
  handleChange: (value: number) => void;
  value: number;
}

const scores: number[] = [-2, -1, 0, 1, 2];

const ScoreButtonsList: FC<IScoreButtonsProps> = ({
  handleChange,
  value,
}) => {
  return (
    <Grid
      className={styles.buttonsPosition}
      container
      wrap="nowrap"
      spacing={1}
    >
      {scores.map((score) => {
        return (
          <Grid key={score} item sm={2}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <ScoreButton
                value={score}
                onClick={() => handleChange(score)}
                checked={value === score}
              />
              <ScoreButtonLabel
                score={score}
                checked={score === value}
              />
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ScoreButtonsList;
