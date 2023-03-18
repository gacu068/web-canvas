var canvas = document.getElementById('art');
var ctx = canvas.getContext('2d');
var co = document.getElementById('colorpicker');
var size = document.getElementById('size');
var den = document.getElementById('den');
var mode = 0;//bursh
var have_text = 0;
var start_x;
var start_y;
var stack = [];

//init
let state = ctx.getImageData(0, 0, canvas.width, canvas.height);
window.history.pushState(state, null);
stack.push(state);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var isDrawing, points = [ ], radius = 15;

function distanceBetween(point1, point2) {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

function angleBetween(point1, point2) {
  return Math.atan2( point2.x - point1.x, point2.y - point1.y );
}


function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}



canvas.addEventListener('mousedown', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  ctx.strokeStyle = co.value;
  ctx.lineWidth = size.value;
  console.log(mode);
  if(mode == 1 || mode == 0){
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(mousePos.x, mousePos.y);
    evt.preventDefault();
    console.log(mode);
    canvas.addEventListener('mousemove', mouseMove, false);
  }else if(mode == 2){
    //circle
    start_x = mousePos.x;
    start_y = mousePos.y;
    canvas.addEventListener('mousemove', mouseMove, false);
  }else if(mode == 3){
    //rectangle
    start_x = mousePos.x;
    start_y = mousePos.y;
    canvas.addEventListener('mousemove', mouseMove, false);
  }else if(mode == 4){
    //triangle
    start_x = mousePos.x;
    start_y = mousePos.y;
    canvas.addEventListener('mousemove', mouseMove, false);
  }else if(mode == 5){
    //text
    var font_type = document.getElementById('font_family').value;
    var font_size = document.getElementById('font_size').value;
    ctx.font = `${font_size}px ${font_type}`;
    console.log(font_size);
    if(have_text == 0)type_text(evt);
    console.log(ctx.font);
    /*
    ctx.fillText("Happy", mousePos.x, mousePos.y);
    */
  }else if(mode == 6){
    ctx.fillStyle = co.value;
    points.push({ 
    x: mousePos.x,
    y: mousePos.y,
    radius: getRandomInt(5, size.value),
    opacity: Math.random()
    });
    canvas.addEventListener('mousemove', mouseMove, false);
  }else if(mode == 7){
    ctx.fillStyle = co.value;
    ctx.lineJoin = ctx.lineCap = 'round';
    canvas.addEventListener('mousemove', mouseMove, false);
  }else if(mode == 8){
    start_x = mousePos.x;
    start_y = mousePos.y;
    canvas.addEventListener('mousemove', mouseMove, false);
  }
});

function mouseMove(evt) {
  if(mode == 1 || mode == 0){
    var mousePos = getMousePos(canvas, evt);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
  }else if(mode == 2){
    //circle
    draw_circle(evt);
  }else if(mode == 3){
    //rectangle
    draw_rectangle(evt);
  }else if(mode == 4){
    //triangle
    draw_triangle(evt);
  }else if(mode == 6){
    var mousepos = getMousePos(canvas, evt);
    points.push({ 
      x: mousepos.x, 
      y: mousepos.y,
      radius: getRandomInt(5, size.value),
      opacity: Math.random()//透明
    });
    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    var img = stack[stack.length - 1];
    ctx.putImageData(img, 0, 0);
    for (var i = 0; i < points.length; i++) {
      ctx.beginPath();
      ctx.globalAlpha = points[i].opacity;
      ctx.arc(
        points[i].x, points[i].y, points[i].radius, 
        false, Math.PI * 2, false);
        console.log(points[i].radius);
      ctx.fill();
    }
  }else if(mode == 7){
    var mousepos = getMousePos(canvas, evt);
    //console.log(den.value);
    for (var i = den.value; i--; ) {
      var radius = size.value;
      var offsetX = getRandomInt(-radius, radius);
      var offsetY = getRandomInt(-radius, radius);
      ctx.fillRect(mousepos.x + offsetX, mousepos.y + offsetY, 1, 1);
    }
  }
}

canvas.addEventListener('mouseup', function() {
  canvas.removeEventListener('mousemove', mouseMove, false);
  if(mode == 6)points.length = 0;
  var state = ctx.getImageData(0, 0, canvas.width, canvas.height);
  window.history.pushState(state, null);
  stack.push(state);
}, false);



//clean the board
document.getElementById('reset').addEventListener('click', function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var state = ctx.getImageData(0, 0, canvas.width, canvas.height);
  window.history.pushState(state, null);
  stack.push(state);
}, false);

//change to erase mode
const erase = () => {
  document.getElementById('art').style.cursor = 'url("eraser.png") 0 20,default';
  ctx.globalCompositeOperation = 'destination-out';
  mode = 1;
}

//change to brush mode
const change_brush = () => {
  mode = 0;
  ctx.strokeStyle = co.value;
  document.getElementById('art').style.cursor = 'url("pencil.png") 0 35,auto';
  //var img = stack[stack.length - 1];
  //ctx.putImageData(img, 0, 0);
  ctx.globalCompositeOperation = 'source-over';
}
change_brush();

