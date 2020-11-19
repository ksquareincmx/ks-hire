import * as React from 'react';
import CheckboxComponent, {
  CheckboxProps,
} from '@material-ui/core/Checkbox';
import {
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import clsx from 'clsx';
import styles from './KCheckbox.module.scss';

export interface ICheckboxProps extends CheckboxProps {
  option?: string;
  tab: boolean;
}

const theme = createMuiTheme({
  overrides: {
    MuiCheckbox: {
      root: {
        color: 'rgba(0, 0, 0, 0)',
        outline: '1px solid #49a7b7',
        '&$disabled': {
          outline: '1px solid #41909e',
        },
        '&$checked': {
          outline: '1px solid #41909e',
        },
      },
      colorSecondary: {
        '&$checked': {
          color: '#5daab8',
        },
        '&:hover': {
          background: 'rgba(93, 170, 184, 0.1)',
        },
      },
    },
  },
});

const KCheckbox: React.FC<ICheckboxProps> = (
  props: ICheckboxProps,
) => {
  const { tab, option, value, ...otherProps } = props;
  const containerStyles = clsx(styles.container, {
    [styles.tab]: tab,
  });
  const innerProps: any = Object.assign({}, otherProps);
  delete innerProps.fullWidth;
  delete innerProps.helperText;

  return (
    <MuiThemeProvider theme={theme}>
      <div className={containerStyles}>
        <CheckboxComponent
          {...innerProps}
          checked={value ? true : false}
          className={styles.root}
        />
        {option && <span className={styles.option}>{option}</span>}
      </div>
    </MuiThemeProvider>
  );
};

export default KCheckbox;
