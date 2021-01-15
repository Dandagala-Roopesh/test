var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname+'/public'));

server.listen(8000);
console.log('It\'s going down in 8000');

app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers','Content-type,Accept,X-Access-Token,X-key');
    if(req.method == 'OPTIONS'){
        res.status(200).end();
    }else{
        next();
    }
});

app.get('/',function(req,res){
    res.sendfile('index.html');
});

io.on('connection',function(socket){
    socket.on('chat message',function(msg){
        io.emit('chat message',msg); 
    });
});