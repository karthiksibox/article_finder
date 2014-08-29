console.log('search.js loaded')

function save_query(){
  parameters={}
  parameters['desc']=$("#desc")[0].value;
  parameters['query']=$("#sql")[0].value;
  parameters['db']=document.getElementById('env').value;
  var query_saved=function(){
    $("#sql")[0].value='';
    $("#desc")[0].value='';
  } 
  $.ajax({
    type: "POST",
    url: '/save_suggestion',
    data: parameters,
    success: query_saved,
    dataType: 'json'
  });
}


function run_query(){
  parameters={}
  parameters['query']=$("#sql")[0].value;
  var query_saved=function(resp){
    set_json_list_for_table(resp);
    buildHtmlTable();
  } 
  $.ajax({
    type: "POST",
    url: '/run_query',
    data: parameters,
    success: query_saved,
    dataType: 'json'
  });
}




function get_suggestions() {
  $('#results').show();
  parameters=$('#search').value;
  $.get( '/suggestions',parameters, function(data){display_suggestions(data,parameters)});
}
function bind_click_on_suggestions(){
  var suggestions=document.getElementsByClassName("suggestion");
  Array.prototype.forEach.call(suggestions,function(suggestion){
    suggestion.addEventListener('click',function(evt){get_result_for_suggestion(suggestion.innerHTML)});
  });
}
function get_result_for_suggestion(suggestion){
  $.get('/search',{"query": suggestion},function(data){display_results(data,suggestion)});
}


function display_results(data,suggestion){
  if(data.length==0){
    var result=$('<div></div>');
    result.text('No Results Found.');
    result.addClass('result');}
  $(".suggestion[name='"+suggestion.toLowerCase()+"']").append(result);
  set_json_list_for_table(data);
  buildHtmlTable();
  //data.forEach(function(sug){
    //var result=$('<div></div>');
    //result.text(sug.desired_column);
    //result.addClass('result');
    //$(".suggestion[name='"+suggestion.toLowerCase()+"']").append(result);
  //});
}


function display_suggestions(data,parameters) {
  result_box=document.getElementById('results');
  result_box.innerText='';
  data.forEach(function(search_suggestion){
    var suggestion=$("<div name='"+search_suggestion.desc.toLowerCase()+"'></div>");
    suggestion.text(search_suggestion.desc);
    suggestion.addClass('suggestion');
    $('#results').append(suggestion);
  })
  bind_click_on_suggestions();
}

$( "#search" ).keyup(get_suggestions);


function change_connection(){
  parameters={}
  parameters['env']=document.getElementById('env').value;
  var env_changed=function(resp){
    $('.current_env').text(resp);
  };
  $.ajax({
    type: "POST",
    url: '/change_env',
    data: parameters,
    success: env_changed,
  });
}

$(document).ready(get_suggestions);
