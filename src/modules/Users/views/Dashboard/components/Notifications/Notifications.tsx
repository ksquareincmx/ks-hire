import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sel_notifications } from 'store/notifications/selectors';
import { formatDistance } from 'date-fns';
import Pagination from '@material-ui/lab/Pagination';

import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  Tabs,
  Tab,
} from '@material-ui/core';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import DeleteIcon from '@material-ui/icons/Delete';
import LongMenu from '../LongMenu';

import {
  deleteNotification,
  deleteAllNotifications,
  readNotification,
  unreadNotification,
} from 'store/notifications/thunks';
import { INotification } from '../../typings';
import styles from './Notifications.module.scss';
import { capitalizeOnlyFirst } from 'utils/helpers';
import { useHistory } from 'react-router';
import { getId } from 'utils/helpers';

const Notifications: React.FC = () => {
  const [filter, setFilter] = useState<boolean | string>('all');
  const dispatch = useDispatch();
  const notifications = useSelector(sel_notifications);
  const history = useHistory();

  const [page, setPage] = React.useState(1);
  const [rows, setRows] = React.useState(0);
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (
    event: React.ChangeEvent<{}>,
    newValue: number,
  ) => {
    setTabValue(newValue);
  };
  const handleChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const notificationsList = useMemo(() => {
    const markRead = (id: number) => {
      dispatch(readNotification(id));
    };
    const markUnread = (id: number) => {
      dispatch(unreadNotification(id));
    };
    const clearNotification = (id: number) => {
      dispatch(deleteNotification(id));
    };
    const handleClick = (id: number, type: string) => {
      if (type === 'delete') {
        clearNotification(id);
      } else if (type === 'read') {
        markRead(id);
      } else {
        markUnread(id);
      }
    };
    const filteredNotifications =
      filter === 'all'
        ? notifications
        : notifications.filter(
            (notification: INotification) =>
              notification.read === filter,
          );
    setRows(filteredNotifications.length);

    return filteredNotifications
      .slice((page - 1) * 5, (page - 1) * 5 + 5)
      .map((notification: INotification) => {
        return !notification.id ? (
          <ListItem className={styles.notification}>
            <p>Loading...</p>
          </ListItem>
        ) : (
          <ListItem
            key={notification.id}
            alignItems="flex-start"
            button
            dense
            onClick={() => {
              if (!notification.read) {
                handleClick(notification.id, 'read');
              }
              if (notification.type === 'job') {
                history.push(`/jobs/${notification.jobId}`);
              } else if (notification.type === 'note') {
                history.push(
                  `/candidates/${notification.candidateId}/notes`,
                );
              } else {
                history.push(
                  `/candidates/${notification.candidateId}`,
                );
              }
            }}
          >
            {!notification.read && (
              <div className={styles.unreadNotification}></div>
            )}
            <ListItemIcon style={{ marginLeft: '5px' }}>
              <NotificationsActiveIcon />
            </ListItemIcon>
            <ListItemText
              primary={capitalizeOnlyFirst(notification.type)}
              secondary={
                <>
                  {(notification.type === 'note' &&
                    notification.candidate &&
                    notification.user) ||
                  (notification.type === 'feedback' &&
                    notification.candidate &&
                    notification.user) ? (
                    <>
                      <Typography
                        component="span"
                        display="inline"
                        variant="subtitle2"
                        color="textPrimary"
                      >
                        {`${
                          notification.user.firstName &&
                          notification.user.firstName.split(' ')[0]
                        } ${
                          notification.user.lastName &&
                          notification.user.lastName.split(' ')[0]
                        }`}
                      </Typography>
                      <Typography
                        component="span"
                        display="inline"
                        variant="subtitle1"
                        color="textPrimary"
                      >
                        {` left a ${notification.type} on `}
                      </Typography>
                      <Typography
                        component="span"
                        display="inline"
                        variant="subtitle2"
                        color="textPrimary"
                      >
                        {`${
                          notification.candidate.firstName.split(
                            ' ',
                          )[0]
                        } ${
                          notification.candidate.lastName.split(
                            ' ',
                          )[0]
                        }'s`}
                      </Typography>
                      <Typography
                        component="span"
                        display="inline"
                        variant="subtitle1"
                        color="textPrimary"
                      >
                        {` profile`}
                      </Typography>
                    </>
                  ) : (
                    <Typography
                      component="span"
                      display="inline"
                      variant="subtitle1"
                      color="textPrimary"
                    >
                      {notification.message}
                    </Typography>
                  )}

                  <Typography
                    component="span"
                    display="block"
                    variant="subtitle2"
                    color="textSecondary"
                    style={{ fontSize: '12px' }}
                  >
                    {formatDistance(
                      new Date(notification.createdAt),
                      new Date(),
                      { addSuffix: true },
                    )}
                  </Typography>
                </>
              }
            />
            <ListItemSecondaryAction>
              <Tooltip title="Clear Notification">
                <IconButton
                  edge="end"
                  aria-label="Delete notification"
                  onClick={() =>
                    handleClick(notification.id, 'delete')
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        );
      });
    // eslint-disable-next-line
  }, [dispatch, filter, notifications, page]);

  return (
    <Grid
      container
      direction="column"
      style={{ width: '100%' }}
      alignItems="center"
    >
      <Paper className={styles.paper}>
        <Grid item container direction="row" justify="space-between">
          <Grid item>
            <Typography
              className={styles.notificationsHeader}
              gutterBottom
              variant="h5"
            >
              Notifications
            </Typography>
          </Grid>
          <Grid item>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab
                disableRipple
                label="All"
                onClick={() => {
                  setFilter('all');
                  setPage(1);
                }}
              />
              <Tab
                disableRipple
                label="Unread"
                onClick={() => {
                  setFilter(false);
                  setPage(1);
                }}
              />
              <Tab
                disableRipple
                label="Read"
                onClick={() => {
                  setFilter(true);
                  setPage(1);
                }}
              />
            </Tabs>
          </Grid>

          <Grid item>
            <LongMenu
              options={[
                {
                  type: 'DELETE',
                  deleteFn: (id: string) => {
                    dispatch(deleteAllNotifications(id));
                  },
                },
              ]}
              userId={getId()}
            />
          </Grid>

          {/*  <Grid item className={classes.root}>
            <ButtonGroup
              color="secondary"
              aria-label="outlined secondary button group"
            >
              <KButton
                onClick={() => {
                  setFilter(false);
                  setPage(1);
                }}
              >
                Unread
              </KButton>
              <KButton
                onClick={() => {
                  setFilter(true);
                  setPage(1);
                }}
              >
                Read
              </KButton>
              <KButton
                onClick={() => {
                  setFilter('all');
                  setPage(1);
                }}
              >
                All
              </KButton>
            </ButtonGroup>
          </Grid> */}
        </Grid>
        <Grid item>
          <List className={styles.notificationsList}>
            {!notificationsList.length ? (
              <div className={styles.emptyNotifications}>
                <p>You don't have any notifications right now</p>
              </div>
            ) : (
              notificationsList
            )}
          </List>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="flex-end"
          className={styles.pagination}
        >
          <Grid item>
            <Pagination
              count={Math.ceil(rows / 5)}
              page={page}
              onChange={handleChange}
              color="primary"
              size="small"
            />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Notifications;
