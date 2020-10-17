import React from 'react';
import { shallow } from 'enzyme';

import ExchangerBar from './ExchangerBar';

const render = (props) => shallow(<ExchangerBar {...props} />);

describe('ExchangerBar', () => {
  it('should contain a parent element with a class .exchanger-bar', () => {
    const element = render().find('.exchanger-bar');
    expect(element.exists()).toBeTruthy();
  });

  it('should contain a button element with a class .exchanger-bar__button--swap', () => {
    const element = render().find('.exchanger-bar__button--swap');
    expect(element.exists()).toBeTruthy();
    expect(element.name()).toEqual('button');
  });

  it('should contain a button element with a class .exchanger-bar__button--rates', () => {
    const element = render().find('.exchanger-bar__button--rates');
    expect(element.exists()).toBeTruthy();
    expect(element.name()).toEqual('button');
  });

  it('should render correctly', () => {
    expect(render().getElements()).toMatchSnapshot();
  });
});
