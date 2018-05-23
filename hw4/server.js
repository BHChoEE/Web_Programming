var http = require('http');
var express = require('express');
var socketIo = require('socket.io');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');

// setup server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// setup UserList
var users = [];

// allow CORS
app.use(cors());
// allow bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname ,'public')));

// render an API index page
app.get(['/', '/login'], function(req, res){
	res.sendFile(path.join(__dirname, './public/Login.html'));
});

app.get('/signin', function(req, res){
	console.log('redirect to: sign-in');
	res.sendFile(path.join(__dirname, './public/SignIn.html'));
});

app.get('/chatLobby', function(req, res){
	res.sendFile(path.join(__dirname, './public/ChatLobby.html'));
});

app.get('/redirect', function(req, res){
	console.log(req.query.page);
	res.redirect(req.query.page);
});

var users = [];
app.post('/user/signin', function(req, res){
	var user = {
		username: req.body.username,
		icon: './assets/default.png',
		updateTime: req.body.updateTime
	};
	// add new user to userlist
	users.push(user);
	res.send(user);
});

app.post('/user/login', function(req, res){
	var user = {
		username: req.body.username, 
		icon: './assets/default.png',
		updateTime: req.body.updateTime,
		
	}
	// check user is in users
	var signed = false;
	for(let i = 0 ; i < users.length ; ++i)
		if(users[i].username === user.username)
			signed = true;
	// if not signed in
	if(!signed){
		console.log('not Signed')
		res.send('notFound');
	}
	else{
		console.log('signed');
		res.send(user);
	}

});
app.get('/user/allusers', function(req, res){
	const me = req.query.username;
	var userswithoutme = [];
	for(let i = 0 ; i < users.length ; ++i){
		if(users[i].username !== me)
			userswithoutme.push(users[i]);
	}
	res.send(userswithoutme);
});
// Start listening
server.listen(3000);
console.log(`Started on port 3000`);
name_id_dict = {};
// Setup Socket.io
io.on('connection', socket => {
	socket.on('username', (username, cb)=>{
		console.log("connect: " + socket.id + "," + username);
		name_id_dict[username] = socket.id;
	})
	socket.on('message', (msg, cb) => {
		var myMsg = JSON.parse(msg);
		var date = new Date();
		var localeSpecificTime = date.toLocaleTimeString();
        date = localeSpecificTime.replace(/:\d+ /, ' ');

        var obj = {from: myMsg.from, msg: myMsg.msg, to: myMsg.to, time: date};
                
        var fullMsg = JSON.stringify(obj);
        // console.log('received msg:' + fullMsg);
        cb('[ack] server received: ' + fullMsg);
        //io.to(name_id_dict[obj.from]).emit('message', fullMsg);
        io.to(name_id_dict[obj.to]).emit('message', fullMsg);
	})
	socket.on("disconnect", () => {
        var id = socket.id;
        var username = "";
        for (const key in name_id_dict) {
            const value = name_id_dict[key];
            if(value === id) {
                username = key;
                break;
            }
        }
        console.log("disconnect: " + id + ", " + username);
		name_id_dict[username] = null;
		
    });
});