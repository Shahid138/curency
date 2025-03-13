import React, { useEffect, useState } from "react";

const Converter = () => {
  const [amount, setAmount] = useState(100);
  const [currencies, setCurrencies] = useState({});
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [foreignCurrency, setForeignCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);

  const fetchCurrencies = async () => {
    try {
        const apiKey = import.meta.env.VITE_CURRENCY_API_KEY;
      const res = await fetch(
        `https://api.currencybeacon.com/v1/currencies?api_key=${apiKey}&type=fiat`
      );
      const data = await res.json();
      setCurrencies(data);
    } catch (error) {
      console.log("Error Fetching:", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const handleSwap = () => {
    setBaseCurrency(foreignCurrency);
    setForeignCurrency(baseCurrency);
  };

  const convertCurrency = async () => {
    if (!amount) return;
    setConverting(true);
    try {
        const apiKey = import.meta.env.VITE_CURRENCY_API_KEY;
      const res = await fetch(
        `https://api.currencybeacon.com/v1/convert?api_key=${apiKey}&from=${baseCurrency}&to=${foreignCurrency}&amount=${amount}&type=fiat`
      );
      const data = await res.json();
      setConvertedAmount(data.response.value);
    } catch (error) {
      console.log("Error Fetching:", error);
    }
  };

  
  const currencyArray =
    currencies && typeof currencies === "object"
      ? Object.entries(currencies).map(([key, value]) => ({
          ...value,
          uniqueKey: key,
        }))
      : [];


  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="amount" className="flex text-sm font-semibold">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-md bg-slate-300 p-2"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="baseCurrency" className="flex text-sm font-semibold">
            Base Currency
          </label>
          <select
            id="baseCurrency"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
            className="w-full rounded-md bg-slate-300 p-2"
          >
            {currencyArray.map((currency) => (
              <option
                key={currency.uniqueKey || currency.short_code}
                value={currency.short_code}
              >
                {currency.short_code} - {currency.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center my-4">
          <button
            onClick={handleSwap}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            Swap
          </button>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="foreignCurrency"
            className="flex text-sm font-semibold"
          >
            Foreign Currency
          </label>
          <select
            id="foreignCurrency"
            value={foreignCurrency}
            onChange={(e) => setForeignCurrency(e.target.value)}
            className="w-full rounded-md bg-slate-300 p-2"
          >
            {currencyArray.map((currency) => (
              <option
                key={currency.uniqueKey || currency.short_code}
                value={currency.short_code}
              >
                {currency.short_code} - {currency.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          <button
            onClick={convertCurrency}
            className={`w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md
                ${converting ? "animate-pulse" : ""}
                `}
          >
            Convert
          </button>
        </div>
        <div className="text-green-400 font-bold bg-slate-400 rounded-md p-2">{amount} {baseCurrency} To {foreignCurrency} =
            <div>{convertedAmount}</div>
        </div>
      </div>
    </div>
  );
};

export default Converter;
