// initializing empty global variables for submit

if ("geolocation" in navigator) {
  console.log("Geolocation is available");

  navigator.geolocation.getCurrentPosition(async (position) => {
    let lat, long, weather, air;
    try {
      // update global lat and long
      lat = position.coords.latitude;
      long = position.coords.longitude;

      document.getElementById("latitude").textContent = lat.toFixed(2);
      document.getElementById("longitude").textContent = long.toFixed(2);
      const api_url = `/weather/${lat},${long}`;

      const response = await fetch(api_url);
      const json = await response.json();

      weather = json.weather.currently;
      // get air quality where parameter == pm25
      // const air = json.air_quality.results[0].measurements[0];
      const air_raw = await json.air_quality.results[0].measurements;

      // await for of to iterate over data, select only pm25 data
      for await (i of air_raw) {
        // console.log(i.parameter);
        if (i.parameter === "pm25") {
          air = i;
          break;
        }
      }
      // double check air is the correct data
      // console.log(air);

      // console.log(air);

      // debug, view json structure
      // console.log(json);

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
    } catch (error) {
      air = { value: -1 };
    }

    // send data to server to be written to db
    // weather and air could be done server side, but this provides some
    // extra practice for POST requests
    const data = { lat, long, weather, air };
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
      // POST request using fetch "target", json object
    };
    const db_response = await fetch("/api", options);
    // receive data from server and parse as json
    const db_json = await db_response.json();
    // JSON containing lat, long, weather, air
    console.log(db_json);
  });
} else {
  console.log("Geolocation not available");
}
