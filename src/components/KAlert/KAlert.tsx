import React from 'react';
import { Alert, AlertProps } from '@material-ui/lab';

interface IKAlert extends AlertProps {}

const KAlert: React.FC<IKAlert> = (props) => {
  return <Alert elevation={6} variant="filled" {...props} />;
};

export default KAlert;
