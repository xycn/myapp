var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express2' });
});
router.get('/demo/', function(req, res, next) {
  res.render('starflow', { title: 'Express' });
});
router.get('/guaguale/', function(req, res, next) {
  res.render('guaguale', { title: 'Express' });
});
router.get('/jiugongge/', function(req, res, next) {
  res.render('jiugongge', { title: 'Express' });
});
router.get('/cut_image/', function(req, res, next) {
  res.render('cut_image', { title: 'Express' });
});
router.get('/daojishi/', function(req, res, next) {
  res.render('daojishi', { title: 'Express' });
});
router.get('/perspective/', function(req, res, next) {
  res.render('perspective', { title: 'Express' });
});
router.get('/fanye/', function(req, res, next) {
  res.render('fanye', { title: 'Express' });
});
router.get('/angular/', function(req, res, next) {
  res.render('angular', { title: 'Express' });
});
router.get('/datePick/', function(req, res, next) {
  res.render('datePick', { title: 'Express' });
});
router.get('/calc/', function(req, res, next) {
  res.render('calc', { title: 'Express' });
});
module.exports = router;
