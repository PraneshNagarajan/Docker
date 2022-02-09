const express = require("express");
const mongo = require("mongodb");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = mongo.MongoClient;
const PORT = 5050;

//save credentials
var url;


// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlencodedParser);

app.get("/getHits", (req, res) => {
  MongoClient.connect(url, (err, mongoDB) => {
    if (err) {
      res.send(String(err) + " / First login to access request");
    }
    var db = mongoDB.db("server_hit").collection("hits");
    db.find({}, {projection:{_id:0}}).toArray((err,result) => {
	var output = result[0].hits
        res.send("visits : "+output)
    	db.updateOne({hits: output}, {$set: {hits: output+1}},(err, res) => {
	})
    });
  });
});

app.post("/insertNew", (req, res) => {
  MongoClient.connect(url, (err, mongoDB) => {
    if (err) {
      res.send(String(err));
    }
    var db = mongoDB.db("server_hit").collection("hits");
    db.insertOne({ hits: 1 }, (err, result) => {
      if (err) {
        res.send(String(err));
      }
      res.send("data inserted : " + result);
    });
  });
});

app.post("/login", (req, res) => {
  MongoClient.connect(
    "mongodb://" + req.body.user + ":" + req.body.password + "@mongoDB:27017",
    (err, DB) => {
      if (err) {
        res.send(String(err));
      } else {
        url =
          "mongodb://" +
          req.body.user +
          ":" +
          req.body.password +
          "@mongoDB:27017";
        res.send("login successfully");
      }
    }
  );
});

app.listen(PORT, () => {
  console.log("server is runing on port 5050");
});

