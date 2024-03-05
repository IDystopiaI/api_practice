const api_url = "https://api.wheretheiss.at/v1/satellites/25544";

const myMap = L.map("issMap").setView([0, 0], 1);

const issIcon = L.icon({
  iconUrl: "iss200.png",
  iconSize: [50, 32],
  // set anchor to center of image
  iconAnchor: [25, 16],
});

// const marker = L.marker([0, 0]).addTo(myMap);
const marker = L.marker([50.505, 30.57], { icon: issIcon }).addTo(myMap);

const attribution =
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
// second arg expects an obj, could have made attrib an obj instead
const tiles = L.tileLayer(tileUrl, { attribution });
// push tiles to map
tiles.addTo(myMap);

async function getISS() {
  const response = await fetch(api_url);
  const data = await response.json();

  // destructuring data for latitude and longitude keys
  const { latitude, longitude } = data;
  console.log(`Latitude ${latitude}`);
  console.log(`Longitude ${longitude}`);

  // create a marker and add it to map // refactor it
  // L.marker([latitude, longitude]).addTo(myMap);
  // call the setLatLng method every time we update the lat+lng
  marker.setLatLng([latitude, longitude]);

  document.getElementById("lat").textContent = latitude;
  document.getElementById("long").textContent = longitude;
}
getISS();
