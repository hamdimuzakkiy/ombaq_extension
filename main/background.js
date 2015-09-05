var counter = 0;

chrome.extension.onConnect.addListener(function(port) {  
  port.onMessage.addListener(function(msg) {
        console.log('zz');
        port.postMessage("Hi Popup.js I am BackGround "+counter);
        counter++;
  });
});

var views = chrome.extension.getViews({type: "popup"});
    for (var i = 0; i < views.length; i++) {
                views[i].document.getElementById('x').innerHTML="My Custom Value";
        }

chrome.browserAction.onClicked.addListener(function(tab) {    
    var port = chrome.extension.connect({name: "Sample Communication"});
    port.postMessage("Hi BackGround");
    port.onMessage.addListener(function(msg) {
            console.log("message recieved--"+ msg);
    });
});



