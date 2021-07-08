/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link  from 'next/link'
import style from './coin.module.css'

export default function CoinComponent({ id, symbol, name, image, current_price, market_cap, market_cap_rank, volume, high_24h, low_24h, price_change_24h }) {
  return (
    <Link href="/coin/[id]" as={`/coin/${id}`}>
      <a>
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
      </a>
    </Link>
  )
}
