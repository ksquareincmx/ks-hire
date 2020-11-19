import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  Grid,
} from '@material-ui/core';

import { RangeIcon } from './styled';
import { textFieldTheme } from 'styles/theme';
import { useField } from 'formik';

interface ITextFieldProps {
  lowername: string;
  uppername: string;
  lowervalue: number;
  uppervalue: number;
}

type MyProps = ITextFieldProps & TextFieldProps;

const Range: React.FC<MyProps> = (props) => {
  const {
    variant,
    lowername,
    uppername,
    lowervalue,
    uppervalue,
  } = props;

  const myVariant = variant ?? 'standard';

  const [, metaLower] = useField(lowername);
  const [, metaUpper] = useField(uppername);
  const errorLower = Boolean(metaLower.error) && metaLower.touched;
  const errorUpper = Boolean(metaUpper.error) && metaUpper.touched;

  return (
    <MuiThemeProvider theme={textFieldTheme}>
      <Grid container spacing={1}>
        <Grid item xs={5}>
          <TextField
            {...props}
            name={lowername}
            value={lowervalue}
            helperText={metaLower.touched && metaLower.error}
            error={errorLower}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            variant={myVariant as any}
          />
        </Grid>
        <Grid item xs={2}>
          <RangeIcon>remove</RangeIcon>
        </Grid>
        <Grid item xs={5}>
          <TextField
            {...props}
            label={' '}
            required={false}
            name={uppername}
            value={uppervalue}
            error={errorUpper}
            helperText={metaUpper.touched && metaUpper.error}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            variant={myVariant as any}
          />
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
};

export default Range;
