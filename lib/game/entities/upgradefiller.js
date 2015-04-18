/*
nouns

	Web
	Server
	Command
	Admin


Verb

	Buster
	Infection
	Stealth
	Override

*/

ig.module(
  'game.entities.upgradefiller'
)
.requires(
  'impact.entity'
)
.defines(function(){
  EntityUpgradeFiller = ig.Entity.extend({

  	portability:1,
  	infectious:1,
  	covertness:1,
  	bandwidth:1,
  	exp_cost:1,

    init: function( x, y, settings ) {

      // this.imgP.width *=0.25;
      // this.imgP.height *=0.25;
      //this.imgP.width=32;
      this.parent( x, y, settings );

    },

    update: function() {
      
      this.parent();
    },
    
    draw: function(){
      this.parent();
    },

    // youll need this here
    randomNumGen: function(smallest,largest){
      return (smallest + Math.floor(Math.random()*largest-smallest+1));
    },

    // i put them inside of the Entityxxx delcare. this might be wrong, it might need to do farther outside?
  var nounListJSON = {"nounlist": //N L JSON is a JSON object, we tell cuz of the leading curly brace
    [							//nounlist is like an array, so we use square brackets
      {"name":"Web",
        "text":[ //text[] is like an array
        		{"outcome":"The first exagerated thing happens",},
        		{"outcome":"The second exagerated thing happens",},
        		{"outcome":"The third exagerated thing happens",} //no comma cuz last thing in array
        		], //end of array, comma cuz theres more shit in this object
        "portability":5,
        "infectious":5,
        "covertness":5,
        "bandwidth":5  //no comma cuz last thing in this object
        }, 

         {"name":"Warrior Home Planet",
        "text":"You come from a long line of military generals and bloodthirsty warriors."
        +"\nYou plan on making your people proud as you conquer the galaxy,"
        +"\none planet at a time."
        +"\nFire the telecaster to conquer your first planet and claim it for your people!",
        "fuel":30,
        "crew":0,
        "hull":40,
        "crystal":0
        },

         {"name":"Overpopulated Home Planet",
        "text":"Your species is numerous and your home planet crowded. As a desperate measure,"
        +"\nyou have been sent forth to explore and colonize other planets and search for"
        +"\nlife-sustaining resources."
        +"\nClick to transport your colonists to your first planet via telecaster! ",
        "fuel":30,
        "crew":40,
        "hull":0,
        "crystal":0
        }  //last thing in nounlist array, so no comma
    ] // nounlist is only an aray, no other objects, so no comma here
  }; //end of noun list json



  var verbListJSON = {"verblist": //do this one too
    [
      {"name":"Science Home Planet",
        "text":"As a scientist, your job is to explore and record your findings as you"
        +"\n travel the galaxy. Your observations will help shape your planet's perception"
        +"\nof the universe, and ultimately shape history."
        +"\nClick to activate the telecaster and explore your first planet!",
        "fuel":40,
        "crew":0,
        "hull":0,
        "crystal":20
        },

         {"name":"Warrior Home Planet",
        "text":"You come from a long line of military generals and bloodthirsty warriors."
        +"\nYou plan on making your people proud as you conquer the galaxy,"
        +"\none planet at a time."
        +"\nFire the telecaster to conquer your first planet and claim it for your people!",
        "fuel":30,
        "crew":0,
        "hull":40,
        "crystal":0
        },

         {"name":"Overpopulated Home Planet",
        "text":"Your species is numerous and your home planet crowded. As a desperate measure,"
        +"\nyou have been sent forth to explore and colonize other planets and search for"
        +"\nlife-sustaining resources."
        +"\nClick to transport your colonists to your first planet via telecaster! ",
        "fuel":30,
        "crew":40,
        "hull":0,
        "crystal":0
        }
    ]
  }; //end of noun list json




  });

});
