const express = require("express");
const mongo = require("mongodb")
const bodyParser = require('body-parser')
const app = express()
const MongoClient = mongo.MongoClient;
const PORT = 5050
const url = "mongodb://mongoDB:27017/server_hits";


//save credentials
var user = ""
var password = ""

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(jsonParser)
app.use(urlencodedParser)

const db = (mongoDB) => {
 var server_hits =  mongoDB.db("server_hit")
 var collection = server_hits.collection("hits")
 return collection
}

app.get("/getHits", (req,res) => {
  MongoClient.connect("mongodb://"+user+":"+password+"@mongoDB:27017/server_hit", (err, mongoDB) => {
 	if(err) {
		res.send(String(err) + " / First login to access request")
	}
         mongoDB.collection("hits").find({}, (err, result) => {
 		if (err) {
		 res.send(String(err))
		}
 		res.send("No of times visited : " + result.hits)
	 })
  })
 })

app.post("/insertNew" , (req,res) => {
MongoClient.connect("mongodb://"+req.body.user+":"+req.body.password+"@mongoDB:27017", (err, mongoDB) => {
        if(err) {
                res.send(String(err))
        }
	//var server_hits =  mongoDB.db("server_hit")
	//var collection = server_hits.collection("hits")
	// check db function
	var collection = db(mongoDB)
	collection.insertOne({ hits: 1 }, (err, result) => {
             if (err) {  res.send(String(err)) }
	     res.send("data inserted : " + result)
	})
  })


app.get("/", (req,res) => {

	MongoClient.connect(url, (err, DB) => {
		if(err) {
			res.send(String(err))
		}else {
			res.send("connected")
		}
	})
})

app.post("/login", (req,res) => {
	MongoClient.connect( "mongodb://"+req.body.user+":"+req.body.password+"@mongoDB:27017" , (err, DB) => {
		if(err) {
			res.send(String(err))
		} else {
			res.send("login successfully")
		}
	})
})

app.listen(PORT, () => {
    console.log("server is runing on port 5050")
})


