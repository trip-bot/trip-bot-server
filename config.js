
module.exports = function(){
  console.log(`using env: ${process.env.NODE_ENV}`);
  switch(process.env.NODE_ENV){
      case 'development':
          return {
            "host":"http://localhost:3000",
          };

      case 'production':
          return {
            "host":"https://travel-bot-fb.herokuapp.com",

          };

      default:
          return {
            "host":"http://localhost:3000"
          };
  }
};
