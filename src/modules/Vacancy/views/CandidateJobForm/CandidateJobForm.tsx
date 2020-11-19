import React, { useState, useRef } from 'react';
import * as Yup from 'yup';
import { CircularProgress, Grid, Snackbar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { withFormik, FormikBag, FormikProps } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  emailValidator,
  nameValidator,
  phoneRequiredValidator,
  urlValidator,
  stringRequiredValidator,
} from 'utils/validations';

import { errorApplicant } from 'store/candidates/candidatesSlice';
import { isError } from 'utils/helpers';
import { sel_applicant_error } from 'store/candidates/selectors';
import candidatesService from 'services/candidates.service';

import KAlert from 'components/KAlert';
import KButton from 'components/KButton';
import KCheckbox from 'components/KCheckbox';
import KFile from 'components/KFile';
import KInput from 'components/KInput';
import KCandidateLocation from 'components/KCandidateLocation';
import store from 'store';
import styles from './CandidateJobForm.module.scss';

interface ICandidateJobFormProps {
  history: any;
  jobId: string;
}
interface ICandidateJobFormValues {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  recaptcha: string;
  website: string;
  linkedin: string;
  country: string;
  state: string;
  city: string;
}

const CandidateJobForm: React.FC<
  ICandidateJobFormProps & FormikProps<ICandidateJobFormValues>
> = (props) => {
  const {
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
    setFieldValue,
    touched,
  } = props;

  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const applicantError = useSelector(sel_applicant_error);
  //const careerCollage = '/assets/Career-Page-Collage-1-683x1024.jpg';
  const recaptchaRef = useRef<any>();

  const toggleCanSubmit = () => {
    if (canSubmit) {
      setCanSubmit(false);
    } else {
      setCanSubmit(true);
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={() => store.dispatch(errorApplicant(''))}
        open={applicantError !== ''}
      >
        <KAlert severity="error">
          Could not create Candidate ! - {applicantError.toString()}
        </KAlert>
      </Snackbar>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const token = await recaptchaRef.current.executeAsync();
          setFieldValue('recaptcha', token);
          if (token) {
            handleSubmit();
          }
          recaptchaRef.current.reset();
        }}
      >
        <Grid container justify="center">
          <Grid item xs={12} md={7} className={styles.inputContainer}>
            <KInput
              error={isError(errors, 'firstName', touched)}
              helperText={errors.firstName}
              label="First Name"
              name="firstName"
              onChange={handleChange}
              type="text"
            />
          </Grid>
          <Grid item xs={12} md={7} className={styles.inputContainer}>
            <KInput
              error={isError(errors, 'lastName', touched)}
              helperText={errors.lastName}
              label="Last Name"
              name="lastName"
              onChange={handleChange}
              type="text"
            />
          </Grid>
          <Grid item xs={12} md={7} className={styles.inputContainer}>
            <KInput
              error={isError(errors, 'phone', touched)}
              helperText={errors.phone}
              label="Phone"
              name="phone"
              onChange={handleChange}
              type="text"
            />
          </Grid>
          <Grid item xs={12} md={7} className={styles.inputContainer}>
            <KInput
              error={isError(errors, 'email', touched)}
              helperText={errors.email}
              label="Email"
              name="email"
              onChange={handleChange}
              type="text"
            />
          </Grid>
          <Grid item xs={12} md={7} className={styles.inputContainer}>
            <KCandidateLocation
              label="Country"
              name="country"
              required={true}
            />
          </Grid>
          <Grid item xs={12} md={7} className={styles.inputContainer}>
            <KInput
              error={isError(errors, 'website', touched)}
              helperText={errors.website}
              label="Website"
              name="website"
              onChange={handleChange}
              type="text"
            />
          </Grid>
          <Grid item xs={12} md={7} className={styles.inputContainer}>
            <KInput
              error={isError(errors, 'linkedin', touched)}
              helperText={errors.linkedin}
              label="LinkedIn Profile"
              name="linkedin"
              onChange={handleChange}
              type="text"
            />
          </Grid>

          <Grid item xs={12} md={7} className={styles.inputContainer}>
            <KFile
              accept=".pdf, .docx"
              name="resume"
              onChange={(ev: any) =>
                setFieldValue('resume', ev.currentTarget.files[0])
              }
            />
            <div className={styles.fileTypeText}>
              <div>
                Only <b>PDF</b> and <b>.docx</b> files are accepted.
              </div>
              <div>
                Max file size is <b>50MB</b>.
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={7} className={styles.inputContainer}>
            <KCheckbox
              onClick={toggleCanSubmit}
              tab={false}
              value={canSubmit}
            >
              I am a text that support's links.
            </KCheckbox>
            <div className={styles.checkboxText}>
              <span>
                I have read and agreed to{' '}
                <a
                  className={styles.checkboxLink}
                  href={'/privacy'}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  The Ksquare Group's privacy policy.
                </a>
              </span>
            </div>
          </Grid>
          <Grid item xs={12} md={7} className={styles.inputContainer}>
            <ReCAPTCHA
              hl="en"
              ref={recaptchaRef}
              sitekey={process.env.REACT_APP_RECAPTCHA as string}
              size="invisible"
            />
          </Grid>
          <Grid item xs={12} md={7} className={styles.inputContainer}>
            <KButton
              disabled={!canSubmit || !isValid || isSubmitting}
              type="submit"
              startIcon={
                isSubmitting ? (
                  <CircularProgress
                    size="1rem"
                    style={{ color: 'white' }}
                  />
                ) : null
              }
            >
              {isSubmitting ? (
                <span>UPLOADING</span>
              ) : (
                <span>APPLY</span>
              )}
            </KButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

const validationSchema = Yup.object({
  email: emailValidator,
  firstName: nameValidator,
  lastName: nameValidator,
  linkedin: urlValidator,
  phone: phoneRequiredValidator,
  website: urlValidator,
  country: stringRequiredValidator,
  state: stringRequiredValidator,
  city: stringRequiredValidator,
  //recaptcha: stringRequiredValidator,
});

const config = {
  mapPropsToValues: () => ({
    email: '',
    firstName: '',
    lastName: '',
    linkedin: '',
    phone: '',
    recaptcha: '',
    website: '',
    country: '',
    state: '',
    city: '',
  }),
  validationSchema,
  handleSubmit: async (
    values: ICandidateJobFormValues,
    formikBag: FormikBag<
      ICandidateJobFormProps,
      ICandidateJobFormValues
    >,
  ) => {
    const applicant = {
      ...values,
      jobId: formikBag.props.jobId,
    };

    try {
      await candidatesService.addNewApplicant(applicant, () => {
        formikBag.props.history.push('/vacancy/applied');
      });
    } catch (error) {
      store.dispatch(errorApplicant(error));
    }
  },
  displayName: 'Login',
};

export default withFormik<
  ICandidateJobFormProps,
  ICandidateJobFormValues
>(config)(CandidateJobForm);
