import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Snackbar, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import KAlert from 'components/KAlert';
import KBaseContainer from 'components/KBaseContainer';
import KModal from 'components/KModalCard';
import KTable from 'components/KTable';
import KInput from 'components/KInput';
import { IUserListing } from 'modules/Users/typings';
import { deleteUser, getUsers } from 'store/users/thunks';
import {
  sel_usersData,
  sel_usersLoading,
} from 'store/users/selectors';
import Grid from '@material-ui/core/Grid';
import Filters from 'modules/Users/components/Filters';
import styles from './UserListing.module.scss';

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
  options?: string;
  sortable?: boolean;
  isChip?: boolean;
}

const headCells: HeadCell[] = [
  {
    disablePadding: true,
    id: 'name',
    label: 'Name',
    numeric: false,
  },
  {
    disablePadding: false,
    id: 'role',
    label: 'Role',
    numeric: false,
    isChip: true,
  },
  {
    disablePadding: false,
    id: 'options',
    label: '',
    numeric: false,
    sortable: false,
  },
];

interface IFilter {
  label: string;
  name: string;
  total: number;
}
const userFilters: IFilter[] = [
  {
    label: 'ALL',
    name: 'all',
    total: 0,
  },
  {
    label: 'ADMINISTRATOR',
    name: 'ADMINISTRATOR',
    total: 0,
  },
  {
    label: 'RECRUITER',
    name: 'RECRUITER',
    total: 0,
  },
  {
    label: 'MANAGER',
    name: 'MANAGER',
    total: 0,
  },
  {
    label: 'INTERVIEWER',
    name: 'INTERVIEWER',
    total: 0,
  },
];

const updateFiltersTotals = (
  filtersList: IFilter[],
  usersList: IUserListing[],
) => {
  const updatedFiltersList = filtersList.map((filter: IFilter) => {
    if (filter.name === 'all') {
      return {
        ...filter,
        total: usersList.length,
      };
    }
    return {
      ...filter,
      total: usersList.filter(
        (user: IUserListing) => user.role.level === filter.name,
      ).length,
    };
  });

  return updatedFiltersList;
};

const updateShownUsers = (
  filter: string,
  users: IUserListing[] = [],
) =>
  filter === 'all'
    ? users
    : users.filter(
        (user: IUserListing) => user.role.level === filter,
      );

const UserListing: FC = () => {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [filteredUsers, setFilteredUsers] = useState<IUserListing[]>(
    [],
  );
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [showMessage, setShowMessage] = useState(false);
  const [shownUsers, setShownUsers] = useState<IUserListing[]>([]);
  const dispatch = useDispatch();
  const users: IUserListing[] = useSelector(sel_usersData);
  const filters = updateFiltersTotals(userFilters, users);
  const loading = useSelector(sel_usersLoading);

  const usersToKTable = shownUsers.map((user) => {
    return {
      ...user,
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role.level,
    };
  });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(updateShownUsers(filter, users));
  }, [users, filter]);

  useEffect(() => {
    setShownUsers(filteredUsers);
  }, [filteredUsers]);

  // useEffect(() => {
  //   setShownUsers(updatedUsers);
  // }, [updatedUsers]);

  useEffect(() => {
    if (search.length < 1) {
      setShownUsers(filteredUsers);
    } else {
      const updatedUsers = filteredUsers.filter(
        (user) =>
          user.firstName
            .toLowerCase()
            .replace(/^\s+|\s+$/gm, '')
            .includes(
              search.toLowerCase().replace(/^\s+|\s+$/gm, ''),
            ) ||
          user.lastName
            .toLowerCase()
            .replace(/^\s+|\s+$/gm, '')
            .includes(
              search.toLowerCase().replace(/^\s+|\s+$/gm, ''),
            ) ||
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .replace(/^\s+|\s+$/gm, '')
            .includes(
              search.toLowerCase().replace(/^\s+|\s+$/gm, ''),
            ),
      );

      setShownUsers(updatedUsers);
    }
  }, [filteredUsers, search]);

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
  };

  const handleDeleteMessage = () => {
    setShowMessage(true);
  };

  const handleDelete = () => {
    if (!currentId) return;
    dispatch(deleteUser(currentId));
    handleDeleteMessage();
    setOpen(false);
  };

  const handleOpen = (id: string) => {
    setOpen(true);
    setCurrentId(id);
  };

  const handleClose = () => {
    setCurrentId('0');
    setOpen(false);
    setShowMessage(false);
  };

  const options = {
    delete: (id: string) => {
      handleOpen(id);
    },
    edit: '/users/edit/',
  };

  return (
    <KBaseContainer whole>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={handleClose}
        open={showMessage}
      >
        <KAlert severity="success">User deleted.</KAlert>
      </Snackbar>
      <KModal
        open={open}
        onClose={handleClose}
        type={'confirmation'}
        confirmFn={handleDelete}
        confirmMsg={'You will not be able to recover this user!'}
        confirmBtn={'Delete'}
        setOpenModal={setOpen}
      />

      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        mb={2}
      >
        <Grid container>
          <Grid item xs={6} md={2}>
            <Typography variant="h1">Users</Typography>
          </Grid>

          <Grid
            container
            alignItems="flex-end"
            spacing={2}
            item
            xs={12}
            md={8}
            className={styles.searchbar}
          >
            <Grid item>
              <SearchIcon />
            </Grid>
            <Grid item>
              <KInput
                label="Search for a user..."
                onChange={handleSearch}
                value={search}
              />
            </Grid>
          </Grid>

          {/* 
          /*
          * This button was for Manually add Users,
          * now the app uses Microsoft Single Sing On.
          * It still can be uncommented and added back again.
          <Grid
            item
            xs={6}
            md={2}
            className={styles.addButtonContainer}
          >
            <Link to="/users/create">
              <KButton color="primary">Add User</KButton>
            </Link>
          </Grid> */}
        </Grid>
      </Box>
      <Grid container>
        <Grid item xs={12} md={2}>
          <Filters
            activeFilter={filter}
            changeFilter={(filterName) => setFilter(filterName)}
            filters={filters}
          />
        </Grid>
        <Grid item xs={12} md={10}>
          <div className={styles.tableContainer}>
            <KTable
              data={usersToKTable}
              filterData={search}
              headCells={headCells}
              isLoading={loading}
              options={options}
              defaultOrder={'title'}
            />
          </div>
        </Grid>
      </Grid>
    </KBaseContainer>
  );
};

export default UserListing;
