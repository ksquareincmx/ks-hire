import React from 'react';
import classNames from 'classnames';

const sizes = {
  baby: 'mdi-18px',
  small: 'mdi-24px',
  medium: 'mdi-36px',
  large: 'mdi-48px',
};

type Sizes = 'baby' | 'small' | 'medium' | 'large';

interface IIcon {
  icon: string;
  id?: string;
  spin?: boolean;
  size?: Sizes;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  customSize?: string;
}

const Icon: React.FC<IIcon> = ({
  icon,
  spin,
  size = 'small',
  className,
  onClick,
  customSize,
  id,
}) => (
  <i
    data-testid={id || `icon-${icon}`}
    className={classNames('mdi', `mdi-${icon}`, className, {
      'mdi-spin': spin,
      [sizes[size]]: !customSize,
    })}
    style={{ fontSize: customSize }}
    onClick={onClick}
  />
);

export { sizes };

export default Icon;
