import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Snackbar, Typography, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import KBaseContainer from 'components/KBaseContainer';
import KAlert from 'components/KAlert';
import KTableApi from 'components/KTableApi';
import KModal from 'components/KModalCard';
import KButton from 'components/KButton';
import KInput from 'components/KInput';
import KSelect from 'components/KSelect';
import {
  sel_jobsData,
  sel_jobsLoading,
  sel_jobStats,
  sel_jobCount,
} from 'store/jobs/selectors';
import { deleteJob, getJobs } from 'store/jobs/thunks';
import { IJobListing } from 'modules/Jobs/typings';
import Filters from 'modules/Jobs/views/SingleJob/components/Filters';
import { getRole } from 'utils/helpers';
import styles from './JobListing.module.scss';
import useDebounce from 'hooks/use-debounce';

export interface IHeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
  options?: string;
  sortable?: boolean;
  isChip?: boolean;
}

const headCells: IHeadCell[] = [
  {
    disablePadding: false,
    id: 'title',
    label: 'Title',
    numeric: false,
  },
  {
    disablePadding: false,
    id: 'location',
    label: 'Location',
    numeric: false,
  },
  {
    disablePadding: false,
    id: 'salary',
    label: 'Salary',
    numeric: false,
  },
  {
    disablePadding: false,
    id: 'jobType',
    label: 'Job Type',
    numeric: false,
  },
  {
    disablePadding: false,
    id: 'jobTime',
    label: 'Job Time',
    numeric: false,
  },
  {
    disablePadding: false,
    id: 'createdAt',
    label: 'Created',
    numeric: false,
  },
  {
    disablePadding: true,
    id: 'daysOpen',
    label: 'Days Open',
    numeric: true,
  },
  {
    disablePadding: false,
    id: 'status',
    label: 'Status',
    numeric: false,
    isChip: true,
  },

  {
    sortable: false,
    disablePadding: false,
    id: 'options',
    label: '',
    numeric: false,
  },
];
interface IFilter {
  label: string;
  name: string;
  total: number;
}

const JobListing: FC = () => {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(0);
  const [location, setLocation] = useState('All Locations');

  const dispatch = useDispatch();
  const jobs: IJobListing[] = useSelector(sel_jobsData);
  const loading = useSelector(sel_jobsLoading);
  const stats = useSelector(sel_jobStats);
  const count = useSelector(sel_jobCount);

  const debouncedSearchTerm = useDebounce(search, 500);

  const jobFilters: IFilter[] = [
    {
      label: 'ALL',
      name: 'all',
      total: stats.all,
    },
    {
      label: 'OPEN',
      name: 'Open',
      total: stats.open,
    },
    {
      label: 'CLOSED',
      name: 'Closed',
      total: stats.closed,
    },
  ];

  function getJobsFn() {
    let orderByFilter = orderBy;
    let orderFilter = order;

    if (orderBy === 'salary') {
      orderByFilter = 'salaryLower';
    }
    if (orderBy === 'daysOpen') {
      orderFilter = orderFilter === 'asc' ? 'desc' : 'asc';
    }

    dispatch(
      getJobs(
        filter,
        orderFilter,
        orderByFilter,
        rowsPerPage,
        page,
        search,
        location,
      ),
    );
  }

  useEffect(() => {
    setPage(0);
    // eslint-disable-next-line
  }, [search,location,filter]);

  useEffect(() => {
    getJobsFn();
    // eslint-disable-next-line
  }, [dispatch, order, orderBy, filter, rowsPerPage, page, debouncedSearchTerm,location]);

  const handleDeleteMessage = () => {
    setShowMessage(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteJob(currentId || ''));
    getJobsFn();
    handleDeleteMessage();
    setOpen(false);
  };

  const handleOpen = (id: string) => {
    setCurrentId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentId('0');
    setOpen(false);
    setShowMessage(false);
  };

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
  };

  const options = ['ADMINISTRATOR', 'MANAGER', 'RECRUITER'].includes(
    getRole(),
  )
    ? {
        view: '/jobs/',
        delete: (id: string) => {
          handleOpen(id);
        },
        edit: '/jobs/edit/',
      }
    : // : getRole() === 'RECRUITER'
      // ? {
      //     view: '/jobs/',

      //     edit: '/jobs/edit/',
      //   }
      { view: '/jobs/' };

  return (
    <KBaseContainer whole>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={handleClose}
        open={showMessage}
      >
        <KAlert severity="success">Job deleted.</KAlert>
      </Snackbar>
      <KModal
        onClose={handleClose}
        open={open}
        type={'confirmation'}
        confirmFn={handleDelete}
        confirmMsg={'You will not be able to recover this Job!'}
        confirmBtn={'Delete'}
        setOpenModal={setOpen}
      />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
        className={styles.titleRow}
      >
        <Grid container>
          <Grid item xs={6} md={2}>
            <Typography variant="h1">Jobs</Typography>
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
                label="Search for a job..."
                onChange={handleSearch}
                value={search}
              />
            </Grid>
            <Grid item>
              <KSelect
                name={'location'}
                value={location}
                style={{ width: '200px' }}
                onChange={(
                  event: React.ChangeEvent<HTMLTextAreaElement>,
                ) => {
                  setLocation(event.target.value);
                }}
                SelectProps={{
                  MenuProps: {
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                  },
                }}
                options={[
                  {
                    label: 'All Locations',
                    value: 'All Locations',
                  },
                  {
                    label: 'Dallas, Texas, US',
                    value: 'Dallas, Texas, US',
                  },
                  {
                    label: 'Hyderabad, Andhra Pradesh, IN',
                    value: 'Hyderabad, Andhra Pradesh, IN',
                  },
                  {
                    label: 'Mérida, Yucatán, MX',
                    value: 'Mérida, Yucatán, MX',
                  },
                  {
                    label: 'Mexico City, MX',
                    value: 'Mexico City, MX',
                  },
                  {
                    label: 'Santiago, DO',
                    value: 'Santiago, DO',
                  },
                ]}
              />
            </Grid>
          </Grid>

          <Grid
            item
            xs={6}
            md={2}
            className={styles.addButtonContainer}
          >
            {['ADMINISTRATOR', 'MANAGER', 'RECRUITER'].includes(
              getRole(),
            ) && (
              <Link to="/jobs/create">
                <KButton>Add Job</KButton>
              </Link>
            )}
          </Grid>
        </Grid>
      </Box>
      <Grid container>
        <Grid item xs={12} md={2}>
          <Filters
            location={location}
            activeFilter={filter}
            filters={jobFilters}
            changeFilter={(filterName) => setFilter(filterName)}
          />
        </Grid>
        <Grid item xs={12} md={10}>
          <div className={styles.tableContainer}>
            <KTableApi
              data={jobs}
              headCells={headCells}
              options={options}
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

export default JobListing;
