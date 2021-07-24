/* eslint-disable react/jsx-no-comment-textnodes */
import Layout from '../../components/Layout';
import React, { useState, useEffect, useRef, useCallback } from "react";
import Chart from "../../components/Chart/Chart";
import ExchangeComponent from '../../components/Exchange/ExchangeComponent'
import { formatData } from "../../utils";

const Coin = ({ coin }) => {
  const [coinObject, setCoinObject] = useState({})
  const [pair, setPair] = useState("");
  const [price, setprice] = useState("0.00");
  const [pastData, setpastData] = useState({});
  const ws = useRef(null);
  const url = "https://api.coingecko.com/api/v3";
  let previous_price = useRef(price);



  const fetchHistoricalData = useCallback(
    async (param) => {
    let dataArr = []
    let historicalDataURL = `${url}/coins/${param}/market_chart?vs_currency=usd&days=1`;
    await fetch(historicalDataURL)
      .then((res) => res.json())
      .then((data) => {
        (dataArr = data)
      });
    return dataArr;
  },
  [],
)

  useEffect(() => {
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
    const coinObject = JSON.parse(sessionStorage.getItem('coinObject'))
    setCoinObject(coinObject)
    setPair(`${coinObject.symbol}-USD`)
    //console.log(pair);
    let dataArr = [];
    
    setTimeout(async () => {
     dataArr = await fetchHistoricalData(coinObject.id);
           
      let msg = {
        type: "subscribe",
        product_ids: [pair],
        channels: ["ticker"]
      };
      let jsonMsg = JSON.stringify(msg);
      ws.current.send(jsonMsg);
      
      dataArr = await fetchHistoricalData(coinObject.id);
      setpastData(formatData(dataArr, "rgb(14, 203, 129)"));

      // connect to the socket for get realtime coin proce
      ws.current.onmessage = (e) => {
        const previousPrice = previous_price.current;
        let formattedData = [];

        let data = JSON.parse(e.data);
        if (data.type !== "ticker") {
          return;
        }

        if (data.product_id === pair) {
          previous_price.current = data.price;
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
  }, [fetchHistoricalData, pair]);



  return (
    <Layout>
      <div className="papi">
        <div className="stats_row">
          <div className="price_col">
            <img src={ coinObject.image } alt={coinObject.id} className="coin_logo"/>
            <h2>{`${parseFloat(price).toLocaleString()} USD`}</h2>
          </div>
          <div className="exchange_col">
            <ExchangeComponent coin={ coinObject.symbol } />
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