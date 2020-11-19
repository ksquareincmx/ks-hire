import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { textFieldTheme } from 'styles/theme';
import { useField } from 'formik';

export interface KAutocompleteProps {
  options: [];
}

const KAutocomplete: React.FC<any> = (props) => {
  const { name } = props;
  const [field, , helpers] = useField(name);
  return (
    <MuiThemeProvider theme={textFieldTheme}>
      <Autocomplete
        disableClearable
        freeSolo
        inputValue={field.value}
        onBlur={() => helpers.setTouched(true)}
        onChange={(_: any, value: any) => helpers.setValue(value)}
        options={props.options}
        renderInput={(params) => (
          <TextField {...params} {...props} value={field.value} />
        )}
      />
    </MuiThemeProvider>
  );
};

export default KAutocomplete;
