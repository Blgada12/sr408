var express = require('express');
var app = express();
var cons = require('consolidate');
var bodyParser = require('body-parser')
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('db'));
app.engine('html', cons.swig);
app.set('view engine', 'html')
app.set('views', __dirname + "/db")

app.get('/idpsword', function(req, res){
  fs.readdir('passwordata', function(err, files){
    if(err){
      console.log(err);
    }
      res.render('IDPS.jade', {topics:files});
  });
});

app.get('/idpsword/:id', function(req, res){
  var id1 = req.params.id;
  fs.readFile('passwordata/'+id1, 'utf8', function(err, data){
    if(err) {
      console.log(err);
    }
    res.send(data);
  });
});

app.post('/rg_receiver', function(req, res){
  var ID = req.body.ID;
  var password = req.body.password;
  var logins = `
  <script>
    window.alert("회원가입 하였습니다!")
  </script>
  <a href='/'>메인으로</a>
  `
  fs.writeFile('passwordata/'+ID, password, function(err){
    if(err){
      console.log("error")
    }
    res.send(logins);
  });
});



app.get('/', function (req, res) {
  res.render('index.html');
});

app.get('/login', function (req, res){
  res.render('login.html');
});

app.get('/register', function (req, res){
  res.render('rg.html');
});

app.listen(3000, function () {
  console.log('conneted port 3000!');
});
