var express = require('express');
var User = require('../model/User');//database driver
//var multer = require('multer');
//var upload = multer({ dest: 'uploads/' })//upload file module
var fs = require('fs');//file system
var os = require('os');
var formidable = require('formidable');
var gm = require('gm');//Grapihc Magic (resize image)
var app = require('../app');

var router = express.Router();
/* GET users listing. */
var name;
router.get('/', function(req, res, next) {
  //res.sendfile('views/user.html');
  //res.sendFile('user.html',{"root":'views'})
  console.log(req.session_notesource);
  var user = req.session_notesource.user;
  if(user){
    name = user.fname;
    res.render( 'user', { name : user.fname ,host:req.app.get('host')});//parameter for ejs
  }else{
    name = 'Wasin(ejs)';
    res.render( 'user', { name : 'Wasin(ejs)',host:req.app.get('host')});//parameter for ejs
  }
});

//log out
router.get('/logout', function(req, res) {
  req.session_notesource.reset();
  res.redirect('/');
});

//upload file
router.post('/upload',(req,res,next)=>{
  function generateFilename(filename){
    var ext_regex = /(?:\.([^.]+))?$/;
    var ext = ext_regex.exec(filename)[1];
    var date = new Date().getTime();
    var charBank = 'abcdefghijklmnopqrstuvwxyz';
    var fstring ='';
    for(var i=0;i<15;i++)fstring+=charBank[parseInt(Math.random()*26)];
    return (fstring+=date+'.'+ext);
  }
  var tmpFile,nfile,fname;
  var newForm = new formidable.IncomingForm();//recieve new form that come in
  newForm.keepExtensions = true;
  newForm.parse(req,(err,fields,files)=>{
    tmpFile = files.upload.path;
    fname = generateFilename(files.upload.name);//generate filename to store
    nfile = os.tmpDir()+'/'+fname;//os.tmpDir is tmp directory on the server
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end();
  });

  newForm.on('end',()=>{//when 'end' method being called

    fs.rename(tmpFile,nfile,()=>{
      //Resize the image and upload to S3 bucket
      gm(nfile).resize(300).write(nfile,()=>{
        //upload to S3 bucket
        fs.readFile(nfile,(err,buffer)=>{
          var knoxClient = app.knoxClient;
          var req = knoxClient.put(fname,{
            'Content-Length':buffer.length,
            'Content-Type':'image/jpeg'
          });//PUT METHOD for putting the file

          req.on('response',(res)=>{
            if(res.statusCode==200){
              //file is in S3 bucket
              console.log('uploaded file!!');
            }
          });
          req.end(buffer);
        });
      });

    });
  });
});

module.exports = {
  router,
  name
}
