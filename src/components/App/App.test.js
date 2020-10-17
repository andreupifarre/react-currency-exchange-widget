import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

const wrapper = shallow(<App />);

describe('App', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render correctly', () => {
    expect(wrapper.getElements()).toMatchSnapshot();
  });

  it('should contain an element with a class .app', () => {
    expect(wrapper.find('.app').exists()).toBeTruthy();
  });

  it('should contain a ExchangeWidget component', () => {
    expect(wrapper.find('ExchangeWidget').exists()).toBeTruthy();
  });
});
