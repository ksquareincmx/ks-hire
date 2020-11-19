import React, { FC } from 'react';
import { TextFieldProps, MenuItem, Grid } from '@material-ui/core';
import KInput from '../KInput';
import { useField } from 'formik';

export interface IOption {
  label: string;
  value: string | number;
}

export type KSelectProps = TextFieldProps & {
  options?: Array<IOption>;
};

const optionsSeniority = [
  {
    department: 'HR',
    values: [
      'HR Lead',
      'IT Technical Recruiter',
      'Senior Recruiter I',
      'Sr. HR Associate',
    ],
  },
  {
    department: 'KSQU',
    values: [
      'Associate',
      'Campus Recruiter Associate',
      'Community Support Associate',
      'Curricular Design Consultant',
      'Program Lead',
      'Technical Training Lead',
      'University Partnership Coordinator',
    ],
  },
  {
    department: 'Marketing',
    values: ['Graphic Designer', 'Head of Marketing'],
  },
  {
    department: 'Operations',
    values: [
      'Operations Manager',
      'Operations Associate',
      'Operations',
    ],
  },
  {
    department: 'Project Management',
    values: [
      'Project Manager',
      'Scrum Master/PM',
      'Support Specialist',
      'Technical Project Manager',
    ],
  },
  {
    department: 'Technology',
    values: [
      'Android Developer',
      'Cyber Security Consultant',
      'Engineer I Enterprise Backend',
      'Engineer II Enterprise Backend',
      'Frontend Lead',
      'Group Manager Enterprise Backend',
      'Java Developer',
      'Lead SWE',
      'PHP Developer',
      'Salesforce Developer I',
      'Salesforce Development',
      'Salesforce Lead',
      'Senior SWE',
      'SWE I',
      'SWE II',
      'SWE III',
      'Technical Lead',
    ],
  },
  {
    department: 'UX',
    values: [
      'Head of Design',
      'Junior UX Designer',
      'Senior Product Designer',
      'Service Designer',
      'UX Designer',
      'UX Developer',
      'UX/UI Designer',
      'Visual Designer',
    ],
  },
];

const KDepartment: FC<KSelectProps> = ({
  options = [],
  ...props
}) => {
  const [
    jobDepartment,
    jobDepartmentMeta,
    jobDepartmentHelpers,
  ] = useField('departmentId');
  const [
    jobSeniority,
    jobSeniorityMeta,
    jobSeniorityHelpers,
  ] = useField('jobSeniority');
  const handleDepartmentChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    jobDepartmentHelpers.setValue(event.target.value as string);
    jobSeniorityHelpers.setValue('');
  };
  const errorDepartment =
    Boolean(jobDepartmentMeta.error) && jobDepartmentMeta.touched;

  const errorSeniority =
    Boolean(jobSeniorityMeta.error) && jobSeniorityMeta.touched;

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <KInput
          {...jobDepartment}
          label="Job Department"
          name="departmentId"
          required={true}
          select
          onChange={handleDepartmentChange}
          error={errorDepartment}
          helperText={
            jobDepartmentMeta.touched && jobDepartmentMeta.error
          }
        >
          {options.map((option: IOption) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </KInput>
      </Grid>
      <Grid item xs={6}>
        <KInput
          {...jobSeniority}
          label="Seniority Level"
          name="jobSeniority"
          required={true}
          error={errorSeniority}
          helperText={
            jobSeniorityMeta.touched && jobSeniorityMeta.error
          }
          select
        >
          {optionsSeniority[
            jobDepartment.value ? jobDepartment.value - 1 : 0
          ].values.map((option: any) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </KInput>
      </Grid>
    </Grid>
  );
};

export default KDepartment;
