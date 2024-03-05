async function getData() {
  // fetch data and store it in a response
  const response = await fetch("test.csv");
  // convert data stream into text with the .text() method
  // even though this is tabular data, we want it parsed as text
  const data = await response.text();
  // console.log(data); // one monolithic string

  // break up data into rows and columns, just an example using regex but can be "/n"
  // const rows = data.split(/\n/);
  // four arrays: header, 1880 data, 1881 data, "" -empty string end of file

  // slice to strip out header and empty string
  const rows = data.split(/\n/).slice(1, -1);
  // console.log(rows);

  // split array and extract year and global mean difference (indexes 0 and 1)
  rows.forEach((elements) => {
    // split the one array of two comma separated strings into
    // two arrays of multiple elements ['1880', '-.15', '-.27', ...]
    const row = elements.split(",");
    const year = row[0]; // parse year
    const temp = row[1]; // parse temperature from dataset
    console.log(year, temp);
  });
}

getData();
