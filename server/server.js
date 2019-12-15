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
    console.log('aa')
    connection.query(sqlStr,(err,results) => {

        if(err) return res.json({err_code:1,message:err,affectedRows:0})
        res.json(
            new Result({data:results})
        );
        console.log('申请音乐榜单成功！');

    })
})

app.get('/movieList',(req,res) => {
    // 定义SQL语句
    const sqlStr = 'select * from movieHOT'
    console.log('aa')
    connection.query(sqlStr,(err,results) => {

        if(err) return res.json({err_code:1,message:err,affectedRows:0})
        res.json(
            new Result({data:results})
        );
        console.log('申请电影各种巴拉巴拉成功！');

    })
})

app.get('/movieWanted',(req,res) => {
    // 定义SQL语句
    const sqlStr = 'select * from movieWanted'
    connection.query(sqlStr,(err,results) => {

        if(err) return res.json({err_code:1,message:err,affectedRows:0})
        res.json(
            new Result({data:results})
        );
        console.log('申请期待电影榜单成功！');

    })
})
app.post('/', function(req, res) {
    console.log(req.body.key);
    const sqlStr = 'select * from songTags where songID='+req.body.key
    connection.query(sqlStr,(err,results) => {

        if(err) return res.json({err_code:1,message:'获取失败',affectedRows:0})
        res.json(
            new Result({data:results})
        );

    })
});

app.post('/userlikes', function(req, res) {
    console.log(req.body.name);
    const sqlStr = "select * from usersong where username='"+req.body.name.trim()+"'";
    connection.query(sqlStr,(err,results) => {

        if(err) return res.json({err_code:1,message:err,affectedRows:0})
        res.json(
            new Result({data:results})
        );

    })
});

app.post('/singword', function(req, res) {
    console.log(req.body.name);
    const sqlStr = "select * from usermovie where username='"+req.body.name.trim()+"'";
    connection.query(sqlStr,(err,results) => {

        if(err) return res.json({err_code:1,message:err,affectedRows:0})
        res.json(
            new Result({data:results})
        );

    })
});

app.post('/userlikes/add', function(req, res) {


    const Regex=/\d+/;
    let matchResult=req.body.name.match(Regex);
    matchResult=matchResult[0]-'0';

    let nameResult=req.body.name.replace(Regex,"");
    let sqlStr ="insert into userlike(username,alike) VALUES ('"+nameResult.trim()+"',"+ matchResult+")";
    console.log(sqlStr);
    console.log(matchResult);
    connection.query(sqlStr,(err,results) => {

        if(err) return res.json({err_code:1,message:err,affectedRows:0})
        res.json(
            new Result({msg:'insert done'})
        );

    })
});


app.post('/movielike/add', function(req, res) {


    const Regex=/\d+/;
    let matchResult=req.body.name.match(Regex);
    matchResult=matchResult[0]-'0';

    let nameResult=req.body.name.replace(Regex,"");
    let sqlStr ="insert into movielike(username,alike) VALUES ('"+nameResult.trim()+"',"+ matchResult+")";
    console.log(sqlStr);
    console.log(matchResult);
    connection.query(sqlStr,(err,results) => {

        if(err) return res.json({err_code:1,message:err,affectedRows:0})
        res.json(
            new Result({msg:'insert done'})
        );

    })
});

app.post('/userlikes/delete', function(req, res) {


    const Regex=/\d+/;
    let matchResult=req.body.name.match(Regex);
    matchResult=matchResult[0]-'0';

    let nameResult=req.body.name.replace(Regex,"");
    let sqlStr ="delete from userlike where username='"+nameResult.trim()+"' and alike="+ matchResult;
    console.log(sqlStr);
    console.log(matchResult);
    connection.query(sqlStr,(err,results) => {

        if(err) return res.json({err_code:1,message:err,affectedRows:0})
        res.json(
            new Result({msg:'insert done'})
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
            console.log(req.body.key);
            console.log('打开歌词文件成功！');
            const sqlStr = 'select * from songTags where songID='+req.body.key
            connection.query(sqlStr,(err,results) => {

                if(err) return res.json({err_code:1,message:'获取失败',affectedRows:0})
                res.json(
                    new Result({msg:str,
                        data:results})
                );
                console.log('申请歌词对应作曲、标签等成功！');

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
