ig.module(
  'game.entities.upgrades'
)
.requires(
  'impact.entity',
  'impact.sound'
  'impact.entity.upgradesfiller'
)
.defines(function(){
  EntityUpgrades = ig.Entity.extend({

      //animSheet: new ig.AnimationSheet( 'media/player.png', 16, 16 ),
    imgP: new ig.Image( 'media/portability_icon.png' ),
    imgI: new ig.Image( 'media/infectious_icon.png' ),
    imgC: new ig.Image( 'media/covertness_icon.png' ),
    imgB: new ig.Image( 'media/bandwidth_icon.png' ),



    init: function( x, y, settings ) {
      ig.game.spawnEntity ( EntityUpgradeFiller, this.pos.x, this.pos.y, 32, 32);
      ig.game.spawnEntity ( EntityUpgradeFiller, this.pos.x+offset, this.pos.y, 32, 32);
      ig.game.spawnEntity ( EntityUpgradeFiller, this.pos.x+offset*2, this.pos.y, 32, 32);
      ig.game.spawnEntity ( EntityUpgradeFiller, this.pos.x+offset*3, this.pos.y, 32, 32);

      // this.imgP.width *=0.25;
      // this.imgP.height *=0.25;
      //this.imgP.width=32;
      this.parent( x, y, settings );



    },

    update: function() {
      

      this.parent();
    },
    
    draw: function(){
    var offset = 32;
    var ctx = ig.system.context;
    var s = ig.system.scale;

    //this.imgP.draw( 10, 10 );


    ctx.fillStyle = "rgba(120,120,150,0.3)"; //
    ctx.fillRect(this.pos.x, this.pos.y, 130, 32);
    ctx.fillRect(this.pos.x-5, this.pos.y-5, 140, 42);

    ig.system.context.drawImage( this.imgP.data, this.pos.x, this.pos.y, 32, 32 );
    ig.system.context.drawImage( this.imgI.data, this.pos.x+offset, this.pos.y, 32, 32 );
    ig.system.context.drawImage( this.imgC.data, this.pos.x+offset*2, this.pos.y, 32, 32 );
    ig.system.context.drawImage( this.imgB.data, this.pos.x+offset*3, this.pos.y, 32, 32 );
    // ig.game.font.draw( 
    //     'the thing', //useless piece of line segment to hold that comma
    //     offset + this.pos.x/s, offset + this.pos.y/s);

    // ig.game.font.draw(" the other thing ",
    //     ig.system.width/2,
    //     16,
    //     ig.Font.ALIGN.CENTER );
      this.parent();
    },



  });

});
