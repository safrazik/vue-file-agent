// npm install express cors multer

var fs = require('fs');
var express = require('express');
var multer  = require('multer');
var cors = require('cors');
var path = require('path');
var uploadPath = path.join(__dirname, '..', 'uploads');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    // var filename = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
    // var filename = file.filename;
    var filename = file.originalname;
    cb(null, filename);
  }
});
var upload = multer({ storage: storage });

var app = express();

app.use(cors()); // enable CORS
app.use(express.json());
 
app.post('/upload', upload.single('file'), function(req, res, next) {
  console.log('UPLOAD ' + req.file.filename);
  res.json({my_whatever_key_from_server: req.file.filename});
});

app.delete('/upload', function(req, res, next) {
  var response = {};
  if(req.body && req.body.my_whatever_key_from_server){
    console.log('DELETE UPLOAD ' + req.body.my_whatever_key_from_server);
    fs.unlinkSync(path.join(uploadPath, req.body.my_whatever_key_from_server));
    response.deleted = true;
  }
  res.json(response);
});

app.listen(3000, function(){
    console.log("Working on port 3000");
});