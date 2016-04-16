var express = require('express');
var router = express.Router();

/* GET home page. */
// Index route
router.get("/", function (req, res) {
  res.send('Hello world, I am a chat bot')
});

// for Facebook verification
router.get("/webhook", function (req, res) {
  if (req.query["hub.verify_token"] === "my_voice_is_my_password_verify_me") {
      res.send(req.query["hub.challenge"])
  }
  res.send("Error, wrong token")
});

router.post("/webhook/", function (req, res) {
  req.body.entry[0].messagings.map(event => {
    var sender = event.sender.id;
    if (event.message && event.message.text) {
      var text = event.message.text;
      sendTextMessage(sender, "Text received, echo: "+ text.substring(0, 200));
    }
  });
  res.sendStatus(200);
});

const token = "CAAXZCwcSKm2gBAGSWc5QIclBVzStH4ICBWhBmv5Sb0ONlao9ufC0nZBzGzcH7qdYBI3mT2mFhi9zRLJipGlw9VffZBbQrkzyTpiBkvjLfIMAZBVogD38lZAgeXWZBJsSE8gYkW7jLLInegQql9ki2vW8QAjqwP6YOUoVfQZCWlA38bTCrD0Ezj8aIXtgczLglWzZCLDYyrnLmAZDZD";

function sendTextMessage(sender, text) {
  messageData = { text: text };
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: { access_token: token },
    method: "POST",
    json: {
      recipient: { id: sender },
      message: messageData,
    }
  }, (error, response, body) => {
    if (error) {
      console.log("Error sending message: ", error);
    } else if (response.body.error) {
      console.log("Error: ", response.body.error);
    }
  });
}

module.exports = router;
