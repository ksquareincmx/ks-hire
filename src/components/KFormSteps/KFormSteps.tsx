import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import { BaseTextFieldProps } from '@material-ui/core/TextField';
import { GridSize, GridSpacing } from '@material-ui/core/Grid';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

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
import KDropZone from 'components/KDropZone';
import KDepartment from 'components/KDepartment';
import KStage from 'components/KStage';
import KSelectAutocomplete from 'components/KSelectAutocomplete';
import KCandidateLocation from 'components/KCandidateLocation';
import ExternalManager from 'modules/Jobs/components/ExternalManager';

import {
  Form,
  Formik,
  FormikConfig,
  FormikValues,
  useField,
} from 'formik';
import styles from './KFormSteps.module.scss';

const fieldMapping = {
  checkbox: KCheckbox,
  multiSelect: KMultiSelect,
  range: Range,
  select: KSelect,
  switch: KSwitch,
  text: KInput,
  textRich: KRichText,
  autocomplete: KAutocomplete,
  location: KLocation,
  department: KDepartment,
  timePicker: KTimePicker,
  dropzone: KDropZone,
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
  layoutSize?: GridSize | { [key in Breakpoint]?: GridSize };
  type?: keyof typeof fieldMapping;
}

export interface KFieldGroup {
  fields: KField[];
  name: string;
  spacing?: GridSpacing;
  validationSchema: object;
}

type EnhancedKFieldGroup = KFieldGroup;
export interface KFormProps {
  fieldsGroups: KFieldGroup[];
  name: string;
  onSuccess: (values: FormikValues) => void;
  validationSchema?: any;
}

const CurrentFieldFormik: React.FC<any> = (props) => {
  const [field, meta] = useField(props.name);
  //Ranges
  const [fieldUpper] = useField(`${props.name}upper`);
  const [fieldLower] = useField(`${props.name}lower`);
  const CurrentField = props.CurrentField;
  const newProps = Object.assign({}, props);
  delete newProps.CurrentField;

  return (
    <CurrentField
      {...field}
      {...newProps}
      lowername={props.isrange && `${props.name}lower`}
      uppername={props.isrange && `${props.name}upper`}
      value={field.value || ''}
      lowervalue={(props.isrange && fieldLower.value) || ''}
      uppervalue={(props.isrange && fieldUpper.value) || ''}
      error={meta.error && meta.touched}
      fullWidth
      helperText={meta.touched && meta.error}
    />
  );
};

const FieldGroup: React.FC<EnhancedKFieldGroup> = (props) => {
  const { fields, spacing } = props;

  return (
    <>
      <Grid
        container
        spacing={spacing ?? 4}
        style={{ padding: '10px' }}
      >
        {fields.map((field, index) => {
          const CurrentField = field.type
            ? fieldMapping[field.type]
            : fieldMapping.text;
          const layout: any =
            typeof field.layoutSize === 'number' || !field.layoutSize
              ? { xs: 12, md: field.layoutSize ?? 12 }
              : field.layoutSize;
          const isRange: boolean = field.type === 'range';

          return (
            <Grid item {...layout} key={index}>
              <CurrentFieldFormik
                CurrentField={CurrentField}
                {...field.fieldProps}
                isrange={isRange ? 1 : 0}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

const KFormSteps: React.FC<KFormProps> = (props) => {
  const { fieldsGroups, name, onSuccess } = props;
  let initialValues = {};

  fieldsGroups.forEach((step: any) => {
    step.fields.forEach((item: KField) => {
      if (item.type === 'range') {
        initialValues = {
          ...initialValues,
          [(item.fieldProps?.name || '') + 'lower']:
            item && item.initialValue,
          [(item.fieldProps?.name || '') + 'upper']:
            item && item.initialValue,
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
          country: '',
          state: '',
          city: '',
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
    <div className={styles.container}>
      <Typography variant="h6" gutterBottom align="center">
        {name}
      </Typography>
      <Card className={styles.card}>
        <CardContent>
          <FormikStepper
            initialValues={initialValues}
            onSubmit={async (values) => {
              await onSuccess(values);
            }}
          >
            {fieldsGroups.map((group, index) => (
              <FormikStep
                label={group.name}
                validationSchema={group.validationSchema}
                key={index}
              >
                <FieldGroup {...group}></FieldGroup>
              </FormikStep>
            ))}
          </FormikStepper>
        </CardContent>
      </Card>
    </div>
  );
};

export interface FormikStepProps
  extends Pick<
    FormikConfig<FormikValues>,
    'children' | 'validationSchema'
  > {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(
    children,
  ) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          setCompleted(true);
          await props.onSubmit(values, helpers);
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      {({ isSubmitting, dirty, isValid }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}

          <div className={styles.buttons}>
            {step > 0 ? (
              <KButton
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                className={styles.button}
                onClick={() => {
                  setStep((s) => s - 1);
                }}
              >
                BACK
              </KButton>
            ) : null}

            <KButton
              startIcon={
                isSubmitting ? (
                  <CircularProgress
                    size="1rem"
                    style={{ color: 'white' }}
                  />
                ) : null
              }
              disabled={isSubmitting || !dirty || !isValid}
              variant="contained"
              color="primary"
              type="submit"
              className={styles.button}
            >
              {isSubmitting
                ? 'SUBMITTING'
                : isLastStep()
                ? 'SUBMIT'
                : 'NEXT'}
            </KButton>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default KFormSteps;
