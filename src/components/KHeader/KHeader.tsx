import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { sel_notifications } from 'store/notifications/selectors';
import { selectorProfilePicture } from 'store/auth/selectors';
import {
  getNotifications,
  readNotification,
} from 'store/notifications/thunks';
import { INotification } from '../../modules/Users/views/Dashboard/typings';
import { getRole, hasUserLocale } from 'utils/helpers';
import clsx from 'clsx';
import { formatDistance } from 'date-fns';
import {
  AppBar,
  Avatar,
  IconButton,
  Toolbar,
  Typography,
  Popover,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Icon,
  ListItemText,
  Badge,
  Button,
} from '@material-ui/core';
import {
  ChevronRight,
  ChevronLeft,
  Notifications,
} from '@material-ui/icons';
import {
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core/styles';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import styles from './KHeader.module.scss';
import { getAvatar } from 'services/Microsoft/AuthProvider';

interface IKHeaderProps {
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  isOpen: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    badge: {
      backgroundColor: theme.palette.grey[400],
      color: 'white',
    },
  }),
);

const KHeader: React.FC<IKHeaderProps> = ({
  handleDrawerOpen,
  handleDrawerClose,
  isOpen,
}) => {
  const user = JSON.parse(String(sessionStorage.getItem('user')))
    .user;
  const history = useHistory();
  const dispatch = useDispatch();
  const ksquareLogo = '/assets/header.svg';

  useEffect(() => {
    getAvatar();
  }, []);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);
  const notifications = useSelector(sel_notifications);
  const avatar = useSelector(selectorProfilePicture);

  const filteredNotifications = notifications.filter(
    (notification: INotification) => notification.read === false,
  );

  const filteredNotificationsLength = filteredNotifications.length;

  const [
    anchorElProfile,
    setAnchorElProfile,
  ] = React.useState<HTMLButtonElement | null>(null);
  const [
    anchorElNotifications,
    setAnchorElNotifications,
  ] = React.useState<HTMLButtonElement | null>(null);

  const handleClickProfile = (event: any) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorElProfile(null);
  };
  const handleClickNotifications = (event: any) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorElNotifications(null);
  };

  const openProfile = Boolean(anchorElProfile);
  const idProfile = openProfile ? 'simple-popover' : undefined;
  const openNotifications = Boolean(anchorElNotifications);
  const idNotifications = openNotifications
    ? 'simple-popover'
    : undefined;

  const classes = useStyles();

  return (
    <AppBar
      elevation={0}
      position="static"
      className={clsx(styles.appBar)}
    >
      <Toolbar className={styles.toolbar}>
        {isOpen ? (
          <IconButton
            color="inherit"
            onClick={handleDrawerClose}
            className={styles['close-drawer']}
          >
            <ChevronLeft />
          </IconButton>
        ) : (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(styles['menu-button'])}
          >
            <ChevronRight />
          </IconButton>
        )}
        <div className={styles.logo}>
          <img
            src={ksquareLogo}
            alt="logo"
            className={styles.logosvg}
          />
        </div>

        <Popover
          id={idProfile}
          open={openProfile}
          anchorEl={anchorElProfile}
          onClose={handleCloseProfile}
          keepMounted
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          classes={{ paper: styles.paperProfile }}
          style={{ zIndex: 100000 }}
        >
          <Grid container direction="row" justify="center">
            <Grid
              wrap="nowrap"
              item
              container
              direction="column"
              justify="center"
              alignItems="center"
              className={styles.nameSection}
            >
              <Grid item className={styles.popoverName}>
                {user.firstName && user.firstName.split(' ')[0]}{' '}
                {user.lastName && user.lastName.split(' ')[0]}
              </Grid>
              <Grid item className={styles.popoverRole}>
                {hasUserLocale()
                  ? `${getRole()[0].toUpperCase()}${getRole()
                      .substr(1)
                      .toLowerCase()}`
                  : null}
              </Grid>
            </Grid>
            <List style={{ width: '100%' }}>
              {/* <ListItem button>
                <ListItemIcon>
                  <Icon>settings_icon</Icon>
                </ListItemIcon>
                Settings
              </ListItem> */}
              <Divider variant="fullWidth" />
              <ListItem
                button
                onClick={() => {
                  sessionStorage.clear();
                  history.push('/auth/login');
                }}
              >
                <ListItemIcon className={styles.logOutIcon}>
                  <Icon>exit_to_app</Icon>
                </ListItemIcon>
                <ListItemText primary={'Log Out'} />
              </ListItem>
            </List>
          </Grid>
        </Popover>

        <Popover
          id={idNotifications}
          open={openNotifications}
          anchorEl={anchorElNotifications}
          onClose={handleCloseNotifications}
          keepMounted
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          classes={{ paper: styles.paperNotifications }}
          style={{ zIndex: 100000 }}
        >
          {filteredNotificationsLength >= 1 ? (
            <List className={classes.root}>
              {filteredNotifications.map(
                (notification: INotification, i: number) => (
                  <ListItem
                    key={notification.id}
                    dense
                    button
                    divider={
                      filteredNotificationsLength - 1 === i
                        ? false
                        : true
                    }
                    onClick={() => {
                      dispatch(readNotification(notification.id));
                      if (filteredNotifications.length === 1) {
                        handleCloseNotifications();
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
                    <ListItemIcon style={{ minWidth: '40px' }}>
                      <NotificationsActiveIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        (notification.type === 'note' &&
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
                              style={{ fontSize: '12px' }}
                              color="textPrimary"
                            >
                              {`${
                                notification.user.firstName &&
                                notification.user.firstName.split(
                                  ' ',
                                )[0]
                              } ${
                                notification.user.lastName &&
                                notification.user.lastName.split(
                                  ' ',
                                )[0]
                              }`}
                            </Typography>
                            <Typography
                              component="span"
                              display="inline"
                              variant="subtitle1"
                              style={{ fontSize: '12px' }}
                              color="textPrimary"
                            >
                              {` left a ${notification.type} on `}
                            </Typography>
                            <Typography
                              component="span"
                              display="inline"
                              variant="subtitle2"
                              style={{ fontSize: '12px' }}
                              color="textPrimary"
                            >
                              {`${
                                notification.candidate.firstName &&
                                notification.candidate.firstName.split(
                                  ' ',
                                )[0]
                              } ${
                                notification.candidate.lastName &&
                                notification.candidate.lastName.split(
                                  ' ',
                                )[0]
                              }'s`}
                            </Typography>
                            <Typography
                              component="span"
                              display="inline"
                              style={{ fontSize: '12px' }}
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
                            style={{ fontSize: '12px' }}
                            variant="subtitle1"
                            color="textPrimary"
                          >
                            {notification.message}
                          </Typography>
                        )
                      }
                      secondary={
                        <Typography
                          component="span"
                          display="block"
                          style={{ fontSize: '10px' }}
                          variant="subtitle2"
                          color="textPrimary"
                        >
                          {formatDistance(
                            new Date(notification.createdAt),
                            new Date(),
                            { addSuffix: true },
                          )}
                        </Typography>
                      }
                    />
                  </ListItem>
                ),
              )}
            </List>
          ) : (
            <List className={classes.root}>
              <ListItem
                dense
                style={{
                  padding: '10px',
                }}
              >
                <ListItemIcon style={{ minWidth: '40px' }}>
                  <NotificationsActiveIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"You don't have any new notifications"}
                ></ListItemText>
              </ListItem>
            </List>
          )}
        </Popover>

        <Button onClick={handleClickProfile}>
          <Avatar
            src={avatar}
            alt="avatar"
            className={styles.avatarHeader}
          >
            {`${user.firstName && user.firstName[0]}${
              user.lastName && user.lastName[0]
            }`}
          </Avatar>
          <Typography
            variant="subtitle1"
            className={styles['profile-name']}
          >
            {user.firstName && user.firstName.split(' ')[0]}{' '}
            {user.lastName && user.lastName.split(' ')[0]}
          </Typography>
        </Button>

        <IconButton
          aria-label="show 17 new notifications"
          color="inherit"
          onClick={handleClickNotifications}
        >
          <Badge
            badgeContent={
              filteredNotifications && filteredNotifications.length
            }
            color="primary"
            classes={{ badge: classes.badge }}
            max={9}
          >
            <Notifications />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default KHeader;
