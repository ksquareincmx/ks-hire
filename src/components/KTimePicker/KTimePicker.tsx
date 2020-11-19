import 'date-fns';
import styles from './KTimePicker.module.scss';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardTimePickerProps,
} from '@material-ui/pickers';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { timePickerTheme } from 'styles/theme';

const KTimePicker: React.FC<KeyboardTimePickerProps> = (props) => {
  return (
    <MuiThemeProvider theme={timePickerTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardTimePicker
          {...props}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
          className={styles.MuiFormControl}
        />
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
};

export default KTimePicker;
