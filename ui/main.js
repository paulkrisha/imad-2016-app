//console.log('Loaded!');
//var element = document.getElementById('main-text');
//element.innerHTML = 'This is dedicated to my father and mother';
//var img = document.getElementById('madi');
//var marginLeft = 0;
//function moveRight(){
  //  marginLeft = marginLeft+10;
    //img.style.marginLeft=marginLeft+'px';
//}
//img.onclick = function() {
  //  var interval=setInterval(moveRight,100);
//};


/* var button = document.getElementById('counter');
button.onclick = function(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
    }
    request.open('GET','http://paulkrisha.imad.hasura-app.io/counter',true);
    request.send(null);
}; 

var submit = document.getElementById('submit-btn');
submit.onclick = function(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                for(var i =0;i<names.length;i++){
                    list  += '<li>' + names[i] +'</li>';
                }
                var ul = document.getElementById('namelist');
                ul.innerHTML = list;
            }
        }
    }
     var nameInput = document.getElementById('name');
    var name = nameInput.value;
    request.open('GET','http://paulkrisha.imad.hasura-app.io/submit-name?name='+name,true);
    request.send(null);
    
}; */
function loadLoginForm(){
    var loginHtml = `
    <h3>Login/Register to unlock awsome features</h3>
    <input type="text" id = "username" placeholder = "username"/>
    <input type="password" id = "password" placeholder = "password"/>
    <br/><br/>
    <input type="submit" id ="login-btn" value ="Login"/>
    <input type="submit" id ="register-btn" value ="Register"/>
    `;
    document.getElementById('login-area').innerHTML = loginHtml;
    
    var submit = document.getElementById('login-btn');
    submit.onclick = function(){
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
               submit.value='Success!';
            }else if(request.status === 403){
                submit.value='Invalid credentials. Try again!';
            }else if (request.status === 500){
                alert('Something went wrong on the server');
                submit.value='Login';
            }
            loadLogin();
        }
        
        };
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST','/login',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username:username,password:password}));
    submit.value='Logging in.........';
    };
    
     
    var register = document.getElementById('register-btn');
    register.onclick = function(){
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
               alert('User created successfully');
               register.value='Registered!';
            }else{
                
                alert('Could not register the user!');    
                register.value='Register';
            }
        }
        
        };
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST','/create-user',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username:username,password:password}));
    register.value='Registering.........';
    };
}
    
    function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login-area');
    loginArea.innerHTML = `
        <h3> Hi <i>${username}</i></h3>
        <a href="/logout">Logout</a>
    `;
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                console.log(this.responsetext);
                loadLoggedInUser(this.responseText);
            } else {
                loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

function loadArticles () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if (request.status === 200) {
                var content = '<ul>';
                var articleData = JSON.parse(this.responseText);
                for (var i=0; i< articleData.length; i++) {
                    content += `<li>
                    <a href="/articles/${articleData[i].title}">${articleData[i].heading}</a>
                    (${articleData[i].date.split('T')[0]})</li>`;
                }
                content += "</ul>";
                articles.innerHTML = content;
            } else {
                articles.innerHTML='Oops! Could not load all articles!';
            }
        }
    };
    
    request.open('GET', '/get-articles', true);
    request.send(null);
}


// The first thing to do is to check if the user is logged in!
loadLogin();

// Now this is something that we could have directly done on the server-side using templating too!
loadArticles();
