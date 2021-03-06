/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react'
import Router from 'next/router'
import style from './coin.module.css'

export default function CoinComponent({ id, symbol, name, image, current_price, market_cap, market_cap_rank, volume, high_24h, low_24h, price_change_24h }) {

  useEffect(() => {
    if (sessionStorage.getItem('coinObject')) {
      sessionStorage.removeItem('coinObject')
    }
  }, [])
  
  
  const toCoinPage = (id, symbol, image) => {
    const coinObject = {
      id,
      symbol: symbol.toUpperCase(),
      image
    }
    sessionStorage.setItem("coinObject", JSON.stringify(coinObject))
    Router.push(`coin/${id}`)
  };
  
  return (

      <div onClick={() => toCoinPage(id, symbol, image)}>
        <div className={style.coin_container}>
          <div className={style.coin_row}>
            <div className={style.coin}>
              <img src={image} alt={id} className={style.coin_img} />
              <h1 className={style.coin_h1}>{name}</h1>
              <p className={style.coin_symbol}>{ symbol }</p>
            </div>
            <div className={style.coin_data}>
              <p className={style.coin_price}>$ {current_price.toLocaleString()}</p>
              <p className={style.coin_volume}>{volume.toLocaleString()}</p>
              
              {price_change_24h < 0 ? (
                <p className={style.coin_percent_red}> { price_change_24h.toFixed(2) }%</p>
              ) : (
                <p className={style.coin_percent_green}>{ price_change_24h.toFixed(2) }%</p>
              )}
              <p className={style.coin_marketcap}>Mkt Cap:  $ {market_cap.toLocaleString() }</p>
            </div>
          </div>
        </div>
      </div>
  )
}
