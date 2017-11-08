
# Table of Contents

1.  [Intro](#org92831b2)
2.  [build steps](#org3c20d6d)
    1.  [first http server](#org82b9842)
        1.  [server.js](#org13ce400)
        2.  [on browser](#orgd7ef52d)
    2.  [first web page](#org1bc9803)
        1.  [index.html](#orga361298)
        2.  [server.js](#org6ed8496)
        3.  [on browser](#org0af440f)
    3.  [lets add some route](#orgcaf6bc6)
        1.  [server.js](#org0c77ac5)
    4.  [post function](#org618242a)
        1.  [index.html](#org4050edb)
        2.  [server.js](#org914b25a)
    5.  [communication part](#orgd3d9cce)
        1.  [index.html](#orgd1b8086)
        2.  [server.js](#org62b4563)
    6.  [final add some animation!](#orge297c89)
        1.  [index.html](#orgd98c2a9)
3.  [Enjoy](#orge9febc8)


<a id="org92831b2"></a>

# Intro

A simple nodejs tutorial.
Lets start from implement the server.js


<a id="org3c20d6d"></a>

# build steps


<a id="org82b9842"></a>

## first http server


<a id="org13ce400"></a>

### server.js

var vhttp = require("http");

function onRequest(request, response) {
  console.log("Request received.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("hello world!");
  response.end();
}
vhttp.createServer(onRequest).listed(3000);
console.log("Server has started on port :3000.");


<a id="orgd7ef52d"></a>

### on browser

goto localhost:3000
great! we have our page!


<a id="org1bc9803"></a>

## first web page


<a id="orga361298"></a>

### index.html

<HTML>
  <HEAD>
	<TITLE> hello javascript </TITLE>
  </HEAD>
  <BODY>
	<h1> SIMPLE KANBAN </h1>
  </BODY>
</HTML>


<a id="org6ed8496"></a>

### server.js

1.  new

    // we now need to read index.html and serve it to our client
    var fs = require("fs");
    var page = "";
    fs.readFile( \_<sub>dirname</sub> + "/index.html", function (err, data) {
      if (err) {
      	throw err; 
      }
      page = data.toString();
    });

2.  changes

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(page);


<a id="org0af440f"></a>

### on browser

Now we have our page!
Lets add some route


<a id="orgcaf6bc6"></a>

## lets add some route


<a id="org0c77ac5"></a>

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


<a id="org618242a"></a>

## post function


<a id="org4050edb"></a>

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
          url: "<http://hare1039.nctu.me:5900/message>",
          type: "post",
          data: $("#msg").serialize(),
          success: function(){
            console.log("worked");
          }
        });
      };
    </script>


<a id="org914b25a"></a>

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


<a id="orgd3d9cce"></a>

## communication part


<a id="orgd1b8086"></a>

### index.html

1.  new

    <button onClick="update()"> update </button>
    <div id="hello"> </div>
    
    function update (){
      $.get("<http://hare1039.nctu.me:5900/message>", function(data) {
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


<a id="org62b4563"></a>

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


<a id="orge297c89"></a>

## final add some animation!


<a id="orgd98c2a9"></a>

### index.html

1.  new

    <!&#x2013; Include the polyfill &#x2013;>
    <script src="//cdnjs.cloudflare.com/ajax/libs/web-animations/2.3.1/web-animations.min.js"></script>
    
    <!&#x2013; Include Animatelo &#x2013;>
    <script src="//cdnjs.cloudflare.com/ajax/libs/animatelo/1.0.3/animatelo.min.js"></script>

2.  change

    // in update
    window.animatelo.bounce("#hello");


<a id="orge9febc8"></a>

# Enjoy

