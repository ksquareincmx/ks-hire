import React, { FC } from 'react';
import { FormikProps } from 'formik';
import { Grid } from '@material-ui/core';
import KInput from 'components/KInput';
import KButton from 'components/KButton';
import KSelect from 'components/KSelect';

export interface IFormValues {
  jobTitle: string;
  location: string;
  salary: number;
  salaryFrequency: string;
  priority: string;
  description: string;
  hiringManagers: string;
  recruiters: string;
}

const JobForm: FC<FormikProps<IFormValues>> = (props) => {
  const { handleSubmit, handleChange, values, isSubmitting } = props;
  const {
    jobTitle,
    location,
    salary,
    salaryFrequency,
    priority,
    description,
    hiringManagers,
    recruiters,
  } = values;

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <KInput
            name="jobTitle"
            margin="dense"
            label="Job title"
            onChange={handleChange}
            value={jobTitle}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <KInput
            name="location"
            margin="dense"
            label="Location"
            onChange={handleChange}
            value={location}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <KInput
            type="number"
            name="salary"
            margin="dense"
            label="Salary"
            onChange={handleChange}
            value={salary}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <KSelect
            fullWidth
            label="Salary frequency"
            margin="dense"
            name="salaryFrequency"
            onChange={handleChange}
            options={[
              { label: 'Weekly', value: 'weekly' },
              { label: 'Monthly', value: 'monthly' },
              { label: 'Yearly', value: 'yearly' },
            ]}
            value={salaryFrequency}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <KSelect
            fullWidth
            label="Priority"
            margin="dense"
            name="priority"
            onChange={handleChange}
            options={[
              { label: 'Hot', value: 'hot' },
              { label: 'Mild', value: 'mild' },
              { label: 'Cold', value: 'cold' },
            ]}
            value={priority}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <KInput
            name="description"
            margin="dense"
            label="Description"
            onChange={handleChange}
            value={description}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <KInput
            name="hiringManagers"
            margin="dense"
            label="Hiring managers"
            onChange={handleChange}
            value={hiringManagers}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <KInput
            name="recruiters"
            margin="dense"
            label="Recruiters"
            onChange={handleChange}
            value={recruiters}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <KButton type="submit" disabled={isSubmitting}>
            Create job
          </KButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default JobForm;
