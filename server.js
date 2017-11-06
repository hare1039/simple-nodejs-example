var vhttp = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");

var page = "";
var messages = {};
fs.readFile( __dirname + "/index.html", function (err, data) {
	if (err) {
		throw err; 
	}
	page = data.toString();
});


function onRequest(request, response) {
	var pathname = url.parse(request.url).pathname;
	console.log("Request for " + pathname + " received.");
	if (pathname == "/") {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(page);
		response.end();
	} else if (pathname == "/message") {
		if (request.method == "GET") {
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write(JSON.stringify(messages));
			response.end();
			return;
		} else if (request.method == "POST") {
			var body = "";
			request.on("data", function (data) {
				body += data;
			});
			request.on("end", function () {
				var post = qs.parse(body);
				console.log(post["username"]);
				console.log(post["message"]);

				if (messages[post["username"]] == undefined) {
					messages[post["username"]] = [];
					messages[post["username"]].push(post["message"]);
				} else {
					messages[post["username"]].push(post["message"]);			
				}
				response.writeHead(200, {"Content-Type": "text/plain"});
				response.write("done");
				response.end();
			});
		}
	}
}

vhttp.createServer(onRequest).listen(3000);

console.log("Server has started on port :3000.");
