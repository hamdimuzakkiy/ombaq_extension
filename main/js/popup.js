window.close();
appear();

document.addEventListener('DOMContentLoaded', function() {    
    // appearPopUp.addEventListener('click', function() {        
    //     addSchedule();
    // });    
});

function appear(){	
    chrome.tabs.executeScript( getTabId() , {file : 'js/call.js'},
    function(results){ /* result here */ } );
}

function getTabId(){
  chrome.tabs.getSelected(null, function(tab){  	
    return tab;
  });
}

// call background function
// chrome.extension.getBackgroundPage().test(); 