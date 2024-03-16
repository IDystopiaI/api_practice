const express = require("express");
const Datastore = require("nedb");

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

// get an api key from pirate weather, do not hardcode it
const apikey = "*pirateweatherAPIKey*";

// This is known as a proxy server, the server is a proxy for pirateweather.net
// new get endpoint to fetch weather data, create weather route
app.get("/weather/:latlong", async (request, response) => {
  //params.latlong is derived from route parameter :latlong
  // can be accessed as params.latlong or params['latlong']
  const latlong = request.params.latlong.split(",");
  const lat = latlong[0];
  const long = latlong[1];

  // create API URL using a formatted string
  const api_url = `https://api.pirateweather.net/forecast/${apikey}/${lat},${long}`;

  // verify url is constructed correctly
  console.log(api_url);

  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  response.json(json);
});
