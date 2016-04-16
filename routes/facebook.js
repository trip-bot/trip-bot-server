const express = require("express");
const router = express.Router();
const FB = require("fb");
const Conf = require("../config");
const watson = require("watson-developer-cloud");
const config = new Conf();
const longText = "Green Arrow is a fictional superhero who appears in comic books published by DC Comics. Created by Morton Weisinger and designed by George Papp, he first appeared in More Fun Comics #73 in November 1941. His real name is Oliver Queen, a billionaire businessman and owner of Queen Industries, also a well-known celebrity in his locale of Star City.[2] Sometimes shown dressed like Robin Hood, Green Arrow is an archer who uses his skills to fight crime in his home cities of Star City and Seattle, as well as alongside his fellow superheroes as a member of the Justice League. Though much less frequently used in modern stories, he also deploys a range of trick arrows with various special functions, such as glue, explosive-tipped, grappling hook, flash grenade, tear gas and even kryptonite arrows for use in a range of special situations. ";
const personalityInsights = watson.personality_insights({
  username: config.piAccount,
  password: config.piPassword,
  version: "v2"
});

function analysisPersonality(content, res) {
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
}

router.get("/me", (req, res) => {
  FB.api("/me", (fbResponse) => {
    console.log(fbResponse);
    FB.api(`${fbResponse.id}/posts`, (postRes) => {
      const content = postRes.data.map((val) => val.message).join(", ");
      analysisPersonality(content, res);
    });
  });
});

module.exports = router;
