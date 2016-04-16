const express = require("express");
const router = express.Router();
const FB = require("fb");
const Conf = require("../config");
const watson = require("watson-developer-cloud");
const request = require("superagent");

const config = new Conf();
// const longText = "Green Arrow is a fictional superhero who appears in comic books published by DC Comics. Created by Morton Weisinger and designed by George Papp, he first appeared in More Fun Comics #73 in November 1941. His real name is Oliver Queen, a billionaire businessman and owner of Queen Industries, also a well-known celebrity in his locale of Star City.[2] Sometimes shown dressed like Robin Hood, Green Arrow is an archer who uses his skills to fight crime in his home cities of Star City and Seattle, as well as alongside his fellow superheroes as a member of the Justice League. Though much less frequently used in modern stories, he also deploys a range of trick arrows with various special functions, such as glue, explosive-tipped, grappling hook, flash grenade, tear gas and even kryptonite arrows for use in a range of special situations. ";

const result = {
   "source":"*UNKNOWN*",
   "word_count":3635,
   "processed_lang":"en",
   "tree":{
      "id":"r",
      "name":"root",
      "children":[
         {
            "id":"personality",
            "name":"Big 5",
            "children":[
               {
                  "id":"Agreeableness_parent",
                  "name":"Agreeableness",
                  "category":"personality",
                  "percentage":0.026096401409867968,
                  "children":[
                     {
                        "id":"Openness",
                        "name":"Openness",
                        "category":"personality",
                        "percentage":0.9262681081577265,
                        "sampling_error":0.0538351274,
                        "children":[
                           {
                              "id":"Adventurousness",
                              "name":"Adventurousness",
                              "category":"personality",
                              "percentage":0.9114179528892149,
                              "sampling_error":0.046773171200000005
                           },
                           {
                              "id":"Artistic interests",
                              "name":"Artistic interests",
                              "category":"personality",
                              "percentage":0.2611585920989275,
                              "sampling_error":0.0955774258
                           },
                           {
                              "id":"Emotionality",
                              "name":"Emotionality",
                              "category":"personality",
                              "percentage":0.039645273052463695,
                              "sampling_error":0.0445431868
                           },
                           {
                              "id":"Imagination",
                              "name":"Imagination",
                              "category":"personality",
                              "percentage":0.9635407902020718,
                              "sampling_error":0.058047777
                           },
                           {
                              "id":"Intellect",
                              "name":"Intellect",
                              "category":"personality",
                              "percentage":0.8922228024935431,
                              "sampling_error":0.0506632202
                           },
                           {
                              "id":"Liberalism",
                              "name":"Authority-challenging",
                              "category":"personality",
                              "percentage":0.943064730187994,
                              "sampling_error":0.0767266838
                           }
                        ]
                     },
                     {
                        "id":"Conscientiousness",
                        "name":"Conscientiousness",
                        "category":"personality",
                        "percentage":0.8598643182791085,
                        "sampling_error":0.06851654480000001,
                        "children":[
                           {
                              "id":"Achievement striving",
                              "name":"Achievement striving",
                              "category":"personality",
                              "percentage":0.9377481918931609,
                              "sampling_error":0.090552745
                           },
                           {
                              "id":"Cautiousness",
                              "name":"Cautiousness",
                              "category":"personality",
                              "percentage":0.9319742868409303,
                              "sampling_error":0.08366202519999999
                           },
                           {
                              "id":"Dutifulness",
                              "name":"Dutifulness",
                              "category":"personality",
                              "percentage":0.1418478759121613,
                              "sampling_error":0.0555066444
                           },
                           {
                              "id":"Orderliness",
                              "name":"Orderliness",
                              "category":"personality",
                              "percentage":0.1183140807512425,
                              "sampling_error":0.0644987092
                           },
                           {
                              "id":"Self-discipline",
                              "name":"Self-discipline",
                              "category":"personality",
                              "percentage":0.760915018326837,
                              "sampling_error":0.0427776308
                           },
                           {
                              "id":"Self-efficacy",
                              "name":"Self-efficacy",
                              "category":"personality",
                              "percentage":0.23258844869535916,
                              "sampling_error":0.0839107722
                           }
                        ]
                     },
                     {
                        "id":"Extraversion",
                        "name":"Extraversion",
                        "category":"personality",
                        "percentage":0.034193528795848666,
                        "sampling_error":0.0506541232,
                        "children":[
                           {
                              "id":"Activity level",
                              "name":"Activity level",
                              "category":"personality",
                              "percentage":0.17070364035615443,
                              "sampling_error":0.0709288912
                           },
                           {
                              "id":"Assertiveness",
                              "name":"Assertiveness",
                              "category":"personality",
                              "percentage":0.034150328603195126,
                              "sampling_error":0.0753824796
                           },
                           {
                              "id":"Cheerfulness",
                              "name":"Cheerfulness",
                              "category":"personality",
                              "percentage":0.03369854785396613,
                              "sampling_error":0.0945787478
                           },
                           {
                              "id":"Excitement-seeking",
                              "name":"Excitement-seeking",
                              "category":"personality",
                              "percentage":0.05584305432349884,
                              "sampling_error":0.0761470268
                           },
                           {
                              "id":"Friendliness",
                              "name":"Outgoing",
                              "category":"personality",
                              "percentage":0.01703081634921583,
                              "sampling_error":0.0685639666
                           },
                           {
                              "id":"Gregariousness",
                              "name":"Gregariousness",
                              "category":"personality",
                              "percentage":0.04165868831465342,
                              "sampling_error":0.0533600406
                           }
                        ]
                     },
                     {
                        "id":"Agreeableness",
                        "name":"Agreeableness",
                        "category":"personality",
                        "percentage":0.026096401409867968,
                        "sampling_error":0.08925801459999999,
                        "children":[
                           {
                              "id":"Altruism",
                              "name":"Altruism",
                              "category":"personality",
                              "percentage":0.025159339246647816,
                              "sampling_error":0.064649491
                           },
                           {
                              "id":"Cooperation",
                              "name":"Cooperation",
                              "category":"personality",
                              "percentage":0.295101439165738,
                              "sampling_error":0.0735373466
                           },
                           {
                              "id":"Modesty",
                              "name":"Modesty",
                              "category":"personality",
                              "percentage":0.03860860392295696,
                              "sampling_error":0.0500864756
                           },
                           {
                              "id":"Morality",
                              "name":"Uncompromising",
                              "category":"personality",
                              "percentage":0.038360960869451635,
                              "sampling_error":0.0575213874
                           },
                           {
                              "id":"Sympathy",
                              "name":"Sympathy",
                              "category":"personality",
                              "percentage":0.030402184432959375,
                              "sampling_error":0.0884716618
                           },
                           {
                              "id":"Trust",
                              "name":"Trust",
                              "category":"personality",
                              "percentage":0.1524165280300564,
                              "sampling_error":0.0498003022
                           }
                        ]
                     },
                     {
                        "id":"Neuroticism",
                        "name":"Emotional range",
                        "category":"personality",
                        "percentage":0.23610176340474376,
                        "sampling_error":0.0811458598,
                        "children":[
                           {
                              "id":"Anger",
                              "name":"Fiery",
                              "category":"personality",
                              "percentage":0.1661328191361283,
                              "sampling_error":0.08568776
                           },
                           {
                              "id":"Anxiety",
                              "name":"Prone to worry",
                              "category":"personality",
                              "percentage":0.28297717797647454,
                              "sampling_error":0.0499409846
                           },
                           {
                              "id":"Depression",
                              "name":"Melancholy",
                              "category":"personality",
                              "percentage":0.21588377019902058,
                              "sampling_error":0.052849528
                           },
                           {
                              "id":"Immoderation",
                              "name":"Immoderation",
                              "category":"personality",
                              "percentage":0.19343206244220443,
                              "sampling_error":0.048330331000000004
                           },
                           {
                              "id":"Self-consciousness",
                              "name":"Self-consciousness",
                              "category":"personality",
                              "percentage":0.28883748737714227,
                              "sampling_error":0.050941107400000005
                           },
                           {
                              "id":"Vulnerability",
                              "name":"Susceptible to stress",
                              "category":"personality",
                              "percentage":0.22537044297736236,
                              "sampling_error":0.0772580554
                           }
                        ]
                     }
                  ]
               }
            ]
         },
         {
            "id":"needs",
            "name":"Needs",
            "children":[
               {
                  "id":"Love_parent",
                  "name":"Love",
                  "category":"needs",
                  "percentage":0.018335107000215463,
                  "children":[
                     {
                        "id":"Challenge",
                        "name":"Challenge",
                        "category":"needs",
                        "percentage":0.6611185753352693,
                        "sampling_error":0.0764513532
                     },
                     {
                        "id":"Closeness",
                        "name":"Closeness",
                        "category":"needs",
                        "percentage":0.07961876604419298,
                        "sampling_error":0.07543406059999999
                     },
                     {
                        "id":"Curiosity",
                        "name":"Curiosity",
                        "category":"needs",
                        "percentage":0.5301866083017013,
                        "sampling_error":0.1081809182
                     },
                     {
                        "id":"Excitement",
                        "name":"Excitement",
                        "category":"needs",
                        "percentage":0.0477535456341686,
                        "sampling_error":0.0976913648
                     },
                     {
                        "id":"Harmony",
                        "name":"Harmony",
                        "category":"needs",
                        "percentage":0.02210249161436916,
                        "sampling_error":0.096640531
                     },
                     {
                        "id":"Ideal",
                        "name":"Ideal",
                        "category":"needs",
                        "percentage":0.6917188279474619,
                        "sampling_error":0.0878302076
                     },
                     {
                        "id":"Liberty",
                        "name":"Liberty",
                        "category":"needs",
                        "percentage":0.03281782874411394,
                        "sampling_error":0.1315508784
                     },
                     {
                        "id":"Love",
                        "name":"Love",
                        "category":"needs",
                        "percentage":0.018335107000215463,
                        "sampling_error":0.0892500972
                     },
                     {
                        "id":"Practicality",
                        "name":"Practicality",
                        "category":"needs",
                        "percentage":0.02757359308584652,
                        "sampling_error":0.0783648522
                     },
                     {
                        "id":"Self-expression",
                        "name":"Self-expression",
                        "category":"needs",
                        "percentage":0.3772049644685835,
                        "sampling_error":0.0738554596
                     },
                     {
                        "id":"Stability",
                        "name":"Stability",
                        "category":"needs",
                        "percentage":0.15970549923108668,
                        "sampling_error":0.0954828084
                     },
                     {
                        "id":"Structure",
                        "name":"Structure",
                        "category":"needs",
                        "percentage":0.3661058277797698,
                        "sampling_error":0.072185312
                     }
                  ]
               }
            ]
         },
         {
            "id":"values",
            "name":"Values",
            "children":[
               {
                  "id":"Self-enhancement_parent",
                  "name":"Self-enhancement",
                  "category":"values",
                  "percentage":0.9586471912510164,
                  "children":[
                     {
                        "id":"Conservation",
                        "name":"Conservation",
                        "category":"values",
                        "percentage":0.8615446894057832,
                        "sampling_error":0.06368516
                     },
                     {
                        "id":"Openness to change",
                        "name":"Openness to change",
                        "category":"values",
                        "percentage":0.055091934026030825,
                        "sampling_error":0.059143456600000005
                     },
                     {
                        "id":"Hedonism",
                        "name":"Hedonism",
                        "category":"values",
                        "percentage":0.09773046043361892,
                        "sampling_error":0.1230264984
                     },
                     {
                        "id":"Self-enhancement",
                        "name":"Self-enhancement",
                        "category":"values",
                        "percentage":0.9586471912510164,
                        "sampling_error":0.0930083034
                     },
                     {
                        "id":"Self-transcendence",
                        "name":"Self-transcendence",
                        "category":"values",
                        "percentage":0.05064124107852677,
                        "sampling_error":0.0701676454
                     }
                  ]
               }
            ]
         }
      ]
   }
};
const personalityInsights = watson.personality_insights({
  username: config.piAccount,
  password: config.piPassword,
  version: "v2"
});

