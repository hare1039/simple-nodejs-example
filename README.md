
# Table of Contents

1.  [Intro](#orgeca31d9)
2.  [build steps](#orgff3ea90)
    1.  [first http server](#org01a5260)
        1.  [server.js](#org6887578)
        2.  [on browser](#orgc608081)
    2.  [first web page](#orgb5ff0c3)
        1.  [index.html](#orgeeb3d73)
        2.  [server.js](#orgc7a0d71)
        3.  [on browser](#org34d76a3)
    3.  [lets add some route](#org0d4cf6e)
        1.  [server.js](#orgf5fcc45)
    4.  [post function](#orgb238a29)
        1.  [index.html](#org00fd4c8)
        2.  [server.js](#org559ec38)
    5.  [communication part](#orgb0bf6d3)
        1.  [index.html](#org266f374)
        2.  [server.js](#org3ddc78a)
    6.  [final add some animation!](#orge149fa0)
        1.  [index.html](#org30c957e)
3.  [Enjoy](#orgceac8cf)


<a id="orgeca31d9"></a>

# Intro

A simple nodejs tutorial.
Lets start from implement the server.js


<a id="orgff3ea90"></a>

# build steps


<a id="org01a5260"></a>

## first http server


<a id="org6887578"></a>

### server.js

    var vhttp = require("http");
    
    function onRequest(request, response) {
      console.log("Request received.");
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("hello world!");
      response.end();
    }
    vhttp.createServer(onRequest).listen(3000);
    console.log("Server has started on port :3000.");


<a id="orgc608081"></a>

### on browser

goto localhost:3000
great! we have our page!


<a id="orgb5ff0c3"></a>

## first web page


<a id="orgeeb3d73"></a>

### index.html

    <HTML>
      <HEAD>
    	<TITLE> hello javascript </TITLE>
      </HEAD>
      <BODY>
    	<h1> SIMPLE KANBAN </h1>
      </BODY>
    </HTML>


<a id="orgc7a0d71"></a>

### server.js

1.  new

        // we now need to read index.html and serve it to our client
        var fs = require("fs");
        var page = "";
        fs.readFile( __dirname + "/index.html", function (err, data) {
          if (err) {
        	throw err; 
          }
          page = data.toString();
        });

2.  changes

        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(page);


<a id="org34d76a3"></a>

### on browser

Now we have our page!
Lets add some route


<a id="org0d4cf6e"></a>

## lets add some route


<a id="orgf5fcc45"></a>

### server.js

1.  new

        var url = require("url");
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        if (pathname == "/") {
          response.writeHead(200, {"Content-Type": "text/html"});
          response.write(page);
          response.end();
        } else if (pathname == "/message") {
          response.writeHead(200, {"Content-Type": "text/plain"});
          response.write("You are on /message !");
          response.end();
        }


<a id="orgb238a29"></a>

## post function


<a id="org00fd4c8"></a>

### index.html

1.  new

        <form id="msg" method="POST" action="#">
          <label> name </label><input type="text" id="username" name="username" />
          <label> message </label><input type="text" id="message" name="message" />
        </form>
        <button onClick="SubForm()"> call </button>
        <script>
          function SubForm (){
        	alert(" you called me~~");
          }
        </script>

2.  next

        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script>
          function SubForm (){
        	$.ajax({
        	  url: "http://hare1039.nctu.me:5900/message",
        	  type: "post",
        	  data: $("#msg").serialize(),
        	  success: function(){
        		console.log("worked");
        	  }
        	});
          };
        </script>


<a id="org559ec38"></a>

### server.js

1.  new

        var qs = require("querystring");
        if (request.method == "GET") {
          response.writeHead(200, {"Content-Type": "text/plain"});
          response.write("You are on /message !");
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
        	response.writeHead(200, {"Content-Type": "text/plain"});
        	response.write("done");
        	response.end();
          });
        }


<a id="orgb0bf6d3"></a>

## communication part


<a id="org266f374"></a>

### index.html

1.  new

        <button onClick="update()"> update </button>
        <div id="hello"> </div>
        
        function update (){
          $.get("http://hare1039.nctu.me:5900/message", function(data) {
        	$("#hello").empty();
        	data = JSON.parse(data);
        	for(var i in data) {
        		for(var j in data[i]) {
        			$("#hello").append("<div>" + i + " says " + data[i][j] + "</div>");	  
        		}
        	}
        	console.log(data);
          });
        };


<a id="org3ddc78a"></a>

### server.js

1.  new

        var messages = {};
        
        if (messages[post["username"]] == undefined) {
          messages[post["username"]] = [];
          messages[post["username"]].push(post["message"]);
        } else {
          messages[post["username"]].push(post["message"]);			
        }

2.  change

    // on GET message
    response.write(JSON.stringify(messages));


<a id="orge149fa0"></a>

## final add some animation!


<a id="org30c957e"></a>

### index.html

1.  new

        <!-- Include the polyfill -->
        <script src="//cdnjs.cloudflare.com/ajax/libs/web-animations/2.3.1/web-animations.min.js"></script>
        
        <!-- Include Animatelo -->
        <script src="//cdnjs.cloudflare.com/ajax/libs/animatelo/1.0.3/animatelo.min.js"></script>

2.  change

        // in update
        window.animatelo.bounce("#hello");


<a id="orgceac8cf"></a>

# Enjoy

