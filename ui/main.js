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


var button = document.getElementById('counter');
button.onclick = function(){
    var request = new XMLhttpRequest();
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
    var request = new XMLhttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
    }    request.open('GET','http://paulkrisha.imad.hasura-app.io/counter',true);
    request.send(null);
};