var content = null;

Array.prototype.flatten = function() {
    var ret = [];
    for(var i = 0; i < this.length; i++) {
        if(Array.isArray(this[i])) {
            ret = ret.concat(this[i].flatten());
        } else {
            ret.push(this[i]);
        }
    }
    return ret;
};

function isMajorPersonality(val) {
  return val.percentage - val.sampling_error > 0.8;
}

function analysisPersonality(res) {
  // console.log(`analysising...length: ${content.split(" ").length}`);
  // personalityInsights.profile({ text: content },
  //   (err, profile) => {
  //     if (err) {
  //       console.log(err);
  //       res.send(err);
  //     } else {
  //       console.log("done");
  //
  //     }
  //   });
    const attrs = result.tree
                .children[0]
                .children[0].children
                .map((val) => val.children)
                .flatten()
                .filter(isMajorPersonality)
                .sort(isMajorPersonality)
                .slice(0, 3)
                .map((val) => val.name);

  res.send(attrs);
}

function getMoreContentIfNeeded(next, res, cb) {
  console.log(content.split(" ").length);
  // console.log(next);
    request.get(next)
          .set("Content-Type", "application/json")
          .end((err, nextRes) => {
            const json = JSON.parse(nextRes.text);
            content += json.data.map((val) => val.message).join(" ");
            if (content.split(" ").length < 1000) {
              getMoreContentIfNeeded(json.paging.next, res, cb);
            } else {
              cb(res);
            }
          });
}

router.get("/me", (req, res) => {
  FB.api("/me", (response) => {
    // console.log(response);
    FB.api(`${response.id}/posts`, (resp) => {
      content = resp.data.map((val) => val.message).join();
      if (content.split(" ").length < 1000) {
          getMoreContentIfNeeded(resp.paging.next, res, analysisPersonality);
      } else {
        analysisPersonality(res);
      }
    });
  });
});

module.exports = router;
