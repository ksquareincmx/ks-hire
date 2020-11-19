import React, { FC } from 'react';
import {
  TableHead as MaterialTableHead,
  TableHeadProps,
} from '@material-ui/core';
import styles from './KTableHead.module.scss';

const KTableHead: FC<TableHeadProps> = (props) => {
  return (
    <MaterialTableHead {...props} className={styles.tableHead} />
  );
};

export default KTableHead;
