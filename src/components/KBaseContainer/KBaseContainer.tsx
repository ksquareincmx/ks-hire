import React, { FC } from 'react';
import { SPACING_UNIT } from 'styles/theme';
import { GridSpacing } from '@material-ui/core';

interface IKBaseContainerProps {
  spacing?: GridSpacing;
  whole?: boolean;
}

const KBaseContainer: FC<IKBaseContainerProps> = (props) => {
  const { spacing, whole } = props;

  const containerSpacing = spacing
    ? SPACING_UNIT * spacing
    : SPACING_UNIT * 3;

  const containerStyle = {
    flex: 1,
    padding: whole
      ? `${containerSpacing}px`
      : ` 0 ${containerSpacing}px`,
  };

  return (
    <>
      <div style={containerStyle}>{props.children}</div>
    </>
  );
};

export default KBaseContainer;
