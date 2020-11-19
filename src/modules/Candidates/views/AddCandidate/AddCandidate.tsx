import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { addNewCandidate } from 'store/candidates/thunks';
import { failFetchCandidates } from 'store/candidates/candidatesSlice';
import {
  sel_candidatesFail,
  sel_candidateData,
} from 'store/candidates/selectors';
import { KFieldGroup } from 'components/KFormSteps/KFormSteps';
import { IOption } from 'components/KMultiSelect/KMultiSelect';
import KAlert from 'components/KAlert';
import KBaseContainer from 'components/KBaseContainer';
import KFormSteps from 'components/KFormSteps';
import KSpinner from 'components/KSpinner';
import KModalCard from 'components/KModalCard';
import KButton from 'components/KButton';
import jobService from 'services/jobs.service';
import userService from 'services/users.service';
import { IJob } from 'modules/Jobs/typings';
import * as Yup from 'yup';
import {
  emailValidator,
  nameValidator,
  referralValidator,
  phoneRequiredValidator,
  stringRequiredValidator,
  urlValidator,
  salaryValidator,
} from 'utils/validations';
import candidateImg from 'img/hire.svg';
import styles from './AddCandidate.module.scss';
import { IUserListing } from 'modules/Users/typings';

const validationSchema1 = Yup.object({
  email: emailValidator,
  firstName: nameValidator,
  lastName: nameValidator,
  phone: phoneRequiredValidator,
  referral: referralValidator,
  source: nameValidator,
  website: urlValidator,
  linkedin: urlValidator,
  salaryOffer: salaryValidator,
  jobId: stringRequiredValidator,
  country: stringRequiredValidator,
  state: stringRequiredValidator,
  city: stringRequiredValidator,
});
const validationSchema2 = Yup.object({});

const validationSchema3 = Yup.object({
  recruiterId: stringRequiredValidator,
});

const initialComponents: KFieldGroup[] = [
  {
    name: 'Basics',
    validationSchema: validationSchema1,
    fields: [
      {
        fieldProps: {
          label: 'First Name',
          name: 'firstName',
          required: true,
        },
        initialValue: '',
        type: 'text',
        layoutSize: 6,
      },
      {
        fieldProps: {
          label: 'Last Name',
          name: 'lastName',
          required: true,
        },
        initialValue: '',
        type: 'text',
        layoutSize: 6,
      },
      {
        fieldProps: { label: 'Phone', name: 'phone', required: true },
        initialValue: '',
        type: 'text',
        layoutSize: 6,
      },
      {
        fieldProps: { label: 'Email', name: 'email', required: true },
        initialValue: '',
        type: 'text',
        layoutSize: 6,
      },
      {
        fieldProps: {
          label: 'Source',
          name: 'source',
          required: true,
        },
        initialValue: '',
        type: 'text',
        layoutSize: 6,
      },
      {
        fieldProps: {
          label: 'Referral',
          name: 'referral',
        },
        initialValue: '',
        type: 'text',
        layoutSize: 6,
      },

      {
        fieldProps: {
          label: 'Position',
          options: [],
          name: 'jobId',
          required: true,
        },
        initialValue: [],
        type: 'position',
        layoutSize: 6,
      },
      {
        fieldProps: {
          label: 'Country',
          name: 'country',
          required: true,
        },
        initialValue: '',
        type: 'candidateLocation',
        layoutSize: 6,
      },
      {
        fieldProps: {
          label: 'Stage',
          name: 'stageId',
          options: [
            { value: 1, label: 'NEW' },
            { value: 2, label: 'ACTIVE' },
            { value: 3, label: 'HIRED' },
            { value: 4, label: 'REJECTED' },
          ],
        },
        initialValue: 1,
        initialValueSalaryOffer: '',
        type: 'stage',
        layoutSize: 12,
      },
      {
        fieldProps: { label: 'Website', name: 'website' },
        initialValue: '',
        type: 'text',
        layoutSize: 6,
      },
      {
        fieldProps: { label: 'LinkedIn Profile', name: 'linkedin' },
        initialValue: '',
        type: 'text',
        layoutSize: 6,
      },
    ],
  },
  {
    name: 'Resume',
    validationSchema: validationSchema2,
    fields: [
      {
        fieldProps: { label: 'Resume', name: 'resume' },
        initialValue: [],
        type: 'dropzone',
        layoutSize: 12,
      },
    ],
  },
  {
    name: 'Assignments',
    validationSchema: validationSchema3,
    fields: [
      {
        fieldProps: {
          label: 'Recruiter',
          options: [],
          name: 'recruiterId',
        },
        initialValue: '',
        type: 'select',
        layoutSize: 12,
      },
      {
        fieldProps: {
          label: 'First Contact Interview',
          name: 'firstContact',
          options: [],
        },
        initialValue: [],
        type: 'multiSelect',
        layoutSize: 12,
      },
      {
        fieldProps: {
          label: 'Technical Interview 1',
          name: 'techInterview1',
          options: [],
        },
        initialValue: [],
        type: 'multiSelect',
        layoutSize: 12,
      },
      {
        fieldProps: {
          label: 'Technical Interview 2',
          name: 'techInterview2',
          options: [],
        },
        initialValue: [],
        type: 'multiSelect',
        layoutSize: 12,
      },
    ],
  },
];

