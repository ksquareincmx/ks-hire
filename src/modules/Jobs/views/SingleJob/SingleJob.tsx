import React, { FC, useState, useEffect, Fragment } from 'react';
import {
  Route,
  Switch,
  useParams,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import { format } from 'date-fns';
import { Snackbar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { sel_jobData } from 'store/jobs/selectors';
import { getJob } from 'store/jobs/thunks';
import { deleteCandidate } from 'store/candidates/thunks';
import { IJobRead } from 'modules/Jobs/typings';
import { ICandidate } from 'modules/Candidates/typings';

import { filtersData } from './constants';
import { getRole } from 'utils/helpers';
import dompurify from 'dompurify';
import Filters from './components/Filters';
import HiringTeam from './components/HiringTeam';
import JobDetails from './components/JobDetails';
import JobHeroHeader from './components/JobHeroHeader';
import KAlert from 'components/KAlert';
import KInput from 'components/KInput';
import KModal from 'components/KModalCard';
import KTable from 'components/KTable';
import styles from './SingleJob.module.scss';

interface IFilter {
  label: string;
  name: string;
  total: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
  options?: string;
  sortable?: boolean;
}

const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Candidate',
  },
  {
    id: 'recruiter',
    numeric: false,
    disablePadding: false,
    label: 'Recruiter',
  },
  {
    id: 'created',
    numeric: false,
    disablePadding: false,
    label: 'Created',
  },
  {
    id: 'stage',
    numeric: false,
    disablePadding: false,
    label: 'Stage',
  },
  {
    id: 'options',
    numeric: false,
    disablePadding: false,
    label: ' ',
  },
];

const updateFiltersTotals = (
  filtersList: Array<IFilter>,
  candidatesList: Array<any>,
) => {
  const updatedFiltersList = filtersList.map((filter: IFilter) => {
    if (filter.name === 'All') {
      return {
        ...filter,
        total: candidatesList.length,
      };
    }
    return {
      ...filter,
      total: candidatesList.filter(
        (candidate) => candidate.stage === filter.name,
      ).length,
    };
  });

  return updatedFiltersList;
};

interface ICandidateShow {
  id: string;
  name: string;
  recruiter: string;
  created: string;
  stage?: string;
}

export interface ITab {
  tab: string;
  to: string;
}

const updateShownCandidates = (
  filter: string,
  candidates: ICandidateShow[] = [],
) =>
  filter === 'All'
    ? candidates
    : candidates.filter(
        (candidate: ICandidateShow) => candidate.stage === filter,
      );

interface ParamTypes {
  jobId: string;
}

