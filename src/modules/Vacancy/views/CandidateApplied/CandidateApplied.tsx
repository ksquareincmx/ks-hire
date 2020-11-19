import React from 'react';
import styles from './CandidateApplied.module.scss';

const CandidateApplied: React.FC = () => {
  const ksquareGroup = '/assets/ksquare-group-head.png';

  return (
    <div className={styles.candidateApplied}>
      <img
        className={styles.headerImg}
        src={ksquareGroup}
        alt="The Ksquare Group"
      />
      <div className={styles.candidateAppliedContainer}>
        <h1>THANKS FOR APPLYING!</h1>
        <p>
          <span className={styles.bold}>
            One of our recruiters will reach out to you shortly.
          </span>
        </p>
      </div>
    </div>
  );
};

export default CandidateApplied;
