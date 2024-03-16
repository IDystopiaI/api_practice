async function getData() {
  // send a get request to the server
  // the api route is created in the server index.js file
  const response = await fetch("/api");

  // parse json response from the server
  const data = await response.json();
  console.log(data);

  for (item of data) {
    // creating a container, dom elements
    const root = document.createElement("div");
    const mood = document.createElement("div");
    const geo = document.createElement("div");
    const date = document.createElement("div");

    // access properties of data and use to fill textContent of DOM elements
    mood.textContent = `Comment: ${item.text}`;
    geo.textContent = `${item.lat}°${item.long}°`;
    // Convert ms since epoch to date
    const dateString = new Date(item.timestamp).toLocaleString();
    date.textContent = `${dateString}`;

    // append to root div
    root.append(mood, geo, date);
    // add root and child elements to DOM
    document.body.append(root);
  }
}

// don't forget to invoke the function
getData();
