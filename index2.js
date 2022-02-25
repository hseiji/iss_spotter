const { nextISSTimesForMyLocation } = require("./iss_promised");

const printPasses = (passes) => {
  for (const pass of passes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPasses(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