const AddCandidate = () => {
  const history = useHistory();
  const fail = useSelector(sel_candidatesFail);
  const candidate = useSelector(sel_candidateData);
  const [showMessage, setShowMessage] = useState<boolean>(fail.error);
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [users, setUsers] = useState<IUserListing[]>([]);
  const [components, setComponents] = useState<KFieldGroup[]>([
    ...initialComponents,
  ]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      await jobService.getAllOpen().then((res) => setJobs(res));
      await userService.getAll().then((res) => setUsers(res));
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
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

      const updatedComponents = components;
      updatedComponents[2].fields[0].fieldProps.options = recruiterOptions;
      updatedComponents[2].fields[1].fieldProps.options = interviewersOptions;
      updatedComponents[2].fields[2].fieldProps.options = interviewersOptions;
      updatedComponents[2].fields[3].fieldProps.options = interviewersOptions;

      setComponents(updatedComponents);
    }
    //eslint-disable-next-line
  }, [users]);

  useEffect(() => {
    if (jobs.length) {
      const updatedComponents = [...initialComponents];
      const jobsOptions = jobs.map((job) => {
        const id = job.jobId ? job.jobId : job.id;
        return {
          value: job.id,
          name: `${job.title} - (${id})`,
        };
      });

      updatedComponents[0].fields[6].fieldProps.options = jobsOptions;
      /* updatedComponents[0].fields[8].initialValue =
        jobsOptions[0].value; */
      setComponents(updatedComponents);
    }
  }, [jobs]);

  const handleSubmit = async (values: any) => {
    const { firstContact, techInterview1, techInterview2 } = values;

    const firstContactIds = firstContact.map(
      (value: IOption) => value.id,
    );
    const techInterview1Ids = techInterview1.map(
      (value: IOption) => value.id,
    );
    const techInterview2Ids = techInterview2.map(
      (value: IOption) => value.id,
    );

    const candidate = {
      ...values,
      jobId: values.jobId.value,
      firstContact: firstContactIds,
      techInterview1: techInterview1Ids,
      techInterview2: techInterview2Ids,
    };

    await dispatch(addNewCandidate(candidate, setOpen));
  };

  useEffect(() => {
    setShowMessage(fail.error);
  }, [fail]);

  return (
    <KBaseContainer>
      <Snackbar
        autoHideDuration={2000}
        open={showMessage}
        onClose={() => {
          setShowMessage(false);
          dispatch(
            failFetchCandidates({
              message: ' ',
              status: 200,
              error: false,
            }),
          );
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <KAlert severity="error">
          Could not create Candidate ! - {fail.message.toString()}
        </KAlert>
      </Snackbar>
      <KModalCard open={open}>
        <div className={styles.modal}>
          <h2>Candidate Created</h2>
          <img src={candidateImg} alt="Candidate created" />
          <p>Your candidate has been successfully created</p>
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
                history.push(`/candidates/${candidate.id}`);
              }}
            >
              VIEW CANDIDATE
            </KButton>
          </div>
        </div>
      </KModalCard>
      {components.length !== 0 && users.length !== 0 ? (
        <KFormSteps
          name="Create Candidate"
          fieldsGroups={components}
          onSuccess={handleSubmit}
        />
      ) : (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingAnimation}>
            <KSpinner />
          </div>
          <div className={styles.loadingText}>
            <p>LOADING CANDIDATE...</p>
          </div>
        </div>
      )}
    </KBaseContainer>
  );
};

export default AddCandidate;
