// Making a map object and tiles
const myMap = L.map("issMap").setView([0, 0], 1);
const attribution =
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(myMap);

// Making a marker with a custom icon
const issIcon = L.icon({
  iconUrl: "../Assets/iss200.png",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});
const marker = L.marker([0, 0], { icon: issIcon }).addTo(myMap);

const api_url = "https://api.wheretheiss.at/v1/satellites/25544";

// set zoom once on initial load
let firstTime = true;

async function getISS() {
  const response = await fetch(api_url);
  const data = await response.json();
  const { latitude, longitude } = data;

  // Update marker location
  marker.setLatLng([latitude, longitude]);
  if (firstTime) {
    myMap.setView([latitude, longitude], 3);
    firstTime = false;
  } else {
    myMap.setView([latitude, longitude]);
  }
  document.getElementById("lat").textContent = latitude.toFixed(2) + "°";
  document.getElementById("long").textContent = longitude.toFixed(2) + "°";
}
// slightly redundant, used to set satellite location on page load
getISS();

// could create a button element with stopInterval and pass it
// the value of updateId
const updateId = setInterval(() => {
  getISS();
}, 3000);
