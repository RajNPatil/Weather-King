const request = require("request");
const chalk = require("chalk");

const geoCode = (address, callback) => {
  const geoUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoicmFqLXdpc2RvbSIsImEiOiJjbDJtMGE5aDcwYnEzM2ttYTB4Z3RtODV0In0.DCpITnfLgBycYArQRPhIWw&limit=1";

  request({ url: geoUrl, json: true }, (error, { body } = {}) => {
    if (error) {
      callback(
        "Cannot connect to the Geo API \n" + chalk.red("Check your connection"),
        undefined
      );
    } else if (body.features.length === 0) {
      callback("Cannot find the location", undefined);
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
      });
    }
  });
};

module.exports = geoCode;
