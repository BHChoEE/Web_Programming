var http = require('http');
var express = require('express');
var socketIo = require('socket.io');
var path = require("path")
var bodyParser = require('body-parser');
// Db announcement
var mongoose = require('mongoose');
const con = mongoose.createConnection('mongodb://localhost/postdb');
const UserSocket = require('./src/socket/UserSocket.js');
const userSocket = new UserSocket(con);
const PostSocket = require('./src/socket/PostSocket.js');
const postSocket = new PostSocket(con);
// setup server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// allow bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname ,'public')));

// render an API index page
app.post('/user/signin', function(req, res){
	//console.log(req.body)
	var user = {
		username: req.body.username,
		updateTime: req.body.updateTime
	};
	// add new user to userlist
	userSocket.storeUsers(user, res);
});

app.post('/user/login', function(req, res){
	var user = {
		username: req.body.username, 
		updateTime: req.body.updateTime,
	}
	userSocket.checkUsers(user, res);
});
app.put('/blog/post', (req, res) => {
    var date = new Date();
    var localeSpecificTime = date.toLocaleTimeString();
    var localeSpecificDate = date.toLocaleDateString();
    date = localeSpecificTime + ", " + localeSpecificDate

    var newPost = {
        title: req.body.title,
        content: req.body.content,
        timestamp: new Date().getTime().toString(),
        time: date,
        hash: req.body.hash,
        author: req.body.author};
    
    postSocket.putPosts(newPost, res);
});
app.get('/blog/list', function(req, res){
    const host = req.query.hostname;
    postSocket.loadPostList(host, res);
});
app.get('/user/allusers', function(req, res){
    const me = req.query.username;
    userSocket.loadUserList(me, res);
});
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    });
});

// Start listening
server.listen(3000);
console.log(`Started on port 3000`);
