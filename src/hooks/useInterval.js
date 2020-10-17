import { useState, useEffect } from 'react';

const useInterval = (delay) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCount(count + 1), delay);
    return () => clearInterval(timer);
  }, [delay, count]);

  return count;
};

export default useInterval;
