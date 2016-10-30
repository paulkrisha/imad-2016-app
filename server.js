var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var app = express();

var config={
    user:'paulkrisha',
    database:'paulkrisha',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:'db-paulkrisha-30931'
};

app.use(morgan('combined'));

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
          ${date}.toDateString()
        </div>
        <div>
            
            ${content}
        </div>
        </div>
  
  </body>  
    
   
</html>`;
return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
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
                //var articleData=result.row[0];
                //res.send(createTemplate(articleData)); 
                res.send(JSON.stringify(result.rows));
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
