import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import { getRole } from 'utils/helpers';
import { INavigationRoutes, routes } from 'utils/navigation';
import styles from './KSidebar.module.scss';

interface IKSidebarProps {
  isOpen: boolean;
}

const KSidebar: React.FC<IKSidebarProps> = ({ isOpen }) => {
  const filterRoutes = (route: INavigationRoutes) => {
    switch (route.name) {
      case 'Users':
        return (
          getRole() === 'ADMINISTRATOR' && (
            <ListItem
              key={route.name}
              button
              component={NavLink}
              exact
              activeClassName={styles.selected}
              to={route.path}
            >
              <ListItemIcon>
                <Icon>{route.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItem>
          )
        );
      case 'Jobs':
        return (
          ['ADMINISTRATOR', 'RECRUITER', 'MANAGER'].includes(
            getRole(),
          ) && (
            <ListItem
              key={route.name}
              button
              component={NavLink}
              exact
              activeClassName={styles.selected}
              to={route.path}
            >
              <ListItemIcon>
                <Icon>{route.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItem>
          )
        );
      case 'Candidates':
        return (
          [
            'ADMINISTRATOR',
            'RECRUITER',
            'MANAGER',
            'INTERVIEWER',
          ].includes(getRole()) && (
            <ListItem
              key={route.name}
              button
              component={NavLink}
              exact
              activeClassName={styles.selected}
              to={route.path}
            >
              <ListItemIcon>
                <Icon>{route.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItem>
          )
        );
      default:
        return (
          <ListItem
            key={route.name}
            button
            component={NavLink}
            exact
            activeClassName={styles.selected}
            to={route.path}
          >
            <ListItemIcon>
              <Icon>{route.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={route.name} />
          </ListItem>
        );
    }
  };
  return (
    <Drawer
      variant="permanent"
      className={isOpen ? styles.drawerOpen : styles.drawerClose}
      classes={{
        paper: isOpen ? styles.drawerOpen : styles.drawerClose,
      }}
    >
      <List className={styles.list}>
        {routes.map((route: INavigationRoutes) =>
          filterRoutes(route),
        )}
      </List>
    </Drawer>
  );
};

export default KSidebar;
