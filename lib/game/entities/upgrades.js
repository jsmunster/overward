ig.module(
  'game.entities.upgrades'
)
.requires(
  'impact.entity',
  'impact.sound'
)
.defines(function(){
  EntityUpgrades = ig.Entity.extend({

    //animSheet: new ig.AnimationSheet( 'media/player.png', 16, 16 ),



    init: function( x, y, settings ) {
      this.parent( x, y, settings );



    },

    update: function() {
      

      this.parent();
    },
    
    draw: function(){
    var offset = 1;
    var ctx = ig.system.context;
    var s = ig.system.scale;

    ctx.fillStyle = "rgba(120,120,150,0.3)"; //
    ctx.fillRect(this.pos.x, this.pos.y, 150, 30);

    ig.game.font.draw( 
        'the thing', //useless piece of line segment to hold that comma
        offset + this.pos.x/s, offset + this.pos.y/s);

    ig.game.font.draw(" the other thing ",
        ig.system.width/2,
        16,
        ig.Font.ALIGN.CENTER );
      this.parent();
    },



  });

});
