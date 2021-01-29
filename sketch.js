var bg;
var balloon,balloonImg;
var database;
var Position;
function preload(){
  bg=loadImage("pro-C35 images/hb1.png")
  balloonImg1= loadAnimation("pro-C35 images/hb2.png")
  balloonImg2=loadAnimation("pro-C35 images/hb2.png","pro-C35 images/hb3.png","pro-C35 images/hb4.png")
}
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImg1);
  balloon.scale=0.5;

  var balloonheight=database.ref('balloon/position')
  balloonheight.on("value",readPosition, showError);

}

function draw() {
  background(bg);  
  if(keyDown(LEFT_ARROW)){
    updatePosition(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImg2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updatePosition(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImg2);
  }
  else if(keyDown(UP_ARROW)){
    updatePosition(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImg2);
    balloon.scale=balloon.scale-0.005;
  }
 else if(keyDown(DOWN_ARROW)){
    updatePosition(0,10);
    balloon.addAnimation("hotAirBalloon",balloonImg2);
    balloon.scale=balloon.scale+0.005;
  }
  drawSprites();

fill(0);
textSize(25)
text("use arrow keys to move the hot air balloon!",40,40)
}

function updatePosition(x,y){
  database.ref('balloon/position').set({
    'x': Position.x + x ,
    'y': Position.y + y
  })
}

function readPosition(data){
  Position=data.val()
  balloon.x = Position.x;
  balloon.y = Position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
