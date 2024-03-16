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
  // console.log(request.body);
  const data = request.body;
  const timestamp = Date.now();
  // view data in CLI
  // console.log(data);

  // Change name of key before inserting data into db
  delete Object.assign(data, { ["text"]: data["usrInput"] })["usrInput"];
  // See that old key has been replaced
  // console.log(data);

  // add timestamp to data before inserting into db
  data.timestamp = timestamp;

  database.insert(data);

  // send data back to client
  response.json(data);
});
