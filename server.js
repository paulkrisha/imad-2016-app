var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one' : {
    title : 'Article one by Krishna',
    heading : 'Article One',
    date : 'September 21, 2016',
    content : ` <p>
                This is article one. This is article one.  This is article one.  This is article one
                 This is article one.  This is article one.  This is article one.  This is article one
                  This is article one.  This is article one.  This is article one.  This is article one.
            </p>
            <p>
                This is article one. This is article one.  This is article one.  This is article one
                 This is article one.  This is article one.  This is article one.  This is article one
                  This is article one.  This is article one.  This is article one.  This is article one.
            </p>
            <p>
                This is article one. This is article one.  This is article one.  This is article one
                 This is article one.  This is article one.  This is article one.  This is article one
                  This is article one.  This is article one.  This is article one.  This is article one.
            </p>`
    
},

     'article-two'  : {
    title : 'Article two by Krishna',
    heading : 'Article two',
    date : 'October 21, 2016',
    content : ` <p>
                This is  my second article.This is  my second article.This is  my second article.This is  my second article.
                This is  my second article.This is  my second article. This is  my second article. This is  my second article.
                This is  my second article. This is  my second article. This is  my second article. This is  my second article.
            </p>
            <p>
               This is  my second article.This is  my second article.This is  my second article.This is  my second article.
                This is  my second article.This is  my second article. This is  my second article. This is  my second article.
                This is  my second article. This is  my second article. This is  my second article. This is  my second article. 
            </p>
            <p>
                This is  my second article.This is  my second article.This is  my second article.This is  my second article.
                This is  my second article.This is  my second article. This is  my second article. This is  my second article.
                This is  my second article. This is  my second article. This is  my second article. This is  my second article.
            </p>`
    
},

     'article-three' : {
    title : 'Article three by Krishna',
    heading : 'Article Three',
    date : 'November 21, 2016',
    content : ` <p>
                This is  my third article.This is  my third article.This is  my third article.This is  my third article.
                This is  my third article.This is  my third article. This is  my third article. This is  my third article.
                This is  my third article. This is  my third article. This is  my third article. This is  my third article.
            </p>
            <p>
                This is  my third article.This is  my third article.This is  my third article.This is  my third article.
                This is  my third article.This is  my third article. This is  my third article. This is  my third article.
                This is  my third article. This is  my third article. This is  my third article. This is  my third article.
            </p>
            <p>
                This is  my third article.This is  my third article.This is  my third article.This is  my third article.
                This is  my third article.This is  my third article. This is  my third article. This is  my third article.
                This is  my third article. This is  my third article. This is  my third article. This is  my third article.
            </p>`
    
}

};
var articleone = {
    title : 'Article one by Krishna',
    heading : 'Article One',
    date : 'September 21, 2016',
    content : ` <p>
                This is article one. This is article one.  This is article one.  This is article one
                 This is article one.  This is article one.  This is article one.  This is article one
                  This is article one.  This is article one.  This is article one.  This is article one.
            </p>
            <p>
                This is article one. This is article one.  This is article one.  This is article one
                 This is article one.  This is article one.  This is article one.  This is article one
                  This is article one.  This is article one.  This is article one.  This is article one.
            </p>
            <p>
                This is article one. This is article one.  This is article one.  This is article one
                 This is article one.  This is article one.  This is article one.  This is article one
                  This is article one.  This is article one.  This is article one.  This is article one.
            </p>`
    
};


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
            ${date}
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

var counter=0;
app.get('/counter',function(req,res){
    counter = counter+1;
    res.send(counter.toString());
});
app.get('/:articleName', function(req,res) {
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
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
