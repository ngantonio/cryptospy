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
  
  // green rgb(14, 203, 129) // red rgb(246, 70, 93)
  let dates = data.prices?.map((val) => {
      
    const formattedDate = new Date(val[0]);
    const hour = formattedDate.getHours() < 10 ? `0${formattedDate.getHours()}` : formattedDate.getHours();
    const minute = formattedDate.getMinutes() < 10 ? `0${formattedDate.getMinutes()}` : formattedDate.getMinutes();

    var hours = hour+ ':' + minute;

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