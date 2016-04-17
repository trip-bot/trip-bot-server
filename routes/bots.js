const request = require("request");
const express = require("express");
const messenger = require("../others/messenger");
const Wit = require("node-wit").Wit;
const router = express.Router();

const token = "CAAMoDMGAW7cBAKGjBYbW2vUKq6uE515ZBFuJ5TvWILBbDyl7sC6mT4vIEmHIZCDOjhNYABqPa5O3nI9fiDxcDL40K0sXIWHf0ZBsBZBDHlpF4dL5MvZCSFy1mY4sGqoAWKzKsxDpldOH87cgtafrYgBUvLbCzHIyGtaZCWvZC53yaqxXS3sIhXOwdk08mzuHgLw7u9CjS53uAZDZD";
const sessions = new Map();

const actions = {
  say: (sessionId, context, message, cb) => {
    const recipientId = sessions[sessionId].fbId;
    if (recipientId) {
      request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: token },
        method: "POST",
        json: { recipient: { id: recipientId }, message }
      }, err => {
        if (err) {
          console.log("An error occurred while forwarding the response to", recipientId, ":", err);
        }
        cb();
      });
    } else {
      console.log("Oops! Couldn't find user for session:", sessionId);
      cb();
    }
  },
  merge: (sessionId, context, entities, message, cb) => { cb(context); },
  error: (sessionId, context, error) => { console.log(error.message); }
};

const wit = new Wit("73TTKW23XFN6B4ZBFVR4XME7JN5NO62L", actions);

function saveItinerary(sessionId, message) {
  const recipientId = sessions[sessionId].fbId;
  if (recipientId) {
    request({
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: token },
      method: "POST",
      json: { recipient: { id: recipientId }, message }
    }, (error2, response2) => {
      if (error2) {
        console.log("Error sending messages: ", error2);
      } else if (response2.body.error) {
        console.log("Error: ", response2.body.error);
      }
    });
  }
}

/* GET home page. */
// Index route
router.get("/", (req, res) => {
  res.send("Hello world, I am a chat bot");
});

// for Facebook verification
router.get("/webhook", (req, res) => {
  if (req.query["hub.verify_token"] === "my_voice_is_my_password_verify_me") {
      res.send(req.query["hub.challenge"]);
  }
  res.send("Error, wrong token");
});

const findOrCreateSession = fbId => {
  // Let's see if we already have a session for the user fbId
  const result = sessions.values.find(v => v.fbId === fbId);
  if (typeof result === "undefined") {
    // No session found for user fbId, let's create a new one
    const sessionId = new Date().toISOString();
    sessions[sessionId] = { fbId, context: {} };
    return sessionId;
  }
  return result;
};

router.post("/webhook/", (req, res) => {
  req.body.entry[0].messaging.forEach(event => {
    const sender = event.sender.id;
    const sessionId = findOrCreateSession(event.sender.id);
    if (event.message && event.message.text) {
      wit.runActions(sessionId, event.message.text, sessions[sessionId].context,
        (error, context) => {
          if (error) {
            console.log("Oops! Got an error from Wit:", error);
          } else {
            console.log("Waiting for futher messages.");
            sessions[sessionId].context = context;
          }
        }
      );
      // const text = `${event.message.text.substring(0, 200)}`;
      // setTimeout(() => {
      //   if (event.message.text === "Spots") {
      //     messenger.suggestSpots(sender);
      //   } else {
      //     messenger.send(sender, text);
      //   }
      // }, Math.max(0.5, text.length * 15));
    } else if (event.postback) {
      const text2 = JSON.stringify(event.postback);
      messenger.send(sender, text2);
    }
  });
  res.sendStatus(200);
});

module.exports = router;
