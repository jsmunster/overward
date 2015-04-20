ig.module( 
    'game.main' 
)
.requires(
    'impact.game',
    'impact.font',
    'game.entities.hud',
    'game.entities.vectortype',
    'game.entities.upgrades',
    'game.entities.cursor',
    'game.imageblender',
    'game.entities.deploy',

    //'game.levels.dorm1',
    'impact.debug.debug' // <- Add this

)
.defines(function(){

  MyGame = ig.Game.extend({

    font: new ig.Font( 'media/04b03.font.png' ),
    
    virus: {
      portability: 1, 
      vectortype: 1, 
      infectious: 1, 
      covertness: 1, 
      bandwidth: 1,
      exp_cost:1,
      name:"Select Upgrades to begin constructing your malware!",
      text:"",
      winCount:0,
      loseCount:0,
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

      if(ig.superStats){}else{
        ig.superStats= { 
                winCount:0,
                loseCount:0,
                expAmount:50,
                maxBandwidth:70,
            };
      }
      // ig.game.spawnEntity( EntityHudHelper, 19, 19, {textinput:"Exp: "} );
      // ig.game.spawnEntity( EntityHudHelper, 200, 19, {textinput:"B / MB ",} );
      // ig.game.spawnEntity( EntityHudHelper, 20, 50, {textinput:"Name: ",} );
      // ig.game.spawnEntity( EntityHudHelper, 20, 70, {textinput:"Stats: ",} );
      // ig.game.spawnEntity( EntityHudHelper, 20, 80, {textinput:"\tPortability: ",variable:this.virus.portability} );
      // ig.game.spawnEntity( EntityHudHelper, 20, 90, {textinput:"\tInfectiousness: ",} );
      // ig.game.spawnEntity( EntityHudHelper, 20, 100, {textinput:"\tCovertness: ",} );

      //ig.game.spawnEntity( EntityCursor, 100, 90 );

      for(i=1;i<=3;i++){
        ig.game.spawnEntity( EntityVectorType, 635, 120+((i-1)*80) , {index:i,} );
      }

      for(i=0;i<4;i++){
        for(j=0;j<5;j++){
          ig.game.spawnEntity( EntityUpgrades, 25+(i*145), 280+(j*70) ); // 145
        }
      }
      // ig.game.spawnEntity( EntityUpgrades, 25, 300 ); // 145
      // ig.game.spawnEntity( EntityUpgrades, 170, 300 );
      // ig.game.spawnEntity( EntityUpgrades, 315, 300 );
      // ig.game.spawnEntity( EntityUpgrades, 460, 300 );

      ig.game.spawnEntity( EntityDeploy, 470, 150 );
    },
    
    update: function() {
      // Update all entities and backgroundMaps



      this.parent();
      this.checkForLoseCondition();
      // Add your own, additional update code here
    },

    randomNumGen: function(smallest,largest){
      return (smallest + Math.floor(Math.random()*largest-smallest+1));
    },
    
    diceRoller: function (amount, sides) {
      // body...
      if(amount==0 || sides==0){
        return 1;
      }
      var ret_value=0;
      for(i=0;i<amount;i++){
        ret_value += this.randomNumGen(1,sides);
      }
      return ret_value;
    },

    checkForLoseCondition: function(){
      if(ig.game.virus.loseCount > 0){
        // ig.game.stats.deathText += this.outputMsg;
        // ig.finalStats = ig.game.virus;
        ig.system.setGame(GameOverScreen);
      }
    },

    draw: function() {
      // Draw all entities and backgroundMaps
      this.parent();
    }
  });


  StartScreen = ig.Game.extend({
    instructText: new ig.Font( 'media/04b03.font.png' ),
    background: new ig.Image('media/overward_startscreen.png'),
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
      var x = ig.system.width/2 - 35,
      y = ig.system.height - 140;
      this.instructText.draw( 'Click/Tap To Start', x+30, y, 
      ig.Font.ALIGN.CENTER );
    }
  });
    
  GameOverScreen = ig.Game.extend({
    font: new ig.Font( 'media/04b03.font.png' ),
    background: new ig.Image('media/overward_startscreen.png'),
    gameOver: new ig.Image('media/game_over.png'),
    stats: {},
    outputMsg: "",
    
    init: function() {
      ig.input.initMouse();
      ig.input.bind( ig.KEY.MOUSE1, 'lbtn' );
      this.stats = ig.superStats;
    },
    
    update: function() {
      if(ig.input.pressed('lbtn')){
        ig.system.setGame(StartScreen)
      }
      this.parent();
    },
    
    draw: function() {
      // var crystalScore = 55;
      // var crewScore = 91;
      this.parent();
      this.background.draw(0,0);
      var x = ig.system.width/2;
      var y = ig.system.height/2 - 20;
      this.gameOver.draw(x - (this.gameOver.width * .5), y - 130);

      var score = ig.superStats.winCount*7 - ig.superStats.loseCount*9 ;

      var expGained = score/11.0;
      var bandwidthGained = score/17.0;

      ig.superStats.expAmount += expGained;
      ig.superStats.maxBandwidth += bandwidthGained;
      
      this.font.draw(
          "Score This Round: "+score.toFixed(1)
          +"\nExperience Gained: "+expGained.toFixed(1)
          +"\nMaximum Bandwidth: "+bandwidthGained.toFixed(1)
          +"", 
          x, y, 
          ig.Font.ALIGN.CENTER);

      // var score = (this.stats.crystal * crystalScore) - (this.stats.deaths * crewScore);
      // this.instructText.draw('Total Crystals Acquired: '+this.stats.crystal, x, y+30, 
      //     ig.Font.ALIGN.CENTER);
      // this.instructText.draw('Total Crew Lost: '+this.stats.deaths, x, y+40, 
      //     ig.Font.ALIGN.CENTER);
      // this.instructText.draw('Score: '+score, x, y+50, ig.Font.ALIGN.CENTER);
      // this.instructText.draw('Click/Tap To Continue.', x, ig.system.height - 
      //     100, ig.Font.ALIGN.CENTER);

      // this.instructText.draw(this.stats.deathText,
      //     ig.system.width/2,
      //     ig.system.height*(0.1),
      //     ig.Font.ALIGN.CENTER );
    }
  });
    
    

    
    var game_x, game_y, game_z;
    
    if( ig.ua.mobile ) {
        // Disable sound for all mobile devices
        ig.Sound.enabled = false;
        game_x =400;
        game_y =320; // 
        game_z =2;
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
