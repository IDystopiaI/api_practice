const api_url = "https://api.wheretheiss.at/v1/satellites/25544";

async function getISS() {
  const response = await fetch(api_url);
  // need to call .json to resolve promise
  const data = await response.json();

  // console.log(data);
  /*
  the data comes in as a javascript object
  access your desired properties directly with

  dot notation:
  console.log(`Latitude: ${data.latitude}`);
  console.log(`Longitude: ${data.longitude}`);
  */

  // Destructuring, place keys inside {} = {json}
  const { latitude, longitude } = data;
  console.log(`Latitude ${latitude}`);
  console.log(`Longitude ${longitude}`);

  // set lat and long span's text content
  document.getElementById("lat").textContent = latitude;
  document.getElementById("long").textContent = longitude;
}

// remember to invoke getISS
getISS();
