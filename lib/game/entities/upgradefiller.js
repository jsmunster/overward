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
    nounListJSON: {"nounlist": //N L JSON is a JSON object, we tell cuz of the leading curly brace
      [             //nounlist is like an array, so we use square brackets
        {"name":"Web",
          "text":[ //text[] is like an array
              {"outcome":"The first exagerated thing happens",},
              {"outcome":"The second exagerated thing happens",},
              {"outcome":"The third exagerated thing happens",} //no comma cuz last thing in array
              ], //end of array, comma cuz theres more shit in this object
          "portability":Math.floor((Math.random() * 5) +1),
          "infectious":Math.floor((Math.random() * 5) +1),
          "covertness":Math.floor((Math.random() * 5) +1),
          "bandwidth":Math.floor((Math.random() * 5) +1)  //no comma cuz last thing in this object
          }, 

        {"name":"Server",
          "text":[ //text[] is like an array
              {"outcome":"The first exagerated thing happens",},
              {"outcome":"The second exagerated thing happens",},
              {"outcome":"The third exagerated thing happens",} 
              ],
          "portability":Math.floor((Math.random() * 5) +1),
          "infectious":Math.floor((Math.random() * 5) +1),
          "covertness":Math.floor((Math.random() * 5) +1),
          "bandwidth":Math.floor((Math.random() * 5) +1)
          },

        {"name":"Command",
          "text":[ //text[] is like an array
              {"outcome":"The first exagerated thing happens",},
              {"outcome":"The second exagerated thing happens",},
              {"outcome":"The third exagerated thing happens",} 
              ],
          "portability":Math.floor((Math.random() * 5) +1),
          "infectious":Math.floor((Math.random() * 5) +1),
          "covertness":Math.floor((Math.random() * 5) +1),
          "bandwidth":Math.floor((Math.random() * 5) +1)
          },

         {"name":"Admin",
          "text":[ //text[] is like an array
              {"outcome":"The first exagerated thing happens",},
              {"outcome":"The second exagerated thing happens",},
              {"outcome":"The third exagerated thing happens",} 
              ],
          "portability":Math.floor((Math.random() * 5) +1),
          "infectious":Math.floor((Math.random() * 5) +1),
          "covertness":Math.floor((Math.random() * 5) +1),
          "bandwidth":Math.floor((Math.random() * 5) +1)
            }  //last thing in nounlist array, so no comma
      ] // nounlist is only an aray, no other objects, so no comma here
    }, //end of noun list json



    verbListJSON: {"verblist": //do this one too
    [
      {"name":"Buster",
        "text":[ //text[] is like an array
            {"outcome":"The first exagerated thing happens",},
            {"outcome":"The second exagerated thing happens",},
            {"outcome":"The third exagerated thing happens",} 
            ],
        "portability":Math.floor((Math.random() * 5) +1),
        "infectious":Math.floor((Math.random() * 5) +1),
        "covertness":Math.floor((Math.random() * 5) +1),
        "bandwidth":Math.floor((Math.random() * 5) +1)
          },

      {"name":"Infection",
        "text":[ //text[] is like an array
            {"outcome":"The first exagerated thing happens",},
            {"outcome":"The second exagerated thing happens",},
            {"outcome":"The third exagerated thing happens",} 
            ],
        "portability":Math.floor((Math.random() * 5) +1),
        "infectious":Math.floor((Math.random() * 5) +1),
        "covertness":Math.floor((Math.random() * 5) +1),
        "bandwidth":Math.floor((Math.random() * 5) +1)
          },

      {"name":"Stealth",
        "text":[ //text[] is like an array
            {"outcome":"The first exagerated thing happens",},
            {"outcome":"The second exagerated thing happens",},
            {"outcome":"The third exagerated thing happens",} 
            ],
        "portability":Math.floor((Math.random() * 5) +1),
        "infectious":Math.floor((Math.random() * 5) +1),
        "covertness":Math.floor((Math.random() * 5) +1),
        "bandwidth":Math.floor((Math.random() * 5) +1)
          },
       {"name":"Override",
        "text":[ //text[] is like an array
            {"outcome":"The first exagerated thing happens",},
            {"outcome":"The second exagerated thing happens",},
            {"outcome":"The third exagerated thing happens",} 
            ],
        "portability":Math.floor((Math.random() * 5) +1),
        "infectious":Math.floor((Math.random() * 5) +1),
        "covertness":Math.floor((Math.random() * 5) +1),
        "bandwidth":Math.floor((Math.random() * 5) +1)
          }

    ]
  }, //end of noun list json




  });

});
