var player, playerI, playerIJ;
var obc1, obcG, obci1, obci2, obci3, obci4;
var back, backg, road, road2, road3, roadI;
var score = 0;
var PLAY = 0;
var OVER = 1;
var gamestate = PLAY;
var goI, go;

function preload(){
  playerIJ = loadAnimation("p1.png","p2.png","p3.png");
  roadI = loadImage("road.jpg");
  
  goI = loadImage("gamo.png");
  
  obci1 = loadImage("obci1.png");
  obci2 = loadImage("obci2.png");
  obci3 = loadImage("obci3.png");
  obci4 = loadImage("obci4.png");
  
  backg = loadImage("grass0.png");
}

function setup() {
 createCanvas(400,400);
  back = createSprite(200,200,20,20);
  back.addImage("bg", backg);
  back.scale = 4;
  
  road = createSprite(100, 200, 20,20);
  road.addImage("r1", roadI);
  road.scale = 0.5;
  road.velocityY = 6;
  road2 = createSprite(200, 200, 20, 20);
  road2.addImage("r2", roadI);
  road2.scale = 0.5;
  road2.velocityY = 6;
  road3 = createSprite(300, 200, 20, 20);
  road3.addImage("r3", roadI);
  road3.scale = 0.5;
  road3.velocityY = 6;
  
  player = createSprite(200,350,20,20);
  player.addAnimation("prun",playerIJ);
  player.scale = 0.1;
  
  obcG = createGroup();
  
  go = createSprite(200,200,20,20);
  go.addImage("g", goI);
  go.scale = 0.3;
  go.visible = false;
}

function draw() {
  background("white");
  
  //console.log(gamestate);
  
  score = score + Math.round(getFrameRate()/59);
  
  if(keyWentDown("left")&&player.x>110){
    player.x = player.x-100;
  }
  if(keyWentDown("right")&&player.x<290){
    player.x = player.x+100;
  }
  
  if(player.isTouching(obcG)){
    gamestate = OVER;
    go.visible = true;
  }
  if(gamestate===OVER){
    score = 0
    player.y = 600;
    fill("black");
    text("GAME OVER", 100, 200);
  }
  if(keyDown("space")&&gamestate===OVER){
    gamestate=PLAY;
    obcG.destroyEach();
  }
  if(gamestate===PLAY){
    go.visible = false;
    player.y = 350;
  }  
  if(road.y>400){
    road.y = 200;
  }
  if(road2.y>400){
    road2.y = 200;
  }
  if(road3.y>400){
    road3.y = 200;
  }
  obc();
  drawSprites();
  
  fill("white");
  textSize(20);
  text("SCORE : "+score, 260, 50);
}
function obc(){
  var rand = Math.round(random(1, 4));
  if(frameCount%50===0){
    obc1 = createSprite(200,-10,20,20);
    if(rand===1){obc1.x = 100}
    if(rand===2){obc1.x = 200}
    if(rand===3){obc1.x = 300}
    if(rand===4){obc1.x = 100}
    if(rand===5){obc1.x = 200}
    obc1.velocityY =(6+(score/200));
    obc1.lifetime = 150;
    var rand2 = Math.round(random(1,4));
    switch(rand) {
      case 1: obc1.addImage(obci1);
              obc1.scale = 0.2;
              break;
      case 2: obc1.addImage(obci2);
              obc1.scale = 0.35;
              break;
      case 3: obc1.addImage(obci3);
              obc1.scale = 0.5;
              break;
      case 4: obc1.addImage(obci4);
              obc1.scale = 0.03;
              break;
      default: break;
    }
    obcG.add(obc1);
  }
}