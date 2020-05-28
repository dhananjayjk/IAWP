var express = require('express');
var router = express.Router();
// var authenticate = require('../authenticate');

const bodyParser = require('body-parser');
var User = require('../models/user');
// var passport = require('passport');

router.use(bodyParser.json());

router.get('/',function(req,res,next){
  if(req.body.username!="Dhananjay" || req.body.password!="!@#$%^&*()_+"){
    res.json({status:"Failed"});
    return;
  }
  User.find({})
  .then((users) =>{
    res.statusCode = 200;
    res.render("users",{users:users});
  },(err) => next(err))
  .catch((err) => next(err));
});

router.post('/signup', (req, res, next) => {
  let user=User.findOne({email: req.body.email});
  if(user){
    return;
  }
  user =new User({firstname: req.body.firstname,lastname:req.body.lastname,email:req.body.email}); 
  user.save();    
});

module.exports = router;