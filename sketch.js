var score = 0;  
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  
}

function setup() {
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
 
  
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  doorsGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
   
  

}


function draw() {
  background(255);
 
  if (gameState === "play") {
    

 //scoring



    if(keyDown("left_arrow")){
     ghost.velocityX=-5
     ghost.velocityY=0 // write a code to move left when left arrow is pressed
    }
    if(keyDown("right_arrow")){
      ghost.velocityX=5
      ghost.velocityY=0
    }
    
      // write a code to move left when right arrow is pressed
      
    
    if(keyDown("space")){
      ghost.velocityY=-7
   
      // write a code to move up when space arrow is pressed
      
    }
  
   ghost.velocityY = ghost.velocityY + 0.8;
  
   
      //write a condition for infinte scrolling tower
    if(tower.y>600){
     tower.y=height/2;
    }
       
      spawnDoors();
       

    if(climbersGroup.isTouching(ghost)){
        ghost.velocityX=0
        ghost.velocityY=0
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
       ghost.velocityX=0;
       ghost.velocityY=0;
       gameState = "end"
      }
      
      drawSprites();
    }
    
    if (gameState === "end"){
      background(100);
      stroke("yellow");
      fill("yellow");
      textSize(30);
      text("Game Over", 230,250)
    }
  
  
}


 
  function spawnDoors() {
   if (frameCount % 240 === 0) {
     var door = createSprite(200, -50);
     var climber = createSprite(200,10);
     var invisibleBlock = createSprite(200,15);
     door.x = Math.round(random(80,540));
     climber.x =door.x
     invisibleBlock.width = climber.width;
     invisibleBlock.x=climber.x
     invisibleBlock.height = 2;
     invisibleBlock.velocityY = 1;
     invisibleBlock.visible=false;
     door.addImage(doorImg);
     climber.addImage(climberImg);
     climber.velocityY = 1;
     door.velocityY = 1;
     climbersGroup.add(climber);
     invisibleBlockGroup.add(invisibleBlock);
     doorsGroup .add(door);
    
     door.lifetime = 500;
     climber.lifetime=500;
     invisibleBlock.lifetime=500;
  
     ghost.depth = door.depth;
     door.depth = door.depth - 1;
    
  }
  
    
   
  }

