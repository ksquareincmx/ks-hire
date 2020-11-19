import KContent from 'components/KContent';
import KHeader from 'components/KHeader';
import KSidebar from 'components/KSidebar';
import CandidatesModule from 'modules/Candidates';
import JobsModule from 'modules/Jobs';
import UserModule from 'modules/Users';
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './KLayout.module.scss';
import Dashboard from 'modules/Users/views/Dashboard';
import KPrivateRoute from '../KPrivateRoute';

const KLayout: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.layout}>
      <KSidebar isOpen={open} />
      <KContent>
        <KHeader
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          isOpen={open}
        />
        <Switch>
          <KPrivateRoute
            roles={['ADMINISTRATOR', 'RECRUITER', 'MANAGER']}
            path="/jobs"
          >
            <JobsModule />
          </KPrivateRoute>
          <KPrivateRoute roles={['ADMINISTRATOR']} path="/users">
            <UserModule />
          </KPrivateRoute>
          <KPrivateRoute
            roles={[
              'ADMINISTRATOR',
              'RECRUITER',
              'MANAGER',
              'INTERVIEWER',
            ]}
            path="/candidates"
          >
            <CandidatesModule />
          </KPrivateRoute>
          {/*    <Route path="/components">
            <ComponentsModule />
          </Route> */}
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </KContent>
    </div>
  );
};

export default KLayout;
