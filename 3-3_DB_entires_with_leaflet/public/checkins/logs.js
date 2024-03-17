async function getData() {
  // send get request to the server and get all entries from the database
  const response = await fetch("/api");
  // parse json response from the server
  const data = await response.json();
  console.log(data);

  for (item of data) {
    // put a marker on the map for every db entry
    const marker = L.marker([item.lat, item.long]).addTo(myMap);

    let txt = `The weather here at ${item.lat.toFixed(3)}° ${item.long.toFixed(
      3
    )}° is ${item.weather.summary} with a temperature of ${
      item.weather.temperature
    }°C.`;

    // no air quality data
    if (item.air.value < 0) {
      txt += ` No air quality reading.`;
    } else {
      txt += `The concentration of particulate matter (${
        item.air.parameter
      }) is ${item.air.value.toFixed(2)}${item.air.unit}, last read
      on ${item.air.lastUpdated}.`;
    }
    console.log(txt);
    // add text bubble when marker is clicked - leaflet.js
    marker.bindPopup(txt);
  }
}
// don't forget to invoke the function
getData();

// ISS related javascript
// Making a map object and tiles
const myMap = L.map("checkinMap").setView([0, 0], 1);
const attribution =
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
// get tiles based on lat long and zoom
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(myMap);
