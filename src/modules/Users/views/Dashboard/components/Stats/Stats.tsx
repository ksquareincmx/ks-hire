import * as React from 'react';
import { IStat } from '../../typings';
import styles from './Stats.module.scss';
import KButton from 'components/KButton';

interface IStatsProps {
  stats: Array<IStat>;
}

const Stats: React.FC<IStatsProps> = (props: IStatsProps) => {
  const { stats } = props;

  const statsList = stats.map((stat, index) => {
    const { text, amount } = stat;
    return (
      <li key={index} className={styles.stat}>
        <p>{text}</p>
        <p>
          <b>{amount}</b>
        </p>
      </li>
    );
  });

  return (
    <div className={styles.stats}>
      <h2 className={styles.statsHeader}>Monthly Statitics</h2>
      <ul className={styles.statsContent}>{statsList}</ul>
      <div className={styles.reportsButton}>
        <KButton>See reports</KButton>
      </div>
    </div>
  );
};

export default Stats;
