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

function addTargets(social_account_id , message){

    var res = [];
    var urlData = '';
    var chooseMode = '';
    for (var i=0;i<social_account_id.length;i++){
        
        if ( social_account_id[i].source == 'tw'){
            urlData = 'statuses/update.json';
            chooseMode = 'status';
        }
        else if ( social_account_id[i].source == 'fb'){
            urlData =  social_account_id[i].user_id+'/feed';
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

function addProjects(project_name,project_description){
    console.log(window.location.href+'add proj');
    init();
    token =  getCSRF();
    url = base_url+'projects';    
    type = 'POST';
    dataType = 'json';
    async = false;
    data = {
        'project_name': project_name,
        'project_description': project_description
    }    
    headers = { 'X-CSRF-TOKEN': token };    
    return (callAjax(url, type, dataType, data, headers, async));
}

function addProjects(project_name,project_description){
    init();
    token =  getCSRF();
    url = base_url+'projects';    
    type = 'POST';
    dataType = 'json';
    async = false;
    data = {
        'project_name': project_name,
        'project_description': project_description
    }    
    headers = { 'X-CSRF-TOKEN': token };    
    return (callAjax(url, type, dataType, data, headers, async));
}

function deleteAccount(project_id, source_id){
    init();
    token =  getCSRF();
    url = base_url+'projects/'+project_id+'/sources/'+source_id;    
    type = 'DELETE';
    dataType = 'json';
    async = false;
    data = {
        'project_id': project_id,
        'source_id': source_id
    }    
    headers = { 'X-CSRF-TOKEN': token };    
    return (callAjax(url, type, dataType, data, headers, async));

}

function addSchedule(project_id, social_account_id, schedule, message){
        
    init();
    token =  getCSRF();
    url = base_url+'projects/'+project_id+'/messages';    
    type = 'POST';
    dataType = 'text';
    async = false;
    data = {
        'data': '{"message":"'+message+'"}',
        'schedule': schedule,
        'targets':  addTargets(social_account_id, message)        
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

function callBackground(url){    
    var port = chrome.extension.connect({name: "Sample Communication"});
    port.postMessage(url);
    port.onMessage.addListener(function(msg) {alert(msg)      
    });
}

// window.addEventListener("message", function (event) {
//     console.log(event);
// }, false);


// var editorExtensionId = "bbkeknljpgahncdpmondcjjdkgddbbdd";

// // Make a simple request:
// chrome.runtime.sendMessage(editorExtensionId, {openUrlInEditor: url},
//   function(response) {
//     if (!response.success)
//       handleError(url);
//   });
