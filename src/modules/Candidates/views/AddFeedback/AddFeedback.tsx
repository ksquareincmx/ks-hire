import * as Yup from 'yup';
import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Typography, Snackbar } from '@material-ui/core';

import { selectorFeedbacksFail } from 'store/feedbacks/selectors';
import { stringRequiredValidator } from 'utils/validations';
import { addNewFeedback } from 'store/feedbacks/thunks';
import KBaseContainer from 'components/KBaseContainer';
import RatingForm from '../../Components/FeedbackForm/RatingForm';
import KAlert from 'components/KAlert';

const validationSchema = Yup.object({
  comment: stringRequiredValidator,
});

interface IFeedbackFormValues {
  score: number;
  comment: string;
}

const EditFeedback: FC<{}> = () => {
  const { error } = useSelector(selectorFeedbacksFail);
  const [showSnack, setShowSnack] = useState<boolean>(error);
  const dispatch = useDispatch();
  const history = useHistory();
  const { candidateId: id } = useParams();
  const candidateId = String(id);

  const handleSubmit = (values: IFeedbackFormValues) => {
    dispatch(
      addNewFeedback({ candidateId, ...values }, () => {
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
        <Typography variant="h6" gutterBottom align="center">
          Add Feedback
        </Typography>
        <RatingForm
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          initialValues={{ comment: '', score: 0 }}
        />
      </Box>
      <Snackbar
        autoHideDuration={3000}
        open={showSnack}
        onClose={() => setShowSnack(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <KAlert severity="error">Could not add feedback ! :(</KAlert>
      </Snackbar>
    </KBaseContainer>
  );
};

export default EditFeedback;
