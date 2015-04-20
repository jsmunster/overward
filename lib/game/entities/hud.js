ig.module(
    'game.entities.hud'
)
.requires(
    'impact.entity'
)
.defines(function(){
EntityHud = ig.Entity.extend({
  size: {x: 320, y: 20},
  zIndex:-1, //
  //animSheet: new ig.AnimationSheet( 'media/hud.png', 320, 20 ),
  hudImage: new ig.Image( 'media/hud_background.png' ),

  collides: ig.Entity.COLLIDES.NEVER,
  gravityFactor: 0,

  virusName:"",
  virusText:"",


  init: function( x, y, settings ) {
    //this.addAnim( 'idle', 1, [0] );
    this.parent( x, y, settings );
    this.pos.x=ig.game.screen.x;
    this.pos.y=ig.game.screen.y;



  },
  update: function(){
    this.pos.x=ig.game.screen.x;
    this.pos.y=ig.game.screen.y;

    //ig.game.sortEntitiesDeferred();

    if(ig.input.mouse.y<=20)
    {
        //console.log('mouse zone');
    }
    else
    {
    
    }

    ig.game.virus.name = "";
    var allUpgrades =  ig.game.getEntitiesByType( EntityUpgrades );
    for (index in allUpgrades){
      var upgrade = allUpgrades[index];
      // console.log(vector);
      if (upgrade.toggled) {
        ig.game.virus.name += upgrade.stats.name + " "
      }else{

      }
    }

    this.parent();
  },
  draw: function(){
    var offset = 1;
   

    this.hudImage.draw( 0, 0 );

// ig.game.spawnEntity( EntityHudHelper, 19, 19, {textinput:"Exp: "} );
// ig.game.spawnEntity( EntityHudHelper, 200, 19, {textinput:"B / MB ",} );
// ig.game.spawnEntity( EntityHudHelper, 20, 50, {textinput:"Name: ",} );
// ig.game.spawnEntity( EntityHudHelper, 20, 70, {textinput:"Stats: ",} );
// ig.game.spawnEntity( EntityHudHelper, 20, 80, {textinput:"\tPortability: ",variable:this.virus.portability} );
// ig.game.spawnEntity( EntityHudHelper, 20, 90, {textinput:"\tInfectiousness: ",} );
// ig.game.spawnEntity( EntityHudHelper, 20, 100, {textinput:"\tCovertness: ",} );

    ig.game.font.draw( 
        "Exp: "+" "+ig.game.virus.exp_cost.toFixed(1), //useless piece of line segment to hold that comma
        19, 19);
    ig.game.font.draw( 
        "B / MB "+" "+ig.game.virus.bandwidth.toFixed(1), //useless piece of line segment to hold that comma
        200, 19);
    ig.game.font.draw( 
        "Name: "+" "+ig.game.virus.name, //useless piece of line segment to hold that comma
        20, 50);
    ig.game.font.draw( 
        "Stats: "+" ", //useless piece of line segment to hold that comma
        20, 70);
    ig.game.font.draw( 
        "\tPortability "+" "+ig.game.virus.portability.toFixed(1), //useless piece of line segment to hold that comma
        20, 80);
    ig.game.font.draw( 
        "\tInfectiousness "+" "+ig.game.virus.infectious.toFixed(1), //useless piece of line segment to hold that comma
        20, 90);
    ig.game.font.draw( 
        "\tCovertness "+" "+ig.game.virus.covertness.toFixed(1), //useless piece of line segment to hold that comma
        20, 100);
    // ig.game.font.draw( 
    //     "B / MB "+" "+ig.game.virus.portability, //useless piece of line segment to hold that comma
    //     200, 19);

    this.parent();


  }
});


EntityHudHelper = ig.Entity.extend({
  size: {x: 20, y: 20},
  collides: ig.Entity.COLLIDES.NEVER,
  gravityFactor: 0,
  textinput:"mt",
  zIndex:1, //

  variable:0,

  init: function( x, y, settings ) {
    //this.addAnim( 'idle', 1, [0] );
    if(settings.textinput){
      this.textinput = settings.textinput;
    }
    if(settings.variable){
      this.variable = settings.variable;
    }
    this.parent( x, y, settings );

  },
  update: function(){

    this.parent();
  },
  draw: function(){
    var offset = 0;

    

    this.parent();

    ig.game.font.draw( 
    this.textinput+" "+this.variable, //useless piece of line segment to hold that comma
    this.pos.x, this.pos.y);


  }
});


});