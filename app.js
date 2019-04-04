var express = require("express");
var axios = require("axios");
var moment = require("moment");

// Tells node that we are creating an "express" server

var app = express();

// Sets an initial port. We"ll use this later in our listener

var PORT = process.env.PORT || 8080;

// move all current files to a public folder

app.use(express.static("src"));

// add a route like this for every data route you use

var issData;

app.get("/api/iss-data", function(req, res) {
    // use moment to compare timestamps and it's under the limit
    if (issData && (moment().unix() - issData.timestamp < 5)) {
        console.log('cached!');
        //send cached version
        return res.json(issData.data);
    }
    axios.get("http://api.open-notify.org/iss-now.json")
        .then(function issDataSuccess(results) {
            issData = {
                timestamp: moment().unix(),
                data: results.data
            }
            res.json(results.data);
        }, function issDataError(error) {
            console.log(error);
            res.status(500).json({
                error
            });
        });
});

app.get('/api/rover-images/rover/:rover/sol/:sol/page/:pg', function(req, res) {
    var urlQuery = `https://api.nasa.gov/mars-photos/api/v1/rovers/${req.params.rover}/photos?sol=${req.params.sol}&page=${req.params.pg}&api_key=2f8aJAjNNh8BekW6ZgjWpdqXBhrtZoQCX12mfhla`;
    axios.get(urlQuery)
    .then(function roverImagesSuccess(results) {
        res.json(results.data);
        console.log(results.data);
    }, function roverImagesError(error) {
        console.log(error);
        res.status(500).json({
            error
        });
    })
})

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
