import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
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
  numberValidator,
} from 'utils/validations';

import { getJob, editJob } from 'store/jobs/thunks';
import { sel_jobData, sel_edit_success } from 'store/jobs/selectors';
import { IJob } from 'modules/Jobs/typings';

import { IOption } from 'components/KMultiSelect/KMultiSelect';
import { KFieldGroup } from 'components/KForm/KForm';
import KAlert from 'components/KAlert';
import KBaseContainer from 'components/KBaseContainer';
import KButton from 'components/KButton';
import KForm from 'components/KForm';
import KModalCard from 'components/KModalCard';
import KSpinner from 'components/KSpinner';
import resumeImg from 'img/resume.svg';
import styles from './EditJob.module.scss';
import userService from 'services/users.service';
import { IUserListing } from 'modules/Users/typings';

const validationSchema = Yup.object({
  details: richTextRequiredValidator,
  clientJobId: nameWithNumbersValidator,
  clientName: nameWithNumbersValidator,
  departmentId: numberRequiredValidator,
  jobSeniority: stringRequiredValidator,
  jobTime: stringRequiredValidator,
  jobType: stringRequiredValidator,
  jobUrgency: stringRequiredValidator,
  location: nameValidator,
  salaryCurrency: stringRequiredValidator,
  salarylower: salaryRequiredValidator,
  salaryPeriod: stringRequiredValidator,
  salaryupper: salaryUpperRequiredValidator,
  title: jobTitleRequiredValidator,
  requiredPositions: numberValidator,
});

const EditJob = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const { success, message: errorMessage } = useSelector(
    sel_edit_success,
  );
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getJob(String(jobId)));
  }, [dispatch, jobId]);

  useEffect(() => {
    if (errorMessage !== '' && !success) {
      setMessage(errorMessage);
      setShowMessage(!success);
    }
  }, [errorMessage, success]);

  const {
    clientJobId,
    clientName,
    details,
    externalManager,
    hiringManagers,
    id,
    departmentId,
    jobSeniority,
    jobTime,
    jobType,
    jobUrgency,
    location,
    salaryCurrency,
    // salaryGross,
    salaryLower,
    salaryPeriod,
    salaryPublic,
    isJobRemote,
    salaryUpper,
    status,
    title,
    requiredPositions,
  }: IJob = useSelector(sel_jobData);

  const [users, setUsers] = useState<IUserListing[]>([]);

  const hiringManagersInitial = hiringManagers.map((manager) => ({
    id: manager.id,
    label: `${manager.firstName} ${manager.lastName}`,
  }));

  const initialComponents: KFieldGroup[] = [
    {
      name: 'Basics',
      fields: [
        {
          fieldProps: {
            label: 'Job title',
            name: 'title',
            required: true,
            options: [
              'Salesforce',
              'Fullstack Developer',
              'Java Developer',
              'Design',
              'Cybersecurity',
              'JavaScript Developer',
            ],
          },
          initialValue: title,
          type: 'autocomplete',
          layoutSize: 6,
        },
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
          initialValue: departmentId,
          initialValueSelector: jobSeniority,
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
          initialValue: location,
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
          initialValue: isJobRemote,
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
          initialValue: jobType,
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
          initialValue: jobUrgency,
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
          initialValue: jobTime,
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
          initialValue: status,
          type: 'select',
          layoutSize: 3,
        },
        {
          fieldProps: {
            label: 'Required Positions',
            name: 'requiredPositions',
          },
          initialValue: requiredPositions,
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
          initialValue: salaryCurrency,
          type: 'select',
          layoutSize: 2,
        },
        {
          fieldProps: {
            label: 'Salary range',
            name: 'salary',
            required: true,
          },
          initialValue: { lower: salaryLower, upper: salaryUpper },
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
        //   initialValue: salaryGross,
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
          initialValue: salaryPeriod,
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
          initialValue: salaryPublic,
          type: 'checkbox',
          layoutSize: 3,
        },
        {
          fieldProps: {
            label: 'Client',
            name: 'clientName',
          },
          initialValue: clientName,
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: {
            label: 'Client Job ID',
            name: 'clientJobId',
          },
          initialValue: clientJobId,
          type: 'text',
          layoutSize: 6,
        },
      ],
    },
    {
      name: 'Description',
      fields: [
        {
          fieldProps: { label: 'Description', name: 'details' },
          initialValue: details,
          type: 'textRich',
          layoutSize: 12,
        },
      ],
    },
    {
      name: 'Hiring Team',
      fields: [
        {
          fieldProps: {
            label: 'External',
            name: 'externalManager',
            option: 'External manager',
            tab: true,
            options: [],
          },
          initialValue: externalManager,
          initialValueSelector: hiringManagersInitial,
          type: 'externalManager',
          layoutSize: 12,
        },
      ],
    },
  ];

  const [components, setComponents] = useState<KFieldGroup[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await userService.getAll().then((res) => setUsers(res));
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (users.length > 0 && id === jobId) {
      const interviewersOptions = users
        .filter((user) =>
          ['MANAGER', 'ADMINISTRATOR'].includes(user.role.level),
        )
        .map((interviewer) => ({
          id: interviewer.id,
          label: `${interviewer.firstName} ${interviewer.lastName}`,
        }));
      const updatedComponents = initialComponents;
      updatedComponents[2].fields[0].fieldProps.options = interviewersOptions;
      setComponents(updatedComponents);
    }
    //eslint-disable-next-line
  }, [users, id]);

  const handleSubmit = (values: any) => {
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
      location,
      salaryCurrency,
      salaryGross: 'Gross',
      salaryPeriod,
      salaryPublic,
      status,
      requiredPositions,
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
    if (id !== undefined && id !== null) {
      dispatch(editJob(jobId || '', response, setOpen));
    }
  };

  const modalContent = (
    <div className={styles.modal}>
      <h2>Job Updated</h2>
      <img src={resumeImg} alt="Job updated" />
      <p>Job successfully updated </p>
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
            history.push(`/jobs/${id}`);
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
      <KModalCard open={open}>{modalContent}</KModalCard>

      {id === jobId && components.length !== 0 ? (
        <KForm
          fieldsGroups={components}
          name="Edit Job"
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
            <p>LOADING JOBS...</p>
          </div>
        </div>
      )}
    </KBaseContainer>
  );
};

export default EditJob;
