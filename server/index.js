var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    bcrypt = require("bcrypt-nodejs"),
    jwt = require("jsonwebtoken"),
    config = require("./config.js");

var userCtrl = require("./controllers/userCtrl.js");

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, loginToken");
  res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST");
  next();
});

mongoose.connect('mongodb://localhost:27017/Social');
mongoose.connection.once('open', function(){
    console.log('Connected to mongodb\n');
});

app.get('/api/test', function(req, res, next){
    console.log("test hit");
    res.status(200).json("complete")
})
app.post('/api/login', userCtrl.Login);
app.get('/api/loggedin', userCtrl.LoggedIn);
app.post('/api/register', userCtrl.RegisterNewLogin);
app.put('/api/addfriend/:id', userCtrl.AddFriend);
app.get('/api/users', userCtrl.GetUsers);
app.get('/api/users/search/', userCtrl.FindUsersByName);
app.put('/api/user/updatecolor', userCtrl.UpdateColor);
app.put('/api/user/updateprofileimg', userCtrl.UpdateProfileImgUrl);
app.get('/api/chatroom/:id', userCtrl.GetChatRoom);
app.post('/api/chatroom/newmessage/:id', userCtrl.AddMessageToChat);







app.listen(3141, function(){
    console.log('\nListening to port 3141\n');
})