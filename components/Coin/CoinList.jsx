import React from 'react'
import CoinComponent from './CoinComponent'

export default function CoinList({ filteredCoins }){
  return (
    <>
      {filteredCoins.map(coin => {
        return (
          <CoinComponent
            key={coin.id}
            id={coin.id}
            symbol = {coin.symbol}
            name = {coin.name}
            image = {coin.image}
            current_price = {coin.current_price}
            market_cap = {coin.market_cap}
            market_cap_rank = {coin.market_cap_rank}
            volume = {coin.total_volume}
            high_24h = {coin.high_24h}
            low_24h = {coin.low_24h}
            price_change_24h = {coin.price_change_percentage_24h}
          />
        )
      })}
    </>
  )
}
