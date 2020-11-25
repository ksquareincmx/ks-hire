import * as React from 'react';
import { Typography } from '@material-ui/core/';
import {
  LocalPhone,
  Email,
  Link,
  LinkedIn,
  LocalAtm,
  LocationOn,
} from '@material-ui/icons/';
import { ICandidate } from 'modules/Candidates/typings';
import styles from './CandidateDetails.module.scss';
import { getRole } from 'utils/helpers';

interface ICandidateDetailsProps {
  candidateDetails: ICandidate;
}

const CandidateDetails: React.FC<ICandidateDetailsProps> = (
  props,
) => {
  const {
    email,
    phone,
    salaryOffer,
    country,
    state,
    city,
  } = props.candidateDetails;
  let { website, linkedinProfile } = props.candidateDetails;

  const validateLink = /(http(s?)):\/\//i;
  if (website && !validateLink.test(website)) {
    website = `http://${website}`;
  }

  if (linkedinProfile && !validateLink.test(linkedinProfile)) {
    linkedinProfile = `http://${linkedinProfile}`;
  }

  return (
    <div className={styles.detailsComponent}>
      <div className={styles.detailsContainer}>
        <Typography variant="h5">Details</Typography>

        <div className={styles.detailsList}>
          <div className={styles.detail}>
            <Typography variant="body2" className={styles.detailText}>
              <Email fontSize="small" className={styles.detailIcon} />
              <a
                href={`mailto:${email}`}
                className={styles.detailLink}
              >
                {email}
              </a>
            </Typography>
          </div>
          <div className={styles.detail}>
            <Typography variant="body2" className={styles.detailText}>
              <LocalPhone
                fontSize="small"
                className={styles.detailIcon}
              />
              <a href={`tel:+${phone}`} className={styles.detailLink}>
                {phone}
              </a>
            </Typography>
          </div>
          {country && city && state && (
            <div className={styles.detail}>
              <Typography
                variant="body2"
                className={styles.detailText}
              >
                <LocationOn
                  fontSize="small"
                  className={styles.detailIcon}
                />
                <span className={styles.detailLink}>
                  {JSON.parse(city as string).name}
                  {', '}
                  {JSON.parse(state as string).name}
                  {', '}
                  {JSON.parse(country as string).name}
                </span>
              </Typography>
            </div>
          )}
          {website && (
            <div className={styles.detail}>
              <Typography
                variant="body2"
                className={styles.detailText}
              >
                <Link
                  fontSize="small"
                  className={styles.detailIcon}
                />
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.detailLink}
                >
                  {website}
                </a>
              </Typography>
            </div>
          )}
          {linkedinProfile && (
            <div className={styles.detail}>
              <Typography
                variant="body2"
                className={styles.detailText}
              >
                <LinkedIn
                  fontSize="small"
                  className={styles.detailIcon}
                />
                <a
                  href={linkedinProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.detailLink}
                >
                  LinkedIn Profile
                </a>
              </Typography>
            </div>
          )}
        </div>
      </div>

      {salaryOffer && getRole() !== 'INTERVIEWER' && (
        <div className={styles.detailsContainer}>
          <Typography variant="h5">Salary Offer</Typography>

          <div className={styles.detailsList}>
            <div className={styles.detail}>
              <Typography
                variant="body2"
                className={styles.detailText}
              >
                <LocalAtm
                  fontSize="small"
                  className={styles.detailIcon}
                />
                <span className={styles.detailLink}>
                  $ {salaryOffer}
                </span>
              </Typography>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateDetails;
