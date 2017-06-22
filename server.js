var http = require("http");
var mysql = require("mysql");
var url = require("url");
var querystring = require('querystring');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'demo'
});

connection.connect();
var server = http.createServer(function(req,res){
	parsed = url.parse(req.url,true);
	console.log("sever running");

if(req.method == 'GET' && parsed.pathname === '/emp' ){
		if(parsed.query.id){
			connection.query('SELECT name from emp where id = ?',parsed.query.id, function (error, results) {
				if (error) {
					res.writeHead(400,{'content-type':'application/json'});
					res.end(JSON.stringify(error));
					return
				}
				res.writeHead(200,{'content-type':'application/json'});
				res.end(JSON.stringify(results));						
			});
		}
		else{			
			res.writeHead(400,{'content-type':'application/json'});
			res.end(JSON.stringify({error : 'No ID provided'}));
		}	
	}
	else if(req.method === 'POST' && parsed.pathname ==='/emp/insert'){
		
		req.on('data',function(data){
			data = querystring.parse(data.toString('utf-8'));
				
			if(data.id && data.name ){
				connection.query('insert into emp values (?,?)',[data.id,data.name], function (error, results) {
					if (error) {
				
						res.writeHead(400,{'content-type':'application/json'});
						res.end(JSON.stringify(error));
						return
					}
					
					res.writeHead(200,{'content-type':'application/json'});
					res.end(JSON.stringify({Response : 'Success'}));						
				});
			}
		
			else{
				res.writeHead(400,{'content-type':'application/json'});
				res.end(JSON.stringify({error : 'Invalid data provided'}));
			}	
		});
				
	}
	
	else if(req.method == 'GET' && parsed.pathname ==='/emp/delete'){
		if(parsed.query.id){
			connection.query('delete from emp where id = ?',parsed.query.id, function (error, results) {
				if(error){
					res.writeHead(400,{'content-type':'application/json'});
					res.end(JSON.stringify(error));
					return
				}
				res.writeHead(200,{'content-type':'application/json'});
				res.end(JSON.stringify(results));						
			});
		}
		
		else{

			res.writeHead(400,{'content-type':'application/json'});
			res.end(JSON.stringify({error : 'No ID provided'}));
		}	
	}
	
	else{
		res.writeHead(404,{'content-type':'application/json'});
		res.end('Not Found '+ req.url);
	}
	/*if(parsed.pathname == "/krishn"){
	res.end("krishnkant");

	}
	else{
		res.end(JSON.stringify(parsed));	
	}*/
});
server.listen(2000);