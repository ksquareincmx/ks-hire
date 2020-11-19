import React, { FC } from 'react';
import { TextFieldProps, MenuItem } from '@material-ui/core';
import KInput from '../KInput';

export interface IOption {
  label: string;
  value: string | number;
}

export type KSelectProps = TextFieldProps & {
  options?: Array<IOption>;
};

const KSelect: FC<KSelectProps> = ({ options = [], ...props }) => {
  return (
    <KInput {...props} select>
      {options.map((option: IOption) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </KInput>
  );
};

export default KSelect;
