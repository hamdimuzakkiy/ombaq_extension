window.close();
var profile_image_url = '';
var screen_name = '';
var project_id = '';
var social_account_id = '';
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

function getCSRF(){

    init();
    url = base_url+'csrf';
    type = 'GET';
    async = false;
    dataType = 'text';
    return callAjax(url, type, dataType, data, headers, async);
}

function loadUSer(){
    
    init();
    url = base_url+'sources';
    type = 'GET';    
    async = false;    
    data = callAjax(url, type, dataType, data, headers, async);

    screen_name = data[0].screen_name;
    project_id = data[0].projects[0].project_id;
    social_account_id = data[0].social_account_id;    
    profile_image_url = data[0].profile_image_url;

} 

function addSchedule(){

    init();
    token =  getCSRF();
    url = base_url+'projects/'+project_id+'/messages';
    type = 'POST';
    dataType = 'text';
    data = {'data' : '{"message" : "Hello Hamdi ahmadi muzakkiy !!!"}', 'schedule': '2015-09-03 12:17:18' , 'targets' : [{'data': '{"method": "POST", "url": "statuses/update.json", "body": "status=Hello+World%21"}', 'social_account_id' : social_account_id}]};
    headers = { 'X-CSRF-TOKEN': token };    
    callAjax(url, type, dataType, data, headers, async);
}

function getProject(){

    init();
    url = base_url+'projects';
    async = false;
    data = callAjax(url, type, dataType, data, headers, async);
    console.log(data);
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

document.addEventListener('DOMContentLoaded', function() {    
    // appearPopUp.addEventListener('click', function() {        
    //     appear();
    // });
    // login.addEventListener('click', function() {                
    //     chrome.tabs.create({ url: 'https://ombaq.com/#/' });        
    // });
});

function getTabId(){
  chrome.tabs.getSelected(null, function(tab){
    return tab;
  });
}


function appear(){    
    chrome.tabs.executeScript( getTabId() , {file : 'js/call.js'},
    function(results){ console.log(results); } );  
}

//init();
//loadUSer();
//appear();
// angular

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {    
    $scope.login_flag = checkLogin();
    $scope.profile_image_url = profile_image_url;
});


// simple communication ( not use yet )
var port = chrome.extension.connect({name: "Sample Communication"});
    port.postMessage(checkLogin());
    port.onMessage.addListener(function(msg) {
      console.log("message recieved"+ msg);            
});