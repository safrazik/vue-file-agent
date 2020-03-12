// npm install express cors multer

var fs = require('fs');
var express = require('express');
var multer = require('multer');
var cors = require('cors');
var path = require('path');
var uploadPath = path.join(__dirname, '..', 'uploads');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    // var filename = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
    // var filename = file.filename;
    var filename = file.originalname;
    cb(null, filename);
  },
});
var upload = multer({ storage: storage });

var app = express();

app.use(cors()); // enable CORS
app.use(express.json());

app.post('/upload', upload.single('file'), function(req, res, next) {
  console.log('UPLOAD ' + req.file.filename);
  res.json({ my_key: req.file.filename }); // you can send any arbitrary data to client which will be saved in fileRecord.upload key in client, and will be sent back to server at update/delete request
});

app.put('/upload', function(req, res, next) {
  var response = {};
  if (req.body && req.body.my_key && req.body.filename) {
    console.log('UPDATE UPLOAD ' + req.body.my_key);
    fs.rename(path.join(uploadPath, req.body.my_key), path.join(uploadPath, req.body.filename), (err) => {
      if (err) throw err;
      console.log('Rename complete!', req.body.my_key, req.body.filename);
      response.my_key = req.body.filename;
      console.log('Rename complete!', response);
      res.json(response);
    });
  }
});

app.delete('/upload', function(req, res, next) {
  var response = {};
  if (req.body && req.body.my_key) {
    console.log('DELETE UPLOAD ' + req.body.my_key);
    fs.unlink(path.join(uploadPath, req.body.my_key), (err) => {
      if (err) throw err;
      console.log(req.body.my_key + ' was deleted');
      response.deleted = true;
      res.json(response);
    });
  }
});

app.listen(3000, function() {
  console.log('Working on port 3000');
});
