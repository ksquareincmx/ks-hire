import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { selectorNoteSingle } from 'store/notes/selectors';
import { editNote, getNote } from 'store/notes/thunks';
import { Box, Typography } from '@material-ui/core';
import KBaseContainer from 'components/KBaseContainer';
import NoteForm from 'modules/Candidates/Components/NoteForm';
import { INote } from '../../typings';
import { noteRequiredValidator } from 'utils/validations';

const validationSchema = noteRequiredValidator;

interface INoteFormValues {
  noteComment: string;
}

const EditNote: FC<{}> = () => {
  const { noteId: id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const candidateId = String(id);
  const note: INote = useSelector(selectorNoteSingle);

  const handleSubmit = (values: INoteFormValues) => {
    dispatch(editNote(candidateId, values));
    history.goBack();
  };

  const initVals = {
    noteComment: !note.note ? '' : note.note,
  };

  useEffect(() => {
    dispatch(getNote(candidateId));
  }, [dispatch, candidateId]);

  return (
    <KBaseContainer whole>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        mb={2}
      >
        <Typography variant="h6" gutterBottom align="center">
          Edit Note
        </Typography>

        {note.id === id ? (
          <NoteForm
            onSubmit={handleSubmit}
            initialValues={initVals}
            validationSchema={validationSchema}
          />
        ) : (
          <h1>loading...</h1>
        )}
      </Box>
    </KBaseContainer>
  );
};

export default EditNote;
