import React, { FC, useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './KTimelineDot.module.scss';

interface ITimelineDotProps {
  event?: any;
  newStageId: number;
  currentStageId: number | undefined;
}

const KTimeline: FC<ITimelineDotProps> = (props) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [displayedId, setDisplayedId] = useState<number>(
    props.newStageId,
  );

  useEffect(() => {
    if (props.currentStageId === props.newStageId) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

    if (props.currentStageId === 4 && props.newStageId === 3) {
      setDisplayedId(4);
      setIsActive(true);
    } else {
      setDisplayedId(props.newStageId);
    }
  }, [props.currentStageId, props.newStageId]);

  const executeEvent = (e: any) => {
    if (props.event && props.newStageId && !isActive) {
      e(props.newStageId);
    }
  };

  const isStageProspective = (newStageId: number) => {
    return newStageId === 1;
  };

  const isStageActive = (newStageId: number) => {
    return newStageId === 2;
  };

  const isStageHired = (newStageId: number) => {
    return newStageId === 3;
  };

  const isStageRejected = (newStageId: number) => {
    return newStageId === 4;
  };

  const hasEvent = () => {
    return props.event;
  };

  return (
    <div
      className={clsx(styles.timelineDotContainer, {
        [styles.hasEvent]: hasEvent(),
        [styles.PROSPECTIVE]: isStageProspective(displayedId),
        [styles.ACTIVE]: isStageActive(displayedId),
        [styles.HIRED]: isStageHired(displayedId),
        [styles.REJECTED]: isStageRejected(displayedId),
        [styles.CURRENT]: isActive,
      })}
      onClick={() => executeEvent(props.event)}
    ></div>
  );
};

export default KTimeline;
