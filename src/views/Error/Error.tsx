import React from 'react';
import KBaseContainer from 'components/KBaseContainer';
import styles from './Error.module.scss';

interface IError {
  error: {
    statusCode: number;
    message: string;
  };
}

const errorImage = '/assets/error-image.svg';

const Errors: React.FC<IError> = (props) => {
  const { statusCode, message } = props.error;

  return (
    <KBaseContainer>
      <div className={styles.error}>
        <img
          src={errorImage}
          alt="An error has ocurred"
          className={styles.image}
        />
        <h2 className={styles.statusCode}>{statusCode}</h2>
        <p className={styles.message}>{message}</p>
      </div>
    </KBaseContainer>
  );
};

export default Errors;
