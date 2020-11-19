import React, { FC } from 'react';
import styles from './KTimelineSeparator.module.scss';

const KTimelineSeparator: FC<any> = (props) => {
  return (
    <div className={styles.timelineSeparatorContainer}>
      <div className={styles.timelineSeparator}></div>
    </div>
  );
};

export default KTimelineSeparator;
