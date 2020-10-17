import React from 'react';
import { shallow, render as renderE } from 'enzyme';

import Exchanger from './Exchanger';
import useInterval from '../../hooks/useInterval';
import useFetchRates from '../../hooks/useFetchRates';

jest.mock('../../hooks/useInterval');
jest.mock('../../hooks/useFetchRates');

useInterval.mockReturnValue(0);
useFetchRates.mockReturnValue({});

const render = () => shallow(<Exchanger />);

afterEach(() => {
  jest.clearAllMocks();
});

describe('Exchanger', () => {
  it('should contain a parent element with a class .exchanger', () => {
    const element = render().find('.exchanger');
    expect(element.exists()).toBeTruthy();
  });

  it('should contain a button element with a class .exchanger__submit-button', () => {
    const element = render().find('.exchanger__submit-button');
    expect(element.exists()).toBeTruthy();
    expect(element.name()).toEqual('button');
  });

  it('should contain two ExchangerRow components', () => {
    const wrapper = render();

    const element = wrapper.find('ExchangerRow');
    expect(element.length).toEqual(2);
  });

  it('should not allow to exchange and show excess info when trying to exchange amount higher than balance', () => {
    const rates = {
      GBP: 1,
      EUR: 1.102125,
      USD: 1.293682,
    };
    useFetchRates.mockReturnValue(rates);

    const wrapper = render();

    let row1 = wrapper.find('ExchangerRow').at(0).dive();
    const amount1 = row1.find('.exchanger-row__amount');
    amount1.simulate('change', { target: { value: '12' } });

    row1 = wrapper.find('ExchangerRow').at(0).dive();
    expect(row1.find('.exchanger-row__fee').text()).toEqual('exceeds balance');

    let row2 = wrapper.find('ExchangerRow').at(1).dive();
    expect(row2.find('.exchanger-row__amount').prop('value')).toEqual('13.23');

    expect(wrapper.find('.exchanger__submit-button').prop('disabled'))
      .toBeTruthy;
  });

  it('should correctly exchange currencies when amount is lower than balance', () => {
    const rates = {
      GBP: 1,
      EUR: 1.102125,
      USD: 1.293682,
    };
    useFetchRates.mockReturnValue(rates);

    const wrapper = render();

    let row1 = wrapper.find('ExchangerRow').at(0).dive();
    const amount1 = row1.find('.exchanger-row__amount');
    amount1.simulate('change', { target: { value: '9' } });

    row1 = wrapper.find('ExchangerRow').at(0).dive();
    expect(row1.find('.exchanger-row__fee').text()).toEqual('');

    let row2 = wrapper.find('ExchangerRow').at(1).dive();
    expect(row2.find('.exchanger-row__amount').prop('value')).toEqual('9.92');

    expect(wrapper.find('.exchanger__submit-button').prop('disabled'))
      .toBeFalsy;

    wrapper.find('.exchanger__submit-button').simulate('click');

    expect(
      wrapper
        .find('ExchangerRow')
        .at(0)
        .dive()
        .find('.exchanger-row__balance')
        .text(),
    ).toEqual('Balance: £1.00');

    expect(
      wrapper
        .find('ExchangerRow')
        .at(1)
        .dive()
        .find('.exchanger-row__balance')
        .text(),
    ).toEqual('Balance: €9.92');
  });

  it('should render correctly', () => {
    expect(render().getElements()).toMatchSnapshot();
  });
});
