var express = require('express'),
    https = require('http');

var app = express();
var username;
var password;

var getOptions = function(pathValue) {
    return {
        host: 'rgaskill',
        port: 8080,
        method: 'GET',
        auth: username+':'+password,
        path: pathValue
    };
};

app.configure(function() {

//    app.use(express.basicAuth(function(user, pass) {
//        username = user;
//        password = pass;
//        return true;
//    }));
    app.use('/test', express.static(__dirname + '/test') );
    app.use('/bbtoolkit', express.static(__dirname + '/app'));

});


function proxy(req, res){

    var callback = function(response) {

        res.writeHead(response.statusCode, response.headers);
        console.log(response.headers);
        response.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            res.write(chunk);
        });
        response.on('end', function() {
            res.end();
        });

    };

    console.log(req.path);
    var options = getOptions(req.path);
    var request = https.request(getOptions(req.path), callback);
    request.end();
}

app.get('/bbtoolkit/rest/*', function(req, res) {
    proxy(req,res);
});

app.listen(8000, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});