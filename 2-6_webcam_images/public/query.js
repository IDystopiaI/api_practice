async function getData() {
  // send a get request to the server
  // the api route is created in the server index.js file
  const response = await fetch("/api");

  // parse json response from the server
  const data = await response.json();
  console.log(data);

  for (item of data) {
    // creating a container, dom elements
    const root = document.createElement("p");
    const comment = document.createElement("div");
    const geo = document.createElement("div");
    const date = document.createElement("div");
    const image = document.createElement("img");

    // access properties of data and use to fill textContent of DOM elements
    comment.textContent = `Comment: ${item.usrInput}`;
    geo.textContent = `${item.lat}°${item.long}°`;
    // Convert ms since epoch to date
    const dateString = new Date(item.timestamp).toLocaleString();
    date.textContent = `${dateString}`;
    image.src = item.image64; // convert base64 string data into an image

    // append to root div
    root.append(comment, geo, date, image);
    // add root and child elements to DOM
    document.body.append(root);
  }
}

// don't forget to invoke the function
getData();
