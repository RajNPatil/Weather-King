const path = require("path");
const express = require("express");
const { kStringMaxLength } = require("buffer");
const hbs = require("hbs");

//Getting weather modules
const request = require("request");
const chalk = require("chalk");
const geoCode = require("./utils/geoCode");
const weatherKing = require("./utils/weatherKing");

const app = express();
const port = process.env.PORT || 3000;

//path for public, views and partials
const pathToPublic = path.join(__dirname, "../public");
const pathToViews = path.join(__dirname, "../templates/views");
const pathToPartials = path.join(__dirname, "../templates/partials");

//setting up handle bars
app.set("view engine", "hbs");
app.set("views", pathToViews);
hbs.registerPartials(pathToPartials);

//Setting up path for static pages which are called as /about.html in a mentioned path
app.use(express.static(pathToPublic));

//Setting the browsing pages
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Raj Patil",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Raj Patil",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Raj Patil",
  });
});

//Forcasting on window

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please provide address" });
  }

  console.log("sending address for " + req.query.address);

  geoCode(
    req.query.address,
    (error, { location, latitude, longitude } = {}) => {
      if (error) {
        res.send({
          error,
        });
        return console.log(error);
      }

      weatherKing(latitude, longitude, (error, response) => {
        if (error) {
          res.send({
            error,
          });
          return console.log(error);
        }

        console.log(location, latitude, longitude);
        res.send({
          location,
          details:
            response.weather_descriptions[0] +
            ". It is " +
            response.temperature +
            " degrees outside and it feels like " +
            response.feelslike,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help page",
    title: "404",
    name: "Raj Patil",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "Page",
    title: "404",
    name: "Raj Patil",
  });
});

app.listen(port, () => {
  console.log("server is up");
});
