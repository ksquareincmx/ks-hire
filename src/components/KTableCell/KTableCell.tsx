import React, { FC } from 'react';
import clsx from 'clsx';

import {
  TableCell as MaterialTableCell,
  TableCellProps,
} from '@material-ui/core';
import styles from './KTableCell.module.scss';

interface IProps extends TableCellProps {
  whiteText?: boolean;
}

const KTableCell: FC<IProps> = ({ whiteText, ...materialProps }) => {
  return (
    <MaterialTableCell
      {...materialProps}
      className={clsx(styles.tableCell, {
        [styles.tableCellWhiteText]: whiteText,
      })}
    />
  );
};

export default KTableCell;
