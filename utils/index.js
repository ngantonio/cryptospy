export const formatData = (data, color) => {

    let finalData = {
      labels: [],
      datasets: [
        {
          label: "Price (24h)",
          data: [],
          backgroundColor: color,
          borderColor: color,
          borderWidth: "1",
          fill: false
        }
      ]
    };
  
  if (!data.prices) {
    finalData.labels = [];
    finalData.datasets[0].data = [];
    return finalData;
  }
  
  // green rgb(14, 203, 129) // red rgb(246, 70, 93)
  let dates = data.prices?.map((val) => {
    const formattedDate = new Date(val[0]);
    const hour = formattedDate.getHours() < 10 ? `0${formattedDate.getHours()}` : formattedDate.getHours();
    const minute = formattedDate.getMinutes() < 10 ? `0${formattedDate.getMinutes()}` : formattedDate.getMinutes();

    var hours = hour+ ':' + minute + ' h';

      /*let day = formattedDate.getDate();
      let month = formattedDate.getMonth() + 1;
      let year = formattedDate.getFullYear();
  
      let final = `${month}/${day}/${year}`;*/
      //return final;
    return hours;
    });
  
    let priceArr = data.prices.map((val) => {
      return val[1];
    });
  
    priceArr.reverse();
    finalData.labels = dates;
    finalData.datasets[0].data = priceArr;

    return finalData;
};
  
export const fiatCoins = [
  { key: "AUD", name: "Australian Dollar"},
  { key: "BRL", name: "Brazilian Real"},
  { key: "CAD", name: "Canadian Dollar"},
  { key: "CLP", name: "Chilean Peso"},
  { key: "CNY", name: "Chinese Yuan"},
  { key: "COP", name: "Colombian Peso"},
  { key: "CRC", name: "Costa Rican Colón"},
  { key: "DOP", name: "Dominican Peso"},
  { key: "EUR", name: "Euro"},
  { key: "JPY", name: "Japanese Yen"},
  { key: "KPW", name: "North Korean Won"},
  { key: "KRW", name: "South Korean Won"},
  { key: "MXN", name: "Mexican Peso"},
  { key: "NIO", name: "Nicaraguan Córdoba"},
  { key: "PEN", name: "Peruvian Nuevo Sol"},
  { key: "PYG", name: "Paraguayan Guarani"},
  { key: "SGD", name: "Singapore Dollar"},
  { key: "SVC", name: "Salvadoran Colón"},
  { key: "UYU", name: "Uruguayan Peso" },
  { key: "VES", name: "Venezuelan Bolívar Soberano"}
]

