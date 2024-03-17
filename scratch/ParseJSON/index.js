const data = require('./sample.json');
// console.log(data);
// console.log(data['air'][0]);

let entry;

for (let i = 0; i < data['air'].length; i++) {
  // console.log(data['air'][i]);
  if (data.air[i].parameter === "pm25") {
    // console.log(data.air[i]);
    entry = data.air[i]
  }
}

console.log(entry);
