var express = require('express');
var app = express();
var bodyParser = require('body-parser')

//add your content here

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000, function () {
    console.log("Server started listening on port " + 3000)
});



app.use("/api/calculator/:operation/:n1/:n2/", function (req, res, next) {
    var calculatorRequest = {
        operation: req.params.operation,
        n1: Number(req.params.n1),
        n2: Number(req.params.n2)
    }
    req.calculatorRequest = calculatorRequest;
    next();
})

app.get("/api/calculator/*", function (req, res) {
    inp = req.calculatorRequest;
    
    if (inp != undefined) {
        var respText;
        var result;

        if (inp.operation == 'add') {result = inp.n1 + inp.n2}
        if (inp.operation == 'substract') {result = inp.n1 - inp.n2}
        if (inp.operation == 'multiply') {result = inp.n1 * inp.n2}
        if (inp.operation == 'divide') {result = inp.n1 / inp.n2}

        if(isNaN(result)) 
            {respText = "false query"}
        else 
            {respText = "You tried: \t" + inp.n1 + inp.operation + inp.n2 + " = " + result}

        res.send(respText)
    }
    res.send("Thanks! Try again.")
    console.log("userinput: " + inp)
})