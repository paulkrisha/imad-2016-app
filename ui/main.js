console.log('Loaded!');
var element = document.getElementById('main-text');
element.innerHTML = 'This is dedicated to my father and mother';
var img = document.getElementById('madi');
var marginLeft = 0;
function moveRight(){
    marginleft = marginLeft+10;
    img.style.marginLeft=marginLeft+'px';
}
img.onclick = function() {
    var interval=setInterval(moveRight,100);
};