import React, { FC } from 'react';
import { TableBody, TableBodyProps } from '@material-ui/core';

interface IProps extends TableBodyProps {}

const KTableBody: FC<IProps> = (props) => {
  return <TableBody {...props} />;
};

export default KTableBody;
