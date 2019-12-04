const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors=require('cors');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require("fs");


const port = process.env.PORT || 8080;

// express routing
app.use(express.static('public'));
app.use(bodyParser.json())//json请求
app.use(bodyParser.urlencoded({extended:false}));//表单请求
app.use(cors());

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host: '116.62.222.138',
    user: 'aliyun',
    password: '123456',
    database: 'classdemo',
    port: 3306
});//配置数据库
connection.connect();

app.get('/',(req,res) => {
    // 定义SQL语句
    const sqlStr = 'select * from user'
    connection.query(sqlStr,(err,results) => {

        if(err) return res.json({err_code:1,message:'获取失败',affectedRows:0})
        res.json(
            new Result({data:results})
        );

    })
})
app.get('/musicRank',(req,res) => {
    // 定义SQL语句
    const sqlStr = 'select * from musicRank'
    connection.query(sqlStr,(err,results) => {

        if(err) return res.json({err_code:1,message:'获取失败',affectedRows:0})
        res.json(
            new Result({data:results})
        );

    })
})
app.post('/', function(req, res) {
    console.log('post............');
    console.log(req.body.key);
    const sqlStr = 'select * from songTags where songID='+req.body.key
    connection.query(sqlStr,(err,results) => {

        if(err) return res.json({err_code:1,message:'获取失败',affectedRows:0})
        res.json(
            new Result({data:results})
        );

    })
});


app.post('/singword/', function(req, res) {
    console.log('reading singword...');
    //console.log(req.body.key);
    let str;
    fs.readFile('./wordContent/content.txt',{encoding:"utf-8"}, function (err, fr) {
        //readFile回调函数
        if (err) {
            console.log(err);
        }else {
            str = fr;
            console.log(str)

            console.log(req.body.key);
            const sqlStr = 'select * from songTags where songID='+req.body.key
            connection.query(sqlStr,(err,results) => {

                if(err) return res.json({err_code:1,message:'获取失败',affectedRows:0})
                res.json(
                    new Result({msg:str,
                        data:results})
                );

            })
        }
    });

});

function Result({code=1,msg='',data={}}){
    this.code=code;
    this.msg=msg;
    this.data=data;
}



// signaling
io.on('connection', function(socket){
    console.log('a user connecteda');
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
      socket.broadcast.emit('chat message', msg);
    });
  });
  


// listener
http.listen(port || 8080, function () {
    console.log('listening on', port);
});
