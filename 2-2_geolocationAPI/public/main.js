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
  });
} else {
  console.log("Geolocation not available");
}
