// p5 requires a function named setup() within global namespace
// equivalent of onload/ready that ensures DOM is loaded before executing JS
// can be used in a similar way to main()
function setup() {
  /* example placing a p5 canvas inside an element with an id of "sketch-holder"
    // p5 canvas instance
    let canvas = createCanvas();
    // place canvas inside an existing dom element
    canvas.parent("sketch-holder");
  */

  //  project does not use a canvas
  noCanvas();
  // Capture video from webcam and insert to web page
  const video = createCapture(VIDEO);
  // reduce window size, shrink base64 string
  video.size(160, 120);

  // submit button functionality
  // initializing empty global variables for submit
  let lat, long;
  let usrInput;

  const button = document.getElementById("submit");
  button.addEventListener("click", async (event) => {
    usrInput = document.getElementById("comment").value;
    console.log(usrInput);

    // load video pixels onto a canvas that can then use canvas.toDataURL
    video.loadPixels();
    // call the HTMLCanvasElement.toDataURL method to encode image in base64
    const image64 = video.canvas.toDataURL();

    const data = { lat, long, usrInput, image64 };
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
      // POST request using fetch "target", json object
    };
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

      document.getElementById("latitude").textContent = lat;
      document.getElementById("longitude").textContent = long;
    });
  } else {
    console.log("Geolocation not available");
  }
}
