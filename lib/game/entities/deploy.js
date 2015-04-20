ig.module(
  'game.entities.deploy'
)
.requires(
  'impact.entity',
  'impact.sound',
  'game.entities.dialogue'

)
.defines(function(){
  EntityDeploy = ig.Entity.extend({

      //animSheet: new ig.AnimationSheet( 'media/player.png', 16, 16 ),
    imgP: new ig.Image( 'media/portability_icon.png' ),
    imgI: new ig.Image( 'media/infectious_icon.png' ),
    imgC: new ig.Image( 'media/covertness_icon.png' ),
    imgB: new ig.Image( 'media/bandwidth_icon.png' ),


    // checkAgainst: ig.Entity.TYPE.BOTH,
    // type: ig.Entity.TYPE.A,


    collides: ig.Entity.COLLIDES.NEVER,

    size:{x:130,y:60}, //

    index:0, stats:0,

    toggled:false,

    expReward:0,

    // stats:0,

    init: function( x, y, settings ) {
      // this.stats = ig.game.spawnEntity ( EntityUpgradeFiller, -100, -100, 32, 32);

      // //this.stats.portability;
      // settings.index = this.index;

      // if(settings.index){
      //   this.index = settings.index;
      //   this.stats = this.vectorTypeJSON.vectorlist[this.index];
      // }else{
      //   this.stats = this.vectorTypeJSON.vectorlist[0];
      // }



      //console.log(this.stats);




      // ig.game.spawnEntity ( EntityUpgradeFiller, this.pos.x+offset, this.pos.y, 32, 32);
      // ig.game.spawnEntity ( EntityUpgradeFiller, this.pos.x+offset*2, this.pos.y, 32, 32);
      // ig.game.spawnEntity ( EntityUpgradeFiller, this.pos.x+offset*3, this.pos.y, 32, 32);

      // this.imgP.width *=0.25;
      // this.imgP.height *=0.25;
      //this.imgP.width=32;
      this.parent( x, y, settings );



    },

    inFocus: function() {
      var s = ig.system.scale;
      return (
         (this.pos.x <= (s*ig.input.mouse.x + ig.game.screen.x)) &&
         ((s*ig.input.mouse.x + ig.game.screen.x) <= this.pos.x + this.size.x) &&
         (this.pos.y <= (s*ig.input.mouse.y + ig.game.screen.y)) &&
         ((s*ig.input.mouse.y + ig.game.screen.y) <= this.pos.y + this.size.y)
      );
    },

    update: function() {
      if(ig.input.pressed('lbtn')){
        // console.log(ig.input.mouse);
        // console.log(this.inFocus());
        // console.log(this.pos, ig.game.screen, this.size);
      }

      if (ig.input.pressed('lbtn') && this.inFocus()) {
        // console.log('clicked');
        this.togglerFunc();
      }

      this.parent();
    },
    
    draw: function(){
    var header = 10;
    var offset = 32;
    var ctx = ig.system.context;
    var s = ig.system.scale;
    var margin = 5 ;

    //this.imgP.draw( 10, 10 );


    ctx.fillStyle = "rgba(200,120,150,0.3)"; //
    ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    if(this.toggled){
      ctx.fillStyle = "rgba(120,120,150,0.1)";
    }
    ctx.fillRect(this.pos.x-margin, this.pos.y-margin, this.size.x+margin*2, this.size.y+margin*2);

    // ig.system.context.drawImage( this.imgP.data, this.pos.x, this.pos.y, 32, 32 );
    // ig.system.context.drawImage( this.imgI.data, this.pos.x+offset, this.pos.y, 32, 32 );
    // ig.system.context.drawImage( this.imgC.data, this.pos.x+offset*2, this.pos.y, 32, 32 );
    // ig.system.context.drawImage( this.imgB.data, this.pos.x+offset*3, this.pos.y, 32, 32 );

    ig.game.font.draw( 
        "Deploy Malware!", //useless piece of line segment to hold that comma
        this.pos.x/s, this.pos.y/s - header);

    // ig.game.font.draw( 
    //     'the thing', //useless piece of line segment to hold that comma
    //     offset + this.pos.x/s, offset + this.pos.y/s);

    // ig.game.font.draw(" the other thing ",
    //     ig.system.width/2,
    //     16,
    //     ig.Font.ALIGN.CENTER );
      this.parent();
    },

    togglerFunc: function() {
      // console.log("clicked");
      var vectorBool = false;
      var vectorCheck =  ig.game.getEntitiesByType( EntityVectorType );
      for (index in vectorCheck){
        var vector = vectorCheck[index];
        // console.log(vector);
        if (vector.toggled) {
          vectorBool = true;
        }else{

        }
      }

      if(!vectorBool){
        ig.game.pauseReturn = "BOX";
        var dialogue =  ig.game.spawnEntity( EntityDialogue, 
            0, 0,
            {showText:"Choose a Vector Type!",
                    hasOK:true,
                    hasYes:false,
                    hasNo:false}
             ); // 145
        return 0;
      }


      var upgradesBool = false;
      ig.game.virus.text = "";
      var allUpgrades =  ig.game.getEntitiesByType( EntityUpgrades );
      for (index in allUpgrades){
        var upgrade = allUpgrades[index];
        // console.log(vector);
        if (upgrade.toggled) {
          ig.game.virus.text += upgrade.stats.text + "\n";
          upgradesBool=true;
        }else{

        }
      }
      if(!upgradesBool){
        ig.game.pauseReturn = "BOX";
        var dialogue =  ig.game.spawnEntity( EntityDialogue, 
            0, 0,
            {showText:"Choose at least one \nUpgrade from below!",
                    hasOK:true,
                    hasYes:false,
                    hasNo:false}
             ); // 145
        return 0;
      }

      this.battleSequence();
      
      
      
      var dialogue =  ig.game.spawnEntity( EntityDialogue, 
            0, 0,
            {showText:" Virus Deployed! \n"
                      +ig.game.virus.text
                      +"\nExp Reward: "
                      +this.expReward.toFixed(1),
                    hasOK:true,
                    hasYes:false,
                    hasNo:false}
             ); // 145

      

    },

    battleSequence: function(){
      var opponent = {
            attack:45,
            defense:45,
            };

      opponent.attack += ig.game.diceRoller(ig.superStats.winCount,17)+7;
      opponent.defense += ig.game.diceRoller(ig.superStats.winCount,17)+7;

      var playerWins = 0; // 1 is win, 0 is reroll, -1 is lose

      var player = {attack: ig.game.virus.infectious,
                  defense: ig.game.virus.covertness,
                  crit: ig.game.virus.portability,};

      player.attack += (player.attack * ig.game.randomNumGen(5,10))/100.0 ;
      player.defense += (player.defense * ig.game.randomNumGen(5,10))/100.0 ;

      if(ig.game.randomNumGen(1,100) >= player.crit){
        player.attack *= (2.0+(player.crit/100.0))
      }

      var count=0;
      while(playerWins == 0){
        if(player.attack > opponent.defense){
          playerWins = 1;
        }else if(player.defense < opponent.attack){
          playerWins = -1;
        }else if(count>100){
          playerWins = -1;
        }else{
          opponent.attack *= (100+count)/100.0;
          opponent.defense *= (100+count)/100.0;
        }
        count++;
      }

      this.expReward = ig.game.virus.portability 
                      + ig.game.virus.infectious 
                      + ig.game.virus.covertness 
                      + ig.game.virus.bandwidth
                      + ig.game.randomNumGen(9,17);

      this.expReward /= 7 ;

      if(playerWins == 1){
        ig.superStats.winCount++;
        ig.game.virus.winCount++;
      }else if(playerWins == -1){
        ig.superStats.loseCount++;
        ig.game.virus.loseCount++;
        this.expReward /= 5 ;
      }else{
        console.log("Error Condition!", playerWins);
      }

      ig.game.virus.exp_cost += this.expReward;

      // console.log(opponent, player, playerWins, this.expReward);
      // console.log(ig.superStats);
      // player_attack = player_attack * (ig.game.randomNumGen(5,10) + player_attack);
    },


  });

});
