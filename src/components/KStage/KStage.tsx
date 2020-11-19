import React, { FC, useEffect, useState } from 'react';
import {
  TextFieldProps,
  MenuItem,
  Grid,
  InputAdornment,
} from '@material-ui/core';
import KInput from '../KInput';
import { useField } from 'formik';

export interface IOption {
  label: string;
  value: string | number;
}

export type KSelectProps = TextFieldProps & {
  options?: Array<IOption>;
};

const KStage: FC<KSelectProps> = ({ options = [] }) => {
  const [disabled, setDisabled] = useState(true);
  const [stageId, stageIdMeta] = useField('stageId');
  const [salaryOffer, salaryOfferMeta, salaryOfferHelper] = useField(
    'salaryOffer',
  );

  const errorStageId =
    Boolean(stageIdMeta.error) && stageIdMeta.touched;

  const errorsalaryOffer =
    Boolean(salaryOfferMeta.error) && salaryOfferMeta.touched;

  useEffect(() => {
    if (stageId.value === 3) {
      setDisabled(false);
    } else {
      setDisabled(true);
      salaryOfferHelper.setValue('');
    }
    // eslint-disable-next-line
  }, [stageId.value]);
  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <KInput
          {...stageId}
          label="Stage"
          required={true}
          name="stageId"
          select
          error={errorStageId}
          helperText={stageIdMeta.touched && stageIdMeta.error}
        >
          {options.map((option: IOption) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </KInput>
      </Grid>
      <Grid item xs={6}>
        <KInput
          {...salaryOffer}
          value={salaryOffer.value ? salaryOffer.value : ''}
          label="Salary Offer"
          name="salaryOffer"
          disabled={disabled}
          error={errorsalaryOffer}
          helperText={
            salaryOfferMeta.touched && salaryOfferMeta.error
          }
          InputProps={
            !disabled
              ? {
                  startAdornment: (
                    <InputAdornment position="start">
                      $
                    </InputAdornment>
                  ),
                }
              : {}
          }
        />
      </Grid>
    </Grid>
  );
};

export default KStage;
