var express = require('express');
var router = express.Router();
var multer = require('multer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'eunbi',
    user:'eunbi',
    password:'',
    database:''
});

var s3 = require('multer-storage-s3');
var storage = s3({
    destination : function(req,file,cb){
        cb(null,'file/');
    },
    filename : function(req,file,cb){
        cb(null, Data.now() + "." + file.originalname.split('.').pop() );
    },
    backet : 'eunbi',
    region : 'ap-northeast-2'
});

var upload = multer({ storage : storge });

router.get("/",function(req,res){
    res.render('fileup',function(error,content){
        if(!error)
            res.end(content);
        else{
            res.writeHead(501, {'Content-Type' : 'text/plain'});
            res.end("error");
        }
    });
});

router.post('/upload',upload.single('userphoto',function(req,res,next){
    var file_name = req.file.filename;
    var file_path = req.file.s3.Location;
    connection.query('insert into file(filename,path) values (?,?);',
                    [file_nmae, file_path],function(error,info){
                        if(error!=undefined)
                            res.sendStatus(503);
                        else
                            res.send('file was uploaded successfully');
    });
});
        
module.exports = router;