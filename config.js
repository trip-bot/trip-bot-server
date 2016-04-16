
module.exports = function(){
  console.log(`using env: ${process.env.NODE_ENV}`);
  switch(process.env.NODE_ENV){
      case 'production':
          return {
            "host":"https://travel-bot-fb.herokuapp.com",
            "piAccount": "7057441d-8aab-4521-a258-81d05497fb74",
            "piPassword": "jZRLxd6KHtM0"
          };

      default:
          return {
            "piAccount": "7057441d-8aab-4521-a258-81d05497fb74",
            "piPassword": "jZRLxd6KHtM0",
            "host":"http://localhost:3000"
          };
  }
};
