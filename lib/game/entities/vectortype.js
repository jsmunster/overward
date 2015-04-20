ig.module(
  'game.entities.vectortype'
)
.requires(
  'impact.entity',
  'impact.sound'
)
.defines(function(){
  EntityVectorType = ig.Entity.extend({

      //animSheet: new ig.AnimationSheet( 'media/player.png', 16, 16 ),
    imgP: new ig.Image( 'media/portability_icon.png' ),
    imgI: new ig.Image( 'media/infectious_icon.png' ),
    imgC: new ig.Image( 'media/covertness_icon.png' ),
    imgB: new ig.Image( 'media/bandwidth_icon.png' ),


    // checkAgainst: ig.Entity.TYPE.BOTH,
    // type: ig.Entity.TYPE.A,


    collides: ig.Entity.COLLIDES.NEVER,

    size:{x:130,y:32},

    index:0, stats:0,

    toggled:false,

    stats:0,

    init: function( x, y, settings ) {
      // this.stats = ig.game.spawnEntity ( EntityUpgradeFiller, -100, -100, 32, 32);

      // //this.stats.portability;
      // settings.index = this.index;

      if(settings.index){
        this.index = settings.index;
        this.stats = this.vectorTypeJSON.vectorlist[this.index];
      }else{
        this.stats = this.vectorTypeJSON.vectorlist[0];
      }



      console.log(this.stats);




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


    ctx.fillStyle = "rgba(120,120,150,0.3)"; //
    ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    if(this.toggled){
      ctx.fillStyle = "rgba(120,120,150,0.1)";
    }
    ctx.fillRect(this.pos.x-margin, this.pos.y-margin, this.size.x+margin*2, this.size.y+margin*2);

    ig.system.context.drawImage( this.imgP.data, this.pos.x, this.pos.y, 32, 32 );
    ig.system.context.drawImage( this.imgI.data, this.pos.x+offset, this.pos.y, 32, 32 );
    ig.system.context.drawImage( this.imgC.data, this.pos.x+offset*2, this.pos.y, 32, 32 );
    ig.system.context.drawImage( this.imgB.data, this.pos.x+offset*3, this.pos.y, 32, 32 );

    ig.game.font.draw( 
        this.stats.name, //useless piece of line segment to hold that comma
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


      var allVectors =  ig.game.getEntitiesByType( EntityVectorType );
      for (index in allVectors){
        var vector = allVectors[index];
        // console.log(vector);
        if (vector.toggled) {
          vector.toggled = false;
          ig.game.virus.portability /= vector.stats.portability;
          // ig.game.virus.vectortype -= vector.stats.vectortype;
          ig.game.virus.infectious /= vector.stats.infectious;
          ig.game.virus.covertness /= vector.stats.covertness;
          ig.game.virus.bandwidth /= vector.stats.bandwidth;
        }else{

        }
      }

      this.toggled = true;
      ig.game.virus.portability *= this.stats.portability;
      // ig.game.virus.vectortype += this.stats.vectortype;
      ig.game.virus.infectious *= this.stats.infectious;
      ig.game.virus.covertness *= this.stats.covertness;
      ig.game.virus.bandwidth *= this.stats.bandwidth;

    },


    vectorTypeJSON: {"vectorlist": //N L JSON is a JSON object, we tell cuz of the leading curly brace
      [             //nounlist is like an array, so we use square brackets
        {"name":"DO NOT USE THIS",
          //end of array, comma cuz theres more shit in this object
          "portability":1.01,
          "infectious":1.01,
          "covertness":1.01,
          "bandwidth":1.01,  //no comma cuz last thing in this object
          "exp_cost":1.01
          }, 

        {"name":"Email",  //max of 14 characters
          //end of array, comma cuz theres more shit in this object
          "portability":1.05,
          "infectious":1.01,
          "covertness":1.01,
          "bandwidth":1.01,  //no comma cuz last thing in this object
          "exp_cost":1.01
          }, 

        {"name":"SQL Injection",
          //end of array, comma cuz theres more shit in this object
          "portability":1.01,
          "infectious":1.05,
          "covertness":1.01,
          "bandwidth":1.01,  //no comma cuz last thing in this object
          "exp_cost":1.01
          }, 

         {"name":"Thumb Drive",
          //end of array, comma cuz theres more shit in this object
          "portability":1.01,
          "infectious":1.01,
          "covertness":1.05,
          "bandwidth":1.01,  //no comma cuz last thing in this object
          "exp_cost":1.01
          }  //last thing in vectorlist array, so no comma
      ] // vectorlist is only an aray, no other objects, so no comma here
    }, //end of vectorlist  json

  });

});
