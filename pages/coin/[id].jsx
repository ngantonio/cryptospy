/* eslint-disable react/jsx-no-comment-textnodes */
import Layout from '../../components/Layout';
import React, { useState, useEffect, useRef } from "react";
import Chart from "../../components/Chart/Chart";
import { formatData } from "../../utils";

const Coin = ({ coin }) => {
  const [currencies, setcurrencies] = useState([]);
  const [price, setprice] = useState("0.00");
  const [pastData, setpastData] = useState({});
  const ws = useRef(null);
  let priceCalc = useRef(price);
  const url = "https://api.coingecko.com/api/v3";
  const coin_id = "bitcoin";

  useEffect(() => {
    const pair = "BTC-USD";
    let dataArr = [];
  
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
    setTimeout(() => {
  
      let msg = {
        type: "subscribe",
        product_ids: [pair],
        channels: ["ticker"]
      };
      let jsonMsg = JSON.stringify(msg);
      ws.current.send(jsonMsg);
      let historicalDataURL = `${url}/coins/${coin_id}/market_chart?vs_currency=usd&days=1`;
      const fetchHistoricalData = async () => {
        console.log("se ejecuta");
        await fetch(historicalDataURL)
          .then((res) => res.json())
          .then((data) => {
            //console.log(data);
            (dataArr = data)
          });
         
        let formattedData = formatData(dataArr, "rgb(14, 203, 129)");
        setpastData(formattedData);
      };
      
      fetchHistoricalData(true);

      ws.current.onmessage = (e) => {
        const previousPrice = priceCalc.current;
        let formattedData = [];
 
        let data = JSON.parse(e.data);
        if (data.type !== "ticker") {
          return;
        }
        if (data.product_id === pair) {
          priceCalc.current = data.price;
          setprice(data.price);

          if (dataArr && parseFloat(data.price) > parseFloat(previousPrice)) {
            formattedData = formatData(dataArr, "rgb(14, 203, 129)");
          } else {
            formattedData = formatData(dataArr,"rgb(246, 70, 93)");
          }
          setpastData(formattedData);
        }
      };
      
    }, 2000);
  }, []);

  return (

    <Layout>
      <div className="papi">
      <div className="stats_row">
        <div className="price_col">
          <img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" alt="bitcoin" className="coin_logo"/>
           <h2>{`${parseFloat(price).toLocaleString()} USD`}</h2>
        </div>
          <div className="exchange_col">
            <label htmlFor="cars">BTC to </label>
            <select name="cars" id="cars" className="exchange-selector">
              <option value="volvo" selected>Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
            <button className="exchange-btn">Exchange now</button>
            <h3 className="exchange-price">Exchange Price: 33.812,63 USD</h3>
        </div>
      </div>
      </div>
     <div className="chart-container">
      <div className="chart">
        <Chart price={price} data={pastData} />
      </div>
       </div>
       
    </Layout>
  );
}

export default Coin;