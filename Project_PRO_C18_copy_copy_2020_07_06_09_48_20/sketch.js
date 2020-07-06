//Global Variables
var monkey, ground;
var bananaGroup, bananaImage;
var obtacleGroup, obstacleImage;
var back;
var score;
var ground;

function preload(){
  backImage= loadImage("jungle.jpg");
  monkeyImage= loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaImage= loadImage("Banana.png");
  obstacleImage= loadImage("stone.png");
  groundImage= loadImage("ground.jpg");
}


function setup() {
  createCanvas(600,500);
  
  back= createSprite(200,160,800,10);
  back.addImage("background", backImage);
  back.scale= 1.5
  back.velocityX= -4;
  back.x= back.width/2;
  
  monkey= createSprite(50,265,20,50);
  monkey.addAnimation("monkey", monkeyImage);
  monkey.scale= 0.1      ;
  
  ground= createSprite(300,450,600,200);
  ground.addImage("ground", groundImage);
  ground.scale= 0.2
  
    bananaGroup= new Group();
  obstacleGroup= new Group();
  
  score= 0;
}


function draw(){
 background(255);   
  
  if (back.x<0) {
    back.x= back.width/2
  }
  
  if (monkey.isTouching(bananaGroup)) {
      score= score+2
      bananaGroup.destroyEach();
      }
  
      switch(score) {
      case 10: monkey.scale= 0.12;
      break;
      case 20: monkey.scale= 0.14;
      break;
      case 30: monkey.scale= 0.16;
      break;
      case 40: monkey.scale= 0.18;
      break;
      default: break;
    }
  
  monkey.collide(ground);
  
  ground.setCollider("rectangle",0,0,10000,550)
  ground.visible= false;
  //ground.debug= true;
  
  if (obstacleGroup.isTouching(monkey)) {
   monkey.scale= 0.1
  }
  
  if (keyDown("space") && monkey.isTouching(ground)) {
    monkey.velocityY= -15;
  }
  
  
    monkey.velocityY= monkey.velocityY+0.8
  
  banana();
  obstacles();
  drawSprites();
  
obstacleGroup.depth= back.depth
obstacleGroup.depth= obstacleGroup.depth+1
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score= "+ score, 500, 50);
}

  function banana() {
    //when frame count is 90, bananas should appear
    if (frameCount%90===0) {
      //create the banana sprit and set its animation and scale
      var banana= createSprite(400,340,20,20);
      banana.addImage(bananaImage);
      banana.scale= 0.05;
      //bananas should be visible
      //banana.visible= true;
      //add a random number so the bananas appear in random positions on the y axis
      r= random(1,10);
      banana.y= Math.round(random(215,320));
      //add the banana's velocity and increase the speed at every 100 points
      banana.velocityX= - (4 + 2*score/100);
      //add the lifetime to stop memory leak
      banana.lifetime= 110;
      //add all the bananas to a group
      bananaGroup.add(banana);
    }
  }
  
  function obstacles() {
    if (frameCount%300===0) {
      //when frame count is 90, obstacles should appear
      var obstacle= createSprite(400,350,20,20);
      //set the obstacle's animation and size
      obstacle.addImage(obstacleImage);
      obstacle.scale= 0.1;
      //make the obstacle visible
      obstacle.visible= true;            
      //add a random number so the obstacles appear in random positions on the y axis
      r= random(1,10);
      obstacle.y= Math.round(random(370,380));
      //add the obstacle's velocity and increase the speed at every 100 points
      obstacle.velocityX= - (4 + score/100);
      //add the lifetime to stop memory leak
      obstacle.lifetime= 110;
      //add all the obstacles to a group
      obstacleGroup.add(obstacle);
    }
  }