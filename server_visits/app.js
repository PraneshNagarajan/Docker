const express = require("express");
const mongo = require("mongodb")
const bodyParser = require('body-parser')
const app = express()
const MongoClient = mongo.MongoClient;
const PORT = 5050


//save credentials
var url

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(jsonParser)
app.use(urlencodedParser)


app.get("/getHits", (req,res) => {
  MongoClient.connect(url, (err, mongoDB) => {
 	if(err) {
		res.send(String(err) + " / First login to access request")
	}
	  var server_hits =  mongoDB.db("server_hit")
         var collection = server_hits.collection("hits")
         collection.find({}).toArray((err, result) => {
 		if (err) {
		 res.send(String(err))
		}
		console.log(result.keys()) 
 		res.send("No of times visited : " + result)
	 })
  })
})

app.post("/insertNew" , (req,res) => {
MongoClient.connect(url, (err, mongoDB) => {
        if(err) {
                res.send(String(err))
        }
	var server_hits =  mongoDB.db("server_hit")
	var collection = server_hits.collection("hits")
	collection.insertOne({ hits: 1 }, (err, result) => {
             if (err) {  res.send(String(err)) }
	     res.send("data inserted : " + result)
	})
  })
})

app.post("/login", (req,res) => {
	MongoClient.connect( "mongodb://"+req.body.user+":"+req.body.password+"@mongoDB:27017" , (err, DB) => {
		if(err) {
			res.send(String(err))
		} else {
			url="mongodb://"+req.body.user+":"+req.body.password+"@mongoDB:27017"
			res.send("login successfully")
		}
	})
})

app.listen(PORT, () => {
    console.log("server is runing on port 5050")
})
