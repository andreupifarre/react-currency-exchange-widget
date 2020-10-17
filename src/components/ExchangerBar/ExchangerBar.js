import React from 'react';
import PropTypes from 'prop-types';

import './ExchangerBar.scss';

const ExchangerBar = ({ onSwap, fromSign, toSign, rate }) => {
  const formatRate = rate && rate.toFixed(4);

  return (
    <div className="exchanger-bar">
      <button
        className="exchanger-bar__button exchanger-bar__button--swap"
        onClick={onSwap}
      />
      <button className="exchanger-bar__button exchanger-bar__button--rates">
        {fromSign}1 = {toSign}
        {formatRate}
      </button>
      <div className="exchanger-bar__empty-action" />
    </div>
  );
};

export default ExchangerBar;

ExchangerBar.defaultProps = {
  fromSign: '',
  toSign: '',
  rate: null,
  onSwap: () => {},
};

ExchangerBar.propTypes = {
  fromSign: PropTypes.string.isRequired,
  toSign: PropTypes.string.isRequired,
  rate: PropTypes.number,
  onSwap: PropTypes.func.isRequired,
};
