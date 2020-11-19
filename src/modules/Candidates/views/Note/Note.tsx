import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote } from 'store/notes/thunks';
import { restartMessage } from 'store/notes/notesSlice';
import { selectorSnackbarMsg } from 'store/notes/selectors';
import { Snackbar } from '@material-ui/core';
import { INoteRead } from 'modules/Candidates/typings';
import { Link } from 'react-router-dom';
import KAlert from 'components/KAlert';
import KButton from 'components/KButton';
import KModal from 'components/KModalCard';
import NotesList from './partials/NotesList';
import styles from './Note.module.scss';

interface INoteProps {
  candidateId: string | null;
  notes: INoteRead[];
}

const Note: FC<INoteProps> = ({ candidateId, notes }: INoteProps) => {
  const [showSnack, setShowSnack] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [snackMsg, setsnackMsg] = useState('');
  const dispatch = useDispatch();
  const snackbarMsg = useSelector(selectorSnackbarMsg);

  const url = `/candidates/${candidateId}/add-note`;

  const handleClose = () => {
    setShowSnack(false);
  };

  const handleDelete = () => {
    if (!currentId) return;
    dispatch(deleteNote(currentId));
    setOpenModal(false);
  };

  const handleCloseModal = () => {
    setCurrentId(null);
    setOpenModal(false);
  };

  useEffect(() => {
    if (snackbarMsg !== '') {
      setsnackMsg(snackbarMsg);
      setShowSnack(true);
      dispatch(restartMessage());
    }
  }, [snackbarMsg, dispatch]);

  return (
    <div className={styles.notesContainer}>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={handleClose}
        open={showSnack}
      >
        <KAlert severity="success">{snackMsg}</KAlert>
      </Snackbar>
      <KModal
        onClose={handleCloseModal}
        open={openModal}
        type={'confirmation'}
        confirmFn={handleDelete}
        confirmMsg={'You will not be able to recover this note!'}
        confirmBtn={'Delete'}
        setOpenModal={setOpenModal}
      />

      <Link className={styles.addNoteButton} to={url}>
        <KButton className={styles.addNoteButton}>ADD NOTE</KButton>
      </Link>

      <div className="notes-container">
        <NotesList
          notes={notes}
          setOpen={setOpenModal}
          setCurrentId={setCurrentId}
        />
      </div>
    </div>
  );
};
export default Note;
