function addAppend(){

	// if (){
	// 	//$('<span><script src="chrome-extension://'+getIdExtension()+'/js/inject.js"></script></span>').appendTo(document.body);				
	// }	
	console.log('hello this is call');
	var elementExists = document.getElementById("ombaqExtensionBody");			
	if (checkLogin()){		
		var content = 'chrome-extension://'+getIdExtension()+'/html/main.html';
	}
	else
		var content = 'chrome-extension://'+getIdExtension()+'/html/login.html';	
	if (elementExists!=null)
	$("#ombaqExtensionBody").remove();	
	else{						
		$('<iframe id ="ombaqExtensionBody" class = "main_ombaq" style = "z-index:12121212" src="'+content+'"><p>Your browser does not support iframes.</p></iframe>').appendTo(document.body);		
	}
	
}

addAppend();

