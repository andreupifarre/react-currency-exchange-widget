import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './CurrencyDropdown.scss';

const CurrencyDropdown = ({ currency, currencies, onCurrencyChange }) => {
  const [shown, setShown] = useState(false);

  const handleClick = (item) => {
    setShown(false);
    onCurrencyChange(item);
  };

  return (
    <div className="currency-dropdown">
      <span
        className="currency-dropdown__button"
        onClick={() => setShown(!shown)}
      >
        {currency}
      </span>
      <ul
        className={classNames('currency-dropdown__list', {
          'currency-dropdown__list--shown': shown,
        })}
      >
        {currencies.map((c, i) => (
          <li
            key={c.code}
            className={classNames('currency-dropdown__item', {
              'currency-dropdown__item--active': currency === c.code,
            })}
            onClick={() => handleClick(c.code)}
          >
            {c.code} • {c.sign}
            {c.balance}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrencyDropdown;

CurrencyDropdown.defaultProps = {
  currencies: [],
  currency: '',
  onCurrencyChange: () => {},
};

CurrencyDropdown.propTypes = {
  currencies: PropTypes.array.isRequired,
  currency: PropTypes.string.isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
};
