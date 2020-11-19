import React from 'react';
import Switch, { SwitchProps } from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';

const PurpleSwitch = withStyles({
  switchBase: {
    color: '#e53935',
    '&$checked': {
      color: '#43a047',
    },
    '&$checked + $track': {
      backgroundColor: '#43a047',
    },
  },
  checked: {},
  track: {},
})(Switch);

/*
 * Old KSwitch Styles
 */
// const theme = createMuiTheme({
//   overrides: {
//     MuiSwitch: createStyles({
//       root: {},
//       colorSecondary: {
//         // THUMB
//         // On + Off
//         '&.MuiButtonBase-root .MuiIconButton-label': {
//           color: '#F74E4F',
//         },
//         // Disabled
//         '&.Mui-disabled.MuiButtonBase-root .MuiIconButton-label': {
//           color: '#FFF',
//         },

//         // TRACK
//         // Off
//         '& + .MuiSwitch-track': {
//           backgroundColor: '#FFF',
//           border: '1px solid #F74E4F',
//           opacity: 1,
//         },
//         // On
//         '&.Mui-checked + .MuiSwitch-track': {
//           backgroundColor: '#F76868',
//           border: '1px solid #F76868',
//           opacity: 1,
//         },
//         // Focus
//         '&.Mui-checked + .MuiSwitch-track:active': {
//           backgroundColor: '#DE4747',
//           border: '1px solid #DE4747',
//           opacity: 1,
//         },
//         // Disabled On
//         '&.Mui-checked.Mui-disabled + .MuiSwitch-track': {
//           backgroundColor: '#E2E2E2',
//           border: '1px solid #E2E2E2',
//           opacity: 1,
//         },
//         // Disabled Off
//         '&.Mui-disabled + .MuiSwitch-track': {
//           backgroundColor: '#FFF',
//           border: '1px solid #E2E2E2',
//           opacity: 1,
//         },
//       },
//     }),
//   },
// });

interface IKSwitchProps extends SwitchProps {
  label?: string;
}

const KSwitch: React.FC<IKSwitchProps> = (props) => (
  <FormControlLabel
    control={<PurpleSwitch {...props} />}
    label={props.label}
  />
);
export default KSwitch;
