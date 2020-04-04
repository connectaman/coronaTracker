var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");
app.use(express.static("public"));
// API Live Corono Virus Update - https://coronavirus-tracker-api.herokuapp.com/v2/locations

// API - Daily - https://api.covid19india.org/states_daily.json
app.get("/", function(req, res) {
  request(
    "https://coronavirus-tracker-api.herokuapp.com/v2/locations",
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var results = JSON.parse(body);
        // res.send(results);
        res.render("index", { data: results });
      } else {
        res.send("Error while loading");
      }
    }
  );
});
app.get("/india", function(req, res) {
  request("https://api.covid19india.org/states_daily.json", function(
    error,
    response,
    body
  ) {
    if (!error && response.statusCode == 200) {
      var results = JSON.parse(body);
      // res.send(results);
      res.render("india", { data: results, status: "sucess" });
    } else {
      res.send("Error while loading");
    }
  });
});

app.get("/chart", function(req, res) {
  res.render("graph");
});

app.get("*", function(req, res) {
  res.render("404");
});
// listen for requests :)
const listener = app.listen(3000, () => {
  console.log("Your app is listening on port 3000");
});
