import React, { FC, useState, useEffect } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sel_candidateData } from 'store/candidates/selectors';
import {
  Grid,
  IconButton,
  Snackbar,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import { ArrowBack, Work } from '@material-ui/icons';
import KAlert from 'components/KAlert';
import KModal from 'components/KModalCard';
import { ITab } from 'modules/Candidates/views/SingleCandidateView/SingleCandidateView';
import {
  deleteCandidate,
  editOneCandidate,
  getOneCandidate,
} from 'store/candidates/thunks';
import LongMenu from '../LongMenu';
import { IOptions } from '../LongMenu/typings';
import styles from './CandidateHeroHeader.module.scss';
import KChip from 'components/KChip';
import KTimelineItem from 'components/KTimelineItem';
// import KTimelineDot from 'components/KTimelineDot';
import KTimelineSeparator from 'components/KTimelineSeparator';
import { getRole } from 'utils/helpers';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

interface ICandidateHeroHeaderProps {
  candidateData: {
    id: string;
    name: string;
    position: string;
    stage?: string;
    referral?: string;
  };
  tabs: Array<ITab>;
}

const useStyles = makeStyles(() => ({
  arrow: {
    color: 'white',
  },
  tooltip: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: '14px',
  },
}));

const CandidateHeroHeader: FC<ICandidateHeroHeaderProps> = (
  props,
) => {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [currentStageId, setCurrentStageId] = useState<number>();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const {
    firstName,
    lastName,
    phone,
    email,
    source,
    jobs: formJob,
    website,
    recruiter,
    linkedinProfile,
    processInterviews,
    country,
    state,
    city,
  }: any = useSelector(sel_candidateData);

  const handleBack = () => {
    history.push('/candidates');
  };

  const handleOpen = (id: string) => {
    setCurrentId(id);
    setOpen(true);
  };

  const handleDelete = async () => {
    if (!currentId) return;
    await dispatch(deleteCandidate(currentId));
    setOpen(false);
    handleBack();
  };

  const handleClose = () => {
    setCurrentId(null);
    setOpen(false);
    setShowMessage(false);
  };

  const tabStyles = {
    root: styles.tab,
  };

  const workIconStyles = {
    marginRight: '0.5rem',
  };

  const { name, position, id, stage, referral } = props.candidateData;
  const options: IOptions[] = [
    {
      type: 'Edit Candidate',
      path: `${id}`,
    },
    {
      type: 'Delete Candidate',
      deleteFn: (id: string) => {
        handleOpen(id);
      },
    },
  ];

  const tabComponent = props.tabs.map((tab) => (
    <Tab
      classes={tabStyles}
      component={NavLink}
      exact
      key={tab.tab}
      label={tab.tab}
      value={tab.to}
      to={tab.to}
    />
  ));

  useEffect(() => {
    if (stage === 'PROSPECTIVE') {
      setCurrentStageId(1);
    } else if (stage === 'ACTIVE') {
      setCurrentStageId(2);
    } else if (stage === 'HIRED') {
      setCurrentStageId(3);
    } else if (stage === 'REJECTED') {
      setCurrentStageId(4);
    }
  }, [stage]);

  const handleStageChange = async (newStageId: number) => {
    const jobId = formJob[0]?.id;

    const response = {
      firstName,
      lastName,
      phone,
      email,
      source,
      jobId,
      stageId: newStageId,
      referral,
      website,
      recruiterId: recruiter ? recruiter.id : '',
      linkedin: linkedinProfile,
      processInterviews,
      employer: 'ksquare',
      country,
      state,
      city,
    };

    if (newStageId !== 3) {
      (response as any).salaryOffer = '';
    }

    await dispatch(
      editOneCandidate(id, response, () => {
        console.log('Successfully edited stageId');
      }),
    );

    await dispatch(getOneCandidate(id || ''));
  };

  return (
    <Grid container className={styles.heroHeader}>
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

      <Grid className={styles.buttonsContainer} item xs={12}>
        <IconButton
          aria-label="Back"
          classes={{ root: styles.backArrowIcon }}
          onClick={handleBack}
        >
          <ArrowBack />
        </IconButton>

        {['ADMINISTRATOR', 'RECRUITER'].includes(getRole()) && (
          <LongMenu key={id} candidateId={id} options={options} />
        )}
      </Grid>

      <Grid className={styles.candidateInfo} item xs={12}>
        <div className={styles.nameContainer}>
          <h2 className={styles.name}>{name}</h2>
          {referral && (
            <Tooltip
              title={`Candidate referred by ${referral}`}
              placement="right"
              arrow
              classes={classes}
            >
              <div className={styles.iconRef}>
                <p className={styles.refText}>REF</p>
              </div>
            </Tooltip>
          )}
        </div>
        <div className={styles.locationText}>
          <Work fontSize="small" style={workIconStyles} />
          <Typography
            className={styles.candidateText}
            variant="subtitle2"
          >
            {position}
          </Typography>
        </div>
        {getRole() !== 'INTERVIEWER' && (
          <div className={styles.timelineContainer}>
            {/* <KTimelineDot
            event={handleStageChange}
            newStageId={1}
            currentStageId={currentStageId}
          ></KTimelineDot> */}
            <KTimelineItem
              currentStageId={currentStageId}
              label={'Change to New'}
              event={handleStageChange}
              newStageId={1}
            ></KTimelineItem>
            <KTimelineSeparator></KTimelineSeparator>
            {/* <KTimelineDot
            event={handleStageChange}
            newStageId={2}
            currentStageId={currentStageId}
          ></KTimelineDot> */}
            <KTimelineItem
              currentStageId={currentStageId}
              label={'Change to Active'}
              event={handleStageChange}
              newStageId={2}
            ></KTimelineItem>
            <KTimelineSeparator></KTimelineSeparator>
            {/* <KTimelineDot
            event={handleStageChange}
            newStageId={3}
            currentStageId={currentStageId}
          ></KTimelineDot> */}
            <KTimelineItem
              label={'Change to Hired'}
              extraLabel={'Change to Rejected'}
              event={handleStageChange}
              extraEvent={handleStageChange}
              newStageId={3}
              extraStageId={4}
              currentStageId={currentStageId}
            ></KTimelineItem>
          </div>
        )}
        <KChip
          className={stage && styles[stage]}
          label={stage === 'PROSPECTIVE' ? 'NEW' : stage}
        />
      </Grid>

      <Grid className={styles.tabs} item xs={12}>
        <Tabs
          indicatorColor="secondary"
          textColor="inherit"
          value={location.pathname}
        >
          {tabComponent}
        </Tabs>
      </Grid>
    </Grid>
  );
};

export default CandidateHeroHeader;
