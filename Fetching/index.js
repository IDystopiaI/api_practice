console.log("Fetching a fractal from Fractals/");

// promises
fetch("../Fractals/blue star 116.png")
  .then((response) => {
    // check that fetch was able to retrieve data
    // 200 vs 404 status
    console.log(response);
    // convert response into an image blob
    // This triggers another promise
    return response.blob();
  })
  .then((blob) => {
    // view this response, referred to as blob for clarity
    console.log(blob);
    document.getElementById("fractal").src = URL.createObjectURL(blob);
  });
