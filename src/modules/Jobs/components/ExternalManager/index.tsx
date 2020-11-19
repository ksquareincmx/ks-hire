import React, { useEffect, useState } from 'react';
import KCheckbox from 'components/KCheckbox';
import { CheckboxProps } from '@material-ui/core/Checkbox';
import KMultiSelect from 'components/KMultiSelect';
import { useField } from 'formik';
import Grid from '@material-ui/core/Grid';

export interface ExternalManagerProps extends CheckboxProps {
  option?: string;
  options: [];
  tab: boolean;
}

const ExternalManager: React.FC<ExternalManagerProps> = (props) => {
  const [field] = useField(props.name as string);
  const [fieldManagers] = useField('hiringManagers');
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    setDisabled(field.value);
  }, [field]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={9}>
          <KMultiSelect
            {...fieldManagers}
            label="Hiring Managers"
            name="hiringManagers"
            disabled={disabled}
            options={props.options}
          />
        </Grid>
        <Grid item xs={3}>
          <KCheckbox {...props} />
        </Grid>
      </Grid>
    </>
  );
};

export default ExternalManager;
