import React from 'react';
import Chip, { ChipProps } from '@material-ui/core/Chip';

interface IKChipProps extends ChipProps {}

const KChip: React.FC<IKChipProps> = (props) => {
  return <Chip {...props} />;
};

export default KChip;
