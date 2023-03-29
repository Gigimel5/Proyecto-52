class Form {
  constructor() {
    this.input=createInput("").attribute("placeholder","Introduce tu nombre");//TextBox
    this.playButton= createButton("Play");
    this.titleImg=createImg("./assets/title.png","title of the game");
    this.greetings=createElement("h2");
    this.resetButton= createButton("Reset");
  }
  setElementsPositions(){
    this.input.position(width/2-100,height/2-80);
    this.playButton.position(width/2-90,height/2-20);
    this.titleImg.position(120,100);
    this.greetings.position(width/2-300, height/2-100);
    this.resetButton.position(width-100,20);
  }

  display(){
    this.setElementsPositions();
    this.handleMousePressed();
    this.handleResetButton();
    this.setStyle();
  }

  setStyle (){
    this.titleImg.class("gameTitle");
    this.input.class("customInput");
    this.playButton.class("customButton");
    this.greetings.class("greeting");
  }

  hide(){
    this.greetings.hide();
    this.playButton.hide();
    this.input.hide();
  }

  handleMousePressed(){
    this.playButton.mousePressed(() =>{
      this.input.hide();
      this.playButton.hide(); 
      var mensaje = ` Hola, ${this.input.value()} </br>Espera a que se una otro jugador...`;;//$nombre
      this.greetings.html(mensaje);
      
      playerCount=playerCount+1;
      player.name=this.input.value();
      player.index=playerCount;
      player.updateCount(playerCount);
      player.addPlayer();
      player.getDistance();
    });
   
  
  }

  handleResetButton(){
      this.resetButton.mousePressed(()=>{
        database.ref("/").set({
          playerCount:0,
          gameState:0,
          players:{}
        });
        window.location.reload();
    });
  }
}
