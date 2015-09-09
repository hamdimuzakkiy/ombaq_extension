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

function checkLogin(){
    init();    
    url = base_url+'users/info';
    async = false;
    data = callAjax(url, type, dataType, data, headers, async);    
    if (typeof data.user_id == 'undefined')
        return false;
        return true;
}

function getIdExtension(){    
	return chrome.runtime.id;
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

function getWindow(){
	alert('hello');
}

// chrome.extension.onConnect.addListener(function(port) {  
//   port.onMessage.addListener(function(msg) {  	  	
//         //openLogin(msg);
//         alert('con');
//   });
// });

// function injectJs(srcFile) {
//     var scr = document.createElement('script');
//     scr.src = srcFile;
//     document.getElementsByTagName('body')[0].appendChild(scr);    
// }
// injectJs(chrome.extension.getURL('js/inject.js'));



// injectJs(chrome.extension.getURL('js/yourscript.js'));


var greeting = "hola, ";
var button = document.getElementById("mybutton");
button.person_name = "Roberto";
button.addEventListener("click", function() {
  alert(greeting + button.person_name + ".");
}, false);




button.addEventListener("click", function() {
  // do something
}, false);


