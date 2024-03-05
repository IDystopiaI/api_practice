async function getData() {
  // this .csv has no mistakes, not always the case
  // other data sets may contain commas in the data
  // may have to use OCR to pull data from a scan
  // or manually transcribe data
  const response = await fetch("../Data/ZonAnn.Ts+dSST.csv");

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
