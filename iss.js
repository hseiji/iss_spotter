// APIs request
const request = require("request");

// Helper function
const urlPath = () => {
  return "https://api.ipify.org/?format=json";
};


const fetchMyIP = function(callback) { 
  // use request to fetch IP address from JSON API
  request(urlPath(), (error, response, body) => {
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

module.exports = { fetchMyIP };