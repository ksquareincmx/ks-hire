import React from 'react';
import classnames from 'classnames';

import Icon from 'components/Icon';

import './style.scss';

interface IEmptiness {
  message?: string;
  borderless?: boolean;
}

const Emptiness: React.FC<IEmptiness> = ({ message, borderless }) => (
  <div
    className={classnames('emptiness', {
      'emptiness-borderless': borderless,
    })}
  >
    <div className="emptiness--icon">
      <Icon icon="crop-free" size="small" />
    </div>
    <p className="emptiness--about">{message}</p>
  </div>
);

export default Emptiness;
