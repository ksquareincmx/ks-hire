import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Paper,
  Menu,
  MenuItem,
  IconButton,
  TablePagination,
  Table,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from 'react-loading-skeleton';
import { Order } from 'modules/Jobs/typings';
import KChip from 'components/KChip';
import KTableCell from 'components/KTableCell';
import KTableRow from 'components/KTableRow';
import KTableBody from 'components/KTableBody';
import KTableContainer from 'components/KTableContainer';
import {
  stableSort,
  getSorting,
} from 'components/KTable/partials/EnhancedTableHead/utils/sorting';
import EnhancedTableHead from 'components/KTable/partials/EnhancedTableHead';
import styles from './KTable.module.scss';
import { differenceInCalendarDays, format } from 'date-fns';

import Emptiness from 'components/Emptiness';

interface Options {
  view?: string;
  edit?: string;
  delete?: (id: string) => void;
}
interface ITableProps {
  data: any[];
  filterData?: string;
  headCells: Array<any>;
  isLoading?: boolean;
  options?: Options;
  isChip?: boolean;
  defaultOrder?: string;
}

function formatStrings(i: number, user: any) {
  return i ? user.name + '' : user.name + ', ';
}

const KTable: React.FC<ITableProps> = ({
  data,
  filterData,
  headCells,
  options,
  isLoading,
  defaultOrder,
}) => {
  type Data = any;
  const [order, setOrder] = useState<Order>('desc');
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [orderBy, setOrderBy] = useState<keyof Data>(
    defaultOrder || 'title',
  );
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setPage(0);
    // eslint-disable-next-line
  }, [filterData]);

  useEffect(() => {
    const totalPages = Math.ceil(data.length / rowsPerPage);
    setCount(data.length);

    if (totalPages === 0) {
      setPage(totalPages);
    } else if (page + 1 > totalPages) {
      setPage(totalPages - 1);
    }
    setTotalPages(totalPages);
    // eslint-disable-next-line
  }, [data.length, page, rowsPerPage]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (_event: unknown, _id: any) => {
    setAnchorEl(null);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const ITEM_HEIGHT = 48;

  if (!data.length && !isLoading)
    return <Emptiness message="There is no content to show" />;

  return (
    <Paper className={styles.paper}>
      <KTableContainer>
        <Table>
          <EnhancedTableHead
            headCells={headCells}
            order={order}
            orderBy={String(orderBy)}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />
          <KTableBody>
            {isLoading || !data.length
              ? Array(rowsPerPage)
                  .fill(null)
                  .map((el, i) => (
                    <KTableRow key={i}>
                      {headCells.map((el) => {
                        return (
                          <KTableCell key={el.id}>
                            <Skeleton />
                          </KTableCell>
                        );
                      })}
                    </KTableRow>
                  ))
              : stableSort(data, getSorting(order, orderBy))
                  .slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                  )
                  // .reverse()
                  .map((row: any, idx: number) => {
                    return (
                      <KTableRow key={idx}>
                        {headCells.map(
                          ({ id, isChip }, i: number) => {
                            return Array.isArray(row[id]) ? (
                              <KTableCell key={id}>
                                {row[id].map((user: any, i: number) =>
                                  formatStrings(i, user),
                                )}
                              </KTableCell>
                            ) : id === 'title' || id === 'name' ? (
                              <KTableCell key={id}>
                                {options?.view ? (
                                  <Link
                                    to={
                                      options
                                        ? options.view + row.id
                                        : '/'
                                    }
                                    style={{
                                      color: '#1565C0',
                                      fontWeight: 'bold',
                                      textDecoration: 'underline',
                                    }}
                                  >
                                    {row[id] === undefined ||
                                    row[id] === null
                                      ? ' '
                                      : row[id].toString()}
                                  </Link>
                                ) : row[id] === undefined ||
                                  row[id] === null ? (
                                  ' '
                                ) : (
                                  row[id].toString()
                                )}
                              </KTableCell>
                            ) : id === 'daysOpen' ? (
                              <KTableCell key={id}>
                                {row.status === 'Open' && row.openAt
                                  ? differenceInCalendarDays(
                                      new Date(),
                                      new Date(row.openAt),
                                    )
                                  : row.status === 'Closed' &&
                                    row.openAt &&
                                    row.closedAt
                                  ? differenceInCalendarDays(
                                      new Date(row.closedAt),
                                      new Date(row.openAt),
                                    )
                                  : 'No information'}
                              </KTableCell>
                            ) : id === 'createdAt' ? (
                              <KTableCell key={id}>
                                {format(
                                  new Date(row.createdAt),
                                  'dd/MM/yy',
                                )}
                              </KTableCell>
                            ) : id === 'salary' ? (
                              <KTableCell key={id}>
                                ${row['salaryLower']} - $
                                {row['salaryUpper']}{' '}
                                {row['salaryCurrency']}
                              </KTableCell>
                            ) : id === 'options' && options ? (
                              <KTableCell key={i} align="right">
                                <IconButton
                                  id={String(row.id)}
                                  aria-label="more"
                                  aria-controls="long-menu"
                                  aria-haspopup="true"
                                  onClick={handleClick}
                                >
                                  <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  id="long-menu"
                                  anchorEl={anchorEl}
                                  keepMounted
                                  open={open}
                                  onClose={handleClose}
                                  PaperProps={{
                                    style: {
                                      boxShadow:
                                        '0 0.25rem 0.25rem rgba(0, 0, 0, 0.2)',
                                      maxHeight: ITEM_HEIGHT * 4.5,
                                      width: 100,
                                    },
                                  }}
                                >
                                  {options.view && (
                                    <Link
                                      to={options.view + anchorEl?.id}
                                      style={{
                                        textDecoration: 'none',
                                        color: 'black',
                                      }}
                                    >
                                      <MenuItem
                                        onClick={(event) =>
                                          handleClose(
                                            event,
                                            anchorEl?.id,
                                          )
                                        }
                                      >
                                        View
                                      </MenuItem>
                                    </Link>
                                  )}
                                  {options.edit && (
                                    <Link
                                      to={options.edit + anchorEl?.id}
                                      style={{
                                        textDecoration: 'none',
                                        color: 'black',
                                      }}
                                    >
                                      <MenuItem
                                        button={true}
                                        onClick={(event) =>
                                          handleClose(
                                            event,
                                            anchorEl?.id,
                                          )
                                        }
                                      >
                                        Edit
                                      </MenuItem>
                                    </Link>
                                  )}

                                  {options.delete && (
                                    <MenuItem
                                      onClick={(event) => {
                                        options.delete &&
                                          options.delete(
                                            String(anchorEl?.id),
                                          );
                                        handleClose(
                                          event,
                                          anchorEl?.id,
                                        );
                                      }}
                                    >
                                      Delete
                                    </MenuItem>
                                  )}
                                </Menu>
                              </KTableCell>
                            ) : isChip ? (
                              row[id] === 'PROSPECTIVE' ? (
                                <KTableCell key={i}>
                                  <KChip
                                    className={styles.chipProspective}
                                    label="New"
                                  />
                                </KTableCell>
                              ) : row[id] === 'ACTIVE' ? (
                                <KTableCell key={i}>
                                  <KChip
                                    className={styles.chipActive}
                                    label="Active"
                                  />
                                </KTableCell>
                              ) : row[id] === 'HIRED' ? (
                                <KTableCell key={i}>
                                  <KChip
                                    className={styles.chipHired}
                                    label="Hired"
                                  />
                                </KTableCell>
                              ) : row[id] === 'REJECTED' ? (
                                <KTableCell key={i}>
                                  <KChip
                                    className={styles.chipRejected}
                                    label="Rejected"
                                  />
                                </KTableCell>
                              ) : row[id] === 'ADMINISTRATOR' ? (
                                <KTableCell key={i}>
                                  <KChip
                                    className={styles.chipAdmin}
                                    label="Administrator"
                                  />
                                </KTableCell>
                              ) : row[id] === 'RECRUITER' ? (
                                <KTableCell key={i}>
                                  <KChip
                                    className={styles.chipRecruiter}
                                    label="Recruiter"
                                  />
                                </KTableCell>
                              ) : row[id] === 'INTERVIEWER' ? (
                                <KTableCell key={i}>
                                  <KChip
                                    className={styles.chipInterviewer}
                                    label="Interviewer"
                                  />
                                </KTableCell>
                              ) : row[id] === 'MANAGER' ? (
                                <KTableCell key={i}>
                                  <KChip
                                    className={styles.chipManager}
                                    label="Manager"
                                  />
                                </KTableCell>
                              ) : row[id] === 'Open' ? (
                                <KTableCell key={i}>
                                  <KChip
                                    className={styles.chipOpen}
                                    label="Open"
                                  />
                                </KTableCell>
                              ) : row[id] === 'Closed' ? (
                                <KTableCell key={i}>
                                  <KChip
                                    className={styles.chipClosed}
                                    label="Closed"
                                  />
                                </KTableCell>
                              ) : (
                                <KTableCell key={i}>
                                  {row[id] === undefined ||
                                  row[id] === null
                                    ? ' '
                                    : row[id].toString()}
                                </KTableCell>
                              )
                            ) : (
                              <KTableCell
                                key={i}
                                align={
                                  headCells[i].numeric
                                    ? 'center'
                                    : 'left'
                                }
                              >
                                {row[id] === undefined ||
                                row[id] === null
                                  ? ' '
                                  : row[id].toString()}
                              </KTableCell>
                            );
                          },
                        )}
                      </KTableRow>
                    );
                  })}
          </KTableBody>
        </Table>
      </KTableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        labelDisplayedRows={() => {
          return `${page + 1} of ${totalPages ? totalPages : 1} `;
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default KTable;
