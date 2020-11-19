import React, { FC } from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import Modal, { ModalProps } from '@material-ui/core/Modal';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      position: 'absolute',
      width: 500,
    },
  }),
);

export const KModal: FC<ModalProps> = (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  return (
    <div>
      <Modal {...props}>
        <div style={modalStyle} className={classes.paper}>
          {props.children}
        </div>
      </Modal>
    </div>
  );
};

export default KModal;
