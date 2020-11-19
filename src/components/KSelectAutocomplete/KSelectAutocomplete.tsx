import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { textFieldTheme } from 'styles/theme';
import { useField } from 'formik';

export interface KPositionProps {
  options: [];
}

const KPosition: React.FC<any> = ({
  label,
  name,
  options = [],
  disabled = false,
  required = false,
  onChangeOpt,
  noOptionsText = 'No options',
  ...props
}) => {
  const [field, , helpers] = useField(name);
  return (
    <MuiThemeProvider theme={textFieldTheme}>
      <Autocomplete
        options={options}
        disabled={disabled}
        value={field.value}
        disableClearable
        noOptionsText={noOptionsText}
        onBlur={() => helpers.setTouched(true)}
        onChange={
          onChangeOpt
            ? onChangeOpt
            : (_: any, value: any) => {
                if (value) {
                  helpers.setValue(value);
                } else {
                  helpers.setValue('');
                }
              }
        }
        getOptionLabel={(option: any) => {
          if (option.name) {
            return option.name;
          } else {
            return '';
          }
        }}
        /* getOptionSelected={(option, value) => option.value === value} */
        renderInput={(params) => (
          <TextField
            {...params}
            {...props}
            required={required}
            label={label}
          />
        )}
      />
    </MuiThemeProvider>
  );
};

export default KPosition;
