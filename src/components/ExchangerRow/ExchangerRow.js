import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CurrencyDropdown from '../CurrencyDropdown/CurrencyDropdown';
import './ExchangerRow.scss';

const ExchangerRow = ({
  alt,
  balance,
  currency,
  sign,
  amount,
  info,
  currencies,
  onCurrencyChange,
  onAmountChange,
  autoFocus,
}) => {
  const handleChange = (e) => {
    onAmountChange(e.target.value);
  };

  return (
    <div className={classNames('exchanger-row', { 'exchanger-row--alt': alt })}>
      <div className="exchanger-row__line">
        <CurrencyDropdown
          currency={currency}
          currencies={currencies}
          onCurrencyChange={onCurrencyChange}
        />
        <input
          type="number"
          className="exchanger-row__amount"
          autoComplete="off"
          placeholder="0"
          onChange={handleChange}
          value={amount}
          autoFocus={autoFocus}
        />
      </div>
      <div className="exchanger-row__line">
        <span className="exchanger-row__balance">
          Balance: {sign}
          {balance}
        </span>
        <span className="exchanger-row__fee">{info}</span>
      </div>
    </div>
  );
};

export default ExchangerRow;

ExchangerRow.defaultProps = {
  alt: false,
  balance: '',
  currency: '',
  sign: '',
  amount: '',
  info: '',
  currencies: [],
  onCurrencyChange: () => {},
  onAmountChange: () => {},
  autoFocus: false,
};

ExchangerRow.propTypes = {
  alt: PropTypes.bool.isRequired,
  balance: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  sign: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  currencies: PropTypes.array.isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
  onAmountChange: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
};
