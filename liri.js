//Liri takes the following arguments
// * my-tweets
// * spotify-this-song
// * movie-this


//these add other programs to this one
var dataKeys = require("./keys.js");
var fs = require('fs'); 
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');