import React from 'react';
import { shallow } from 'enzyme';
import ExchangeWidget from './ExchangeWidget';

const wrapper = shallow(<ExchangeWidget />);

describe('ExchangeWidget', () => {
  it('should contain an element with a class .exchange-widget', () => {
    expect(wrapper.find('.exchange-widget').exists()).toBeTruthy();
  });

  it('should contain an H2 element with a class .exchange-widget__title', () => {
    const element = wrapper.find('.exchange-widget__title');
    expect(element.exists()).toBeTruthy();
    expect(element.name()).toEqual('h2');
  });

  it('should contain a Exchanger component', () => {
    expect(wrapper.find('Exchanger').exists()).toBeTruthy();
  });

  it('should render correctly', () => {
    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
