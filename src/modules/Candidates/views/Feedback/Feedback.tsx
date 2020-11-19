import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { IFeedbackRead } from 'modules/Candidates/typings';
import FeedbackCardsList from './partials/FeedbackCardsList';
import KAlert from 'components/KAlert';
import KButton from 'components/KButton';
import KModal from 'components/KModalCard';
import styles from './Feedback.module.scss';
import { deleteFeedback } from 'store/feedbacks/thunks';
import { restartMessage } from 'store/feedbacks/feedbacksSlice';
import { selectorSnackbarMsg } from 'store/feedbacks/selectors';

interface IFeedbackProps {
  candidateId: string | null;
  feedbacks: IFeedbackRead[];
}

const Feedback: FC<IFeedbackProps> = ({
  candidateId,
  feedbacks,
}: IFeedbackProps) => {
  const [showSnack, setShowSnack] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [snackMsg, setsnackMsg] = useState('');
  const dispatch = useDispatch();
  const snackbarMsg = useSelector(selectorSnackbarMsg);
  const url = `/candidates/${candidateId}/add-feedback`;

  const handleClose = () => {
    setShowSnack(false);
  };

  const handleDelete = () => {
    if (!currentId) return;
    dispatch(deleteFeedback(currentId));
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
    <div className={styles.feedbacksContainer}>
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
        confirmMsg={'You will not be able to recover this feedback!'}
        confirmBtn={'Delete'}
        setOpenModal={setOpenModal}
      />

      <Link className={styles.addFeedbackButton} to={url}>
        <KButton className={styles.addFeedbackButton}>
          ADD FEEDBACK
        </KButton>
      </Link>

      <div className="feedback-container">
        <FeedbackCardsList
          feedbacks={feedbacks}
          setOpen={setOpenModal}
          setCurrentId={setCurrentId}
        />
      </div>
    </div>
  );
};
export default Feedback;
