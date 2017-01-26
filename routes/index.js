var express = require('express');
var router = express.Router();
var User = require('../model/User');
//var session = require('client-sessions');

/* GET home page. */
router.get('/', function(req, res, next) {
  //disallow robots
  if('/robots.txt'==req.url)res.render('robots.txt');
  //res.render('index', { title: 'Express' });
  //res.sendfile('views/index.html');
  //res.sendFile('index.html',{"root":'views'});

  if('/images/leo.jpg'==req.url){
    res.end('Hmm');
  }
  res.render( 'index', { name : 'Hi Liang' });
});

//Search
router.get('/search?'),(req,res)=>{
  /*var search = req....
  File.find({'filename':search},(err,file)=>{
    if(!file){
      res.end('Find not found');
    }else{
      //show file
    }
  }
  });*/
  res.end('file not found');
}

//login
router.post('/login',(req,res)=>{
  var email = req.body.email;
  var password = req.body.password

  //Not validtae input yet
  User.findOne({'email' : email},(err,user)=>{
    if(!user){
      res.end('User not found');
    }
    else if(password===user.password){
      req.session_notesource.user = user;

      res.redirect('/users');
      /*res.cookie('session_id' , email,{ httpOnly: true })//encrypt cookie
      .status(200).render('user',{ name : user.fname });
      res.redirect('/users');*/
    }
  });

});


//register
router.post('/register',(req,res)=>{
  var email = req.body.email;
  var password = req.body.password;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var university = req.body.university;
  var faculty = req.body.faculty;

  var newuser = new User();
  newuser.email = email;
  newuser.password = password;
  newuser.fname= fname;
  newuser.lname = lname;
  newuser.university = university;
  newuser.faculty = faculty;

  User.count({'email':email},(err,num)=>{//check duplicate users
    if(err)res.sendFile('error.html',{"root":'views'});
    if(num)res.end('This email is already use');
    else{
      newuser.save((err,newuser)=>{//add user
        if(err){
          console.log(err);
          res.status(500).send();
        }
        /*
        res.cookie('session_id' , email,{ httpOnly: true })//encrypt cookie
          .status(200).render('user',{ name : fname });*/
          req.session_notesource.user = newuser;
          res.redirect('/users');
      });
    }
  });

});

module.exports = router;
