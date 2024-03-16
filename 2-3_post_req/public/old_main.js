// before refactoring to make async
if ("geolocation" in navigator) {
  console.log("Geolocation is available");

  // sample code from: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
  navigator.geolocation.getCurrentPosition((position) => {
    // console.log(position.coords.latitude, position.coords.longitude);
    // console.log(position);

    // const lat = position.coords.latitude;
    // const long = position.coords.longitude;
    // console.log(lat, long);

    // destructure nested object position.coords.latitude/longitude
    // aliasing property
    const {
      coords: { latitude: lat, longitude: long },
    } = position;
    console.log(lat, long);

    document.getElementById("latitude").textContent = lat;
    document.getElementById("longitude").textContent = long;

    // package lat and long
    const data = { lat, long };
    // second arg passed to fetch to make a POST request
    const options = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      // convert data to string
      body: JSON.stringify(data),
    };
    // to POST, we need a second javascript arg in the form of a
    // javascript object.
    // fetch returns a promise, use .then() to resolve the promise
    fetch("/api", options)
      .then((response) => {
        console.log(response);
      });
  });
} else {
  console.log("Geolocation not available");
}
