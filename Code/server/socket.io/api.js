const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
var sm = [];
var players = [];

server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('match-game',data => {
        console.log(JSON.stringify(data)+'进入房间');
        sm.push(socket);
        var player = {nickname:data,order:sm.length,satus:0};
        players.push(player);
        socket.emit('match-res',{code:200,msg:"匹配成功",order:sm.length});
        for(let j = 0;j < players.length-1;j++){
          console.log(socket);
          socket.emit('player-join',players[j]);
        }
        for(let i = 0;i < players.length-1;i++){
          sm[i].emit('player-join',player);
        }
    });

    socket.on('play',data => {
        for(let i = 0;i < sm.length;i++){
          sm[i].emit('turn',{order:1});
        }
    })

    socket.on('ready',data => {
        for(let i = 0;i < sm.length;i++){
          
        }
    })

    socket.on('kill',data => {
        console.log(data.order+'击杀'+data.killNum+'号');
        sm[data.killNum-1].emit('hurt');
        const order = data.order==players.length?1:(data.order+1);
        for(let i = 0;i < sm.length;i++){
          sm[i].emit('turn',{order:order});
        }
    })

    socket.on('fail',data => {
      players.splice(data-1,1);
      sm.splice(data-1,1);
      if(sm.length==1){
        sm[0].emit('victory');
      }
      else{
        socket.emit('clean',data);
      }
    })

    socket.on('game-data',data => {
        
    });

});