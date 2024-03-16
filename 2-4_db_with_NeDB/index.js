const express = require("express");
const Datastore = require("nedb");

const app = express();
app.listen(3000, () => console.log("listening at port 3000"));
app.use(express.static("public"));
// parse incoming json data
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase(); // creates db if one does not exist under "database.db"

app.post("/api", (request, response) => {
  // console.log(request.body);
  const data = request.body;
  const timestamp = Date.now();
  // add timestamp to data before inserting into db
  data.timestamp = timestamp;
  database.insert(data);

  // send data back to client
  response.json(data);
});
