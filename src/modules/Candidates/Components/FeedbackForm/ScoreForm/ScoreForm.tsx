import React, { FC } from 'react';
import {
  Card,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import KButton from 'components/KButton';
import KInput from 'components/KInput';
import ScoreButtonsList from '../../../views/AddFeedback/partials/ScoreButtonsList';
import styles from './ScoreForm.module.scss';

const formStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: 16,
      maxWidth: '100%',
      position: 'relative',
      boxShadow: '0 5px 30px -12px rgba(0,0,0,0.3)',
    },
    paper: {
      color: theme.palette.text.secondary,
      padding: theme.spacing(2),
      textAlign: 'center',
      minHeight: 110,
    },
    root: {
      flexGrow: 1,
    },
  }),
);

interface IFeedbackFormValues {
  comment: string;
  score: number;
  candidateId?: string;
}

interface IFeedbackFormProps {
  onSubmit: (values: IFeedbackFormValues) => void;
  initialValues?: IFeedbackFormValues;
  validationSchema: Yup.ObjectSchema;
}

const ScoreForm: FC<IFeedbackFormProps> = ({
  initialValues,
  ...props
}) => {
  const classes = formStyles();
  return (
    <Card className={classes.card} variant="outlined">
      <Formik
        initialValues={
          initialValues ? initialValues : ({} as IFeedbackFormValues)
        }
        {...props}
      >
        {(_innerProps) => (
          <Form className={styles.addFeedbackForm}>
            <div className={classes.root}>
              <Grid container direction="column" spacing={1}>
                <Grid item sm={12}>
                  <Typography
                    className={styles.sectionTitle}
                    variant="h5"
                  >
                    Overall rating
                  </Typography>
                  <ScoreButtonsList
                    value={_innerProps.values.score}
                    handleChange={(value) =>
                      _innerProps.setFieldValue('score', value)
                    }
                  />
                </Grid>

                <Grid item sm={12}>
                  <Typography variant="h5">
                    Explain your rating
                  </Typography>
                  <KInput
                    name="comment"
                    margin="normal"
                    label="Write here"
                    multiline
                    value={_innerProps.values.comment}
                    onChange={_innerProps.handleChange}
                    helperText={_innerProps.errors.comment}
                    error={_innerProps.errors.comment ? true : false}
                  />
                </Grid>
              </Grid>

              <div className={styles.formButton}>
                <KButton
                  type="submit"
                  disabled={_innerProps.isSubmitting}
                >
                  SUBMIT
                </KButton>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default ScoreForm;
