ig.module(
  'game.entities.upgrades'
)
.requires(
  'impact.entity',
  'impact.sound',
  'game.entities.upgradefiller'
)
.defines(function(){
  EntityUpgrades = ig.Entity.extend({

      //animSheet: new ig.AnimationSheet( 'media/player.png', 16, 16 ),
    imgP: new ig.Image( 'media/portability_icon.png' ),
    imgI: new ig.Image( 'media/infectious_icon.png' ),
    imgC: new ig.Image( 'media/covertness_icon.png' ),
    imgB: new ig.Image( 'media/bandwidth_icon.png' ),


    // checkAgainst: ig.Entity.TYPE.BOTH,
    // type: ig.Entity.TYPE.A,


    collides: ig.Entity.COLLIDES.NEVER,

    size:{x:130,y:32},
    iconSize:32,

    toggled:false,
    isHovered:false,

    stats:0,

    init: function( x, y, settings ) {
      this.stats = ig.game.spawnEntity ( EntityUpgradeFiller, -100, -100, 32, 32);

      //this.stats.portability;

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

      if(ig.game.pauseReturn != "BOX"){
        if(this.inFocus()){
          //console.log("activate hover!");
          this.isHovered = true;
          ig.game.sortEntitiesDeferred();
        }else{
          this.isHovered = false;
        }

        if (ig.input.pressed('lbtn') && this.inFocus()) {
          // console.log('clicked');
          this.togglerFunc();
        }//end lbtn & focus
      }// end no-dialogue if

      this.parent();
    },
    
    draw: function(){
    var offset = 32;
    var ctx = ig.system.context;
    var s = ig.system.scale;
    var margin = 5 ;

    //this.imgP.draw( 10, 10 );

    //colored indiator boxes
    var average = this.stats.portability 
            +this.stats.infectious
            +this.stats.covertness
            +this.stats.bandwidth;
    average /= 4.0;

    var tmp_p = this.stats.portability/average;
    var tmp_i = this.stats.infectious/average;
    var tmp_c = this.stats.covertness/average;
    var tmp_b = this.stats.bandwidth/average;

    if(tmp_p>1){ctx.fillStyle = "rgba(150,255,150,0.3)";}
      else{ctx.fillStyle = "rgba(255,150,150,0.3)";}
    ctx.fillRect(this.pos.x, this.pos.y, this.iconSize, this.iconSize);

    if(tmp_i>1){ctx.fillStyle = "rgba(150,255,150,0.3)";}
      else{ctx.fillStyle = "rgba(255,150,150,0.3)";}
    ctx.fillRect(this.pos.x+this.iconSize, this.pos.y, this.iconSize, this.iconSize);

    if(tmp_c>1){ctx.fillStyle = "rgba(150,255,150,0.3)";}
      else{ctx.fillStyle = "rgba(255,150,150,0.3)";}
    ctx.fillRect(this.pos.x+this.iconSize*2, this.pos.y, this.iconSize, this.iconSize);

    if(tmp_b>1){ctx.fillStyle = "rgba(150,255,150,0.3)";}
      else{ctx.fillStyle = "rgba(255,150,150,0.3)";}
    ctx.fillRect(this.pos.x+this.iconSize*3, this.pos.y, this.iconSize, this.iconSize);

    //gray background boxes
    ctx.fillStyle = "rgba(120,120,150,0.3)"; 
    ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    if(this.toggled){
      ctx.fillStyle = "rgba(255,255,255,0.1)";
    }
    ctx.fillRect(this.pos.x-margin, this.pos.y-margin, this.size.x+margin*2, this.size.y+margin*2);



    ig.system.context.drawImage( this.imgP.data, this.pos.x, this.pos.y, 32, 32 );
    ig.system.context.drawImage( this.imgI.data, this.pos.x+offset, this.pos.y, 32, 32 );
    ig.system.context.drawImage( this.imgC.data, this.pos.x+offset*2, this.pos.y, 32, 32 );
    ig.system.context.drawImage( this.imgB.data, this.pos.x+offset*3, this.pos.y, 32, 32 );

    if(this.isHovered){
      ig.game.font.draw( 
            this.stats.name
            +"\nP: "+this.stats.portability
            +"\nI: "+this.stats.infectious
            +"\nC: "+this.stats.covertness
            +"\nB: "+this.stats.bandwidth
            +"\nExp: "+this.stats.exp_cost
            +"", //useless piece of line segment to hold that comma
            ig.input.mouse.x, ig.input.mouse.y, 800);
    }
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
      if(!this.toggled){
        if(ig.game.virus.bandwidth + this.stats.bandwidth > ig.superStats.maxBandwidth){
          return 0;
        }if(ig.game.virus.exp_cost - this.stats.exp_cost < 0){
          return 0;
        }
      }

      this.toggled = !this.toggled;
      if(this.toggled){
        ig.game.virus.portability += this.stats.portability;
        // ig.game.virus.vectortype += this.stats.vectortype;
        ig.game.virus.infectious += this.stats.infectious;
        ig.game.virus.covertness += this.stats.covertness;
        ig.game.virus.bandwidth += this.stats.bandwidth;
        ig.game.virus.exp_cost -= this.stats.exp_cost;
      }
      else{
        ig.game.virus.portability -= this.stats.portability;
        // ig.game.virus.vectortype -= this.stats.vectortype;
        ig.game.virus.infectious -= this.stats.infectious;
        ig.game.virus.covertness -= this.stats.covertness;
        ig.game.virus.bandwidth -= this.stats.bandwidth;
        ig.game.virus.exp_cost += this.stats.exp_cost;
      }
    },



  });

});
