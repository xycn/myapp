var express = require('express');
var router = express.Router();
var path =  require('path');
var media = path.join(__dirname,"../public/media")
/* GET home page. */
router.get('/', function(req, res, next) {
   var fs = require('fs');
   fs.readdir(media,function(err,names){
      if(err){ 
      	console.log(err) 
      }else{   
      console.log('ss') ;  
       res.render('index', { title: 'active music' , music : names });
      }
   })
  
});

module.exports = router;
