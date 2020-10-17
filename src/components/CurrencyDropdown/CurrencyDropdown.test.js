import React from 'react';
import { shallow } from 'enzyme';

import CurrencyDropdown from './CurrencyDropdown';
// import useDebounce from '../../hooks/useDebounce';
import useFetchRates from '../../hooks/useFetchRates';

// jest.mock('../../hooks/useDebounce');
jest.mock('../../hooks/useFetchRates');

// useDebounce.mockReturnValue('');
useFetchRates.mockReturnValue([]);

const render = (props) => shallow(<CurrencyDropdown {...props} />);

afterEach(() => {
  jest.clearAllMocks();
});

describe('CurrencyDropdown', () => {
  it('should contain a parent element with a class .currency-dropdown', () => {
    const element = render().find('.currency-dropdown');
    expect(element.exists()).toBeTruthy();
  });

  it('should contain a span element with a class .currency-dropdown__button', () => {
    const element = render().find('.currency-dropdown__button');
    expect(element.exists()).toBeTruthy();
    expect(element.name()).toEqual('span');
  });

  it('should contain an ul element with a class .currency-dropdown__list', () => {
    const element = render().find('.currency-dropdown__list');
    expect(element.exists()).toBeTruthy();
    expect(element.name()).toEqual('ul');
  });

  it('should display list of items corresponding to the currencies passed', () => {
    const currencies = [
      { code: 'GBP', balance: '10', sign: '£' },
      { code: 'EUR', balance: '0', sign: '€' },
      { code: 'USD', balance: '0', sign: '$' },
    ];
    const currency = 'EUR';

    const wrapper = render({ currencies, currency });
    const button = wrapper.find('.currency-dropdown__button');

    button.simulate('click');

    const element = wrapper.find('.currency-dropdown__list');
    expect(element.find('.currency-dropdown__item').length).toEqual(3);
  });

  it('should display the label corresponding to the currency chosen', () => {
    const currencies = [
      { code: 'GBP', balance: '10', sign: '£' },
      { code: 'EUR', balance: '0', sign: '€' },
      { code: 'USD', balance: '0', sign: '$' },
    ];
    const currency = 'EUR';

    const wrapper = render({ currencies, currency });
    const button = wrapper.find('.currency-dropdown__button');

    button.simulate('click');

    const element = wrapper.find('.currency-dropdown__list');
    const secondItemElement = element.find('.currency-dropdown__item').at(1);
    secondItemElement.simulate('click');

    expect(button.text()).toEqual(currency);
  });

  it('should render correctly', () => {
    expect(render().getElements()).toMatchSnapshot();
  });
});
