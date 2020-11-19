import React from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import KButton from 'components/KButton/';
import styles from './KmodalCards.module.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: '5px',
      boxShadow: theme.shadows[5],
      outline: 'none',
      padding: theme.spacing(2, 4, 3),
      position: 'absolute',
      width: '50%',
      '&:hover': {
        outline: 'none',
      },
      [theme.breakpoints.down('xs')]: {
        width: '90%',
      },
    },
  }),
);

export interface KModalCardProps {
  open: boolean;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
  children?: React.ReactElement;
  type?: string;
  confirmFn?: () => void;
  confirmMsg?: string;
  confirmBtn?: string;
}

const KModalCard: React.FC<KModalCardProps> = (props) => {
  const classes = useStyles();

  return (
    <Modal
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      closeAfterTransition
      onClose={props.onClose}
      open={props.open}
      style={{ zIndex: 99999999 }}
    >
      <Fade in={props.open}>
        <div
          style={{
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`,
          }}
          className={classes.paper}
        >
          {props.type === 'confirmation' ? (
            <div className={styles.modal}>
              <ErrorOutlineIcon
                style={{
                  fontSize: '120px',
                  fontWeight: 'lighter',
                  color: '#f8bb86',
                }}
              />
              <div
                style={{
                  textAlign: 'center',
                  lineHeight: '1',
                }}
              >
                <h1>Are you sure?</h1>
                <p>{props.confirmMsg}</p>
              </div>
              <div className={styles.buttons}>
                <KButton
                  className={styles.button}
                  variant="outlined"
                  onClick={() => {
                    props.setOpenModal && props.setOpenModal(false);
                  }}
                >
                  Cancel
                </KButton>
                <KButton
                  className={styles.button}
                  onClick={() => {
                    props.confirmFn && props.confirmFn();
                    props.setOpenModal && props.setOpenModal(false);
                  }}
                >
                  {props.confirmBtn}
                </KButton>
              </div>
            </div>
          ) : (
            props.children
          )}
        </div>
      </Fade>
    </Modal>
  );
};

export default KModalCard;
