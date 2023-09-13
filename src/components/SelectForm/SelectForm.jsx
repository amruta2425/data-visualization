import React from "react";

 const SelectForm = () => {
  return (
    <>
      <div className={style.priceContainer}>Price container</div>
      <div className={style.form}>
        <select placeholder="Select your currency">
          {supportedCurrencies.map((currency, index) => (
            <option key={index} value={index}>
              {currency.currency}
            </option>
          ))}

        </select>
      </div>
    </>
  );
};

 export default SelectForm;
