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
    this.parent();
  },
  draw: function(){
    var offset = 1;
   

    this.hudImage.draw( 0, 0 );

    

    this.parent();


  }
});


EntityHudHelper = ig.Entity.extend({
  size: {x: 20, y: 20},
  collides: ig.Entity.COLLIDES.NEVER,
  gravityFactor: 0,
  textinput:"mt",
  zIndex:1, //


  init: function( x, y, settings ) {
    //this.addAnim( 'idle', 1, [0] );
    if(settings.textinput){
      this.textinput = settings.textinput;
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
    this.textinput, //useless piece of line segment to hold that comma
    this.pos.x, this.pos.y);


  }
});


});