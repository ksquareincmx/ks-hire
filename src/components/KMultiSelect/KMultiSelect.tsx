import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { multiSelectorTheme } from 'styles/theme';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useField } from 'formik';
export interface IOption {
  id: string;
  label: string;
}
export type KMultiSelectProps = {
  label: string;
  name: string;
  options?: Array<IOption>;
  disabled?: boolean;
};

const KMultiSelect: React.FC<KMultiSelectProps> = ({
  label,
  name,
  options = [],
  disabled,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <MuiThemeProvider theme={multiSelectorTheme}>
      <Autocomplete
        multiple
        disabled={disabled}
        value={field.value}
        options={options}
        onBlur={() => helpers.setTouched(true)}
        onChange={(_: any, value: any) => helpers.setValue(value)}
        getOptionLabel={(option: IOption) => option.label}
        getOptionSelected={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label={label}
            error={meta.error ? true : false}
            helperText={meta.error}
          />
        )}
      />
    </MuiThemeProvider>
  );
};

export default KMultiSelect;
