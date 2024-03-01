async function getData() {
  const response = await fetch("ZonAnn.Ts+dSST.csv");

  const data = await response.text();
  // remove header and trailing eof, splice(1,-1) would also work instead of trim() but could accidentally remove last line of data
  const table = data.trim().split(/\n/).slice(1);

  table.forEach((row) => {
    const columns = row.split(",");
    const year = columns[0];
    const temp = columns[1];
    console.log(year, temp);
  });
}

getData();
