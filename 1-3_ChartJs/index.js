// sample chart from chart.js

// make chartIt() an async function
async function chartIt() {
  // store arrays xs and ys, access as data.xs/data.ys
  const data = await getData();
  // can see an object with console.log, {xs: Array(n), ys:(n)}
  // data.xs and data.ys is used to access the arrays stored within
  console.log(data);

  /* call getData() with await
  chartIt() will wait for getData() to finish before moving on to create the chart
*/

  const ctx = document.getElementById("chart");

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.xs,
      datasets: [
        {
          label:
            "Combined Land-Surface Air and Sea-Surface Water Temperature in °C",
          data: data.ys,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    // we can add degrees to the y-axis by modifying the ticks option
    options: {
      scales: {
        y: {
          ticks: {
            // Include a degrees sign in the ticks
            callback: function (value, index, ticks) {
              return value + "°C";
            },
          },
        },
      },
    },
  });
}

async function getData() {
  const xs = [];
  const ys = [];
  const response = await fetch("../1-2_FetchCSV/ZonAnn.Ts+dSST.csv");

  const data = await response.text();

  const table = data.trim().split(/\n/).slice(1);

  table.forEach((row) => {
    const columns = row.split(",");
    const year = columns[0];
    xs.push(year);
    const temp = columns[1];
    ys.push(parseFloat(temp) + 14);
    // console.log(year, temp);
  });

  /* refactor
      getData now returns an object containing these two
      arrays instead of having a global variable
      return xs and ys arrays
  */
  return { xs, ys };
}

chartIt();
