// submit button functionality
// initializing empty global variables for submit
let lat, long;
let characterName;

const button = document.getElementById("submit");
button.addEventListener("click", async (event) => {
  const data = { lat, long, characterName };
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  // POST request using fetch "target", json object
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

    // set characterName to be passed in POST request
    console.log(document.getElementById("name").textContent);

    document.getElementById("latitude").textContent = lat;
    document.getElementById("longitude").textContent = long;
  });
} else {
  console.log("Geolocation not available");
}
