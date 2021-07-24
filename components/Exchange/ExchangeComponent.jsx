import { useState } from 'react';
import style from './exchange.module.css'
import { fiatCoins } from '../../utils'

const ExchangeComponent = ({ coin }) => {
  const [fiat, setFiat] = useState("");
  const [loadingExchange, setLoadingExchange] = useState(false)
  const [fiatPrice, setFiatPrice] = useState(0)

  const handleExchange = async () => {
    setLoadingExchange(true) 
    const URL = `https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=${fiat}`;
    const res = await fetch(URL);
    const data = await res.json();
    setFiatPrice(data[fiat])
    setLoadingExchange(false)
  };

  
  const handleSelect = (e) => {

    if (fiatPrice != 0) {
      setFiatPrice(0)
      setFiat("")
    }
    setFiat(e.target.value)
  };

  return (
    <>
      <label htmlFor="cars">{ `${coin} to`} </label>
      <select
        onChange={handleSelect}
        value={fiat}
        className={style.exchange_selector}
       
      >
        <option value="">- Select a fiat coin -</option>
        {fiatCoins.map(fiat => (
          <option key={fiat.key} value={fiat.key}> {fiat.name}</option>
        ))}
      </select>
      <button
        className={style.exchange_btn}
        onClick={handleExchange}
      >
        Exchange now</button>
      {loadingExchange ?
        <p>Please wait . . .</p>
        : fiatPrice === 0 ? null
        : <h3 className={style.exchange_price}>Exchange Price: {`${parseFloat(fiatPrice).toLocaleString()} ${fiat}`} </h3>}
      
    </>
  )
}

export default ExchangeComponent;
