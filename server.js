console.log('\nLoading server...');

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname, 'test')));

app.post('/foo', function(req, res){
    console.log(req.body);
    res.sendStatus(200);
});

//start the app
var port = process.env.PORT || 8080;

var server = app.listen(port, function(){
    console.log(`Listening on port ${port}...`);
});

function gracefulShutdown(){
    console.log('\nStarting shutdown...');
    server.close(function(){
        console.log('Shutdown complete.');
    });
}

process.once('SIGINT', gracefulShutdown);

process.once('SIGTERM', gracefulShutdown);