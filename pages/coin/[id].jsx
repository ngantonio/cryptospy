import React, { useState, useEffect, useRef } from "react";
import Chart from "../../components/Chart/Chart";
import { formatData } from "../../utils";

function Coin(id) {
  const [currencies, setcurrencies] = useState([]);
  const [price, setprice] = useState("0.00");
  const [pastData, setpastData] = useState({});
  const ws = useRef(null);
  let priceCalc = useRef(price);
  const url = "https://api.pro.coinbase.com";

  useEffect(() => {
    const pair = "ETH-USD";
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


      let historicalDataURL = `https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1`;
        //let historicalDataURL = `${url}/products/${pair}/candles?granularity=900`;
        //60, 300, 900, 3600, 21600, 86400
      const fetchHistoricalData = async () => {
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
          if (parseFloat(data.price) > parseFloat(previousPrice)) {
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
    <div className="container">
      <Chart price={price} data={pastData} />
    </div>
  );
}

export default Coin;
