const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(5000).sockets;


//connection of mongo db

mongo.connect('mongodb://127.0.0.1/chatapp', function (err, db) {
    if (err) {
        throw err;
    }
    console.log("Mongo DB conneted...")

    //connet to socket.io
    client.on('connection', function (socket) {

        //create chat collection in the database
        let chat = db.collection('chats');

        //fetch ram message
        chat.find({
            "name": "Ram"
        }).limit(100).sort({
            _id: 1
        }).toArray(function (err, res) {
            if (err) {
                throw err;
            }
            //emit the message and send to the frontend
            socket.emit('ram_output', res)
        });
        //fetch rahim message
        chat.find({
            "name": "Rahim"
        }).limit(100).sort({
            _id: 1
        }).toArray(function (err, res) {
            if (err) {
                throw err
            }
            //emit the message
            socket.emit('rahim_output', res)
        })

        //handle input events
        socket.on('rahim_input', function(data){
            let name = data.name;
            let message = data.message;
            //check for name and message
            if(name == '' || message == ''){
                console.log("Field is empty")
                // can write the logic to show error to the user
            }else{
                //insert message into the database
                chat.insert({
                    name: name,
                    message: message
                },function(){
                    client.emit('rahim_output',[data]);
                });
            }
        });
        //
        socket.on('ram_input',function(data){
            let name = data.name;
            let message = data.message;
            // check for name and message
            if(name == ''|| message == ''){
                console.log("Field is empty");
            }else{
                //insert the message into the database
                chat.insert({
                    name: name,
                    message:message
                }, function(){
                    client.emit('ram_output', [data]);
                });
            }
        });
        

    })//end of socket.io def




})