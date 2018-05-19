//Liri takes the following arguments
// * my-tweets
// * spotify-this-song
// * movie-this

//This thingy for stuffs
require("dotenv").config();

//Adding the required files to the program
var Keys = require("./keys.js");
var fs = require("fs"); 
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");

//Function for finding songs on Spotify
var writeToLog = function(data) {
    fs.appendFile("log.txt", '\r\n\r\n');
  
    fs.appendFile("log.txt", JSON.stringify(data), function(err) {
      if (err) {
        return console.log(err);
      }
  
      console.log("log.txt was updated!");
    });
  }
  
  //Function for finding songs on Spotify
  //If it doesn't find a song, find Bust A Move
  
  var getTweets = function() {
    var client = new twitter(Keys.twitter);
  
    var paramaters = { screen_name: '2bBassett', count: 20 };
  
    client.get('statuses/user_timeline', paramaters, function(error, tweets, response) {
  
      if (!error) {
        var data = []; 
        for (var i = 0; i < tweets.length; i++) {
          data.push({
              'created at: ' : tweets[i].created_at,
              'Tweets: ' : tweets[i].text,
          });
        }
        console.log(data);
        writeToLog(data);
      }
    });
  };
  //Search OMDB
  var getMeMovie = function(movieName) {
    //If no movie is searched/found bring up Mr. Nobody
    if (movieName === undefined) {
      movieName = 'Mr Nobody';
    }
  
    var movieSearch = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apiKey=trilogy";
  
    request(movieSearch, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = [];
        var movieStats = JSON.parse(body);
  
        data.push({
        'Title: ' : movieStats.Title,
        'Year: ' : movieStats.Year,
        'Rated: ' : movieStats.Rated,
        'IMDB Rating: ' : movieStats.imdbRating,
        'Plot: ' : movieStats.Plot,
        'Actors: ' : movieStats.Actors,
        'Rotten Tomatoes Rating: ' : movieStats.tomatoRating,
        'Rotton Tomatoes URL: ' : movieStats.tomatoURL,
    });
        console.log(data);
        writeToLog(data);
  }
    });
  
  }
  
  
  var pick = function(caseInfo, functionInfo) {
    switch (caseInfo) {
      case 'my-tweets':
        getTweets();
        break;
      case 'spotify-this-song':
        getMeSpotify(functionInfo);
        break;
      case 'movie-this':
        getMeMovie(functionInfo);
        break;
      default:
        console.log('LIRI ain\'t smart');
    }
  }
  
  //run this on load of js file
  var runThis = function(a, b) {
    pick(a, b);
  };
  
  runThis(process.argv[2], process.argv[3]);
