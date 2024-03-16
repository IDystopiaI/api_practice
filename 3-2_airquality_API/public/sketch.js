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
    try {
      // update global lat and long
      lat = position.coords.latitude;
      long = position.coords.longitude;

      document.getElementById("latitude").textContent = lat.toFixed(2);
      document.getElementById("longitude").textContent = long.toFixed(2);
      const api_url = `/weather/${lat},${long}`;

      const response = await fetch(api_url);
      const json = await response.json();

      const weather = json.weather.currently;
      const air = json.air_quality.results[0].measurements[0];

      // debug, view json structure
      console.log(json);

      // add current weather and current temp to span elements
      document.getElementById("summary").textContent = weather.summary;
      document.getElementById("temperature").textContent = (
        ((parseFloat(weather.temperature) - 32) / 9) *
        5
      ).toFixed(2);

      // air quality spans
      document.getElementById("aq_parameter").textContent = air.parameter;
      document.getElementById("aq_value").textContent = air.value.toFixed(2);
      document.getElementById("aq_units").textContent = air.unit;
      document.getElementById("aq_date").textContent = air.lastUpdated;

      console.log(json);

    } catch (error) {
      document.getElementById("aq_parameter").textContent = "No Data";
      document.getElementById("aq_value").textContent = "No Data";
      document.getElementById("aq_units").textContent = "No Data";
      document.getElementById("aq_date").textContent = "No Data";
      console.error("Something went wrong");
    }
  });
} else {
  console.log("Geolocation not available");
}
