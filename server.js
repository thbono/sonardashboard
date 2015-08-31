var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.use(function(req, res) {
	res.sendFile(__dirname + '/public/index.html')
});

app.listen(5882, function () {
	console.log('Listening on port 5882');
});
