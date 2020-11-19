import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  selectorAuthLoading,
  selectorAuthFail,
} from 'store/auth/selectors';

import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  Container,
  Card,
  CardContent,
  CircularProgress,
  Snackbar,
} from '@material-ui/core';

import { hasUserLocale } from 'utils/helpers';

import KButton from 'components/KButton';

import KAlert from 'components/KAlert';
import styles from './Login.module.scss';

import { login } from 'services/Microsoft/AuthProvider';
import { login as loginAction } from 'store/auth/thunks';

import { selectorisAuthenticated } from 'store/auth/selectors';

const Login: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const authError = useSelector(selectorAuthFail);
  const loading = useSelector(selectorAuthLoading);
  const ksquareLogo = '/assets/ksquare-logo.svg';
  const isAuthenticated = useSelector(selectorisAuthenticated);

  const [showMessage, setShowMessage] = useState<boolean>(
    authError.error,
  );
  if (isAuthenticated && hasUserLocale()) {
    history.push('/');
  }
  useEffect(() => {
    setShowMessage(authError.error);
  }, [authError]);

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  return (
    <div className={styles.login}>
      <Snackbar
        autoHideDuration={3000}
        open={showMessage}
        onClose={handleCloseMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <KAlert severity="error">
          Oops! We had a problem with your session.
        </KAlert>
      </Snackbar>
      <Container className={styles.container}>
        <Card className={styles.card}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} className={styles.imgWrapper}>
                <img src={ksquareLogo} alt="logo" width="300" />
              </Grid>
            </Grid>
            <Grid container spacing={3} justify="center">
              <Grid item xs={12} md={8}>
                <div className={styles.submitWrapper}>
                  <KButton
                    fullWidth
                    onClick={() =>
                      dispatch(
                        loginAction(login, () => {
                          if (location.state) {
                            history.push(
                              (location.state as any).from.pathname,
                            );
                          } else {
                            history.push('/');
                          }
                        }),
                      )
                    }
                    className={styles.submit}
                  >
                    {loading ? (
                      <CircularProgress
                        size={20}
                        style={{ color: 'white' }}
                      />
                    ) : (
                      <span>Login</span>
                    )}
                  </KButton>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
