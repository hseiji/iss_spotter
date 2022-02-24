// APIs request
const request = require("request");

// Helper functions
const urlPathIP = () => {
  return "https://api.ipify.org/?format=json";
};

const urlPathCoord = (ip) => {
  return `https://freegeoip.app/json/${ip}`;
};

const urlPathPass = (coord) => {
  return `https://iss-pass.herokuapp.com/json/?lat=${coord.latitude}&lon=${coord.longitude}`;
};

// Fetch IP function
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request(urlPathIP(), (error, response, body) => {
    // sends back the error for invalid domain, user is offline, etc.
    if (error) {
      return callback(error, null);
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // parsing the data from json to object
    const data = JSON.parse(body);
    return callback(null, data.ip);
  });
};

// Fetch Coordinates function
const fetchCoordsByIP = (ip , callback) => {
  request(urlPathCoord(ip), (error, response, body) => {
    // sends back the error for invalid domain, user is offline, etc.
    if (error) {
      return callback(error, null);
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // parsing the data from json to object: only getting latitude and longitude
    const { latitude, longitude } = JSON.parse(body);
    return callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(urlPathPass(coords), (error, response, body) => {
    // sends back the error for invalid domain, user is offline, etc.
    if (error) {
      return callback(error, null);
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // parsing the data from json to object: only getting response
    const data = JSON.parse(body).response;
    return callback(null, data);
  });
};


// Function to deal with the Callback waterfall
const nextISSTimesForMyLocation = (callback) => {

  // First API to be called
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    // Second API: using the IP address
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      // Third API: checks the fly over times
      fetchISSFlyOverTimes(coords, (error, data) => {
        if (error) {
          return callback(error, null);
        }
        return callback(null, data);
      });
    });
  });
  
  // // First API to be called
  // const ip = fetchMyIP((error, ip) => {
  //   if (error) {
  //     return callback(error, null);
  //   }
  //   return ip;
  // });
  // // Second API: using the IP address
  // const coords = fetchCoordsByIP(ip, (error, coords) => {
  //   if (error) {
  //     return callback(error, null);
  //   }
  //   return coords;
  // });
  // // Third API: checks the fly over times
  // const passTimes = fetchISSFlyOverTimes(coords, (error, data) => {
  //   if (error) {
  //     return callback(error, null);
  //   }
  //   return data;
  // });

  // return callback(null, passTimes);
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };