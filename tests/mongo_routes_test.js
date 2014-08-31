process.env.ENV='test';
var app = require('../app');
app.listen(3001, function(){
});
var request = require('request');

var expect = require('chai').expect;

var milliseconds = (new Date).getTime();

describe('should be able to save and get a suggestion', function(){
  it('should save a suggestion and retreive it', function(done){
    var suggestion={form:{db:'db',desc: milliseconds}};
    request.post("http://localhost:3001/save_suggestion",suggestion);
    request("http://localhost:3001/suggestions",function(error, response, body){
      expect(body).to.contain(milliseconds) 
      done();
    });
  });
});


describe('should be able to save and get a Database connection', function(){
  it('should save a suggestion and retreive it', function(done){

    var suggestion={ 'host': 'host'+milliseconds, port: 'port',user: 'user',pwd: 'pwd',db: 'db'};
    request(
      {method: 'POST',
      uri: "http://localhost:3001/save_connection",
      form: suggestion},function(e,r,b){
      expect(b).to.equal('OK');
    });


    request(
      {method: 'GET',
      uri: "http://localhost:3001/get_connection"
      },function(e,r,b){
      expect(b).to.include('host'+milliseconds);
      done();
    });
  });
});
