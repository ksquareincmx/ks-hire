import React, { FC } from 'react';
import { TextFieldProps, MenuItem } from '@material-ui/core';
import KInput from '../KInput';
import { useField } from 'formik';

export type KSelectProps = TextFieldProps & {
  options?: [];
};
const KLocation: FC<KSelectProps> = ({ options = [], ...props }) => {
  const { name } = props;
  const [, , helpers] = useField(name as string);
  const [, , helpersCurrency] = useField('salaryCurrency');
  const [, , helpersPeriod] = useField('salaryPeriod');

  const handleChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    const { value } = event.target;
    helpers.setValue(value);
    if (value === 'Mérida, Yucatán, MX' || 'Mexico City, MX') {
      helpersCurrency.setValue('MXN');
      helpersPeriod.setValue('month');
    }
    if (value === 'Dallas, Texas, US') {
      helpersCurrency.setValue('USD');
      helpersPeriod.setValue('year');
    }
    if (value === 'Santiago, DO') {
      helpersCurrency.setValue('DOP');
      helpersPeriod.setValue('year');
    }
    if (value === 'Hyderabad, Andhra Pradesh, IN') {
      helpersCurrency.setValue('INR');
      helpersPeriod.setValue('year');
    }
  };
  return (
    <KInput {...props} select onChange={handleChange}>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </KInput>
  );
};

export default KLocation;
