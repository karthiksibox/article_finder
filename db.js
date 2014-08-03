var Knex  = require('knex');
var query_in_progress=false;
Knex.knex = Knex.initialize({
  client: 'pg',
  connection: {
    host      : process.env.TARGET || '127.0.0.1',
  port : process.env.TARGET_PORT || 5432, 
     user     : process.env.TARGET_USER || 'postgres',// your connection config
   password : process.env.TARGET_PWD || 'postgres',
  database : process.env.TARGET_DB || 'merchandise_platform_test',
  }
});

knex = require('knex').knex;
/* a=knex('quotes').select().then(function(a){console.log(a)}); */
module.exports= {
  db: knex
};
