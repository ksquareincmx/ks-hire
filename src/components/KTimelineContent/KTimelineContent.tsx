import React, { FC } from 'react';
import clsx from 'clsx';
import styles from './KTimelineContent.module.scss';

interface ITimelineContentProps {
  label: string;
  extraLabel?: string;
  event?: any;
  extraEvent?: any;
  newStageId?: number;
  extraStageId?: number;
}

const KTimelineContent: FC<ITimelineContentProps> = (props) => {
  const hasEvent = () => {
    return props.event;
  };

  const hasExtraEvent = () => {
    return props.extraEvent;
  };

  const executeEvent = (e: any) => {
    if (props.label && props.event && props.newStageId) {
      e(props.newStageId);
    }
  };

  const executeExtraEvent = (e: any) => {
    if (props.extraLabel && props.extraEvent && props.extraStageId) {
      e(props.extraStageId);
    }
  };

  return (
    <div className={styles.timelineContentContainer}>
      <div className={styles.triangle}></div>
      <div
        className={clsx(styles.timelineContent, {
          [styles.hasEvent]: hasEvent(),
        })}
        onClick={() => executeEvent(props.event)}
      >
        {props.label}
      </div>
      {props.extraLabel && (
        <div
          className={clsx(styles.timelineContent, {
            [styles.hasExtraEvent]: hasExtraEvent(),
          })}
          onClick={() => executeExtraEvent(props.extraEvent)}
        >
          {props.extraLabel}
        </div>
      )}
    </div>
  );
};

export default KTimelineContent;
