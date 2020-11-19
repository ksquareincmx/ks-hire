import React, { useEffect } from 'react';
import KLayout from './components/KLayout';
import {
  StylesProvider,
  ThemeProvider,
  CssBaseline,
} from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import theme from 'styles/theme';
import AuthModule from 'modules/Auth';
import VacancyModule from 'modules/Vacancy';
import PrivacyPolicy from 'views/PrivacyPolicy';
import KPrivateRoute from 'components/KPrivateRoute/';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticatedAuth } from 'store/auth/authSlice';
import {
  selectorisAuthenticated,
  selectorAuthData,
} from 'store/auth/selectors';
import io from 'socket.io-client';
import store from 'store';
import { getNotifications } from 'store/notifications/thunks';
import { INotification } from './modules/Users/views/Dashboard/typings';

import {
  getUserProfile,
  userAgentApplication,
} from 'services/Microsoft/AuthProvider';

function startSocket(token: string) {
  const { REACT_APP_API_URL } = process.env;

  const socket = io(`${REACT_APP_API_URL}`, {
    query: {
      token: token,
    },
    transports: ['websocket'],
    upgrade: false,
  });

  function requestNotificationPermissions() {
    if (Notification.permission !== 'denied') {
      Notification.requestPermission(function () {
        // console.log(permission);
      });
    }
  }
  requestNotificationPermissions();

  socket.on('connect', () => {
    // console.log('websocket connected');
  });
  socket.on('change', async () => {
    await store.dispatch(getNotifications());
    const notification = store.getState().notifications.all[0];
    if (notification) {
      new Notification((notification as INotification)?.type, {
        body: (notification as INotification)?.message,
        tag: 'notification-kshire',
      });
    }
  });
  socket.on('disconnect', () => {
    // console.log(reason);
  });
}

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectorisAuthenticated);
  const authData = useSelector(selectorAuthData);

  useEffect(() => {
    if (sessionStorage.length === 0) {
      dispatch(isAuthenticatedAuth(false));
    } else {
      // If MSAL already has an account, the user
      // is already logged in
      const account = userAgentApplication.getAccount();

      if (account) {
        // Enhance user object with data from Graph
        getUserProfile();
      } else {
        dispatch(isAuthenticatedAuth(false));
      }
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isAuthenticated && sessionStorage.getItem('user')) {
      startSocket(
        JSON.parse(String(sessionStorage.getItem('user'))).token,
      );
    } else if (isAuthenticated && authData) {
      startSocket((authData as any).token);
    }
  }, [authData, isAuthenticated]);

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <CssBaseline />
        <Router>
          <Switch>
            <Route path="/vacancy">
              <VacancyModule />
            </Route>
            <Route path="/auth">
              <AuthModule />
            </Route>
            <Route path="/privacy">
              <PrivacyPolicy />
            </Route>
            <KPrivateRoute path="/">
              <KLayout />
            </KPrivateRoute>
          </Switch>
        </Router>
      </StylesProvider>
    </ThemeProvider>
  );
};

export default App;
