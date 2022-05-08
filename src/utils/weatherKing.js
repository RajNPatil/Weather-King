const request = require("request");

const weatherKing = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=82d61861c4e9786906056b9c3e8f917f&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";
  request({ url: url, json: true }, (error, { body } = {}) => {
    //   console.log(response.body.current);
    if (error) {
      callback(
        "Cannot connect to the Weather API \n" +
          chalk.red("Check your connection"),
        undefined
      );
    } else if (body.error) {
      callback("Location not found", undefined);
    } else {
      callback(undefined, body.current);
    }
  });
};

module.exports = weatherKing;
