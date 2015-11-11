var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.use(function(req, res) {
	res.sendFile(__dirname + '/dashboard/index.html')
});

app.listen(5882, function () {
	console.log('Listening on port 5882');
});
