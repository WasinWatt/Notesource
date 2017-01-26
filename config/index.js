//development and Production
if(process.env.NODE_ENV ==="production"){
  /*module.exports = {
    dbURI: process.env.dbURI
  }*/
module.exports = require('./production.json');
}else{
  module.exports = require('./development.json');
}
