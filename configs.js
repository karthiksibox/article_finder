var mongo_suggestions_collection='suggestions';
var mongo_connections_collection='connections';
  if(process.env.ENV=='test'){
  mongo_suggestions_collection='suggestions_test';
  mongo_connections_collection='connections_test';
  }


exports.mongo_suggestions_collection=mongo_suggestions_collection;
exports.mongo_connections_collection=mongo_connections_collection;
