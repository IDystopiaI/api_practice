// initializing empty global variables for submit
let lat, long;
let usrInput;

// submit button functionality
const button = document.getElementById("submit");
button.addEventListener("click", async (event) => {

  const data = { lat, long };
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
    // POST request using fetch "target", json object
  };
  const response = await fetch("/api", options);
  // receive data from server and parse as json
  const json = await response.json();
  console.log(json);
});

if ("geolocation" in navigator) {
  console.log("Geolocation is available");

  navigator.geolocation.getCurrentPosition(async (position) => {
    // update global lat and long
    lat = position.coords.latitude;
    long = position.coords.longitude;

    document.getElementById("latitude").textContent = lat.toFixed(2);
    document.getElementById("longitude").textContent = long.toFixed(2);

    // server GETs weather and stores results locally
    // client requests this data from the server at the following URL
    const api_url = `/weather/${lat},${long}`;
    // verify url is constructed correctly
    // console.log(api_url);

    const response = await fetch(api_url);
    const json = await response.json();
    console.log(json);
  });
} else {
  console.log("Geolocation not available");
}
