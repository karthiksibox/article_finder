var knex =  require('knex')({
  client: 'pg',
  connection: {
    host      : process.env.TARGET || '127.0.0.1',
  port : process.env.TARGET_PORT || 5432, 
  user     : process.env.TARGET_USER || 'postgres',// your connection config
  password : process.env.TARGET_PWD || 'postgres',
  database : process.env.TARGET_DB || 'merchandise_platform_test',
  }
});
module.exports= {
  db: knex,
  change_connection: function(host,port,user,password,database){
   var knex =  require('knex')({
      client: 'pg',
    connection: {
    host      : host,
    port : port, 
    user     : user,// your connection config
    password : password,
    database : database,
    }
    });
    //knex = require('knex').knex;
    pg_db.db=knex;
  }
};
