export const formatData = (data, color) => {

    let finalData = {
      labels: [],
      datasets: [
        {
          label: "Price",
          data: [],
          backgroundColor: color,
          borderColor: color,
          borderWidth: "1",
          fill: false
        }
      ]
    };
  
  // green rgb(14, 203, 129) // red rgb(246, 70, 93)
  let dates = data.prices?.map((val) => {
      
    const formattedDate = new Date(val[0]);
    var hour = formattedDate.getHours() + ':' + formattedDate.getMinutes();

      /*let day = formattedDate.getDate();
      let month = formattedDate.getMonth() + 1;
      let year = formattedDate.getFullYear();
  
      let final = `${month}/${day}/${year}`;*/
      //return final;
    return hour;
    });
  
    let priceArr = data.prices.map((val) => {
      return val[1];
    });
  
    priceArr.reverse();
    finalData.labels = dates;
    finalData.datasets[0].data = priceArr;

    return finalData;
  };