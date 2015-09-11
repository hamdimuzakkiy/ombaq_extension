window.close();
appear();

document.addEventListener('DOMContentLoaded', function() {    
    // appearPopUp.addEventListener('click', function() {        
    //     addSchedule();
    // });    
});

function appear(){			
    chrome.tabs.executeScript( null , {file : 'js/call.js'}, // hanya bisa pada extension
    function(results){ 

    } );    
    chrome.tabs.executeScript( null , {file : 'js/inject.js'});
    
}

function giveURL(){	
	chrome.tabs.executeScript( null , {code : "window.frames['ombaqExtensionBody'].document.getElementById('message').value = 'kaka'"});
}

function getTabId(){
  chrome.tabs.getSelected(null, function(tab){  	  	
    return tab;
  });
}


function getTabs(){
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {    
		// console.log(tabs);
	    // chrome.tabs.executeScript( null , {code : "ombaqExtensionBody.document.getElementById('hamdi').innerHTML = 'hello';"});
	    return tabs;	    
	});
}