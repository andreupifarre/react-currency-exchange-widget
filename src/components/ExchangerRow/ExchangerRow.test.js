import React from 'react';
import { shallow } from 'enzyme';

import ExchangerRow from './ExchangerRow';

const render = (props) => shallow(<ExchangerRow {...props} />);

describe('ExchangerRow', () => {
  it('should contain a parent element with a class .exchanger-row', () => {
    const element = render().find('.exchanger-row');
    expect(element.exists()).toBeTruthy();
  });

  it('should contain a CurrencyDropdown element', () => {
    const element = render().find('CurrencyDropdown');
    expect(element.exists()).toBeTruthy();
  });

  it('should contain an input field with a class .exchanger-row__amount', () => {
    const element = render().find('.exchanger-row__amount');
    expect(element.exists()).toBeTruthy();
    expect(element.name()).toEqual('input');
  });

  it('should render correctly', () => {
    expect(render().getElements()).toMatchSnapshot();
  });
});
