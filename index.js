const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjecID;

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.get("/hi", (request, response) => {
	response.send("Hello world!");
});

const CONNECTION_URL = "mongodb+srv://root:<root>@lab10-twodd.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "Lab10";

app.post("/notes", (request, response) => {
	MongoClient.connect(CONNECTION_URL, {useNewUrlParser: true}, (error, client) => {
		if(error) {
			response.send(error);
			throw error;
		}
		database = client.db(DATABASE_NAME);
		collection = database.collection("Notes");

		collection.insert(request.body, (error, result) => {
			if(error) {
				return response.status(500).send(error);
			}
			response.send(result.result);
		});
	});
});

app.get("/notes", (request, response) => {
	MongoClient.connect(CONNECTION_URL, {useNewUrlParser: true}, (error, client) => {
		if(error) {
			response.send(error);
			throw error;
		}
		database = client.db(DATABASE_NAME);
		collection = database.collection("Notes");

		collection.find({}).toArray((error, result) => {
			if(error) {
				return response.status(500).send(error);
			}
			response.send(result);
		});
	});
});

app.get("/notes/:id", (request, response) => {
	MongoClient.connect(CONNECTION_URL, {useNewUrlParser: true}, (error, client) => {
		if(error) {
			response.send(error);
			throw error;
		}
		database = client.db(DATABASE_NAME);
		collection = database.collection("Notes");

		collection.find({}).toArray((error, result) => {
			if(error) {
				return response.status(500).send(error);
			}

			var numberID = parseInt(request.params.id);
			if(numberID >= result.length)
			   response.send("Not enongh elements in database");
			else
				response.send(result[numberID]);
		});
	});
});
.
module.exports = app;