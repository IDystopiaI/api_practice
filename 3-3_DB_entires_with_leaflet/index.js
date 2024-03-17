const express = require("express");
const Datastore = require("nedb");
require("dotenv").config();

// require("dotenv").config(); adds the KEY="value" string to the list of environment variables
// All environment variables can be accessed through process.env.<VARIABLENAME>
// console.log(process.env);
const apikey = process.env.API_KEY;

const app = express();
app.listen(3000, () => console.log("listening at port 3000"));
app.use(express.static("public"));
// parse incoming json data
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase(); // creates db if one does not exist under "database.db"

// set up route for GET response
app.get("/api", (request, response) => {
  // check that a response is sent to client
  // response.json({ hello: "world" });

  // query the db and send that information back to the client
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post("/api", (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  console.log(data);

  // add timestamp to data before inserting into db
  data.timestamp = timestamp;
  database.insert(data);

  // send data back to client
  response.json(data);
});

// This is known as a proxy server, the server is a proxy for pirateweather.net
// new get endpoint to fetch weather data, create weather route
app.get("/weather/:latlong", async (request, response) => {
  //params.latlong is derived from route parameter :latlong
  // can be accessed as params.latlong or params['latlong']
  const latlong = request.params.latlong.split(",");
  const lat = latlong[0];
  const long = latlong[1];

  // create API URL using a formatted string
  const weather_url = `https://api.pirateweather.net/forecast/${apikey}/${lat},${long}`;

  // could use promise.all() to fetch in parallel
  const weather_response = await fetch(weather_url);
  const weather_data = await weather_response.json();
  // open air quality
  const airQual_url = `https://api.openaq.org/v2/latest?limit=1&page=1&offset=0&sort=desc&coordinates=${lat},${long}&radius=20000`;

  const airQual_response = await fetch(airQual_url);
  const airQual_data = await airQual_response.json();

  /* check formatted strings in console
  // verify urls are constructed correctly
  console.log(weather_url);
  console.log(airQual_url);
  */

  // create a json object with weather and air quality
  const data = {
    weather: weather_data,
    air_quality: airQual_data,
  };
  // send data object back to client
  response.json(data);
});
