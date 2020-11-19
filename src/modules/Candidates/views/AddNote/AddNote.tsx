import React, { FC, useState, useEffect } from 'react';
import { addNewNote } from 'store/notes/thunks';
import { Box, Typography, Snackbar } from '@material-ui/core';
import { selectorNotesFail } from 'store/notes/selectors';
import { noteRequiredValidator } from 'utils/validations';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import KAlert from 'components/KAlert';
import KBaseContainer from 'components/KBaseContainer';
import NoteForm from '../../Components/NoteForm';

const validationSchema = noteRequiredValidator;
interface INoteFormValues {
  noteComment: string;
}

const AddNote: FC<{}> = () => {
  const { error } = useSelector(selectorNotesFail);
  const { candidateId: id } = useParams<any>();
  const [showSnack, setShowSnack] = useState<boolean>(error);
  const dispatch = useDispatch();
  const history = useHistory();
  const candidateId = String(id);

  const handleSubmit = (values: INoteFormValues) => {
    const { noteComment } = values;
    const regexp = /data-id="(.*?)" data-value/g;
    const array = Array.from(noteComment.matchAll(regexp));
    let mentions = array.map((user) => user[1]);
    mentions = Array.from(new Set(mentions));

    dispatch(
      addNewNote({ candidateId, ...values, mentions }, () => {
        history.goBack();
      }),
    );
  };
  useEffect(() => {
    setShowSnack(error);
  }, [error]);

  return (
    <KBaseContainer whole>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        mb={2}
      >
        <Typography
          variant="h6"
          gutterBottom
          align="center"
          style={{ width: '100%' }}
        >
          Add Note
        </Typography>
        <NoteForm
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        />
      </Box>
      <Snackbar
        autoHideDuration={3000}
        open={showSnack}
        onClose={() => setShowSnack(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <KAlert severity="error">Could not add note ! :(</KAlert>
      </Snackbar>
    </KBaseContainer>
  );
};

export default AddNote;
