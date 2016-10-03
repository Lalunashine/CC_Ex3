// global variables
var upX = 300; var dnX = 300;     // used for tangram
var upY = 200; var dnY = 200;

var speed = 0; var gravity = 0.1; // used for bouncing box
var y = 180;   var r = 255;

var p = 500; var q = 340;         // used for controlling button
var w = 80;  var h = 60;
var g = 0;   var gChange = 1;
var isButton = false;
var bgColor = 255;

var stepX = 0; var stepY = 0;     // used for moving spaceship

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(bgColor); // use a var to set the background
  
  drawTangram(); // draw a tangram at the center of screen
  moveTangram(); // make the tangram dispersed around 
 
  if((upX > 580) && (upY > 380)) {  // when tangram almost diappears  
    spaceShip(140, 160, 120, 50);   // draw 3 spaceships 
    spaceShip(310 + stepX, 240 + stepY, 50, 100);
    spaceShip(480, 80 + stepY, 200, 150);
    bouncingBox(140,20);    // draw a bouncing box under the first spaceship
    button();               // draw a button that can change the bgColor by mouseClick
  }
 
  flowerCursor(); // draw a flower cursor
  
  // if key pressed, spaceship moves
  if (keyIsDown) {
    // print("key is: " + key); 
    if (key == 'w') {         // if press 'w', two spaceships move up
      stepY -= 2;      
      if (stepY < -100) {     // if out of screen, 
      stepY = 380;            // come back from the bottom side of the screen
      }
    }
    if (key == 's') {         // if press 's', two spaceships move down
      stepY += random(2,5);      
      if (stepY > 360) {      // if out of screen, 
      stepY = -120;           // come back from the top side of the screen
      }
    }  
    if (key == 'a') {         // if press 'a', the middle one moves to left
      stepX -= random(3,6);      
      if (stepX < -300) {     // if out of screen,
      stepX = 300;            // come back from the right side of the screen
      }
    }
    if (key == 'd') {         // if press 'd', the middle one moves to the right
      stepX += 8;      
      if (stepX > 300) {      // if out of screen
      stepX = -300;           // come back from the left side of the screen
      }  
    }   
  }    
}

/*  ----- function colletion -----  */

// 1. fn to create flower cursor
function flowerCursor() {
  for (var a = 0; a < 360; a += 72) {  // 5 petals
    var xoff = cos(radians(a)) * 10;   // x coordinate offset for petals 
    var yoff = sin(radians(a)) * 10;   // y coordiante offset for petals
    noStroke();
    fill(255, 100, 150);                                // draw petals around
    ellipse(touchX-20 + xoff, touchY-5 + yoff, 10, 10); // (mouseX-20, mouseY-5) 
  }
  ellipse(touchX-20, touchY-5, 5, 5);  // draw the flower heart
}  

// 2. fn to draw a spaceship
function spaceShip(x, y, w, c) {
  var d = w * 0.08; // diameter of eye
  noStroke();
  fill(c);
  ellipse(x, y, w, w/4);        // base
  ellipse(x, y-w/10, w/3, w/3); // head
  
  fill(255);
  ellipse(x - d*2, y, d, d); // left eye
  ellipse(x + d*2, y, d, d); // right eye
}  

// 3. fn to make a bouncing box on the bottom
function bouncingBox(x, w) {
  noStroke();
  fill(r,100,100);
  rectMode(CENTER);
  rect(x, y, w, w);        // draw a rect ball
  
  speed = speed + gravity; // here speed increases by gravity,
  y = y + speed;           // box drops faster gradually
  r = r - speed;           // its color changes gradually
 
  if(y > height) {         // if the box goes out of the window,
    speed = speed * -0.98; // make the speed reverse(-)
    y = height;            // and add a "dampening" effect(0.98, not 1)
  }  
}  

// 4/5. fn to make a button controlling the background brightness
function button() {    
  if (isButton) {  // if button is pressed
    bgColor = 50;  // change the background color
  } else {
    bgColor = 255;
  }
  noStroke();
  fill(200,g,100);
  rect(p, q, w, h,80);    // draw a rect button
  
  g = g + gChange;        // let the g value of color change automatically.
  if (g < 0 || g > 255) { // if g value is out of range 0-255,
    gChange *= -1;        // let g value returns the range
  }
}  

function mousePressed() { // only press mouse on the area of button, bgColor can be switched
  if (touchX > p && touchX < p+w/2 && touchY > q && touchY < q+h/2) {
    isButton = !isButton;
  }  
}

// 6. fn to move a tangram ---
function moveTangram() {
  dnX = dnX - 1.2; // go left
  dnY = dnY - 0.8; // go up
  upX = upX + 1.2; // go right
  upY = upY + 0.8; // go down
}  

// 7. fn to display a tangram ---
function drawTangram() {    
  noStroke();
  fill(180, 0, 0); // red tri
  triangle(dnX, 200, dnX-50, 150, dnX-50, 250); // if move, go left
  
  fill(0, 0, 120); // blue tri
  triangle(300, dnY, 250, dnY-50, 350, dnY-50); // if move, go up
  
  fill(0, 200, 100); // green tri
  triangle(upX+50, dnY-50, upX+25, dnY-25, upX+50, dnY); // if move, go right top
  
  fill(255, 255, 120); // parallelogram
  quad(dnX-50, upY+50, dnX-25, upY+25, dnX+25, upY+25, dnX, upY+50); // if move, go left bottom
  
  fill(100, 200, 200, 90); // square
  quad(upX, 200, upX+25, 175, upX+50, 200, upX+25, 225); // if move, go right
  
  fill(200); // quarter circle
  arc(upX+50, upY+50, 50*sqrt(2), 50*sqrt(2),PI,PI+HALF_PI); // if move, go right bottom
}  
