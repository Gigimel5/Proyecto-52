var player, p_w;
var score = 0;
var gema1;
var fondo;
var lava;
var gameOver,restart;
var gameState = "PLAY";

function preload() {//Precarga
  fondoImg = loadImage("assets/Fondo lava 3 bien.jpg");
  stayd = loadAnimation("assets/p_indel1.png", "assets/p_indel2.png", "assets/p_indel3.png", "assets/p_indel4.png");
  stayi = loadAnimation("assets/p_indel1_l.png", "assets/p_indel2_l.png", "assets/p_indel3_l.png", "assets/p_indel4_l.png");
  wd = loadAnimation("assets/p_walk1.png", "assets/p_walk2.png", "assets/p_walk3.png", "assets/p_walk4.png", "assets/p_walk5.png", "assets/p_walk6.png");
  wi = loadAnimation("assets/p_walk1_L.png", "assets/p_walk2_L.png", "assets/p_walk3_L.png", "assets/p_walk4_L.png", "assets/p_walk5_L.png", "assets/p_walk6_L.png");
  jump = loadAnimation("assets/jump1.png", "assets/jump2.png", "assets/jump3.png", "assets/jump4.png", "assets/jump5.png", "assets/jump6.png");

  l = loadAnimation("assets/lava0.3.png", "assets/lava1.3.png", "assets/lava2.3.png", "assets/lava3.3.png", "assets/lava4.3.png", "assets/lava5.3.png");

  g1a = loadImage("assets/gema1_azul.png");
  g2a = loadImage("assets/gema2_rosa.png");
  g3a = loadImage("assets/gema3_verde.png");
  g4a = loadImage("assets/gema4_azul.png");
  g5a = loadImage("assets/gema1_azul.png");
  g6a = loadImage("assets/gema2_azul.png");
  g7a = loadImage("assets/gema3_azul.png");

  gameOverImg=loadImage("assets/gO.png");
  restartImg=loadImage("assets/r.png");
}

function setup() {//
  canvas = createCanvas(windowWidth, windowHeight);


 
    player = createSprite(10, 660, 5, 5);

    player.addAnimation("stayd", stayd);
    player.addAnimation("stayi", stayi);
    player.addAnimation("wd", wd);
    player.addAnimation("wi", wi);
    player.addAnimation("jump", jump);



    gema1 = createSprite(200, 640, 20, 20);
    // gema1.shapeColor = "purple";
    gema1.addImage(g1a);
    gema1.setCollider("circle", 2, 0, 10);
    //gema1.debug = true;

    gema2 = createSprite(250, 640, 20, 20);
    // gema2.shapeColor = "purple";
    gema2.addImage(g2a);
    gema2.setCollider("circle", 2, 0, 10);
    //gema2.debug = true;

    gema3 = createSprite(150, 640, 20, 20);
    // gema3.shapeColor = "purple";
    gema3.addImage(g3a);
    gema3.setCollider("circle", 2, 0, 10);
    //gema3.debug = true;

    piso = createSprite(width / 2, 700, width, 30);
    piso.shapeColor = "green";
    piso.visible = false;

    lava = createSprite(width / 2, 800, width, 30);
    lava.addAnimation("lava", l);
  
  //lava.setCollider("rectangle", 0, 0, 700,100);
  gameOver=createSprite(width/2,height/2-200)
  gameOver.addImage(gameOverImg);
  gameOver.visible=false;


  restart=createSprite(width/2,height/2-160)
  restart.addImage(restartImg);
  restart.scale=0.4;
  restart.visible=false;
  console.log(windowWidth);

  //imageMode(CENTER);
}

function draw() {//Dibujo
  background(fondoImg);

  if(gameState==="PLAY"){ 
    restart.visible=false;
    gameOver.visible=false;
    if (player.collide(gema1)) {
      score = score + 1;
      gema1.destroy();
    }
    if (player.collide(gema2)) {
      score = score + 1;
      gema2.destroy();
    }
    if (player.collide(gema3)) {
      score = score + 1;
      gema3.destroy();
    }

    fill("white");
    textFont("Sitka Heading Semibold");
    textSize(25);
    text("Puntuación: " + score, windowWidth/2-100, windowHeight/9);


    if (frameCount % 60 === 0) {
      if (lava.y > 300) {
        changePosition(lava, 0, -100)
      }
    }

    

    if (keyDown(UP_ARROW)) {
      player.changeAnimation("jump");
      changePosition(player, 0, -5);
    }
    if (keyIsDown(UP_ARROW) & keyIsDown(RIGHT_ARROW)) {
      player.changeAnimation("jump")
      changePosition(player, 5, -5);
    }
    if (keyIsDown(UP_ARROW) & keyIsDown(LEFT_ARROW)) {
      player.changeAnimation("jump")
      changePosition(player, -5, -5);
    }
    if (keyIsDown(DOWN_ARROW)) {
      changePosition(player, 0, 5);
    }
    if (keyIsDown(LEFT_ARROW)) {
      player.changeAnimation("wi");
      changePosition(player, -3, 0);
    }
    if (keyIsDown(RIGHT_ARROW)) {
      player.changeAnimation("wd");
      changePosition(player, 3, 0);
    }
    if (keyWentUp(LEFT_ARROW)) {
      player.changeAnimation("stayi")
    }
    if (keyWentUp(RIGHT_ARROW)) {
      player.changeAnimation("stayd")
    }
    if (keyDown("space")) {
      player.changeAnimation("saltando");
    }
      if (player.collide(lava)) {
      gameState = "END"
    }
  }
   else if(gameState==="END"){

    restart.visible=true;
    gameOver.visible=true;
  
    if(mousePressedOver(restart)){
    gameState = "PLAY";
    reiniciar();
    }
  }

  player.changeAnimation("stay");

  player.collide(piso);
  player.velocityY += 0.1;
  drawSprites();
  fill("blue")
  text(mouseX + "-" + mouseY, mouseX, mouseY);

  if (gameState === "END") {
    fill("blue")
    text("¡¡¡Te quedaste atrapado!!!", width / 2 - 100, height / 2);
  }
}

function changePosition(sprite, x, y) {
  sprite.x = sprite.x + x;
  sprite.y = sprite.y + y;
}
function reiniciar(){
  restart.visible=false;
  gameOver.visible=false;
  score=0;
}





