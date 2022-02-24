// APIs request
const request = require("request");

// Helper functions
const urlPathIP = () => {
  return "https://api.ipify.org/?format=json";
};

const urlPathCoord = (ip) => {
  return `https://freegeoip.app/json/${ip}`;
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
    callback(null, { latitude, longitude });

  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };