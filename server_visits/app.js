const express = require("express");
const mongo = require("mongodb");
const app = express()
const MongoClient = mongo.MongoClient;
const PORT = 8080
const url = "mongodb://localhost:27017/";

app.get("/", (req,res) => {
 MongoClient.connect(url, (err, mongoDB) => {
	if err throw err
        mongoDB.db.server_vists.find({}, (err, result) => {
		if err throw err
		res.send("No of times visited : " + result.vists)
	)
 })

})

app.listen(PORT, () => {
    console.log("server is runing on port 8080")
})