//change to brush2
const change_brush2 = () => {
  mode = 6;
  document.getElementById('art').style.cursor = 'url("ch.png"),default';
  ctx.globalCompositeOperation = 'source-over';
}

//change to spray
const change_spray = () => {
  mode = 7;
  document.getElementById('art').style.cursor = 'url("spray.png"),default';
  ctx.globalCompositeOperation = 'source-over';
}

const change_marker = () => {
  mode = 8;
  document.getElementById('art').style.cursor = 'url("spray.png"),default';
  ctx.globalCompositeOperation = 'source-over';
}

//change to circle
const change_circle = () => {
  mode = 2;
  document.getElementById('art').style.cursor = 'url("circle.png"),default';
  var state = ctx.getImageData(0, 0, canvas.width, canvas.height);
  stack.push(state);
  console.log(stack.length-1);
  ctx.globalCompositeOperation = 'source-over';
}

function draw_circle(evt){
  var rect = canvas.getBoundingClientRect();
  var now_x = evt.x - start_x - rect.left;
  var now_y = evt.y - start_y - rect.top;
  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log(stack.length-1);
  var img = stack[stack.length - 1];
  ctx.putImageData(img, 0, 0);
  ctx.arc(start_x, start_y, Math.sqrt(now_x * now_x + now_y * now_y), 0, 2 * Math.PI);
  ctx.stroke();
  console.log("circle");
}

//change to rectangle
const change_rectangle = () => {
  mode = 3;
  document.getElementById('art').style.cursor = 'url("rec.png"),default';
  var state = ctx.getImageData(0, 0, canvas.width, canvas.height);
  stack.push(state);
  ctx.globalCompositeOperation = 'source-over';
}

function draw_rectangle(evt){
  var rect = canvas.getBoundingClientRect();
  var now_x = evt.x - start_x - rect.left;
  var now_y = evt.y - start_y - rect.top;
  ctx.beginPath();
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  var img = stack[stack.length - 1];
  ctx.putImageData(img, 0, 0);
  ctx.rect(start_x, start_y, now_x, now_y);
  ctx.stroke();
  console.log("rectangle");
}

//change to triangle
const change_triangle = () => {
  mode = 4;
  document.getElementById('art').style.cursor = 'url("tri.png"),default';
  var state = ctx.getImageData(0, 0, canvas.width, canvas.height);
  stack.push(state);
  ctx.globalCompositeOperation = 'source-over';
}

function draw_triangle(evt){
  var rect = canvas.getBoundingClientRect();
  var now_x = evt.x - start_x - rect.left;
  var now_y = evt.y - start_y - rect.top;
  ctx.beginPath();
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  var img = stack[stack.length - 1];
  ctx.putImageData(img, 0, 0);
  ctx.moveTo((start_x + evt.x - rect.left) / 2,start_y);
  ctx.lineTo(start_x,evt.y - rect.top);
  ctx.lineTo(evt.x - rect.left, evt.y - rect.top);
  ctx.closePath();
  ctx.stroke();
  console.log("triangle");
}

//change to text
const change_text = () => {
  mode = 5;
  document.getElementById('art').style.cursor = 'text';
}

function type_text(evt){
  have_text = 1;
  var textPos = getMousePos(canvas, evt);
  var text = document.createElement('input');
  text.type = "text";
  console.log("text");
  text.style.position = "absolute";
  text.style.left = evt.x + 'px';
  text.style.top = evt.y + 'px';
  document.body.appendChild(text);
  console.log(text.style.left);
  text.addEventListener("keydown", function (e) {
    if (e.key == 'Enter') {
      document.body.removeChild(text);
      ctx.fillText(text.value, textPos.x, textPos.y);
      console.log("Enter");
      have_text = 0;
      var state = ctx.getImageData(0, 0, canvas.width, canvas.height);
      window.history.pushState(state, null);
      stack.push(state);
    }
  })
}

function download(){
  var sa = document.createElement('a');
  sa.download = "canvos.png";
  sa.href = canvas.toDataURL();
  sa.click();
  console.log("download");
}

window.addEventListener('popstate', changeStep, false);
function changeStep(e){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if( e.state ){
    ctx.putImageData(e.state, 0, 0);
  }
}

function cPush() {
    cStep++;
    if (cStep < cPushArray.length) { cPushArray.length = cStep; }
    cPushArray.push(document.getElementById('art').toDataURL());
    console.log(cStep);
}

function cUndo() {
  window.history.back();
  //do_stack();
  console.log(stack.length-1);
  change_brush();
}

function cRedo() {
  window.history.forward();
  //do_stack();
  console.log(stack.length-1);
  change_brush();
}

function do_stack(){
  var state = ctx.getImageData(0, 0, canvas.width, canvas.height);
  stack.push(state);
}

var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
function handleImage(e){
  var reader = new FileReader();
  reader.onload = function(event){
      var img = new Image();
      img.onload = function(){
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img,0,0);
      }
      img.src = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);
  console.log("upload");  
  /*var state = ctx.getImageData(0, 0, canvas.width, canvas.height);
  window.history.pushState(state, null);
  stack.push(state); */
}




