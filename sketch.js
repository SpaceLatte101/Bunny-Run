var groundImg, ground, invisibleGround;
var bunnyIdle, bunny, bunny_run, bunnyDeath, bunnyJump;

var START = 1;
var PLAY = 2;
var END = 3;

var coins = 0;
var coinsImg;

var gameState = START;

var gameOverImg, restartImg, startImg, nameImg;


var obstacleGroup, obstacle, snake, hyena, hyenaAttack, scorpian;

var coinImg, coinGroup;

var currentObstacle; 


function preload(){

groundImg = loadImage("parallax.png");
bunnyIdle = loadAnimation("bunnyIdle1.png","bunnyIdle2.png","bunnyIdle3.png","bunnyIdle4.png");
bunny_run = loadAnimation("bunnyRun1.png","bunnyRun2.png","bunnyRun5.png","bunnyRun6.png");
bunnyDeath = loadAnimation("bunnyDeath1.png","bunnyDeath2.png","bunnyDeath3.png","bunnyDeath4.png","bunnyDeath5.png","bunnyDeath6.png","bunnyDeath7.png","bunnyDeath8.png");
bunnyJump = loadAnimation("bunnyJump1.png","bunnyJump2.png","bunnyJump3.png","bunnyJump4.png","bunnyJump5.png","bunnyJump6.png","bunnyJump7.png","bunnyJump8.png");

snake = loadAnimation("snake1.png","snake2.png","snake3.png","snake4.png");
hyena = loadAnimation("hyena1.png","hyena2.png","hyena3.png","hyena4.png","hyena5.png","hyena6.png");
scorpian = loadAnimation("scropian1.png","scorpian2.png","scorpian3.png","scorpian4.png");
hyenaAttack = loadAnimation("hyenaAttack1.png","hyenaAttack2.png","hyenaAttack3.png","hyenaAttack4.png","hyenaAttack5.png","hyenaAttack6.png")

gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restartText.png");
startImg = loadImage("startText.png");
nameImg = loadImage("name.png");
coinImg = loadImage("coin.png");
coinsImg = loadImage("coins.png");

}

function setup() {
 createCanvas(600,560);
 ground = createSprite(300,280);
 ground.addImage("ground",groundImg);
 ground.x = width/3
 

 bunny = createSprite(70,245);
 bunny.addAnimation("idle",bunnyIdle);
 bunny.addAnimation("running",bunny_run);
 bunny.addAnimation("death",bunnyDeath);
 bunny.addAnimation("jump",bunnyJump);
 bunny.setCollider('circle',0,3,13)
 bunny.scale = 2.5;

 
 invisibleGround = createSprite(70,307,50,10);  
 invisibleGround.shapeColor = "white";
 invisibleGround.visible = false; 

 gameOver = createSprite(300,150);
 gameOver.addImage("gameOver",gameOverImg);
 gameOver.scale = 0.3;
 gameOver.visible = false;

 restart = createSprite(310,50);
 restart.addImage("restart",restartImg);
 restart.scale = 0.3
 restart.visible = false;

 start = createSprite(293,50);
 start.addImage("start",startImg);
 start.scale = 0.3;
 start.visible = true;

 Name = createSprite(293,140);
 Name.addImage("name",nameImg);
 Name.scale = 0.8;
 Name.visible = true;

 obstacleGroup = new Group();
 coinGroup = new Group();
 
 //coins = 0;
 //coins = createSprite(500,25);
 //coins.addImage("coins", coinsImg);
 //coins.scale = 0.2;

}

function draw() {
background(233, 233, 233);
textSize(20);
  fill("white");
  text("Coins: "+ coins,500,50);

if (ground.x < 310){
    ground.x= ground.width/2;
  }
  
  //if(gameState===START){
    //
    //invisibleGround.y  = 250;

  if(keyDown("a")){ 
    gameState = PLAY;
    console.log(gameState);
      
  }
  

  if(gameState===PLAY){
    
    bunny.changeAnimation("running", bunny_run);
    spawnObstacle();
    //spawnCoins();
    start.visible = false;
    Name.visible = false;
    ground.velocityX = -5; 
    bunny.x = 70;
    invisibleGround.y = 433; 
    invisibleGround.x = 70;

    if(touches.length > 0 || keyDown("space") &&  bunny.y  >= height-180){
      bunny.velocityY = -14;
      touches= [];
      } 
  
    bunny.velocityY = bunny.velocityY + 0.8;
  


    
    
   }
  else if (gameState===START){
      bunny.x = 290;
      invisibleGround.y  = 250;
      invisibleGround.x = 290;
    }
    

  // if(gameState===START){
  //   bunny.x = 290;
  //   invisibleGround.y  = 250;
  //   invisibleGround.x = 290;
  // }
    
    if(coinGroup.isTouching(bunny)){
      coins++;
      console.log(coins);
    }

    if(obstacleGroup.isTouching(bunny)){
     gameState = END;
     bunny.changeAnimation("death",bunnyDeath);

     if(gameState === END){
      obstacleGroup.setVelocityXEach(0);
      //coinGroup.setVelocityXEach(0);
      ground.velocityX = 0; 
      obstacleGroup.setLifetimeEach(-1);
      //coinGroup.setLifetimeEach(-1);
      gameOver.visible = true;
      restart.visible = true;
     }
     
   }
  
//}

  
  if(keyWentDown("r")){
    reset();
    touches = [];
  }
  
  
  bunny.collide(invisibleGround);

  
 // if (keyDown("SPACE")){
   // bunny.velocityY = -13;
  // } 
  //bunny.velocityY = bunny.velocityY + 0.8;
  

 drawSprites();
}

function spawnObstacle() {
  
    if(frameCount % 100 === 0) {
      obstacle = createSprite(width-20,383,20,30);
      obstacle.setCollider('circle',0,0,8)
      obstacle.velocityX = -5;
      

      var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addAnimation("x",snake);
              break;
      case 2: obstacle.addAnimation("y",hyena);
              break;
      case 3: obstacle.addAnimation("z",scorpian);
              break;
      default: break;
    }
    obstacle.scale = 1.9;

    obstacleGroup.add(obstacle);
      
    }}

function reset(){
  gameState = START;
  gameOver.visible = false;
  restart.visible = false;
  Name.visible = true;
  start.visible = true;
  bunny.x = 70;
  bunny.y = 200;
  invisibleGround.y  = 250;
  invisibleGround.x = 290;


  obstacleGroup.destroyEach();
  coinGroup.destroyEach();

  bunny.changeAnimation("idle",bunnyIdle);
}

 //   function spawnCoins() {
      
   //   if(frameCount % 130 === 0) {
     //   coin = createSprite(width-20,383,20,30);
       // coin.setCollider('circle',0,0,1);
   //     coin.velocityX = -5;
      // coin.addImage("coin",coinImg);
     //  coinGroup.add(coin);
      
      
      //coin.scale = 0.02;

      

    
        
      //}}


    
  