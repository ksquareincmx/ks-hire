import React, { useState, useEffect } from 'react';
import { addNewJob } from 'store/jobs/thunks';
import { failFetchJobs } from 'store/jobs/jobsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import {
  jobTitleRequiredValidator,
  richTextRequiredValidator,
  salaryRequiredValidator,
  salaryUpperRequiredValidator,
  stringRequiredValidator,
  nameValidator,
  nameWithNumbersValidator,
  numberRequiredValidator,
} from 'utils/validations';

import {
  selectorJobsFail,
  sel_create_success,
} from 'store/jobs/selectors';

import { IUserListing } from 'modules/Users/typings';

import { IOption } from 'components/KMultiSelect/KMultiSelect';
import { KFieldGroup } from 'components/KFormSteps/KFormSteps';
import KAlert from 'components/KAlert';
import KBaseContainer from 'components/KBaseContainer';
import KButton from 'components/KButton';
import KFormSteps from 'components/KFormSteps';
import KModalCard from 'components/KModalCard';
import resumeImg from 'img/resume.svg';
import Snackbar from '@material-ui/core/Snackbar';
import styles from './AddJob.module.scss';
import userService from 'services/users.service';

const validationSchema1 = Yup.object({
  clientJobId: nameWithNumbersValidator,
  clientName: nameWithNumbersValidator,
  departmentId: numberRequiredValidator,
  jobSeniority: stringRequiredValidator,
  jobTime: stringRequiredValidator,
  jobType: stringRequiredValidator,
  jobUrgency: stringRequiredValidator,
  location: nameValidator,
  salaryCurrency: stringRequiredValidator,
  requiredPositions: numberRequiredValidator,
  //salaryGross: stringRequiredValidator,
  salarylower: salaryRequiredValidator,
  salaryPeriod: stringRequiredValidator,
  salaryupper: salaryUpperRequiredValidator,
  title: jobTitleRequiredValidator,
});
const validationSchema2 = Yup.object({
  details: richTextRequiredValidator,
});

const validationSchema3 = Yup.object({
  /* hiringManagers: stringRequiredValidator, */
});

