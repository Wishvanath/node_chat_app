const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(5000).sockets;


//connection of mongo db

mongo.connect('mongodb://127.0.0.1/chatapp',function(err, db){
    if(err){
        throw err;
    }
    console.log("Mongo DB conneted...")
})