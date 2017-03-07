var jokes = [
  "A day without sunshine is like, night.",
  "At what age is it appropriate to tell my dog that he's adopted?",
  "I intend to live forever, or die trying"
];

var _getRandomJoke = function() {
    //returns a number between 0 and jokes.length
    var rand = Math.floor(Math.random() * jokes.length);
    return jokes[rand];
}

var _addJoke = function(newJoke) {
    if (typeof newJoke === 'string') {
        jokes.push(newJoke);
    }
}

module.exports = {
  allJokes : jokes,
  getRandomJoke : _getRandomJoke,
  addJoke : _addJoke
}