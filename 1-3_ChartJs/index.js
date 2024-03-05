// sample chart from chart.js

// x-axis labels must be global for now
const xlabels = [];
const yTemps = [];

// make chartIt() an async function
async function chartIt() {
  /* call getData() with await
  chartIt() will wait for getData() to finish before moving on to create the chart
*/
  await getData();

  const ctx = document.getElementById("chart");

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: xlabels,
      datasets: [
        {
          label: "Combined Land-Surface Air and Sea-Surface Water Temperature in °C",
          data: yTemps,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
  });
}

async function getData() {
  const response = await fetch("../1-2_FetchCSV/ZonAnn.Ts+dSST.csv");

  const data = await response.text();

  const table = data.trim().split(/\n/).slice(1);

  table.forEach((row) => {
    const columns = row.split(",");
    const year = columns[0];
    xlabels.push(year);
    const temp = columns[1];
    yTemps.push(parseFloat(temp) + 14);
    console.log(year, temp);
  });
}

chartIt();
