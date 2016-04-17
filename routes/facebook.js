const express = require("express");
const router = express.Router();
const FB = require("fb");
const Conf = require("../config");
const watson = require("watson-developer-cloud");
const request = require("superagent");

const config = new Conf();
// const longText = "Green Arrow is a fictional superhero who appears in comic books published by DC Comics. Created by Morton Weisinger and designed by George Papp, he first appeared in More Fun Comics #73 in November 1941. His real name is Oliver Queen, a billionaire businessman and owner of Queen Industries, also a well-known celebrity in his locale of Star City.[2] Sometimes shown dressed like Robin Hood, Green Arrow is an archer who uses his skills to fight crime in his home cities of Star City and Seattle, as well as alongside his fellow superheroes as a member of the Justice League. Though much less frequently used in modern stories, he also deploys a range of trick arrows with various special functions, such as glue, explosive-tipped, grappling hook, flash grenade, tear gas and even kryptonite arrows for use in a range of special situations. ";

const result = require("../result.js");
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

function mapToTag(personality) {
  switch (personality) {
    case "Excitement-seeking":
      return "excitement";
    case "Susceptible to stress":
      return "introvert";
    case "Emotionality":
      return "anger";
    case "Self-consciousness":
      return "introvert";
    case "Immoderation":
      return "anger"
    case "Melancholy":
      return "anger";
    case "Prone to worry":
      return "anger";
    case "Fiery":
      return "anger";
    case "Dutifulness":
     return "discipline";
    case "Orderliness":
      return "discipline";
    case "Self-discipline":
      return "discipline";
    case "Self-efficacy":
      return "introvert";
    case "Activity level":
      return "excitement";
    case "Assertiveness":
      return "excitement";
    case "Cheerfulness":
      return "art";
    case "Artistic interests":
      return "art";
    case "Outgoing":
      return "excitement";
    case "Gregariousness":
      return "excitement";
    case "Altruism":
      return "discipline";
    case "Cooperation":
      return "discipline";
    case "Modesty":
      return "introvert";
    case "Uncompromising":
      return "anger";
    case "Sympathy":
      return "introvert";
    case "Trust":
     return "discipline";
    case "Adventurousness":
      return "excitement";
    case "Imagination":
      return "excitement";
    case "Intellect":
      return "art";
    case "Authority-challenging":
      return "excitement";
    case "Achievement striving":
      return "introvert";
    case "Cautiousness":
      return "art";
    default:
      return "anger";
  }
}

function uniq(a) {
    const seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
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
    const duplicateTags = result.tree
                .children[0]
                .children[0].children
                .map((val) => val.children)
                .flatten()
                .sort(isMajorPersonality)
                .map((val) => mapToTag(val.name));
    const tags = uniq(duplicateTags).slice(0, 3);

  res.send(tags);
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
