import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import KButton from 'components/KButton';
import KDropZone from 'components/KDropZone';
import { addNewDocument } from 'store/documents/thunks';
import { IDocument } from 'modules/Candidates/views/DocumentsView/typings';
import { sel_candidateData } from 'store/candidates/selectors';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

interface IDialogProps {
  open: boolean;
  handleClose: () => void;
}
interface DialogTitleProps {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
  isSubmitting: boolean;
}

const DialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, isSubmitting, ...other } = props;
  const classes = useStyles();
  return (
    <MuiDialogTitle
      disableTypography
      className={classes.root}
      {...other}
    >
      <Typography variant="h6">{children}</Typography>
      {onClose && !isSubmitting ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

const UploadDialog: React.FC<IDialogProps> = ({
  open,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const { id } = useSelector(sel_candidateData);

  const handleSubmitFiles = async (
    value: any,
    { resetForm }: FormikHelpers<any>,
  ) => {
    const document: IDocument = {
      name: value.resume.name,
      type: value.resume.type,
      description: '',
      candidateId: id,
      file: value.resume,
    };
    await dispatch(addNewDocument(document));
    resetForm();
    handleClose();
  };

  return (
    <div>
      <Formik
        initialValues={{ resume: [] }}
        onSubmit={handleSubmitFiles}
      >
        {({
          handleSubmit,
          isSubmitting,
          dirty,
        }: FormikProps<any>) => (
          <>
            <Dialog
              onClose={() => {
                if (!isSubmitting) {
                  handleClose();
                }
              }}
              aria-labelledby="customized-dialog-title"
              open={open}
              fullWidth
              style={{ zIndex: 9999 }}
            >
              <form onSubmit={handleSubmit}>
                <DialogTitle
                  id="customized-dialog-title"
                  onClose={handleClose}
                  isSubmitting={isSubmitting}
                >
                  File upload
                </DialogTitle>
                <DialogContent dividers>
                  <KDropZone name="resume" label="resume" />
                </DialogContent>
                <DialogActions>
                  <KButton
                    type="submit"
                    disabled={isSubmitting || !dirty}
                    variant="contained"
                    startIcon={
                      isSubmitting ? (
                        <CircularProgress size="1rem" />
                      ) : null
                    }
                  >
                    {isSubmitting ? ' Uploading' : 'Upload File'}
                  </KButton>
                </DialogActions>
              </form>
            </Dialog>
          </>
        )}
      </Formik>
    </div>
  );
};

export default UploadDialog;
