// index.js
const { nextISSTimesForMyLocation } = require('./iss');

const printPasses = (passes) => {
  for (const pass of passes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  // If error
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPasses(passTimes);
});

