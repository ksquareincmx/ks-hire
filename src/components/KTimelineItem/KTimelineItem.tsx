import React, { FC, useState } from 'react';
import styles from './KTimelineItem.module.scss';
import KTimelineDot from 'components/KTimelineDot';
import KTimelineContent from 'components/KTimelineContent';

interface ITimelineItemProps {
  label: string;
  extraLabel?: string;
  event?: any;
  extraEvent?: any;
  newStageId: number;
  extraStageId?: number;
  currentStageId: number | undefined;
}

const KTimelineItem: FC<ITimelineItemProps> = (props) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleMouseHover = () => {
    if (!isHovering && props.currentStageId !== props.newStageId) {
      setIsHovering(true);
    } else if (!isHovering && props.extraLabel) {
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  };

  return (
    <div
      className={styles.timelineItemContainer}
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseHover}
    >
      <KTimelineDot
        newStageId={props.newStageId}
        currentStageId={props.currentStageId}
      ></KTimelineDot>
      {isHovering && (
        <KTimelineContent
          label={props.label}
          extraLabel={props.extraLabel}
          event={props.event}
          extraEvent={props.extraEvent}
          newStageId={props.newStageId}
          extraStageId={props.extraStageId}
        ></KTimelineContent>
      )}
    </div>
  );
};

export default KTimelineItem;
