import React, { FC } from 'react';
import {
  ButtonBase,
  Typography,
  ButtonBaseProps,
} from '@material-ui/core';
import styles from './ScoreButton.module.scss';
import clsx from 'clsx';

interface IScoreButtonProps extends ButtonBaseProps {
  value: number;
  checked?: boolean;
}

const ScoreButton: FC<IScoreButtonProps> = ({
  value,
  checked,
  ...props
}) => {
  return (
    <ButtonBase
      {...props}
      className={clsx(
        styles.scoreButton,
        checked && styles.scoreButtonChecked,
      )}
    >
      <Typography className={styles.buttonLabel} variant="button">
        {value}
      </Typography>
    </ButtonBase>
  );
};

export default ScoreButton;
