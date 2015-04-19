ig.module( 
    'game.main' 
)
.requires(
    'impact.game',
    'impact.font',
    'game.entities.hud',
    'game.entities.upgrades',
    'game.entities.cursor',
    'game.imageblender',

    //'game.levels.dorm1',
    'impact.debug.debug' // <- Add this

)
.defines(function(){

  MyGame = ig.Game.extend({

    font: new ig.Font( 'media/04b03.font.png' ),
    
    virus: {
      Portability: 1, 
      VectorType: 1, 
      Infectiousness: 1, 
      Covertness: 1, 
      Bandwidth: 1,
    },

    init: function() {
        // Initialize your game here; bind keys etc.
      
          // Bind keys
      ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
      ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
      ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
      ig.input.bind( ig.KEY.UP_ARROW, 'up' );
      ig.input.bind( ig.KEY.A, 'left' );
      ig.input.bind( ig.KEY.D, 'right' );
      ig.input.bind( ig.KEY.S, 'down' );
      ig.input.bind( ig.KEY.W, 'up' );
      ig.input.bind( ig.KEY.X, 'jump' );
      ig.input.bind( ig.KEY.C, 'shoot' );
      
      
      ig.input.initMouse();
      ig.input.bind( ig.KEY.MOUSE1, 'lbtn' );

      ig.game.spawnEntity( EntityHud, 5, 5 );
      ig.game.spawnEntity( EntityHudHelper, 19, 19, {textinput:"Exp: ",} );
      ig.game.spawnEntity( EntityHudHelper, 200, 19, {textinput:"B / MB ",} );
      ig.game.spawnEntity( EntityHudHelper, 20, 50, {textinput:"Name: ",} );
      ig.game.spawnEntity( EntityHudHelper, 20, 70, {textinput:"Stats: ",} );
      ig.game.spawnEntity( EntityHudHelper, 20, 80, {textinput:"\tPortability: ",} );
      ig.game.spawnEntity( EntityHudHelper, 20, 90, {textinput:"\tInfectiousness: ",} );
      ig.game.spawnEntity( EntityHudHelper, 20, 100, {textinput:"\tCovertness: ",} );

      //ig.game.spawnEntity( EntityCursor, 100, 90 );


      ig.game.spawnEntity( EntityUpgrades, 25, 300 );
      ig.game.spawnEntity( EntityUpgrades, 170, 300 );
      ig.game.spawnEntity( EntityUpgrades, 315, 300 );
      ig.game.spawnEntity( EntityUpgrades, 460, 300 );
    },
    
    update: function() {
      // Update all entities and backgroundMaps

      //if player clicks, find out what they clicked
      // if(ig.input.pressed ('lbtn')){
      //   this.findClickandExecute();
      // }


      this.parent();
      
      // Add your own, additional update code here
    },
    
    // findClickandExecute: function(){
    //   var allUpgrades =  ig.game.getEntitiesByType( EntityPlanet );
    //   for (upgrade in allUpgrades){
    //     if () {};
    //   }
    //      // ig.game.getEntitiesByType( EntityPlanet );
    // }

    draw: function() {
      // Draw all entities and backgroundMaps
      this.parent();
    }
  });


  StartScreen = ig.Game.extend({
    instructText: new ig.Font( 'media/04b03.font.png' ),
    background: new ig.Image('media/telecaster_screen.png'),
    // mainCharacter: new ig.Image('media/screen-main-character.png'),
    // title: new ig.Image('media/game-title.png'),
    
    init: function() {
      ig.input.initMouse();
      ig.input.bind( ig.KEY.MOUSE1, 'lbtn' );
    },
    
    update: function() {
      if(ig.input.pressed ('lbtn')){
          ig.system.setGame(MyGame)
      }
      this.parent();
    },
    
    draw: function() {
      this.parent();
      this.background.draw(0,0);
      // this.mainCharacter.draw(0,0);
      // this.title.draw(ig.system.width - this.title.width, 0);
      var x = ig.system.width/2,
      y = ig.system.height - 100;
      this.instructText.draw( 'Click/Tap To Start', x+30, y, 
      ig.Font.ALIGN.CENTER );
    }
  });
    
  GameOverScreen = ig.Game.extend({
    instructText: new ig.Font( 'media/04b03.font.png' ),
    background: new ig.Image('media/telecaster_screen.png'),
    gameOver: new ig.Image('media/game_over.png'),
    stats: {},
    outputMsg: "",
    
    init: function() {
      ig.input.initMouse();
      ig.input.bind( ig.KEY.MOUSE1, 'lbtn' );
      this.stats = ig.finalStats;
    },
    
    update: function() {
      if(ig.input.pressed('lbtn')){
        ig.system.setGame(StartScreen)
      }
      this.parent();
    },
    
    draw: function() {
      var crystalScore = 55;
      var crewScore = 91;
      this.parent();
      this.background.draw(0,0);
      var x = ig.system.width/2;
      var y = ig.system.height/2 - 20;
      this.gameOver.draw(x - (this.gameOver.width * .5), y - 30);
      var score = (this.stats.crystal * crystalScore) - (this.stats.deaths * crewScore);
      this.instructText.draw('Total Crystals Acquired: '+this.stats.crystal, x, y+30, 
          ig.Font.ALIGN.CENTER);
      this.instructText.draw('Total Crew Lost: '+this.stats.deaths, x, y+40, 
          ig.Font.ALIGN.CENTER);
      this.instructText.draw('Score: '+score, x, y+50, ig.Font.ALIGN.CENTER);
      this.instructText.draw('Click/Tap To Continue.', x, ig.system.height - 
          100, ig.Font.ALIGN.CENTER);

      this.instructText.draw(this.stats.deathText,
          ig.system.width/2,
          ig.system.height*(0.1),
          ig.Font.ALIGN.CENTER );
    }
  });
    
    

    
    var game_x, game_y, game_z;
    
    if( ig.ua.mobile ) {
        // Disable sound for all mobile devices
        ig.Sound.enabled = false;
        game_x =322;
        game_y =368; // 
        game_z =3;
    }else{
        game_x =400; 
        game_y =320;
        game_z =2;
    }
    
    /*
    game_x =312;
    game_y =468;
    game_z =2;
    */
    ig.main('#canvas',StartScreen,60,game_x,game_y,game_z);
    //ig.main('#canvas',MyGame,60,312,468,2);
    //ig.main('#canvas',MyGame,60,624,936,2);
    //ig.main('#canvas',MyGame,60,1248,1872,0.5);


});
