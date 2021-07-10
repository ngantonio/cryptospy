
import React, { useRef } from "react";
import { Line } from "react-chartjs-2";

function Chart({ price, data }) {
  const opts = {
    interaction: {
      intersect: false,
      mode: "x",
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    scales: {
      x: {
        grid: {
          color: "#333246"
        }
      },
      y: {
        grid: {
          color: "#333246"
        }
      }
    }
    
  };
  if (price === "0.00") {
    return <h2>please select a currency pair</h2>;
  }
  return (
    <div className="dashboard">
      <h2>{`$${price.toLocaleString()}`}</h2>

      <div className="chart-container">
        <Line data={data} options={opts} />
      </div>
    </div>
  );
}

export default Chart;