import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import jobService from 'services/jobs.service';
import { IJob } from 'modules/Jobs/typings';
import styles from './Job.module.scss';
import { useRouteMatch } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import CandidateJobForm from '../CandidateJobForm';
import KSpinner from 'components/KSpinner';
import dompurify from 'dompurify';

interface MatchParams {
  jobId: '';
}

const Job = () => {
  const ksquareGroupBanner = '/assets/ksquare-group-head-small.jpg';
  const [jobData, setJobData] = useState<IJob | null>(null);
  const match = useRouteMatch<MatchParams>();
  const history = useHistory();

  useEffect(() => {
    jobService
      .getPublishedById(match.params?.jobId)
      .then((res) => {
        setJobData(res);
      })
      .catch((error) => {
        setJobData(error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isClosed = () => {
    return jobData?.status === 'Closed';
  };

  return (
    <div className={styles.job}>
      <img
        className={styles.jobImg}
        src={ksquareGroupBanner}
        alt="The Ksquare Group"
      />
      <div className={styles.jobContainer}>
        {jobData === null ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingAnimation}>
              <KSpinner />
            </div>
            <div className={styles.loadingText}>
              <p>LOADING...</p>
            </div>
          </div>
        ) : !jobData.title ? (
          <div className={styles.candidateAppliedContainer}>
            <h1>Page not found</h1>
            <p>
              <span className={styles.bold}>
                The requested page is not available or does not exist.
              </span>
            </p>
          </div>
        ) : (
          <Grid container justify="center">
            <Grid item xs={12} md={7}>
              <div
                className={`${styles.jobStatus} ${
                  isClosed() ? styles.closed : styles.open
                }`}
              >
                {jobData.status}
              </div>
            </Grid>
            <Grid item xs={12} md={7}>
              <h1>{jobData?.title}</h1>
              <h3 className={styles.jobLocation}>
                {jobData?.location}
              </h3>
              {jobData?.salaryPublic && (
                <h3 className={styles.jobSalary}>
                  {jobData?.salaryLower} - {jobData?.salaryUpper}{' '}
                  {jobData?.salaryCurrency} / {jobData?.salaryPeriod}{' '}
                  - {jobData?.salaryGross}
                </h3>
              )}
              <h3 className={styles.jobTime}>{jobData?.jobTime}</h3>
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography
                variant="h4"
                className={styles.sectionTitle}
              >
                Why you will love working with us
              </Typography>

              <p>
                We offer an inspiring and rewarding environment, where
                we encourage you to be the best version of yourself.
                Our leadership team is committed to your professional
                growth, as well as to constant innovation and
                improvement.
              </p>
              {/* <Grid item xs={7}>
              <img
                className={styles.jobImg}
                src={careerCollage}
                alt="Ksquare Careers"
              />
            </Grid> */}
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  className={styles.sectionTitle}
                >
                  Reasons to join our Team:
                </Typography>
                <ul>
                  <li>
                    We thrive to reach out to tomorrow. We inspire and
                    transform the way business is done.
                  </li>
                  <li>
                    We are world class colleagues who work together
                    across cultures and disciplines.
                  </li>
                  <li>
                    Leadership commitment towards Ksquarians,
                    transparency, growth, learning and thrilling
                    challenges.
                  </li>
                  <li>
                    Your work matters and has a direct impact of our
                    organizational success – you can feel and see it
                    every day.
                  </li>
                  <li>
                    We offer you trust, flexibility and welfare,
                    because you are important to us.
                  </li>
                </ul>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              className={styles.jobDescription}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: dompurify.sanitize(jobData.details),
                }}
              ></div>
            </Grid>
            <CandidateJobForm
              history={history}
              jobId={match.params?.jobId}
            />
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Job;
