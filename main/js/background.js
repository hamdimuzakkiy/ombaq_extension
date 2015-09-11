chrome.extension.onConnect.addListener(function(port) {  
  port.onMessage.addListener(function(msg) {
        openLogin(msg);        
  });
});

function openLogin(page){	
	chrome.windows.create({
	    url : page,
	    type : "popup"
	}, closeLogin);	
}


function closeLogin(_window){	
	//chrome.tabs.remove(_window.tabs[0].id);
}


// function test(){
// 	alert('background here');
// }

// test


// var greeting = "hola, ";
// var button = document.getElementById("mybutton");
// button.person_name = "Roberto";
