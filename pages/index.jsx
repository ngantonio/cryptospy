import { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import CoinList from '../components/Coin/CoinList'
import Layout from '../components/Layout';
import { SearchBar } from '../components/SearchBar/SearchBar'

export default function Home({ filteredCoins }) {

  const [search, setSearch] = useState("");
  const allCoins = filteredCoins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));
  
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value.toLowerCase());
  };
  
  
  return (
    <Layout>
      <div className='coin_app'>
        <SearchBar type="text" placeholder="Search Coin ..." onChange={ handleSearch }/>
        <CoinList filteredCoins={ allCoins }/>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`
  const result = await fetch(url);
  const filteredCoins = await result.json();
  // filteredCoins.splice(3, 1);
  return {
    props: {
      filteredCoins
    }
  }
};

