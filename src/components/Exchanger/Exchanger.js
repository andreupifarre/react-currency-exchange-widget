import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import useInterval from '../../hooks/useInterval';
import useBalances from '../../hooks/useBalances';
import useFetchRates from '../../hooks/useFetchRates';
import ExchangerRow from '../ExchangerRow/ExchangerRow';
import ExchangerBar from '../ExchangerBar/ExchangerBar';

import './Exchanger.scss';

export const DEFAULT_FROM_CURRENCY = 'GBP';
export const DEFAULT_TO_CURRENCY = 'EUR';
export const FETCH_INTERVAL = 10000;

const Exchanger = () => {
  const balances = useBalances();
  const [fromCurrency, setFromCurrency] = useState(DEFAULT_FROM_CURRENCY);
  const [toCurrency, setToCurrency] = useState(DEFAULT_TO_CURRENCY);
  const rates = useFetchRates(fromCurrency, useInterval(FETCH_INTERVAL));
  const [fromAmount, setFromAmount] = useState();
  const [toAmount, setToAmount] = useState();
  const [isExceeding, setIsExceeding] = useState(true);
  const [fromInfo, setFromInfo] = useState('');
  const [toInfo, setToInfo] = useState('');
  const [currencies, setCurrencies] = useState(balances.get());

  const selectedFromCurrency = currencies.find((c) => c.code === fromCurrency);
  const selectedToCurrency = currencies.find((c) => c.code === toCurrency);

  const convertFromTo = (currency, amount) =>
    rates ? balances.convertFromTo(amount, rates[currency]) : '';

  const convertToFrom = (currency, amount) =>
    rates ? balances.convertToFrom(amount, rates[currency]) : '';

  const calculate = (amount, currency) => {
    const { isNotAllowedToExchange, fromInfo, toInfo } = balances.calculate(
      amount,
      currency.balance,
      currency.sign,
    );

    setIsExceeding(isNotAllowedToExchange);
    setFromInfo(fromInfo);
    setToInfo(toInfo);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
    calculate(toAmount, selectedToCurrency);
  };

  const handleFromCurrencyChange = (currency) => {
    if (currency === toCurrency) {
      setToCurrency(fromCurrency);
      calculate(toAmount, selectedToCurrency);
    }

    setFromCurrency(currency);
  };

  const handleToCurrencyChange = (currency) => {
    if (currency === fromCurrency) {
      setFromCurrency(toCurrency);
      calculate(toAmount, selectedToCurrency);
    }

    setToCurrency(currency);
    setToAmount(convertFromTo(currency, fromAmount));
  };

  const handleFromAmountChange = (amount) => {
    setFromAmount(amount);
    setToAmount(convertFromTo(toCurrency, amount));
    calculate(amount, selectedFromCurrency);
  };

  const handleToAmountChange = (amount) => {
    setToAmount(amount);
    setFromAmount(convertToFrom(toCurrency, amount));
    calculate(amount, selectedFromCurrency);
  };

  const handleExchange = () => {
    const newCurrencies = balances.exchange(
      currencies,
      fromCurrency,
      toCurrency,
      fromAmount,
      toAmount,
    );

    setCurrencies(newCurrencies);
    setFromAmount();
    setToAmount();
    setIsExceeding(true);
  };

  useEffect(() => {
    setToAmount(convertFromTo(toCurrency, fromAmount));
    // eslint-disable-next-line
  }, [rates]);

  return (
    <div className="exchanger">
      <div className="exchanger__row">
        <ExchangerRow
          balance={selectedFromCurrency.balance}
          currency={selectedFromCurrency.code}
          sign={selectedFromCurrency.sign}
          amount={fromAmount}
          info={fromInfo}
          currencies={currencies}
          onAmountChange={handleFromAmountChange}
          onCurrencyChange={handleFromCurrencyChange}
          autoFocus
          alt
        />
      </div>
      <div className="exchanger__bar">
        <ExchangerBar
          onSwap={handleSwap}
          fromSign={selectedFromCurrency.sign}
          toSign={selectedToCurrency.sign}
          rate={rates && rates[toCurrency]}
        />
      </div>
      <div className="exchanger__row">
        <ExchangerRow
          balance={selectedToCurrency.balance}
          currency={selectedToCurrency.code}
          sign={selectedToCurrency.sign}
          amount={toAmount}
          info={toInfo}
          currencies={currencies}
          onAmountChange={handleToAmountChange}
          onCurrencyChange={handleToCurrencyChange}
        />
      </div>
      <button
        className={classNames('exchanger__submit-button', {
          'exchanger__submit-button--enabled': !isExceeding,
        })}
        disabled={isExceeding}
        type="button"
        onClick={handleExchange}
      >
        Exchange
      </button>
    </div>
  );
};

export default Exchanger;
