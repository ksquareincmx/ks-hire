import { createMuiTheme } from '@material-ui/core';
export const SPACING_UNIT = 8;

export default createMuiTheme({
  typography: {
    fontFamily: '"Nunito", Arial, sans-serif',
  },
  palette: {
    primary: {
      light: '#5daab8',
      main: '#49a7b7',
      dark: '#41909e',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#5daab8',
    },
    background: {
      default: '#F0F4F7',
    },
  },
  spacing: SPACING_UNIT,
  overrides: {
    MuiButton: {
      root: {
        padding: '11px 26px',
        textTransform: 'capitalize',
        fontWeight: 700,
      },
    },
    MuiTypography: {
      body2: {
        color: '#707070',
        fontWeight: 'bold',
      },
      h1: {
        fontSize: '2em',
        fontWeight: 700,
      },
      h5: {
        color: '#707070',
        fontWeight: 'bold',
      },
      subtitle2: {
        color: '#ababab',
        fontWeight: 'bold',
        marginBottom: '0.125rem',
      },
    },
    MuiTablePagination: {
      toolbar: {
        '& .MuiTypography-body2': {
          color: '#242528',
          fontWeight: '400',
        },
        '& .MuiSelect-select.MuiSelect-select': {
          color: '#242528',
          fontWeight: '400',
        },
        '& .MuiSvgIcon-root': {
          color: '#242528',
          fontWeight: '400',
        },
      },
    },
  },
});

export const textFieldTheme = createMuiTheme({
  overrides: {
    MuiInput: {
      input: {
        color: '#707070',
      },
      underline: {
        '&:before': {
          borderBottom: '1px solid #707070',
        },
        '&:after': {
          borderBottom: '1px solid #49a7b7',
        },
        '&:hover:not(.Mui-disabled):before': {
          borderBottom: '1px solid #49a7b7',
        },
        '&$disabled:before': {
          borderBottom: '1px solid #E0D7D7',
        },
      },
    },
    MuiFormLabel: {
      root: {
        color: '#707070',
        fontSize: '12px/16px',
        // increase the specificity for the pseudo class
        '&$focused': {
          color: '#707070',
        },
        '&$disabled': {
          color: '#E0D7D7',
        },
        '&$error': {
          color: '#707070',
        },
      },
      asterisk: {
        color: '#707070',
      },
    },
    MuiInputBase: {
      input: {
        '&$disabled': {
          color: '#E0D7D7',
        },
      },
    },
    MuiFormHelperText: {
      root: {
        '&$error': {
          color: '#f44336',
          textAlign: 'left',
        },
      },
    },
    MuiInputAdornment: {
      root: {
        alignItems: 'center',
      },
      positionEnd: {
        marginLeft: '130px',
      },
    },
    MuiFilledInput: {
      input: {
        borderBottom: '1px solid #707070',
        color: '#707070',
        font: '16px/22px Nunito Sans',
        maxWidth: '223px',
      },
      underline: {
        '&:before': {
          borderBottom: '1px solid #707070',
          maxWidth: '247px',
        },
        '&:after': {
          borderBottom: '1px solid #49a7b7',
          maxWidth: '247px',
        },
        '&:hover:before': {
          borderBottom: '1px solid #49a7b7',
          maxWidth: '247px',
        },
      },
    },
  },
});

export const timePickerTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#41909e',
    },
  },
  overrides: {
    MuiInput: {
      input: {
        color: '#707070',
      },
      underline: {
        '&:before': {
          borderBottom: '1px solid #707070',
        },
        '&:after': {
          borderBottom: '1px solid #49a7b7',
        },
        '&:hover:not(.Mui-disabled):before': {
          borderBottom: '1px solid #49a7b7',
        },
        '&$disabled:before': {
          borderBottom: '1px solid #E0D7D7',
        },
      },
    },
    MuiFormLabel: {
      root: {
        color: '#707070',
        fontSize: '12px/16px',
        // increase the specificity for the pseudo class
        '&$focused': {
          color: '#707070',
        },
        '&$disabled': {
          color: '#E0D7D7',
        },
        '&$error': {
          color: '#707070',
        },
      },
      asterisk: {
        color: '#707070',
      },
    },
    MuiInputBase: {
      input: {
        '&$disabled': {
          color: '#E0D7D7',
        },
      },
    },
    MuiFormHelperText: {
      root: {
        '&$error': {
          color: '#49a7b7',
          textAlign: 'left',
        },
      },
    },

    MuiFilledInput: {
      input: {
        borderBottom: '1px solid #707070',
        color: '#707070',
        font: '16px/22px Nunito Sans',
        maxWidth: '223px',
      },
      underline: {
        '&:before': {
          borderBottom: '1px solid #707070',
          maxWidth: '247px',
        },
        '&:after': {
          borderBottom: '1px solid #49a7b7',
          maxWidth: '247px',
        },
        '&:hover:before': {
          borderBottom: '1px solid #49a7b7',
          maxWidth: '247px',
        },
      },
    },
  },
});

export const multiSelectorTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#41909e',
    },
  },
  overrides: {
    MuiInput: {
      input: {
        color: '#707070',
      },
      underline: {
        '&:before': {
          borderBottom: '1px solid #707070',
        },
        '&:after': {
          borderBottom: '1px solid #49a7b7',
        },
        '&:hover:not(.Mui-disabled):before': {
          borderBottom: '1px solid #49a7b7',
        },
        '&$disabled:before': {
          borderBottom: '1px solid #E0D7D7',
        },
      },
    },
    MuiFormLabel: {
      root: {
        color: '#707070',
        fontSize: '12px/16px',
        // increase the specificity for the pseudo class
        '&$focused': {
          color: '#707070',
        },
        '&$disabled': {
          color: '#E0D7D7',
        },
        '&$error': {
          color: '#707070',
        },
      },
      asterisk: {
        color: '#707070',
      },
    },
    MuiInputBase: {
      input: {
        '&$disabled': {
          color: '#E0D7D7',
        },
      },
    },
    MuiFormHelperText: {
      root: {
        '&$error': {
          color: '#49a7b7',
          textAlign: 'left',
        },
      },
    },

    MuiFilledInput: {
      input: {
        borderBottom: '1px solid #707070',
        color: '#707070',
        font: '16px/22px Nunito Sans',
        maxWidth: '223px',
      },
      underline: {
        '&:before': {
          borderBottom: '1px solid #707070',
          maxWidth: '247px',
        },
        '&:after': {
          borderBottom: '1px solid #49a7b7',
          maxWidth: '247px',
        },
        '&:hover:before': {
          borderBottom: '1px solid #49a7b7',
          maxWidth: '247px',
        },
      },
    },
  },
});
