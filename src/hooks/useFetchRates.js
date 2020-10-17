import { useState, useEffect } from 'react';

const useFetchRates = (fromCurrency, interval) => {
  const [rates, setRates] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://openexchangerates.org/api/latest.json?app_id=81fa12e332b74f45a1de4a276db7c0d1&base=${fromCurrency}`;
      const response = await fetch(url);
      const data = await response.json();
      setRates(data.rates);
    };

    fetchData();
  }, [fromCurrency, interval]);

  return rates;
};

export default useFetchRates;
