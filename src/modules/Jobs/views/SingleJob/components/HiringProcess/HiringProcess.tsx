import React, { FC } from 'react';

import Typography from '@material-ui/core/Typography';

import styles from './HiringProcess.module.scss';

interface IHiringProcessProps {
  template: string | null;
}

const HiringProcess: FC<IHiringProcessProps> = props => {
  const template = props.template ? (
    <Typography variant="body2">{props.template}</Typography>
  ) : (
    <Typography variant="body2" className={styles.disabledText}>
      Default template
    </Typography>
  );

  return (
    <div className={styles.hiringProcess}>
      <Typography variant="h5">Hiring Process</Typography>

      <div className={styles.item}>
        <Typography variant="subtitle2">Template</Typography>
        {template}
      </div>
    </div>
  );
};

export default HiringProcess;
