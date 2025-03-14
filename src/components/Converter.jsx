import { Orbit, ArrowLeftRight } from "lucide-react";
import React, { useEffect, useState, useCallback, useMemo } from "react";

const Converter = () => {
  const [amount, setAmount] = useState(100);
  const [currencies, setCurrencies] = useState({});
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [foreignCurrency, setForeignCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // environment variables more securely
  const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;
  const API_BASE_URL = "https://api.currencybeacon.com/v1";

  // Memoize currency array to prevent unnecessary recalculations
  const currencyArray = useMemo(() => {
    return currencies && typeof currencies === "object"
      ? Object.entries(currencies).map(([key, value]) => ({
          ...value,
          uniqueKey: key,
        }))
      : [];
  }, [currencies]);

  // useCallback for functions to prevent unnecessary re-renders
  const fetchCurrencies = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API_BASE_URL}/currencies?api_key=${API_KEY}&type=fiat`
      );

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      setCurrencies(data);
    } catch (error) {
      setError("Failed to load currencies");
      console.error("Error fetching currencies:", error);
    } finally {
      setLoading(false);
    }
  }, [API_KEY]);

  const handleSwap = useCallback(() => {
    setBaseCurrency(foreignCurrency);
    setForeignCurrency(baseCurrency);
  }, [baseCurrency, foreignCurrency]);

  const convertCurrency = useCallback(async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await fetch(
        `${API_BASE_URL}/convert?api_key=${API_KEY}&from=${baseCurrency}&to=${foreignCurrency}&amount=${amount}&type=fiat`
      );

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      setConvertedAmount(data.response.value);
    } catch (error) {
      setError("Conversion failed");
      console.error("Error converting:", error);
    } finally {
      setLoading(false);
    }
  }, [amount, baseCurrency, foreignCurrency, API_KEY]);

  // Effect hook with dependency array
  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

  // Format numbers with 2 decimal places
  const formatNumber = (num) => {
    return typeof num === "number"
      ? num.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "";
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-[#111010] rounded-3xl border border-gray-800 px-6 py-8 md:px-20 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="text-gray-500 text-sm font-semibold"
            >
              Amount
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              min="0"
              step="0.01"
              placeholder="0.00"
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full text-white bg-[#111010] rounded-lg border border-gray-800 p-3 focus:border-[#5B3CFA] focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="baseCurrency"
              className="text-gray-500 text-sm font-semibold"
            >
              From
            </label>
            <select
              id="baseCurrency"
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
              className="w-full rounded-lg border border-gray-800 text-white bg-[#111010] p-3 focus:border-[#5B3CFA] focus:outline-none"
            >
              {currencyArray.map((currency) => (
                <option
                  key={currency.uniqueKey || currency.short_code}
                  value={currency.short_code}
                >
                  {currency.symbol} {currency.short_code} - {currency.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-center my-4">
            <button
              onClick={handleSwap}
              className="flex items-center gap-2 p-2 px-4 text-gray-500 text-sm font-semibold rounded-full border border-gray-800 bg-[#111010] hover:text-white transition-colors"
              aria-label="Swap currencies"
            >
              <ArrowLeftRight size={15} />
              <span>Swap</span>
            </button>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="foreignCurrency"
              className="text-gray-500 text-sm font-semibold"
            >
              To
            </label>
            <select
              id="foreignCurrency"
              value={foreignCurrency}
              onChange={(e) => setForeignCurrency(e.target.value)}
              className="w-full rounded-lg border border-gray-800 text-white bg-[#111010] p-3 focus:border-[#5B3CFA] focus:outline-none"
            >
              {currencyArray.map((currency) => (
                <option
                  key={currency.uniqueKey || currency.short_code}
                  value={currency.short_code}
                >
                  {currency.symbol} {currency.short_code} - {currency.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={convertCurrency}
            disabled={loading}
            className={`flex items-center justify-center gap-2 p-2 w-full py-3 px-4 bg-[#5B3CFA] text-white font-medium rounded-md hover:bg-[#4930c9] transition-colors ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <Orbit size={18} className="animate-spin" />
            ) : (
              <>
                <span>Convert</span>
              </>
            )}
          </button>

          {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
        </div>

        <div className="flex flex-col justify-center">
          <div className="border border-gray-800 bg-[#151515] text-white rounded-xl ml-8 pl-10 -mt-72 h-auto py-6 flex flex-col justify-center">
            <div className="text-gray-400 mb-1">
              {amount > 0
                ? `${formatNumber(amount)} ${baseCurrency} =`
                : "Enter an amount to convert"}
            </div>
            <div className="text-2xl font-extrabold">
              {convertedAmount ? (
                <>
                  {formatNumber(convertedAmount)} {foreignCurrency}
                </>
              ) : (
                <span className="text-gray-500">—</span>
              )}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {convertedAmount &&
                `Last updated: ${new Date().toLocaleString()}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter;
