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
var submit = document.getElementById('submit-btn');
submit.onclick = function(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
               alert('Logged in successfully');
            }else{
                console.log('you are not logged in');
            
            if(request.status === 403){
                alert('username/password incorrect');
            }else if (request.status === 500){
                alert('Something went wrong on the server');
            }
            }
        }
        
    };
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST','http://paulkrisha.imad.hasura-app.io/login',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username:username,password:password}));
};