import * as Yup from 'yup';
import { Box, Typography } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { selectorFeedbackSingle } from 'store/feedbacks/selectors';
import { editFeedback, getFeedback } from 'store/feedbacks/thunks';
import { stringRequiredValidator } from 'utils/validations';
import KBaseContainer from 'components/KBaseContainer';
import RatingForm from '../../Components/FeedbackForm/RatingForm';
import { IFeedback } from '../../typings';

const validationSchema = Yup.object({
  comment: stringRequiredValidator,
});

interface IFeedbackFormValues {
  score: number;
  comment: string;
}

const EditFeedback: FC<{}> = () => {
  const { feedbackId: id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const feedbackId = String(id);
  const feedback: IFeedback = useSelector(selectorFeedbackSingle);

  const handleSubmit = (values: IFeedbackFormValues) => {
    dispatch(editFeedback(feedbackId, values));
    history.goBack();
  };

  const initVals = {
    score: !feedback ? 0 : feedback.score,
    comment: !feedback ? '' : feedback.comment,
  };

  useEffect(() => {
    dispatch(getFeedback(feedbackId));
  }, [dispatch, feedbackId]);

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
          Edit Feedback
        </Typography>

        {feedback.id === id ? (
          <RatingForm
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

export default EditFeedback;
