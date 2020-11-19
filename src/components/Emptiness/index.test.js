import React from 'react';
import { shallow } from 'enzyme';

import Icon from '../Icon';

import Emptiness from '.';

describe('Emptiness', () => {
  test('Should render a <Emptiness /> component', () => {
    const message = 'message';
    const wrapper = shallow(<Emptiness message={message} />);
    expect(wrapper.find('.credijusto_emptiness').length).toEqual(1);
    expect(
      wrapper.find('.credijusto_emptiness--about').text(),
    ).toEqual(message);
    expect(wrapper.find(Icon).length).toEqual(1);
  });
});
