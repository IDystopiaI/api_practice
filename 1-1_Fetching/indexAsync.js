// Rewriting using async/await instead of .then()
console.log("Fetching a fractal from Fractals/");

// Async function
async function fetchFractal() {
  // because fetch and blob are asynchronous funcs, we
  // need to add await; syntactic sugar

  const response = await fetch("../Fractals/blue star 116.png");

  // can probably handled more cleanly in try catch
  if (response.status === 200) {
    console.log(response);
    const blob = await response.blob();
    document.getElementById("fractal").src = URL.createObjectURL(blob);
  } else {
    // propagate error up
    throw new Error("Failed to resolve url")
  }
}

// call function, method chain catch
fetchFractal().catch((error) => {
  console.log("Error occurred");
  console.error(error);
});

/*

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
})
// error handling
.catch((error) => {
  console.error(error);
});

*/
