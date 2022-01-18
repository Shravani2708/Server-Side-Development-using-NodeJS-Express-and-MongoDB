const mySecret = process.env['MESSAGE_STYLE']
var express = require('express');
var app = express();
let bodyParser=require('body-parser');
require('dotenv').config();
console.log("Hello World");

/*Serve a String "Hello String"*/
app.get("/",(req,res) => {
  res.send("Hello Express");
  });


//TO server HTML File

absolutePath=__dirname+"/views/index.html";

app.get("/",(req,res)=>{
  res.sendFile(absolutePath);
});

/** To Server Static Assets

app.use(express.static(__dirname + "/public"));*/

app.use("/public", express.static(__dirname + "/public"));
 

/**Serve JSON on a specifi Route */

app.get("/json", (req, res) => {
  res.json({
    message: "Hello json"
  });
});

/*Use .env file*/
app.get("/json",(req,res)=>{
 
      console.log(process.env.MESSAGE_STYLE,"<= message style" );
      if (process.env.MESSAGE_STYLE === "uppercase") {
          res.json({message: "Hello json".toUpperCase()});
          } 
      else {
           res.json({ message: "Hello json"});
           
      }

});

/* To build simple logger from root level*/



app.use((req, res, next)=> {
  
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

/**Chain middle ware to create Time Server*/

function getTheCurrentTime() {
  return new Date().toString();
}
app.get("/now",(req, res, next) => {
    req.time = getTheCurrentTime();
    next();
  },
  (req, res) => {
    res.json({time:req.time});
  }
); 

/**Build echo server using route param */

app.get("/:word/echo",(req,res)=>{
    var word=req.params.word;
    //const {word}=req.params;
    res.json({echo:word});
});

/**Get Query parameter input from client */
app.get("/name", function(req, res) {
  
  var { first: fName, last: lName } =req.query;
  
  res.json({
    name: `${fName} ${lName}`
  });
});

/**Use body-parser to Parse POST Requests*/ 
 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**Get Data from Post Request
app.post("/name", function(req,res){
  res.json({name: req.body.first+" "+req.body.last});
});*/
app.post('/name',bodyParser.urlencoded({ extended: false }), (req, res) => {
  let str = req.body.first + ' ' + req.body.last;
  res.json({name: str});
});





































 module.exports = app;
