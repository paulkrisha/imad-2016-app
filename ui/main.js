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

var button =document.getElementById('counter');
var counter = 0;
button.onclick = function(){
  //  var request = new XMLhttpRequest();
   // request.onreadystatechange = function() {
   //     if(request.readyState === XMLhttpRequest.DONE){
    //        if(request.status === 200){
   //             var counter = request.responseText;
    counter = counter + 1;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
   //         }
    //    }
    //};
    //request.open('GET','http://paulkrisha.imad.hasura-app.io/counter',true);
    //request.send(null);
};