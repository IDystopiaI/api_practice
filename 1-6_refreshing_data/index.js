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

async function getISS() {
  const response = await fetch(api_url);
  const data = await response.json();
  const { latitude, longitude } = data;
  // Update marker location
  marker.setLatLng([latitude, longitude]);

  document.getElementById("lat").textContent = latitude;
  document.getElementById("long").textContent = longitude;
}
// getISS reaches out to the whereis... API and then updates the map
getISS();
