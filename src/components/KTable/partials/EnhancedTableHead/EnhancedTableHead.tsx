import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import KTableCell from 'components/KTableCell';
import KTableHead from 'components/KTableHead';
import KTableRow from 'components/KTableRow';
import { Order } from 'modules/Jobs/typings';

type Data = any;

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      '&:hover': {
        color: '#41909e',
        '&& $icon': {
          color: '#41909e',
        },
      },
      '&$active': {
        color: '#41909e',
        '&& $icon': {
          color: '#41909e',
        },
      },
      '&:focus': {
        color: '#41909e',
      },
    },
    active: {
      color: '#41909e',
    },
    icon: {
      color: '#41909e',
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);
interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: HeadCell[];
}

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
  sortable?: boolean;
  options?: string;
}

const EnhancedTableHead = ({
  headCells,
  order,
  orderBy,
  onRequestSort,
}: EnhancedTableProps) => {
  const classes = useStyles();
  const createSortHandler = (property: keyof Data) => (
    event: React.MouseEvent<unknown>,
  ) => {
    onRequestSort(event, property);
  };
  return (
    <KTableHead>
      <KTableRow>
        {headCells.map((headCell) =>
          headCell.sortable === false ? (
            <KTableCell
              whiteText
              key={String(headCell.id)}
              padding={'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.label}
            </KTableCell>
          ) : (
            <KTableCell
              whiteText
              key={String(headCell.id)}
              padding={'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                classes={{
                  root: classes.root,
                  active: classes.active,
                  icon: classes.icon,
                }}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </KTableCell>
          ),
        )}
      </KTableRow>
    </KTableHead>
  );
};

export default EnhancedTableHead;
