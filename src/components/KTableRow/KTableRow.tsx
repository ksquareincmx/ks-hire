import React, { FC } from 'react';
import clsx from 'clsx';
import {
  TableRow as MaterialTableRow,
  TableRowProps,
} from '@material-ui/core';

import styles from './KTableRow.module.scss';

const KTableRow: FC<TableRowProps> = ({ hover, ...props }) => {
  return (
    <MaterialTableRow
      {...props}
      className={clsx({ [styles.tableRow]: hover })}
    />
  );
};

export default KTableRow;
