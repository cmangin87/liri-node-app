require("dotenv").config();

var Spotify = require(“node-spotify-api”);
var keys = require("./keys");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var userInput = process.argv[2];
var inputTopic = process.argv[3];

UserInputs(userInput, inputTopic);

function UserInputs (userInput, inputTopic){
    switch (userInput) {
        case "concert-this":
            concertThis(inputTopic);
            break;

        case "spotify-this-song":
            spotifyThis(inputTopic);
            break;

        case "movie-this":
            movieThis(inputTopic);
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;
    }
};

function concertThis(inputTopic){
    axios.get("https://rest.bandsintown.com/artists/" + inputTopic + "/events?app_id=codingbootcamp")
    .then(function(response) {
        for (var i = 0; i < response.data.length; i++) {

            var datetime = response.data[i].datetime;
            var dateArr = datetime.split('T');

            var concertResults = 
                "--------------------------------------------------------------------" +
                    "\nVenue Name: " + response.data[i].venue.name + 
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of the Event: " + moment(dateArr[0], "MM-DD-YYYY") +
                "--------------------------------------------------------------------";
                    
            console.log(concertResults);
        }
    })

    .catch(function (error) {
        console.log(error);
    });
        

}