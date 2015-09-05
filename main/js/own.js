var base_url = 'https://api.ombaq.com/';

var url = '';
var type = '';
var dataType = '';
var data = '';
var async = '';
var headers = '';


function init(){

    url = '';
    type = 'GET';
    dataType = 'json';
    data = '';
    async = true;
    headers = '';

}

// call ombaq api

function getLoginEmail(){

}

function getLoginApi(page){
    url = base_url+'users/login/'+page;
    return url;
}

function getCSRF(){

    init();
    url = base_url+'csrf';
    type = 'GET';
    async = false;
    dataType = 'text';
    return callAjax(url, type, dataType, data, headers, async);
}

function getSources(){
    init();
    url = base_url+'sources';
    type = 'GET';
    async = false;    
    return callAjax(url, type, dataType, data, headers, async);   
}

function retriveSources(sources){   
    var res = new Array();
    for (var i=0;i<social_account_id.length;i++){

        var x = sources[i].social_account_id;        
        res[x] = new Array(2);
        res[x][0] = sources[i].user_id;
        res[x][1] = sources[i].source;
    }        
    return res;
}

function addTargets(social_account_id , message, sources){

    var res = [];
    var urlData = '';
    var chooseMode = '';
    for (var i=0;i<social_account_id.length;i++){

        if (sources[social_account_id[i].social_account_id][1] == 'tw'){
            urlData = 'statuses/update.json';
            chooseMode = 'status';
        }
        else if (sources[social_account_id[i].social_account_id][1] == 'fb'){
            urlData =  sources[social_account_id[i].social_account_id][0]+'/feed';
            chooseMode = 'message';
        }        

        res.push({          
                    'data': '{"method": "POST", "url" :  "'+urlData+'", "body": "'+chooseMode+'='+message+'"}',
                    'social_account_id' : social_account_id[i].social_account_id
            });        
    }    
    return res;
}

function getSourcesProjectId(project_id){
    
    init();
    url = base_url+'projects/'+project_id+'/sources';
    type = 'GET';    
    async = false;    
    return (callAjax(url, type, dataType, data, headers, async));
}

function getUser(){
    init();
    url = base_url+'users';
    dataType = 'json';
    async = false;
    return callAjax(url, type, dataType, data, headers, async);
} 

function getProject(){
    init();
    url = base_url+'projects';
    dataType = 'json';
    async = false;
    return callAjax(url, type, dataType, data, headers, async);
}


function addSchedule(project_id, social_account_id, schedule, message){

    var sources = retriveSources(getSources());
    init();
    token =  getCSRF();
    url = base_url+'projects/'+project_id+'/messages';    
    type = 'POST';
    dataType = 'text';
    async = false;
    data = {
        'data': '{"message":"'+message+'"}',
        'schedule': schedule,
        'targets':  addTargets(social_account_id, message,sources)        
    }
    
    headers = { 'X-CSRF-TOKEN': token };
    return (callAjax(url, type, dataType, data, headers, async));
}

function callAjax(url, type, dataType, data, headers, async){

    var dataReturn = '';
    $.ajax({
        async: async,
        url: url,
        headers: headers,
        type: type,
        dataType: dataType,
        data : data,
        crossDomain: true,        
        xhrFields: {withCredentials: true},        
        success: function (data) {
            
            dataReturn = data;
        },
        error: function (data) {
            dataReturn = false;
        }
    });   
    return dataReturn;
}

function checkLogin(){
    init();    
    url = base_url+'users/info';
    async = false;
    data = callAjax(url, type, dataType, data, headers, async);    
    if (typeof data.user_id == 'undefined')
        return false;
        return true;
}

function getTabId(){
  chrome.tabs.getSelected(null, function(tab){  	
    return tab;
  });
}

function getIdExtension(){    
	return chrome.runtime.id;
}
    
function appear(){	
    chrome.tabs.executeScript( getTabId() , {file : 'js/call.js'},
    function(results){ /* result here */ } );  
}

function callBackground(url){    
    var port = chrome.extension.connect({name: "Sample Communication"});
    port.postMessage(url);
    port.onMessage.addListener(function(msg) {      
    });
}

window.addEventListener("message", function (event) {
    console.log(event);
}, false);