/* GET home page. */
exports.index = function(req, res){
  var self = this;
  res.render("index",{title: "Search an Article"})
};

//suggestion is saved by this function
var update=function(req, res){
  var response=[];
  var post_body=req.body;
  collection=db.get('articles');

  var promise = collection.insert({'desc': post_body['desc'], 'query': post_body['query'],'db': post_body['db'] });
  promise.on('success', function(doc){console.log(doc)});


  res.send(response);
};

exports.update =update;


exports.suggestions =function(req, res){
  get_suggestions(res);
};


function get_suggestions(res){
  var collection=db.get('articles');
  var promise = collection.find();
  promise.on('success', function(doc){
    var response=[]
    doc.forEach(function(a){
      console.log(a.desc);
      response.push(a);
    });
  res.send(response);
  });
};

function query_pg_and_send_res(req,res,query){
  pg_db['db'].raw(query).then(function(resp){ 
    res.send(resp.rows);
  });
}

function change_pg_db(db){
  if(db=='merchandise_platform_qa')
  {
    pg_db.change_connection('172.16.20.210',5435,'admin','Helpdesk',db);
  }
  else if(db=='user_authorization_qa')
  {
    pg_db.change_connection('172.16.20.210',5421,'admin','Helpdesk',db);
  }

}

exports.run_query = function(req,res){
  query_pg_and_send_res(req,res,req.body['query']);
}

exports.search =function(req, res){
  console.log(req.query.query+"so");
  collection=db.get('articles');
  var promise = collection.find({'desc': req.query.query});
  console.log('Query key'+ req.query.query);
  promise.on('success', function(doc){
    doc.forEach(function(a){
      console.log('mongo res: ' + a.desc);
    });

    doc.forEach(function(a){
      console.log('Querying Postgres: '+ a.query);
      change_pg_db(a.db);
      query_pg_and_send_res(req,res,a.query);
    });
  });
};

exports.edit=function(req,res){
  res.render("edit");
};


exports.save_suggestion=function(req,res){
  update(req,res);
}



exports.change_env=function(req,res){
  var db=req.body['env'];
  change_pg_db(db);
  res.send(req.body);
}

