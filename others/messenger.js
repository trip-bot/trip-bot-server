const request = require("request");

const token = "CAAMoDMGAW7cBAKGjBYbW2vUKq6uE515ZBFuJ5TvWILBbDyl7sC6mT4vIEmHIZCDOjhNYABqPa5O3nI9fiDxcDL40K0sXIWHf0ZBsBZBDHlpF4dL5MvZCSFy1mY4sGqoAWKzKsxDpldOH87cgtafrYgBUvLbCzHIyGtaZCWvZC53yaqxXS3sIhXOwdk08mzuHgLw7u9CjS53uAZDZD";

function send(sender, text) {
  const messageData = { text };
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: { access_token: token },
    method: "POST",
    json: {
      recipient: { id: sender },
      message: messageData
    }
  }, (error, response) => {
    if (error) {
      console.log("Error sending message: ", error);
    } else if (response.body.error) {
      console.log("Error: ", response.body.error);
    }
  });
}

function suggestSpots(sender, spots) {
  const messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Fuji-Q Highland",
            subtitle: "$$$",
            image_url: "http://www.japan-guide.com/g8/6918_01.jpg",
            buttons: [
              {
                type: "postback",
                title: "Test",
                payload: "PAYLOAD_ITEM_1"
              },
              {
                type: "web_url",
                title: "Detail",
                url: "https://www.google.com/maps/place/Fuji-Q+Highland/@35.4869467,138.7783624,17z/data=!3m1!4b1!4m2!3m1!1s0x601960eacac8b82f:0x47ca3021adc03730"
              }
            ]
          },
          {
            title: "Motor Sport Japan Festival 2016",
            subtitle: "$$$",
            image_url: "https://www.gotokyo.org/tc/kanko/koto/event/images/motor_fes_main_001.jpg",
            buttons: [
              {
                type: "postback",
                title: "Test",
                payload: "PAYLOAD_ITEM_2"
              },
              {
                type: "web_url",
                title: "Detail",
                url: "https://www.google.com.hk/maps/place/odaiba+ultra+park/@35.6236356,139.7645212,14.75z/data=!4m12!1m9!4m8!1m0!1m6!1m2!1s0x601889f90a68c61f:0xe1cb4141058d0b9d!2zSmFwYW4sIOOAkjEzNS0wMDY0IFRva3lvLCBLb3RvIG9kYWliYSB1bHRyYSBwYXJrIOmdkua1t--8keS4geebru-8keKIku-8ku-8kA!2m2!1d139.7765043!2d35.6235046!3m1!1s0x601889f90a68c61f:0xe1cb4141058d0b9d"
              }
            ]
          },
          {
            title: "Disneyland, Tokyo",
            subtitle: "$$$",
            image_url: "http://www.tokyo-top-guide.com/wp-content/uploads/2012/09/Tokyo-Disney-2.jpg",
            buttons: [
              {
                type: "postback",
                title: "Test",
                payload: "PAYLOAD_ITEM_3"
              },
              {
                type: "web_url",
                title: "Detail",
                url: "https://www.google.com.hk/maps/place/odaiba+ultra+park/@35.6236356,139.7645212,14.75z/data=!4m12!1m9!4m8!1m0!1m6!1m2!1s0x601889f90a68c61f:0xe1cb4141058d0b9d!2zSmFwYW4sIOOAkjEzNS0wMDY0IFRva3lvLCBLb3RvIG9kYWliYSB1bHRyYSBwYXJrIOmdkua1t--8keS4geebru-8keKIku-8ku-8kA!2m2!1d139.7765043!2d35.6235046!3m1!1s0x601889f90a68c61f:0xe1cb4141058d0b9d"
              }
            ]
          },
          {
            title: "Disneyland, Tokyo",
            subtitle: "$$$",
            image_url: "http://www.tokyo-top-guide.com/wp-content/uploads/2012/09/Tokyo-Disney-2.jpg",
            buttons: [
              {
                type: "postback",
                title: "Test",
                payload: "PAYLOAD_ITEM_3"
              },
              {
                type: "web_url",
                title: "Detail",
                url: "https://www.google.com.hk/maps/place/odaiba+ultra+park/@35.6236356,139.7645212,14.75z/data=!4m12!1m9!4m8!1m0!1m6!1m2!1s0x601889f90a68c61f:0xe1cb4141058d0b9d!2zSmFwYW4sIOOAkjEzNS0wMDY0IFRva3lvLCBLb3RvIG9kYWliYSB1bHRyYSBwYXJrIOmdkua1t--8keS4geebru-8keKIku-8ku-8kA!2m2!1d139.7765043!2d35.6235046!3m1!1s0x601889f90a68c61f:0xe1cb4141058d0b9d"
              }
            ]
          },
          {
            title: "Favorites",
            subtitle: "Select one or more choices...",
            buttons: [
              {
                type: "postback",
                title: "Fuji-Q Highland",
                payload: "PAYLOAD_SELECT_1"
              },
              {
                type: "postback",
                title: "Motor Sport Japan Festival 2016",
                payload: "PAYLOAD_SELECT_2"
              },
              {
                type: "postback",
                title: "Disneyland, Tokyo",
                payload: "PAYLOAD_SELECT_3"
              },
              {
                type: "postback",
                title: "Disneyland, Tokyo",
                payload: "PAYLOAD_SELECT_4"
              }
            ]
          }
        ]
      }
    }
  };
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: { access_token: token },
    method: "POST",
    json: {
      recipient: { id: sender },
      message: messageData
    }
  }, (error, response) => {
    if (error) {
      console.log("Error sending messages: ", error);
    } else if (response.body.error) {
      console.log("Error: ", response.body.error);
    }
  });
}

module.exports = { send, suggestSpots };
