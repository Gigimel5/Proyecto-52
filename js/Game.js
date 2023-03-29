class Game {
  constructor() { }

  start() {
    player = new Player();
    playerCount=player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];

    fuels = new Group();
    coins = new Group();

    this.addSprites(fuels, 4, fuels_img, 0.02);
    this.addSprites(coins, 4, goldCoin_img, 0.02);
  }

  play() {
    this.handleElements();
    Player.getPlayersInfo();

    if (allPlayers !== undefined) {//!=diferente osea si todos estan definidos
      image(track_img, 0, -height * 5, width, height * 6);
      var index = 0;
      for (var plr in allPlayers) {//Para cada jugador en allPlayes
        index = index + 1;
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index - 1].position.x = x;//las posiciones las paso a la matriz de los autos
        cars[index - 1].position.y = y;

        if (index === player.index) {
          stroke(10);
          fill("blue");
          ellipse(x, y, 60, 60);
          camera.position.x = cars[index - 1].position.x;
          camera.position.y = cars[index - 1].position.y;
        }
      }
      if (keyIsDown(UP_ARROW)) {
        player.positionY += 10;
        player.update();
      }
      
      this.playerControls()
      drawSprites();

    }

  }


  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
  }

  getState() {//Guardar el estado de juego
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  update(state) {//guardar y actualizar
    database.ref("/").update({
      gameState: state
    });

  }

  addSprites(spriteGroup, numberOfSprites, spriteImage, scale) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;
      x = random(width / 2 + 150, width / 2 - 150);
      y = random(-height * 4.5, height - 400);
      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spriteImage);
      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
  }

  playerControls() {
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
    }
  
    if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
      player.positionX -= 5;
      player.update();
    }
  
    if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
      player.positionX += 5;
      player.update();
    }
  }
}