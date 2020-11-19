import React, { FC } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import {
  Card,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import KButton from 'components/KButton';
import KInput from 'components/KInput';
import styles from './RatingForm.module.scss';

const formStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      boxShadow: '0 5px 30px -12px rgba(0,0,0,0.3)',
      minWidth: '70%',
      padding: '80px',
      margin: '10px',
      position: 'relative',
    },
    sizeLarge: { fontSize: '40px' },
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

const labels: { [index: string]: string } = {
  1: 'Strong negative',
  2: 'Negative',
  3: 'Neutral',
  4: 'Positive',
  5: 'Strong Positive',
};

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

const RatingForm: FC<IFeedbackFormProps> = ({
  initialValues,
  ...props
}) => {
  const [hover, setHover] = React.useState(0);
  const [value, setValue] = React.useState<number | null>(0);
  const classes = formStyles();

  return (
    <Formik
      initialValues={
        initialValues ? initialValues : ({} as IFeedbackFormValues)
      }
      {...props}
    >
      {(_innerProps) => (
        <Form className={styles.addFeedbackForm}>
          <Card className={classes.card} variant="outlined">
            <div className={styles.container}>
              <div className={styles.ratingContainer}>
                <Rating
                  name="score"
                  value={_innerProps.values.score}
                  precision={1}
                  className={classes.sizeLarge}
                  onChange={(event, value) => {
                    setValue(value);
                    _innerProps.setFieldValue('score', value);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  size="large"
                />
              </div>
              <div className={styles.ratingLabel}>
                {value !== null && (
                  <Box>{labels[hover !== -1 ? hover : value]}</Box>
                )}
              </div>
            </div>
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
              <div className={styles.formButton}>
                <KButton
                  type="submit"
                  disabled={_innerProps.isSubmitting}
                >
                  SUBMIT
                </KButton>
              </div>
            </Grid>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default RatingForm;