const initialComponents: KFieldGroup[] = [
  {
    name: 'Basics',
    validationSchema: validationSchema1,
    fields: [
      {
        fieldProps: {
          label: 'Job title',
          name: 'title',
          required: true,
          options: [
            'Backend Developer',
            'Cybersecurity',
            'Design',
            'Frontend Developer',
            'Fullstack Developer',
            'Java Developer',
            'JavaScript Developer',
            'React Developer',
            'Salesforce',
          ],
        },
        initialValue: '',
        type: 'autocomplete',
        layoutSize: 6,
      },
      /* {
        fieldProps: {
          label: 'Job Seniority',
          name: 'jobSeniority',
          required: true,
          options: [
            { value: 'Sr', label: 'Senior' },
            { value: 'Mid', label: 'Mid' },
            { value: 'Jr', label: 'Junior' },
          ],
        },
        initialValue: 'Jr',
        type: 'select',
        layoutSize: 3,
      }, */

      {
        fieldProps: {
          label: 'Job Department',
          name: 'departmentId',
          required: true,
          options: [
            { value: 1, label: 'HR' },
            { value: 2, label: 'KSQU' },
            { value: 3, label: 'Marketing' },
            { value: 4, label: 'Operations' },
            { value: 5, label: 'Project Management' },
            { value: 6, label: 'Technology' },
            { value: 7, label: 'UX' },
          ],
        },
        initialValue: 1,
        initialValueSelector: '',
        type: 'department',
        layoutSize: 6,
      },
      {
        fieldProps: {
          label: 'Location',
          name: 'location',
          required: true,
          options: [
            'Dallas, Texas, US',
            'Hyderabad, Andhra Pradesh, IN',
            'Mérida, Yucatán, MX',
            'Mexico City, MX',
            'Santiago, DO',
          ],
        },
        initialValue: 'Dallas, Texas, US',
        type: 'location',
        layoutSize: 6,
      },
      {
        fieldProps: {
          label: 'Remote',
          name: 'isJobRemote',
          option: 'Remote',
          tab: true,
        },
        initialValue: false,
        type: 'checkbox',
        layoutSize: 2,
      },
      {
        fieldProps: {
          label: 'Job type',
          name: 'jobType',
          required: true,
          options: [
            { value: 'Permanent', label: 'Permanent' },
            { value: 'Temporal', label: 'Temporal' },
          ],
        },
        initialValue: 'Permanent',
        type: 'select',
        layoutSize: 2,
      },
      {
        fieldProps: {
          label: 'Job Urgency',
          name: 'jobUrgency',
          required: true,
          options: [
            { value: 'High', label: 'High' },
            { value: 'Mid', label: 'Mid' },
            { value: 'Low', label: 'Low' },
          ],
        },
        initialValue: 'Low',
        type: 'select',
        layoutSize: 2,
      },

      {
        fieldProps: {
          label: 'Job time',
          name: 'jobTime',
          required: true,
          options: [
            { value: 'Full-time', label: 'Full-time' },
            { value: 'Part-time', label: 'Part-time' },
          ],
        },
        initialValue: 'Full-time',
        type: 'select',
        layoutSize: 6,
      },
      {
        fieldProps: {
          label: 'Job Status',
          name: 'status',
          required: true,
          options: [
            { value: 'Open', label: 'Open' },
            { value: 'Closed', label: 'Closed' },
          ],
        },
        initialValue: 'Open',
        type: 'select',
        layoutSize: 3,
      },
      {
        fieldProps: {
          label: 'Required Positions',
          name: 'requiredPositions',
          required: true,
        },
        initialValue: '',
        type: 'text',
        layoutSize: 3,
      },
      {
        fieldProps: {
          label: 'Salary currency',
          name: 'salaryCurrency',
          required: true,
          options: [
            { value: 'DOP', label: 'DOP' },
            { value: 'INR', label: 'INR' },
            { value: 'MXN', label: 'MXN' },
            { value: 'USD', label: 'USD' },
          ],
        },
        initialValue: 'USD',
        type: 'select',
        layoutSize: 2,
      },
      {
        fieldProps: {
          label: 'Salary range',
          name: 'salary',
          required: true,
        },
        initialValue: '',
        type: 'range',
        layoutSize: 4,
      },
      // {
      //   fieldProps: {
      //     label: 'Salary Type',
      //     name: 'salaryGross',
      //     required: true,
      //     options: [
      //       { value: 'Gross', label: 'Gross' },
      //       { value: 'Net', label: 'Net' },
      //     ],
      //   },
      //   initialValue: 'Gross',
      //   type: 'select',
      //   layoutSize: 2,
      // },
      {
        fieldProps: {
          label: 'Salary period',
          name: 'salaryPeriod',
          required: true,
          options: [
            { value: 'year', label: 'Annually' },
            { value: 'month', label: 'Monthly' },
            { value: 'hour', label: 'Hourly' },
          ],
        },
        initialValue: 'year',
        type: 'select',
        layoutSize: 3,
      },
      {
        fieldProps: {
          label: 'Public',
          name: 'salaryPublic',
          option: 'Public salary',
          tab: true,
        },
        initialValue: false,
        type: 'checkbox',
        layoutSize: 3,
      },
      {
        fieldProps: {
          label: 'Client',
          name: 'clientName',
        },
        initialValue: '',
        type: 'text',
        layoutSize: 6,
      },
      {
        fieldProps: {
          label: 'Client Job ID',
          name: 'clientJobId',
        },
        initialValue: '',
        type: 'text',
        layoutSize: 6,
      },
    ],
  },
  {
    name: 'Description',
    validationSchema: validationSchema2,
    fields: [
      {
        fieldProps: { label: 'Description', name: 'details' },
        initialValue: '',
        type: 'textRich',
        layoutSize: 12,
      },
    ],
  },
  {
    name: 'Hiring Team',
    validationSchema: validationSchema3,
    fields: [
      {
        fieldProps: {
          label: 'External',
          name: 'externalManager',
          option: 'External manager',
          tab: true,
          options: [],
        },
        initialValue: false,
        initialValueSelector: [],
        type: 'externalManager',
        layoutSize: 12,
      },
    ],
  },
];

