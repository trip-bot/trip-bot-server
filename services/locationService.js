

(function () {
  const FB = require("fb");
  const Conf = require("../config");
  const watson = require("watson-developer-cloud");
  const request = require("superagent");
  const config = new Conf();
  const result = require("../result");
  const locations = require("../locations");
  var content = null;

  const personalityInsights = watson.personality_insights({
    username: config.piAccount,
    password: config.piPassword,
    version: "v2"
  });

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
       return "Tower";
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


  function analysisPersonality(cb) {
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
      const locs = [];
      const others = [];
      locations.locations.forEach((loc) => {
        tags.forEach((tag) => {
          if (loc.tag === tag) {
            locs.push(loc);
          } else {
            others.push(loc);
          }
        });
      });
      cb(locs);
  }

  function getMoreContentIfNeeded(next, cbFinal, cb) {
    console.log(content.split(" ").length);
    // console.log(next);
      request.get(next)
            .set("Content-Type", "application/json")
            .end((err, nextRes) => {
              const json = JSON.parse(nextRes.text);
              content += json.data.map((val) => val.message).join(" ");
              if (content.split(" ").length < 1000) {
                getMoreContentIfNeeded(json.paging.next, cbFinal, cb);
              } else {
                cb(cbFinal);
              }
            });
  }

  module.exports = {
    getLocation: function getLocation(cb) {
      FB.api("/me", (response) => {
        // console.log(response);
        FB.api(`${response.id}/posts`, (resp) => {
          console.log(resp);
          content = resp.data.map((val) => val.message).join();
          if (content.split(" ").length < 1000) {
              getMoreContentIfNeeded(resp.paging.next, cb, analysisPersonality);
          } else {
            analysisPersonality(cb);
          }
        });
      });
    }
  };
})();
