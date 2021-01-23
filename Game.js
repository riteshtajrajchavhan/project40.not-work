class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1", basketImg);
   car1.scale=0.5;
   
    car2 = createSprite(300,200);
    car2.addImage("car2", basketImg);
car2.scale=0.5;

    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    
    if(frameCount % 20 === 0) {
      var obstacle = createSprite(600,165,10,40);
     obstacle.x=Math.round(random(20,1100))
     
      //obstacle.debug = true;
      obstacle.velocityY = 6
      
      //generate random obstacles
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: obstacle.addImage(furit1);
                break;
        case 2: obstacle.addImage(furit2);
                break;
        default: break;
      }
      
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.3;
    //  obstacle.lifetime = 300;
      //add each obstacle to the group
    //  obstaclesGroup.add(obstacle);
    }



    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(backImg, 0,-displayHeight/30+650,displayWidth, displayHeight);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = displayHeight - allPlayers[plr].distance;
        //use data form the database to display the cars in y direction
        y = 1000
        cars[index-1].x = x;
        cars[index-1].y = y;



        if (index === player.index){
         // stroke()
         

 

         cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;

          textSize(25);
          fill("white")  
      text(allPlayers[plr].name,x-20,y+80);

        }
       
       // textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance -=10
      player.update();
    }
    

    if(player.distance > 3860){
      gameState = 2;
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}
