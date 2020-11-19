import React from 'react';
import { BaseTextFieldProps } from '@material-ui/core/TextField';
import {
  Grid,
  Typography,
  Card,
  CircularProgress,
} from '@material-ui/core';
import { GridSize, GridSpacing } from '@material-ui/core/Grid';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { Formik, FormikProps, FormikValues, Form } from 'formik';

import KButton from 'components/KButton';
import KCheckbox from 'components/KCheckbox';
import KInput from 'components/KInput';
import KSelect from 'components/KSelect';
import KSwitch from 'components/KSwitch';
import Range from 'components/Range';
import KTimePicker from 'components/KTimePicker';
import KRichText from 'components/KRichText';
import KMultiSelect from 'components/KMultiSelect';
import KAutocomplete from 'components/KAutocomplete';
import KLocation from 'components/KLocation';
import KDepartment from 'components/KDepartment';
import KStage from 'components/KStage';
import KSelectAutocomplete from 'components/KSelectAutocomplete';
import ExternalManager from 'modules/Jobs/components/ExternalManager';
import KCandidateLocation from 'components/KCandidateLocation';
import styles from './KForm.module.scss';

const fieldMapping = {
  autocomplete: KAutocomplete,
  location: KLocation,
  department: KDepartment,
  checkbox: KCheckbox,
  multiSelect: KMultiSelect,
  range: Range,
  select: KSelect,
  switch: KSwitch,
  text: KInput,
  textRich: KRichText,
  timePicker: KTimePicker,
  externalManager: ExternalManager,
  stage: KStage,
  position: KSelectAutocomplete,
  candidateLocation: KCandidateLocation,
};

export interface KField {
  fieldProps: BaseTextFieldProps | any;
  initialValue: any;
  initialValueSelector?: any;
  initialValueSalaryOffer?: string;
  initialValueCountry?: any;
  initialValueState?: any;
  initialValueCity?: any;
  layoutSize?: GridSize | { [key in Breakpoint]?: GridSize };
  type?: keyof typeof fieldMapping;
}

export interface KFieldGroup {
  fields: KField[];
  name: string;
  spacing?: GridSpacing;
}

type EnhancedKFieldGroup = KFieldGroup & FormikProps<any>;
export interface KFormProps {
  buttonText?: string;
  fieldsGroups: KFieldGroup[];
  name: string;
  onSuccess: (values: FormikValues) => void;
  validationSchema?: any;
}

const FieldGroup: React.FC<EnhancedKFieldGroup> = (props) => {
  const {
    errors,
    fields,
    handleBlur,
    handleChange,
    name,
    setFieldValue,
    spacing,
    touched,
    values,
  } = props;

  return (
    <>
      <Typography variant="h6" className={styles.sectionTitle}>
        {name}
      </Typography>
      <Grid container spacing={spacing ?? 3}>
        {fields.map((field, index) => {
          const CurrentField = field.type
            ? fieldMapping[field.type]
            : fieldMapping.text;
          const layout: any =
            typeof field.layoutSize === 'number' || !field.layoutSize
              ? { xs: 12, md: field.layoutSize ?? 12 }
              : field.layoutSize;
          const isRange: boolean = field.type === 'range';
          const isTimePicker: boolean = field.type === 'timePicker';

          return (
            <Grid item {...layout} key={index}>
              <CurrentField
                {...field.fieldProps}
                lowername={
                  isRange ? `${field.fieldProps.name}lower` : null
                }
                uppername={
                  isRange ? `${field.fieldProps.name}upper` : null
                }
                error={
                  errors[field.fieldProps.name] &&
                  touched[field.fieldProps.name]
                }
                fullWidth
                helperText={
                  touched[field.fieldProps.name] &&
                  errors[field.fieldProps.name]
                }
                value={values[field.fieldProps.name] || ''}
                lowervalue={
                  (isRange &&
                    values[`${field.fieldProps.name}lower`]) ||
                  ''
                }
                uppervalue={
                  (isRange &&
                    values[`${field.fieldProps.name}upper`]) ||
                  ''
                }
                onBlur={handleBlur}
                onChange={
                  isTimePicker
                    ? (value: Date) =>
                        setFieldValue(field.fieldProps.name, value)
                    : handleChange
                }
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

const KForm: React.FC<KFormProps> = (props) => {
  const {
    fieldsGroups,
    validationSchema,
    onSuccess,
    buttonText,
    name,
  } = props;
  let initialValues = {};

  fieldsGroups.forEach((step: any) => {
    step.fields.forEach((item: KField) => {
      if (item.type === 'range') {
        initialValues = {
          ...initialValues,
          [(item.fieldProps?.name || '') + 'lower']:
            item && item.initialValue.lower,
          [(item.fieldProps?.name || '') + 'upper']:
            item && item.initialValue.upper,
        };
      } else if (item.type === 'externalManager') {
        initialValues = {
          ...initialValues,
          hiringManagers: item && item.initialValueSelector,
          [item.fieldProps?.name || '']: item && item.initialValue,
        };
      } else if (item.type === 'department') {
        initialValues = {
          ...initialValues,
          jobSeniority: item && item.initialValueSelector,
          [item.fieldProps?.name || '']: item && item.initialValue,
        };
      } else if (item.type === 'stage') {
        initialValues = {
          ...initialValues,
          salaryOffer: item && item.initialValueSalaryOffer,
          [item.fieldProps?.name || '']: item && item.initialValue,
        };
      } else if (item.type === 'candidateLocation') {
        initialValues = {
          ...initialValues,
          state: item && item.initialValueState,
          city: item && item.initialValueCity,
          [item.fieldProps?.name || '']: item && item.initialValue,
        };
      } else {
        initialValues = {
          ...initialValues,
          [item.fieldProps?.name || '']: item && item.initialValue,
        };
      }
    });
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSuccess}
    >
      {(_innerProps) => {
        return (
          <Form autoComplete="off" className={styles.container}>
            <div className={styles.header}>
              <Typography
                variant="h6"
                gutterBottom
                align="center"
                className={styles.headerTitle}
              >
                {name}
              </Typography>
              <KButton
                type="submit"
                startIcon={
                  _innerProps.isSubmitting ? (
                    <CircularProgress
                      size="1rem"
                      style={{ color: 'white' }}
                    />
                  ) : null
                }
                disabled={_innerProps.isSubmitting}
                className={styles.submitButton}
              >
                {_innerProps.isSubmitting ? 'SUBMITTING' : buttonText}
              </KButton>
            </div>
            <Card className={styles.card}>
              {fieldsGroups.map((group, index) => (
                <FieldGroup
                  key={index}
                  {...group}
                  {..._innerProps}
                ></FieldGroup>
              ))}
            </Card>
          </Form>
        );
      }}
    </Formik>
  );
};

export default KForm;
