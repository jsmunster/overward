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
    name:"overwrite-name",
    text:"overwrite-text",

    init: function( x, y, settings ) {

      // this.imgP.width *=0.25;
      // this.imgP.height *=0.25;
      //this.imgP.width=32;
      this.parent( x, y, settings );

      var nouns = this.nounListJSON.nounlist;
      var noun = nouns[this.randomNumGen(0,nouns.length-1)]; //this.randomNumGen(0,len);

      var verbs = this.verbListJSON.verblist;
      var verb = verbs[this.randomNumGen(0,verbs.length-1)]; //this.randomNumGen(0,len);

      this.portability = noun.portability+verb.portability+this.randomNumGen(1,3);
      this.infectious = noun.infectious+verb.infectious+this.randomNumGen(1,3);
      this.covertness = noun.covertness+verb.covertness+this.randomNumGen(1,3);
      this.bandwidth = noun.bandwidth+verb.bandwidth+this.randomNumGen(1,3);
      this.exp_cost = noun.exp_cost+verb.exp_cost+this.randomNumGen(1,3);
      this.name = noun.name + "-" + verb.name;
      this.text = noun.text[this.randomNumGen(0,noun.text.length-1)].outcome 
              + " " 
              + verb.text[this.randomNumGen(0,verb.text.length-1)].outcome;

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
          "portability":5,
          "infectious":5,
          "covertness":5,
          "bandwidth":5,  //no comma cuz last thing in this object
          "exp_cost":5
          }, 

        {"name":"Server",
          "text":[ //text[] is like an array
              {"outcome":"The first exagerated thing happens",},
              {"outcome":"The second exagerated thing happens",},
              {"outcome":"The third exagerated thing happens",} 
              ],
          "portability":5,
          "infectious":5,
          "covertness":5,
          "bandwidth":5,
          "exp_cost":5
          },

        {"name":"Command",
          "text":[ //text[] is like an array
              {"outcome":"The first exagerated thing happens",},
              {"outcome":"The second exagerated thing happens",},
              {"outcome":"The third exagerated thing happens",} 
              ],
          "portability":5,
          "infectious":5,
          "covertness":5,
          "bandwidth":5,
          "exp_cost":5
          },

         {"name":"Admin",
          "text":[ //text[] is like an array
              {"outcome":"The first exagerated thing happens",},
              {"outcome":"The second exagerated thing happens",},
              {"outcome":"The third exagerated thing happens",} 
              ],
          "portability":5,
          "infectious":5,
          "covertness":5,
          "bandwidth":5,
          "exp_cost":5
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
        "portability":5,
        "infectious":5,
        "covertness":5,
        "bandwidth":5,
        "exp_cost":5
          },

      {"name":"Infection",
        "text":[ //text[] is like an array
            {"outcome":"The first exagerated thing happens",},
            {"outcome":"The second exagerated thing happens",},
            {"outcome":"The third exagerated thing happens",} 
            ],
        "portability":5,
        "infectious":5,
        "covertness":5,
        "bandwidth":5,
        "exp_cost":5
          },

      {"name":"Stealth",
        "text":[ //text[] is like an array
            {"outcome":"The first exagerated thing happens",},
            {"outcome":"The second exagerated thing happens",},
            {"outcome":"The third exagerated thing happens",} 
            ],
        "portability":5,
        "infectious":5,
        "covertness":5,
        "bandwidth":5,
        "exp_cost":5
          },
       {"name":"Override",
        "text":[ //text[] is like an array
            {"outcome":"The first exagerated thing happens",},
            {"outcome":"The second exagerated thing happens",},
            {"outcome":"The third exagerated thing happens",} 
            ],
        "portability":5,
        "infectious":5,
        "covertness":5,
        "bandwidth":5,
        "exp_cost":5
          }

    ]
  }, //end of noun list json




  });

});
