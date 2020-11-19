import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Snackbar, Typography, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import KAlert from 'components/KAlert';
import KBaseContainer from 'components/KBaseContainer';
import KButton from 'components/KButton';
import KInput from 'components/KInput';
import KModal from 'components/KModalCard';
import KTableApi from 'components/KTableApi';
import { ICandidateListing } from 'modules/Candidates/typings';
import {
  deleteCandidate,
  getCandidates,
} from 'store/candidates/thunks';
import {
  sel_candidatesData,
  sel_candidatesLoading,
  sel_candidatesCount,
  sel_candidatesStats,
} from 'store/candidates/selectors';
import { format } from 'date-fns';
import Filters from 'modules/Candidates/Components/Filters';
import styles from './CandidateListing.module.scss';
import { getRole } from 'utils/helpers';
import useDebounce from 'hooks/use-debounce';
interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
  options?: string;
  sortable?: boolean;
  isChip?: boolean;
}

const headCells: HeadCell[] = [
  {
    disablePadding: true,
    id: 'name',
    label: 'Candidate',
    numeric: false,
  },
  {
    disablePadding: false,
    id: 'position',
    label: 'Position',
    numeric: false,
  },
  {
    disablePadding: false,
    id: 'recruiter',
    label: 'Recruiter',
    numeric: false,
  },
  {
    disablePadding: false,
    id: 'createdAt',
    label: 'Created',
    numeric: false,
  },
  {
    disablePadding: false,
    id: 'stage',
    label: 'Stage',
    numeric: false,
    isChip: true,
  },
  {
    disablePadding: false,
    id: 'options',
    label: '',
    numeric: false,
    sortable: false,
  },
];

interface IFilter {
  label: string;
  name: string;
  total: number;
}

const CandidateListing: FC = () => {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [shownCandidates, setShownCandidates] = useState<any>([]);
  const [filter, setFilter] = useState<string>('all');
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(0);

  const debouncedSearchTerm = useDebounce(search, 500);

  const dispatch = useDispatch();
  const candidates: ICandidateListing[] = useSelector(
    sel_candidatesData,
  );
  const loading = useSelector(sel_candidatesLoading);
  const stats = useSelector(sel_candidatesStats);
  const count = useSelector(sel_candidatesCount);

  const candidateFilters: IFilter[] = [
    {
      label: 'ALL',
      name: 'all',
      total: stats.all,
    },
    {
      label: 'NEW',
      name: 'PROSPECTIVE',
      total: stats.prospective,
    },
    {
      label: 'ACTIVE',
      name: 'ACTIVE',
      total: stats.active,
    },
    {
      label: 'HIRED',
      name: 'HIRED',
      total: stats.hired,
    },
    {
      label: 'REJECTED',
      name: 'REJECTED',
      total: stats.rejected,
    },
  ];

  function getCandidatesFn() {
    const orderByFilter = orderBy;
    const orderFilter = order;

    dispatch(
      getCandidates(
        filter,
        orderFilter,
        orderByFilter,
        rowsPerPage,
        page,
        search,
      ),
    );
  }

  useEffect(() => {
    setPage(0);
    // eslint-disable-next-line
  }, [search,filter]);

  useEffect(() => {
    getCandidatesFn();
    // eslint-disable-next-line
  }, [dispatch, order, orderBy, filter, rowsPerPage, page, debouncedSearchTerm]);

  useEffect(() => {
    const candidatesTable = candidates.map((candidate) => {
      return {
        ...candidate,
        id: candidate.id,
        name: `${candidate.firstName} ${candidate.lastName}`,
        position: candidate.jobs[0] ? candidate.jobs[0].title : '',
        recruiter: candidate.recruiter
          ? `${candidate.recruiter.firstName} ${candidate.recruiter.lastName}`
          : 'Not assigned',
        interviewer: candidate.interviewer
          ? `${candidate.interviewer.firstName} ${candidate.interviewer.lastName}`
          : 'Not assigned',
        created: format(new Date(candidate.createdAt), 'dd/MM/yy'),
        stage: candidate.stage.name,
      };
    });
    setShownCandidates(candidatesTable);
  }, [candidates]);

  const handleDeleteMessage = () => {
    setShowMessage(true);
  };

  const handleDelete = async () => {
    if (!currentId) return;
    await dispatch(deleteCandidate(currentId));
    getCandidatesFn();
    handleDeleteMessage();
    setOpen(false);
  };

  const handleOpen = (id: string) => {
    setCurrentId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentId(null);
    setOpen(false);
    setShowMessage(false);
  };

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearch(event.target.value);
  };

  return (
    <KBaseContainer whole>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={handleClose}
        open={showMessage}
      >
        <KAlert severity="success">Candidate deleted.</KAlert>
      </Snackbar>
      <KModal
        onClose={handleClose}
        open={open}
        type={'confirmation'}
        confirmFn={handleDelete}
        confirmMsg={'You will not be able to recover this candidate!'}
        confirmBtn={'Delete'}
        setOpenModal={setOpen}
      />

      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        mb={2}
      >
        <Grid container>
          <Grid item xs={6} md={2}>
            <Typography variant="h1">Candidates</Typography>
          </Grid>

          <Grid
            container
            alignItems="flex-end"
            spacing={2}
            item
            xs={12}
            md={8}
            className={styles.searchbar}
          >
            <Grid item>
              <SearchIcon />
            </Grid>
            <Grid item>
              <KInput
                label="Search for a candidate..."
                onChange={handleSearch}
                value={search}
              />
            </Grid>
          </Grid>

          <Grid
            item
            xs={6}
            md={2}
            className={styles.addButtonContainer}
          >
            {['ADMINISTRATOR', 'RECRUITER'].includes(getRole()) && (
              <Link to="/candidates/create">
                <KButton>Add Candidate</KButton>
              </Link>
            )}
          </Grid>
        </Grid>
      </Box>
      <Grid container>
        <Grid item xs={12} md={2}>
          <Filters
            activeFilter={filter}
            changeFilter={(filterName) => setFilter(filterName)}
            filters={candidateFilters}
          />
        </Grid>
        <Grid item xs={12} md={10}>
          <div className={styles.tableContainer}>
            <KTableApi
              data={shownCandidates}
              headCells={headCells}
              options={
                ['ADMINISTRATOR', 'RECRUITER'].includes(getRole())
                  ? {
                      view: '/candidates/',
                      delete: (id: string) => {
                        handleOpen(id);
                      },
                      edit: '/candidates/edit/',
                    }
                  : { view: '/candidates/' }
              }
              isLoading={loading}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              order={order}
              setOrder={setOrder}
              count={count}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              page={page}
              setPage={setPage}
            />
          </div>
        </Grid>
      </Grid>
    </KBaseContainer>
  );
};
export default CandidateListing;
