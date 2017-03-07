// Testing the API
var request = require('request');

var options = {
  url: "http://localhost:3000/api/joke",
  method: "POST",
  json : true,
  body : {"joke" : "I'm a joke"}
};
request(options,function(error,res,body){
  console.log(body.joke); //Assume the service returns the new Joke
});