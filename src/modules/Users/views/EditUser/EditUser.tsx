import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import * as Yup from 'yup';
import {
  nameValidator,
  stringRequiredValidator,
} from 'utils/validations';
import { IUser } from 'modules/Users/typings';
import { getUser, editUser } from 'store/users/thunks';
import {
  sel_userData,
  sel_edit_success,
} from 'store/users/selectors';
import { KFieldGroup } from 'components/KForm/KForm';
import KAlert from 'components/KAlert';
import KBaseContainer from 'components/KBaseContainer';
import KForm from 'components/KForm';
import KSpinner from 'components/KSpinner';
import styles from './EditUser.module.scss';

const validationSchema = Yup.object({
  firstName: nameValidator,
  lastName: nameValidator,
  roleId: stringRequiredValidator,
});

const UserEdit = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const { success, message: errorMessage } = useSelector(
    sel_edit_success,
  );
  const { id, firstName, lastName, roleId }: IUser = useSelector(
    sel_userData,
  );

  const handleSubmit = (values: any) => {
    if (id !== undefined && id !== null) {
      dispatch(
        editUser(id, values, () => {
          history.push('/users');
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(getUser(String(userId)));
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errorMessage !== '' && !success) {
      setMessage(errorMessage);
      setShowMessage(!success);
    }
  }, [errorMessage, success]);

  const components: KFieldGroup[] = [
    {
      name: 'User information',
      fields: [
        {
          fieldProps: { label: 'First Name', name: 'firstName' },
          initialValue: firstName,
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: { label: 'Last Name', name: 'lastName' },
          initialValue: lastName,
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: {
            label: 'Role',
            name: 'roleId',
            options: [
              { value: 1, label: 'Admin' },
              { value: 2, label: 'Recruiter' },
              { value: 3, label: 'Interviewer' },
              { value: 4, label: 'Manager' },
            ],
          },
          initialValue: roleId,
          type: 'select',
          layoutSize: 6,
        },
      ],
    },
  ];
  return (
    <KBaseContainer>
      <Snackbar
        autoHideDuration={3000}
        open={showMessage}
        onClose={() => setShowMessage(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <KAlert severity="error">{message}</KAlert>
      </Snackbar>
      {userId === id ? (
        <KForm
          name="Edit User"
          fieldsGroups={components}
          validationSchema={validationSchema}
          onSuccess={handleSubmit}
          buttonText="Update"
        />
      ) : (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingAnimation}>
            <KSpinner />
          </div>
          <div className={styles.loadingText}>
            <p>LOADING USERS...</p>
          </div>
        </div>
      )}
    </KBaseContainer>
  );
};

export default UserEdit;
