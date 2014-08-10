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

  var promise = collection.insert({'desc': post_body['desc'], 'query': post_body['query'] });
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
      pg_db['db'].raw(a.query).then(function(a){ 
        res.send(a.rows);
      });
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
  pg_db.change_connection('127.0.0.1',5432,'postgres','postgres','merchandise_platform_template');
res.send(req.body);
}

