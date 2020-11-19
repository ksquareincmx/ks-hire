import * as Yup from 'yup';
import React, { FC, useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill-mention';
import 'quill-mention/dist/quill.mention.css';
import {
  Card,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import KButton from 'components/KButton';
import styles from '../../views/AddNote/AddNote.module.scss';
import classnames from 'classnames';
import stylesRich from 'components/KRichText/KRichText.module.scss';
import userService from 'services/users.service';

const formStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      boxShadow: '0 5px 30px -12px rgba(0,0,0,0.3)',
      minWidth: '90%',
      padding: '50px',
      position: 'relative',
      margin: '10px',
    },
    paper: {
      color: theme.palette.text.secondary,
      minHeight: 110,
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    root: {
      flexGrow: 1,
    },
  }),
);

interface INoteFormValues {
  candidateId?: string;
  noteComment: string;
}

interface INoteFormProps {
  onSubmit: (values: INoteFormValues) => void;
  initialValues?: INoteFormValues;
  validationSchema: Yup.ObjectSchema;
}

interface IUser {
  id: string;
  value: string;
}

const NoteForm: FC<INoteFormProps> = ({
  initialValues,
  ...props
}) => {
  const classes = formStyles();
  const BackgroundClass = Quill.import(
    'attributors/class/background',
  );

  const SizeStyle = Quill.import('attributors/style/size');
  const Align = Quill.import('attributors/style/align');
  Quill.register(BackgroundClass, true);
  Quill.register(SizeStyle, true);
  Quill.register(Align, true);

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await userService.getAll();
      const users = res.map((user) => ({
        id: user.id,
        value: `${user.firstName} ${user.lastName}`,
      }));

      setUsers(users);
    };
    getUsers();
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ align: [] }],
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      [{ color: [] }], // dropdown with defaults from theme
      ['link'],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ direction: 'rtl' }], // text direction
      ['clean'], // remove formatting button
    ],
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ['@', '#'],
      source: function (
        searchTerm: string,
        renderItem: Function,
        mentionChar: string,
      ) {
        let values: any;
        if (mentionChar === '@' || mentionChar === '#') {
          values = users;
        }
        if (searchTerm.length === 0) {
          renderItem(values, searchTerm);
        } else {
          const matches = [];
          for (let i = 0; i < values.length; i++)
            if (
              ~values[i].value
                .toLowerCase()
                .indexOf(searchTerm.toLowerCase())
            )
              matches.push(values[i]);
          renderItem(matches, searchTerm);
        }
      },
      renderLoading: function loading() {
        return 'Loading...';
      },
    },
  };

  return (
    <Card className={classes.card} variant="outlined">
      <Formik
        initialValues={
          initialValues
            ? initialValues
            : ({ noteComment: '' } as INoteFormValues)
        }
        {...props}
      >
        {(_innerProps) => (
          <Form className={styles.AddNoteForm}>
            <div>
              <Grid container direction="column" spacing={1}>
                <Grid item sm={12}>
                  <ReactQuill
                    placeholder="Write your note for this candidate"
                    className={classnames(
                      stylesRich.tooltip,
                      stylesRich.editor,
                    )}
                    value={_innerProps.values.noteComment}
                    onChange={(e) =>
                      _innerProps.setFieldValue('noteComment', e)
                    }
                    modules={modules}
                  />
                </Grid>
              </Grid>

              <div className={styles.formButton}>
                <KButton
                  type="submit"
                  disabled={
                    _innerProps.isSubmitting ||
                    !_innerProps.dirty ||
                    !_innerProps.isValid
                  }
                >
                  SUBMIT
                </KButton>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default NoteForm;
