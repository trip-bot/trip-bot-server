const express = require("express");
const router = express.Router();
const FB = require("fb");
const Conf = require("../config");
const watson = require("watson-developer-cloud");
const request = require("superagent");

const config = new Conf();
const longText = "Green Arrow is a fictional superhero who appears in comic books published by DC Comics. Created by Morton Weisinger and designed by George Papp, he first appeared in More Fun Comics #73 in November 1941. His real name is Oliver Queen, a billionaire businessman and owner of Queen Industries, also a well-known celebrity in his locale of Star City.[2] Sometimes shown dressed like Robin Hood, Green Arrow is an archer who uses his skills to fight crime in his home cities of Star City and Seattle, as well as alongside his fellow superheroes as a member of the Justice League. Though much less frequently used in modern stories, he also deploys a range of trick arrows with various special functions, such as glue, explosive-tipped, grappling hook, flash grenade, tear gas and even kryptonite arrows for use in a range of special situations. ";

const personalityInsights = watson.personality_insights({
  username: config.piAccount,
  password: config.piPassword,
  version: "v2"
});

var content = null;

function analysisPersonality(res) {
  personalityInsights.profile({ text: longText },
    (err, profile) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        // console.log(profile);
        res.send(profile);
      }
    });
  // res.send(content);
}

function getMoreContentIfNeeded(next, res, cb) {
  console.log(content.split(" ").length);
  // console.log(next);
    request.get(next)
          .set("Content-Type", "application/json")
          .end((err, nextRes) => {
            const json = JSON.parse(nextRes.text);
            content += json.data.map((val) => val.message).join();
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
