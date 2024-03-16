const express = require("express");

// create an express instance
const app = express();

// start listening for clients
app.listen(3000, () => console.log("listening at port 3000"));

// point to a folder containing html, css and js
app.use(express.static("public"));

// call this function so that the server is able to parse JSON
// see express for arguments passed to json, limit limits received file sizes
app.use(express.json({ limit: "1mb" }));

/* setting up POST request route
  args are a path to receive data and a callback function
  The request variable holds everything contained within
  the request (all the data sent, all information from the client)
*/
app.post("/api", (request, response) => {
  // res.send("POST request to the homepage");
  console.log(request.body);
  // send data back to client
  response.json({
    status: "Success",
    // request.body.____ not request.____, walk the tree
    latitude: request.body.lat,
    longitude: request.body.long,
  });
});
