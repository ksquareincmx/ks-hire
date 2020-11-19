import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import * as Yup from 'yup';
import {
  getOneCandidate,
  editOneCandidate,
} from 'store/candidates/thunks';
import {
  sel_candidateData,
  sel_candidatesLoading,
  sel_edit_success,
} from 'store/candidates/selectors';
import { KFieldGroup } from 'components/KForm/KForm';
import KAlert from 'components/KAlert';
import KBaseContainer from 'components/KBaseContainer';
import KButton from 'components/KButton';
import KForm from 'components/KForm';
import KModalCard from 'components/KModalCard';
import KSpinner from 'components/KSpinner';
import { IOption } from 'components/KMultiSelect/KMultiSelect';
import { IJob } from 'modules/Jobs/typings';
import { IUserListing } from 'modules/Users/typings';
import styles from './EditCandidate.module.scss';
import jobsService from 'services/jobs.service';
import usersService from 'services/users.service';
import {
  emailValidator,
  nameValidator,
  phoneRequiredValidator,
  referralValidator,
  stringValidator,
  urlValidator,
  salaryValidator,
  stringRequiredValidator,
} from 'utils/validations';
import candidateImg from 'img/hire.svg';

const validationSchema = Yup.object({
  email: emailValidator,
  firstName: nameValidator,
  lastName: nameValidator,
  phone: phoneRequiredValidator,
  referral: referralValidator,
  source: nameValidator,
  website: urlValidator,
  linkedin: urlValidator,
  recruiterId: stringValidator,
  salaryOffer: salaryValidator,
  jobId: stringRequiredValidator,
});

