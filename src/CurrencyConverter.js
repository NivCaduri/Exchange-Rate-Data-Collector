import accesKey from './settings';
import React, { useEffect, useState } from 'react';

function CurrencyConverter() {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [fetchCount, setFetchCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchExchangeRate = () => {
      const api_url = `https://api.freecurrencyapi.com/v1/latest?apikey=${accesKey}`;
      const targetCurrency = 'ILS';

      fetch(api_url)
        .then((response) => response.json())
        .then((data) => {
          const rates = data.data;
          const rate = rates[targetCurrency];
          setExchangeRate(rate);
          setFetchCount(fetchCount + 1);
          setCurrentTime(new Date()); // Update current time

          if (fetchCount >= 24) {
            clearInterval(intervalId);
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

    fetchExchangeRate();

    // Set up interval to fetch data every hour (3600000 milliseconds)
    const intervalId = setInterval(fetchExchangeRate, 3600000);

    // Clean up interval after 24 times
    return () => clearInterval(intervalId);
  }, [fetchCount]);

  return (
    <div>
      <h1>Currency Exchange Rate Data For 1 USD</h1>
      {exchangeRate !== null ? (
        <div>
          <p>Time: {currentTime.toLocaleTimeString()}</p>
          <p>ILS Exchange Rate: {exchangeRate}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CurrencyConverter;