const AddJob = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const fail = useSelector(selectorJobsFail);
  const currentJob = useSelector(sel_create_success);
  const [open, setOpen] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(fail.error);
  const [components, setComponents] = useState<KFieldGroup[]>([
    ...initialComponents,
  ]);
  const [users, setUsers] = useState<IUserListing[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await userService.getAll().then((res) => setUsers(res));
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const interviewersOptions = users
        .filter((user) =>
          ['MANAGER', 'ADMINISTRATOR'].includes(user.role.level),
        )
        .map((interviewer) => ({
          id: interviewer.id,
          label: `${interviewer.firstName} ${interviewer.lastName}`,
        }));
      const updatedComponents = components;
      updatedComponents[2].fields[0].fieldProps.options = interviewersOptions;
      setComponents(updatedComponents);
    }
    //eslint-disable-next-line
  }, [users]);

  useEffect(() => {
    setShowMessage(fail.error);
  }, [fail]);

  const handleSubmit = async (values: any) => {
    const {
      clientJobId,
      clientName,
      departmentId,
      details,
      externalManager,
      hiringManagers,
      isJobRemote,
      jobSeniority,
      jobTime,
      jobType,
      jobUrgency,
      location,
      salaryCurrency,
      // salaryGross,
      salarylower,
      salaryPeriod,
      salaryPublic,
      salaryupper,
      status,
      title,
      requiredPositions,
    } = values;
    const response = {
      clientJobId,
      clientName,
      departmentId,
      details,
      externalManager,
      isJobRemote,
      jobSeniority,
      jobTime,
      jobType,
      jobUrgency,
      requiredPositions,
      location,
      salaryCurrency,
      salaryGross: 'Gross',
      salaryPeriod,
      salaryPublic,
      status,
      title,
      hiringManagers: externalManager
        ? []
        : hiringManagers.map((value: IOption) => value.id),
      salaryLower: !salarylower.includes(',')
        ? salarylower.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        : salarylower,
      salaryUpper: !salaryupper.includes(',')
        ? salaryupper.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        : salaryupper,
    };

    await dispatch(addNewJob(response, setOpen));
  };

  const content = (
    <div className={styles.modal}>
      <h2>Job Created</h2>
      <img src={resumeImg} alt="Job created" />
      <p>You successfully created {currentJob.title} </p>
      <div className={styles.buttons}>
        <KButton
          className={styles.button}
          variant="outlined"
          onClick={() => {
            history.push('/jobs');
          }}
        >
          DONE
        </KButton>
        <KButton
          className={styles.button}
          onClick={() => {
            history.push(`/jobs/${currentJob.id}`);
          }}
        >
          VIEW JOB
        </KButton>
      </div>
    </div>
  );

  return (
    <KBaseContainer>
      <Snackbar
        autoHideDuration={2000}
        open={showMessage}
        onClose={() => {
          setShowMessage(false);
          dispatch(
            failFetchJobs({
              message: ' ',
              status: 0,
              error: false,
            }),
          );
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <KAlert severity="error">Could not create Job ! :(</KAlert>
      </Snackbar>

      <KModalCard open={open}>{content}</KModalCard>

      <KFormSteps
        name="Create Job"
        fieldsGroups={components}
        onSuccess={handleSubmit}
      />
    </KBaseContainer>
  );
};

export default AddJob;
