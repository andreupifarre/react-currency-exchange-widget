import React from 'react';
import Exchanger from '../Exchanger/Exchanger';
import './ExchangeWidget.scss';

const ExchangeWidget = () => (
  <div className="exchange-widget">
    <h2 className="exchange-widget__title">Exchange</h2>
    <Exchanger />
  </div>
);

export default ExchangeWidget;