const EditCandidate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(sel_candidatesLoading);
  const [jobsList, setJobsList] = useState<IJob[]>([]);
  const [message, setMessage] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [users, setUsers] = useState<IUserListing[]>([]);
  const { candidateId } = useParams<any>();
  const { success, message: errorMessage } = useSelector(
    sel_edit_success,
  );

  useEffect(() => {
    dispatch(getOneCandidate(String(candidateId)));
  }, [candidateId, dispatch]);

  useEffect(() => {
    if (errorMessage !== '' && !success) {
      setMessage(errorMessage);
      setShowMessage(!success);
    }
  }, [errorMessage, success]);

  const {
    email,
    firstName,
    id,
    jobs,
    lastName,
    linkedinProfile,
    phone,
    processInterviews,
    recruiter,
    referral,
    source,
    stage,
    salaryOffer,
    website,
    country,
    city,
    state,
  }: any = useSelector(sel_candidateData);

  let firstContactInitial = '';
  let techInterview1Initial = '';
  let techInterview2Initial = '';
  if (processInterviews) {
    processInterviews.forEach((process: any, i: number) => {
      if (process.label === 'First Contact') {
        firstContactInitial =
          processInterviews &&
          processInterviews[i].users.map((interviewer: any) => ({
            id: interviewer.id,
            label: `${interviewer.firstName} ${interviewer.lastName}`,
          }));
      }
      if (process.label === 'Technical 1') {
        techInterview1Initial =
          processInterviews &&
          processInterviews[i].users.map((interviewer: any) => ({
            id: interviewer.id,
            label: `${interviewer.firstName} ${interviewer.lastName}`,
          }));
      }
      if (process.label === 'Technical 2') {
        techInterview2Initial =
          processInterviews &&
          processInterviews[i].users.map((interviewer: any) => ({
            id: interviewer.id,
            label: `${interviewer.firstName} ${interviewer.lastName}`,
          }));
      }
    });
  }

  const initialComponents: KFieldGroup[] = [
    {
      name: 'Personal Data',
      fields: [
        {
          fieldProps: {
            label: 'First Name',
            name: 'firstName',
            required: true,
          },
          initialValue: firstName ? firstName : '',
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: {
            label: 'Last Name',
            name: 'lastName',
            required: true,
          },
          initialValue: lastName ? lastName : '',
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: {
            label: 'Phone',
            name: 'phone',
            required: true,
          },
          initialValue: phone ? phone : '',
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: {
            label: 'Email',
            name: 'email',
            required: true,
          },
          initialValue: email ? email : '',
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: {
            label: 'Source',
            name: 'source',
            required: true,
          },
          initialValue: source ? source : '',
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: {
            label: 'Referral',
            name: 'referral',
          },
          initialValue: referral ? referral : '',
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: { label: 'Website', name: 'website' },
          initialValue: website ? website : '',
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: { label: 'LinkedIn Profile', name: 'linkedin' },
          initialValue: linkedinProfile ? linkedinProfile : '',
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: {
            label: 'Job',
            name: 'jobId',
            options: [],
          },
          initialValue: '',
          type: 'position',
          layoutSize: 6,
        },
        {
          fieldProps: {
            label: 'Stage',
            options: [
              { value: 1, label: 'NEW' },
              { value: 2, label: 'ACTIVE' },
              { value: 3, label: 'HIRED' },
              { value: 4, label: 'REJECTED' },
            ],
            name: 'stageId',
          },
          initialValue: stage ? stage.id : 1,
          initialValueSalaryOffer: salaryOffer,
          type: 'stage',
          layoutSize: 6,
        },
        {
          fieldProps: {
            label: 'Country',
            name: 'country',
            required: false,
          },
          initialValue: country ? JSON.parse(country) : '',
          initialValueState: state ? JSON.parse(state) : '',
          initialValueCity: city ? JSON.parse(city) : '',
          type: 'candidateLocation',
          layoutSize: 12,
        },
      ],
    },
    {
      name: 'Assignments',
      fields: [
        {
          fieldProps: {
            label: 'Recruiter',
            options: [],
            name: 'recruiterId',
          },
          initialValue: recruiter ? recruiter.id : '',
          type: 'select',
          layoutSize: 12,
        },
        {
          fieldProps: {
            label: 'First Contact Interview',
            name: 'firstContact',
            options: [],
          },
          initialValue: firstContactInitial
            ? firstContactInitial
            : [],
          type: 'multiSelect',
          layoutSize: 12,
        },
        {
          fieldProps: {
            label: 'Technical Interview 1',
            name: 'techInterview1',
            options: [],
          },
          initialValue: techInterview1Initial
            ? techInterview1Initial
            : [],
          type: 'multiSelect',
          layoutSize: 12,
        },
        {
          fieldProps: {
            label: 'Technical Interview 2',
            name: 'techInterview2',
            options: [],
          },
          initialValue: techInterview2Initial
            ? techInterview2Initial
            : [],
          type: 'multiSelect',
          layoutSize: 12,
        },
      ],
    },
  ];
  const [components, setComponents] = useState<KFieldGroup[]>([]);

  useEffect(() => {
    const fetch = async () => {
      await usersService.getAll().then((res) => setUsers(res));
      await jobsService.getAllOpen().then((res) => setJobsList(res));
    };

    fetch();
  }, []);

  useEffect(() => {
    if (users.length > 0 && id === candidateId) {
      const interviewersOptions = users.map((interviewer) => ({
        id: interviewer.id,
        label: `${interviewer.firstName} ${interviewer.lastName}`,
      }));

      const recruiterOptions = users
        .filter((user) => user.role.level === 'RECRUITER')
        .map((recruiter) => {
          return {
            value: recruiter.id,
            label: `${recruiter.firstName} ${recruiter.lastName}`,
          };
        });

      const updatedComponents = [...initialComponents];
      updatedComponents[1].fields[0].fieldProps.options = recruiterOptions;
      updatedComponents[1].fields[1].fieldProps.options = interviewersOptions;
      updatedComponents[1].fields[2].fieldProps.options = interviewersOptions;
      updatedComponents[1].fields[3].fieldProps.options = interviewersOptions;

      setComponents(updatedComponents);
    }
    // eslint-disable-next-line
  }, [users, id]);

  useEffect(() => {
    if (jobsList.length) {
      const updatedComponents = [...components];
      const jobsOptions = jobsList.map((job: IJob) => {
        const id = job.jobId ? job.jobId : job.id;
        return {
          value: job.id,
          name: `${job.title} - (${id})`,
        };
      });
      updatedComponents[0].fields[8].fieldProps.options = jobsOptions;

      updatedComponents[0].fields[8].initialValue = jobs[0]
        ? {
            value: jobs[0]?.id,
            name: `${jobs[0]?.title} - (${
              jobs[0]?.jobId ? jobs[0]?.jobId : jobs[0]?.id
            })`,
          }
        : null;

      setComponents(updatedComponents);
    } else if (components.length !== 0) {
      const updatedComponents = [...components];
      updatedComponents[0].fields[8].fieldProps.options = [];

      updatedComponents[0].fields[8].initialValue = jobs[0]
        ? {
            value: jobs[0]?.id,
            label: `${jobs[0]?.title} - (${
              jobs[0]?.jobId ? jobs[0]?.jobId : jobs[0]?.id
            })`,
          }
        : null;
      setComponents(updatedComponents);
    }
    // eslint-disable-next-line
  }, [jobsList]);

  const modalContent = (
    <div className={styles.modal}>
      <h2>Candidate Updated</h2>
      <img src={candidateImg} alt="Candidate updated" />
      <p>Candidate successfully updated </p>
      <div className={styles.buttons}>
        <KButton
          className={styles.button}
          variant="outlined"
          onClick={() => {
            history.push('/candidates');
          }}
        >
          DONE
        </KButton>
        <KButton
          className={styles.button}
          onClick={() => {
            history.push(`/candidates/${id}`);
          }}
        >
          VIEW CANDIDATE
        </KButton>
      </div>
    </div>
  );

  const handleSubmit = async (values: any) => {
    const {
      firstName,
      lastName,
      phone,
      email,
      website,
      linkedin,
      jobId,
      stageId,
      salaryOffer,
      recruiterId,
      referral,
      firstContact,
      source,
      techInterview1,
      techInterview2,
      country,
      state,
      city,
    } = values;

    const firstContactIds = firstContact.map((value: IOption) => ({
      id: value.id,
    }));
    const techInterview1Ids = techInterview1.map(
      (value: IOption) => ({
        id: value.id,
      }),
    );
    const techInterview2Ids = techInterview2.map(
      (value: IOption) => ({
        id: value.id,
      }),
    );

    const processInterviewsNew = JSON.parse(
      JSON.stringify(processInterviews),
    );

    processInterviewsNew.forEach((process: any, i: number) => {
      if (process.label === 'First Contact') {
        processInterviewsNew[i]['users'] = firstContactIds;
      }
      if (process.label === 'Technical 1') {
        processInterviewsNew[i]['users'] = techInterview1Ids;
      }
      if (process.label === 'Technical 2') {
        processInterviewsNew[i]['users'] = techInterview2Ids;
      }
    });

    const response = {
      firstName,
      lastName,
      email,
      phone,
      source,
      referral,
      website,
      jobId: jobId.value,
      stageId: stageId,
      salaryOffer,
      recruiterId: recruiterId,
      linkedinProfile: linkedin,
      processInterviews: processInterviewsNew,
      employer: 'ksquare',
      country: country ? JSON.stringify(country) : null,
      state: state ? JSON.stringify(state) : null,
      city: city ? JSON.stringify(city) : null,
    };

    await dispatch(
      editOneCandidate(id, response, () => {
        setOpenModal(true);
      }),
    );
  };

  return (
    <KBaseContainer>
      <Snackbar
        autoHideDuration={3000}
        open={showMessage}
        onClose={() => setShowMessage(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <KAlert severity="error">{message}</KAlert>
      </Snackbar>
      <KModalCard open={openModal}>{modalContent}</KModalCard>

      {id === candidateId &&
      components.length !== 0 &&
      components[0].fields[8].initialValue !== '' &&
      !loading ? (
        <KForm
          fieldsGroups={components}
          name="Edit Candidate"
          validationSchema={validationSchema}
          onSuccess={handleSubmit}
          buttonText="UPDATE"
        />
      ) : (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingAnimation}>
            <KSpinner />
          </div>
          <div className={styles.loadingText}>
            <p>LOADING CANDIDATES...</p>
          </div>
        </div>
      )}
    </KBaseContainer>
  );
};

export default EditCandidate;
