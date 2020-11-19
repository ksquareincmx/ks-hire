import React from 'react';
import { Card } from '@material-ui/core';
import { INoteRead } from 'modules/Candidates/typings';
import { makeStyles } from '@material-ui/core/styles';
import KAvatar from 'components/KAvatar';
import LongMenu from '../LongMenu';
import styles from './NotesList.module.scss';
import format from 'date-fns/format';
import Emptiness from 'components/Emptiness';
import dompurify from 'dompurify';
import { getRole } from 'utils/helpers';

interface INotesProps {
  notes: INoteRead[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentId: React.Dispatch<React.SetStateAction<string | null>>;
}

const cardStyles = makeStyles({
  card: {
    boxShadow: '0 5px 30px -12px rgba(0,0,0,0.3)',
    marginBottom: 20,
    maxWidth: '100%',
    padding: 22,
    position: 'relative',
    whiteSpace: 'pre-line',
  },
});

const NotesList: React.FC<INotesProps> = ({
  notes,
  setOpen,
  setCurrentId,
}: INotesProps) => {
  const { user } = JSON.parse(String(sessionStorage.getItem('user')));
  const classes = cardStyles();

  const handleOpen = (id: string) => {
    setCurrentId(id);
    setOpen(true);
  };

  const notesList = notes.map((note: INoteRead) => {
    const userName = note.user
      ? `${
          note.user.firstName && note.user.firstName.split(' ')[0]
        } ${note.user.lastName && note.user.lastName.split(' ')[0]}`
      : '';

    function createNoteText() {
      return { __html: dompurify.sanitize(note.note) };
    }

    return (
      <Card key={note.id} className={classes.card}>
        <div className={styles.noteHeader}>
          <div className={styles.displaySmallInlineBlock}>
            <div className={styles.noteKAvatar}>
              <KAvatar name={userName} />
            </div>
          </div>
          <h5>
            {userName}
            <small className={styles.neutralVoteColor}>
              &nbsp; left a note on
            </small>
            <time
              className={styles.noteDate}
              dateTime="2008-02-14 20:00"
            >
              {format(new Date(note.createdAt), 'PPp')}
            </time>
          </h5>
        </div>

        <p dangerouslySetInnerHTML={createNoteText()}></p>

        <div className={styles.longMenuPosition}>
          {(note.user.id === user.id ||
            getRole() === 'ADMINISTRATOR') && (
            <LongMenu
              options={
                getRole() === 'ADMINISTRATOR' &&
                note.user.id !== user.id
                  ? [
                      {
                        type: 'DELETE',
                        deleteFn: (id: string) => {
                          handleOpen(id);
                        },
                      },
                    ]
                  : [
                      { type: 'EDIT', path: '/edit-note/' },
                      {
                        type: 'DELETE',
                        deleteFn: (id: string) => {
                          handleOpen(id);
                        },
                      },
                    ]
              }
              noteId={note.id}
            />
          )}
        </div>
      </Card>
    );
  });

  return notes.length >= 1 ? (
    <div className="card-list-container">{notesList}</div>
  ) : (
    <Emptiness message="There are any notes to show" />
  );
};

export default NotesList;
