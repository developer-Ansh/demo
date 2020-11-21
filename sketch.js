var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,ground

var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10); 
  ground.velocityX = -4;
  ground.x = ground.width /2;
  console.log(ground.x);
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();

  
}


function draw() {
  background("orange");
 if(ground.x < 0) {
   ground.x = ground.width/2
 }
     
  
  if (gameState === PLAY){
       stroke("black");
      textSize(20);
      fill("black");
      survivalTime = Math.ceil(frameCount/frameRate())
      text("Survival Time: " + survivalTime,100,50);

    if(keyDown("space") && monkey.y >= 314) {
    monkey.velocityY = -18;

  }
    monkey.velocityY = monkey.velocityY + 0.8
  
       banana();
       obstacles();
    
    if(obstacleGroup.isTouching(monkey)) {
      gameState = END;
    }
  }
  
  if (gameState === END) {
    FoodGroup.setVelocityXEach(0); 
    obstacleGroup.setVelocityXEach(0);
  }
  monkey.collide(ground);
  
  drawSprites();
}


function banana(){
  
  if(frameCount % 80 === 0){
    var banana = createSprite(400,120,40,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 316;
    
    FoodGroup.add(banana);
  }
   
}

function obstacles(){
  if(frameCount % 200 === 0){
    var obstacle = createSprite(400,330,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    obstacle.scale = 0.15;
    
    obstacleGroup.add(obstacle);
  }
}





