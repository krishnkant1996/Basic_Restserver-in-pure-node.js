var http = require("http");
//var mysql = require("mysql");
var url = require("url");
//var querystring = require('querystring');

var server = http.createServer(function(req,res){
	parsed = url.parse(req.url,true);
	console.log("sever running");

	if(parsed.pathname == "/krishn"){
	res.end("krishnkant");
	}
	else{
		res.end(JSON.stringify(parsed));	
	}
});
server.listen(2000);