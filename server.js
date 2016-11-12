var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var app = express();
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config={
    user:'paulkrisha',
    database:'paulkrisha',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

app.use(morgan('combined'));
app.use(bodyParser.json());

function createTemplate(data){
var title = data.title;
var heading = data.heading;
var date = data.date;
var content = data.content;
var htmlTemplate = ` <html>
  <head>
      <title>
        ${title}
      </title>
      <link href="/ui/style.css" rel="stylesheet" />
  </head>  
    
  <body>
  <div class="container">
      <div>
          <a href='/'>Home</a>
      </div>
      <h3>${heading}</h3>
  
        <div>
          ${date.toDateString()}
        </div>
        <div>
            
            ${content}
        </div>
        </div>
  
  </body>  
    
   
</html>`;
return htmlTemplate;
}

var pool = new Pool(config);


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}

app.get('/hash/:input',function(req,res){
    var hashedString = hash(req.params.input,'tihis-is-some-random-string');
    res.send(hashedString);
});

app.post('/create-user',function(req,res){
    var username=req.body.username;
    var password = req.boby.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    pool.query('insert into "user" (username,password) values ($1,$2)',[username,password], function(err,result){
        if(err){
            res.status(500).send(err.toString());
        } else{
            res.send('User successfully created ; ' + username)
        }
    });
});




//var pool = new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('select * from test',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result.rows));
        }
    });
});

var counter=0;
app.get('/counter',function(req,res){
    counter = counter+1;
    res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function(req,res) {
    var name = req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});


app.get('/articles/:articleName', function(req,res) {
    pool.query("SELECT * FROM article WHERE title = $1" , [req.params.articleName], function(err,result){
        if (err){
            res.status(500).send(err.toString());
        }
        else {
            if (result.rows.length===0){
                res.status(404).send('Article not found');
            }
            else {
                var articleData=result.rows[0];
                res.send(createTemplate(articleData)); 
                //res.send(JSON.stringify(articleData));
                }
        }
    });
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
