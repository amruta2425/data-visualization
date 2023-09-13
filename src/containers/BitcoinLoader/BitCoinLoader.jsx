import { useState, useEffect } from "react";
import style from "./BitcoinLoader.module.scss";
import currencies from "../../supportedCurrencies.json";
import Card from "../../components/Card/Card";
import { currentRateData, fetchData } from "../../services/bitcoin-service";

import LineChart, { BarChart } from "../../components/Chart/Chart";
import Toggle from "../../components/Toggle/Toggle";



const BitcoinLoader = () => {
  const [loading, setLoading] = useState(true);
  const [priceData, setPriceData] = useState(null);
  const [currency, setCurrency] = useState("AUD");
  const [currentPrice, setCurrentPrice] = useState(null);
  const [toggle, setToggle] = useState(true);
  useEffect(() => {
    fetchData()
      .then((priceData) => setPriceData(priceData))
      .finally(() => setLoading(false));

    currentRateData(currency).then((currentPrice) =>
      setCurrentPrice(currentPrice)
    );
  }, []);
  useEffect(() => {
    currentRateData(currency).then((currentPrice) =>
      setCurrentPrice(currentPrice)
    );
  }, [currency]);

  const handleSelect = (e, data) => {
    setCurrency(e.target.value);
  };
  const handleToggle = (e) => {
    setToggle(!toggle);
  };

  return (
    <>
      <div className={style.nav}>
      </div>
      {loading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className={style.priceContainer}>
            <div className={style.form}>
              <label htmlFor="selectCurrency">Select Currency</label>
              <select
                name="selectCurrency"
                placeholder="Select your currency"
                onChange={handleSelect}
                defaultValue={"AUD"}
              >
                {currencies.map((item, index) => (
                  <option key={index} value={item.currency}>
                    {item.currency}
                  </option>
                ))}
              </select>
            </div>
            <div className={style.price}>
              <Card selectedCurrency={currency} currentRate={currentPrice} />
            </div>
          </div>
          <div>
            <Toggle handleToggle={handleToggle} toggle={toggle} />

            {toggle ? (
              <LineChart currentData={priceData} />
            ) : (
              <BarChart currentData={priceData} />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default BitcoinLoader;
