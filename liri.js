require("dotenv").config();

var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
moment().format();
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var userInput = process.argv[2];
var inputTopic = process.argv[3];

UserInputs(userInput, inputTopic);

function UserInputs(userInput, inputTopic) {
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
      doWhatItSays(inputTopic);
      break;
  }
}

function concertThis(inputTopic) {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        inputTopic +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        var datetime = response.data[i].datetime;
        var dateArr = datetime.split("T");

        var concertResults =
          "--------------------" +
          "\nVenue Name: " +
          response.data[i].venue.name +
          "\nVenue Location: " +
          response.data[i].venue.city +
          "\nDate of the Event: " +
          moment(dateArr[0]).format("MM-DD-YYYY") +
          "--------------------";

        console.log(concertResults);
      }
    })

    .catch(function(error) {
      console.log(error);
    });
}

function spotifyThis(inputTopic) {
  spotify
    .search({ type: "track", query: inputTopic })
    .then(function(response) {
      for (var i = 0; i < 5; i++) {
        var spotifyResults =
          "--------------------" +
          "\nArtist(s): " +
          response.tracks.items[i].artists[0].name +
          "\nSong Name: " +
          response.tracks.items[i].name +
          "\nAlbum Name: " +
          response.tracks.items[i].album.name +
          "\nPreview Link: " +
          response.tracks.items[i].preview_url +
          "--------------------";

        console.log(spotifyResults);
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}

function movieThis(inputTopic) {
  if (!inputTopic) {
    inputTopic = "mr nobody";
  }
  axios
    .get(
      "https://www.omdbapi.com/?t=" +
        inputTopic +
        "&y=&plot=short&apikey=trilogy"
    )
    .then(function(response) {
      var movieResults =
        "--------------------------------------------------------------------" +
        "\nMovie Title: " +
        response.data.Title +
        "\nYear of Release: " +
        response.data.Year +
        "\nIMDB Rating: " +
        response.data.imdbRating +
        "\nRotten Tomatoes Rating: " +
        response.data.Ratings[1].Value +
        "\nCountry Produced: " +
        response.data.Country +
        "\nLanguage: " +
        response.data.Language +
        "\nPlot: " +
        response.data.Plot +
        "\nActors/Actresses: " +
        response.data.Actors;
      console.log(movieResults);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function doWhatItSays() {
  fs.readFile("./random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    } else return console.log("data", data);
  });
}