const SingleJob: FC = () => {
  const [candidates, setCandidates] = useState<ICandidateShow[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [filteredCandidates, setFilteredCandidates] = useState<
    ICandidateShow[]
  >([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [showMessage, setShowMessage] = useState(false);
  const [shownCandidates, setShownCandidates] = useState<
    ICandidateShow[]
  >([]);
  const { jobId } = useParams<ParamTypes>();
  const match = useRouteMatch();
  const history = useHistory();
  const currentJob: IJobRead = useSelector(sel_jobData);
  const dispatch = useDispatch();
  const filters = updateFiltersTotals(filtersData, candidates);
  const parsedId = jobId;

  const tabs: ITab[] = [
    { tab: 'CANDIDATES', to: `${match.url}` },
    { tab: 'JOB DETAILS ', to: `${match.url}/details` },
    { tab: 'DESCRIPTION', to: `${match.url}/description` },
  ];

  useEffect(() => {
    dispatch(getJob(parsedId || ''));
  }, [dispatch, parsedId]);

  useEffect(() => {
    if (currentJob.candidates.length > 0) {
      const candidates = currentJob.candidates.map(
        (candidate: ICandidate) => {
          return {
            id: candidate.id,
            name: `${candidate.firstName} ${candidate.lastName}`,
            recruiter: candidate.recruiter
              ? `${candidate.recruiter.firstName} ${candidate.recruiter.lastName}`
              : 'Not assigned',
            created: format(
              new Date(candidate.createdAt),
              'dd/MM/yy',
            ),
            stage: candidate.stage?.name,
          };
        },
      );

      setCandidates(candidates);
    } else {
      setCandidates([]);
    }
  }, [currentJob]);

  useEffect(() => {
    if (search.length < 1) {
      setShownCandidates(filteredCandidates);
    } else {
      const updatedCandidates = filteredCandidates.filter(
        (candidate) =>
          candidate.name
            .toLowerCase()
            .replace(/^\s+|\s+$/gm, '')
            .includes(
              search.toLowerCase().replace(/^\s+|\s+$/gm, ''),
            ),
      );

      setShownCandidates(updatedCandidates);
    }
  }, [filteredCandidates, search]);

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    setFilteredCandidates(updateShownCandidates(filter, candidates));
  }, [candidates, filter]);

  useEffect(() => {
    setShownCandidates(filteredCandidates);
  }, [filteredCandidates]);

  const handleDelete = async () => {
    if (!currentId) return;
    await dispatch(deleteCandidate(currentId));
    setOpen(false);
    history.push('/candidates');
  };

  const handleOpen = (id: string) => {
    setOpen(true);
    setCurrentId(id);
  };

  const handleClose = () => {
    setCurrentId('0');
    setOpen(false);
    setShowMessage(false);
  };

  const options = ['ADMINISTRATOR', 'RECRUITER'].includes(getRole())
    ? {
        view: '/candidates/',
        delete: (id: string) => {
          handleOpen(id);
        },
        edit: '/candidates/edit/',
      }
    : { view: '/candidates/' };

  const detailsData = {
    clientJobId: currentJob.clientJobId,
    clientName: currentJob.clientName,
    hiringManagers: [],
    id: currentJob.id,
    jobId: currentJob.jobId,
    jobCreator: `${currentJob.jobCreator.firstName} ${currentJob.jobCreator.lastName}`,
    jobDepartment: currentJob.department?.name,
    jobSeniority: currentJob.jobSeniority,
    jobTime: currentJob.jobTime,
    jobType: currentJob.jobType,
    jobUrgency: currentJob.jobUrgency,
    location: currentJob.location,
    salaryCurrency: currentJob.salaryCurrency,
    salaryGross: currentJob.salaryGross,
    salaryLower: currentJob.salaryLower,
    salaryPeriod: currentJob.salaryPeriod,
    salaryUpper: currentJob.salaryUpper,
    status: currentJob.status,
    title: currentJob.title,
    createdAt: currentJob.createdAt,
    updatedAt: currentJob.updatedAt,
    openAt: currentJob.openAt,
    closedAt: currentJob.closedAt,
    requiredPositions: currentJob.requiredPositions,
    hiredCandidates: currentJob.hiredCandidates,
  };

  const jobCandidateTab = () => {
    return (
      <Fragment>
        <Grid item xs={12} md={2}>
          <Filters
            activeFilter={filter}
            changeFilter={(filterName) => setFilter(filterName)}
            filters={filters}
            location="All Locations"
          />
        </Grid>

        <Grid item container xs={12} md={10}>
          <div className={styles.tableContainer}>
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
            <Grid item>
              <KTable
                defaultOrder={'created'}
                data={shownCandidates}
                filterData={search}
                headCells={headCells}
                options={options}
              />
            </Grid>
          </div>
        </Grid>
      </Fragment>
    );
  };

  const jobDetailTab = () => {
    return (
      <Fragment>
        <Grid item xs={12} md={7}>
          <JobDetails details={detailsData} />
        </Grid>
        <Grid item xs={false} md={1}></Grid>
        <Grid item xs={12} md={4}>
          <HiringTeam
            managers={currentJob.hiringManagers}
            externalManager={currentJob.externalManager}
          />
        </Grid>
      </Fragment>
    );
  };

  const jobDescriptionTab = () => {
    return (
      <Paper className={styles.singleJobDescription}>
        <div className={styles.cardHeader}>
          <Typography variant="h5">Description</Typography>
          <IconButton
            aria-label="edit"
            style={{ marginRight: '-12px' }}
            onClick={() => {
              history.push(`/jobs/edit/${detailsData.id}`);
            }}
          >
            <EditIcon />
          </IconButton>
        </div>
        <Grid item xs={12}>
          <div
            dangerouslySetInnerHTML={{
              __html: dompurify.sanitize(currentJob.details),
            }}
          />
        </Grid>
      </Paper>
    );
  };

  return (
    <Grid container>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={handleClose}
        open={showMessage}
      >
        <KAlert severity="success">Candidate deleted.</KAlert>
      </Snackbar>
      <KModal
        open={open}
        onClose={handleClose}
        type={'confirmation'}
        confirmFn={handleDelete}
        confirmMsg={'You will not be able to recover this candidate!'}
        confirmBtn={'Delete'}
        setOpenModal={setOpen}
      />

      <Grid item xs={12}>
        <JobHeroHeader jobData={currentJob} tabs={tabs} />
      </Grid>

      <Grid item xs={12}>
        <Grid container className={styles.mainContainer}>
          <Switch>
            <Route exact path={`${match.url}`}>
              {jobCandidateTab()}
            </Route>

            <Route exact path={`${match.url}/details`}>
              {jobDetailTab()}
            </Route>

            <Route exact path={`${match.url}/description`}>
              {jobDescriptionTab()}
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SingleJob;
