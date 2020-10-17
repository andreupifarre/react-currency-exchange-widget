const EXCHANGE_FEE = 0.005;
const MIMIMUM_AMOUNT = 0.1;
const ALLOWANCE_LIMIT = 1000;

const useBalances = () => {
  const get = () => [
    { code: 'GBP', balance: '10', sign: '£' },
    { code: 'EUR', balance: '0', sign: '€' },
    { code: 'USD', balance: '0', sign: '$' },
  ];

  const convertFromTo = (amount, rate) => {
    const conversion = ((amount || 0) * rate).toFixed(2);
    // eslint-disable-next-line
    return conversion == 0 ? '' : conversion;
  };

  const convertToFrom = (amount, rate) => {
    const conversion = ((amount || 0) / rate).toFixed(2);
    // eslint-disable-next-line
    return conversion == 0 ? '' : conversion;
  };

  const calculate = (amount, balance, sign) => {
    const floatAmount = parseFloat(amount);
    const fee = (floatAmount * EXCHANGE_FEE).toFixed(2);
    const isAmountExceeding = floatAmount > parseFloat(balance);
    const isMinAmountReached = !amount || floatAmount >= MIMIMUM_AMOUNT;
    const isFeeInvolved = floatAmount > ALLOWANCE_LIMIT;
    const isNotAllowedToExchange =
      isAmountExceeding || !isMinAmountReached || !amount;
    const feeInfo = `Fee: ${sign}${fee}`;
    const exceedInfo = 'exceeds balance';
    const minInfo = `minimum amount is ${sign}${MIMIMUM_AMOUNT.toFixed(2)}`;
    const toInfo = isFeeInvolved ? feeInfo : '';
    const fromInfo = !isMinAmountReached
      ? minInfo
      : isAmountExceeding
      ? exceedInfo
      : '';

    return { isNotAllowedToExchange, fromInfo, toInfo };
  };

  const exchange = (
    balances,
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
  ) => {
    const newBalances = balances.map((item) => {
      if (item.code === fromCurrency) {
        const newBalance = parseFloat(item.balance) - parseFloat(fromAmount);
        return { ...item, balance: newBalance.toFixed(2) };
      } else if (item.code === toCurrency) {
        const newBalance = parseFloat(item.balance) + parseFloat(toAmount);
        return { ...item, balance: newBalance.toFixed(2) };
      } else {
        return item;
      }
    });

    return newBalances;
  };

  return {
    convertFromTo,
    convertToFrom,
    calculate,
    exchange,
    get,
  };
};

export default useBalances;
