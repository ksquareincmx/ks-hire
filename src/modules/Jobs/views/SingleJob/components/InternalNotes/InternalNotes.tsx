import React, { FC } from 'react';

import Typography from '@material-ui/core/Typography';

import styles from './InternalNotes.module.scss';

interface IInternalNotesProps {
  notes: Array<string>;
}

const InternalNotes: FC<IInternalNotesProps> = props => {
  const notes =
    props.notes.length > 0 ? (
      props.notes.map((note, index) => (
        <Typography variant="body2" key={index}>
          {note}
        </Typography>
      ))
    ) : (
      <Typography variant="body2" className={styles.disabledText}>
        No notes
      </Typography>
    );

  return (
    <div className={styles.internalNotes}>
      <Typography variant="h5">Internal Notes</Typography>

      <div className={styles.item}>{notes}</div>
    </div>
  );
};

export default InternalNotes;
