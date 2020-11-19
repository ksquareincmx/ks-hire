import React from 'react';
import { render } from '@testing-library/react';

import Icon, { sizes } from '.';

const icon = {
  icon: 'crop-free',
  spin: false,
  size: 'small',
  className: 'testClass',
};

describe('Icon', () => {
  test('Should render an <Icon /> logo with default sizing', () => {
    const { getByTestId } = render(<Icon {...icon} />);
    const testIcon = getByTestId(`icon-${icon.icon}`);
    expect(testIcon).toBeTruthy();
    expect(testIcon).toHaveClass(
      `mdi mdi-${icon.icon} ${icon.className} ${sizes[icon.size]}`,
    );
  });

  test('Should render an <Icon /> logo with customSize', () => {
    const { getByTestId } = render(
      <Icon {...icon} customSize="24px" />,
    );
    const testIcon = getByTestId(`icon-${icon.icon}`);
    expect(testIcon).toBeTruthy();
    expect(testIcon).toHaveClass(
      `mdi mdi-${icon.icon} ${icon.className}`,
    );
  });

  test('Should render an <Icon /> logo with custom test id', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Icon {...icon} id={testId} />);
    expect(getByTestId(testId)).toBeTruthy();
  });
});
