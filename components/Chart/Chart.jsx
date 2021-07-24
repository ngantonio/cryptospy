
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
  /*if (price === "0.00") {
    return <h2>Please wait while we load the data . . .</h2>;
  }*/
  return (
    <Line data={data} options={opts} />
  );
}

export default Chart;