function addAppend(){
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
		// $('<iframe scrolling="no" id="buffer_overlay" name="buffer_overlay" src="https://buffer.com/add/?url=https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3Dsource%2Bchrome%2Bextension%26gws_rd%3Dssl%23q%3Dadd%2Bsrc%2Bchrome%2Bextension&amp;text=add%20src%20chrome%20extension%20-%20Penelusuran%20Google&amp;version=2.13.1&amp;placement=toolbar" style="border: none; height: 100%; width: 100%; position: fixed !important; z-index: 2147483646; top: 0px; left: 0px; display: block !important; max-width: 100% !important; max-height: 100% !important; padding: 0px !important; background: url(chrome-extension://noojglkidnpfjbincgijbaiedldjfbhh/data/shared/img/white-loading-gif-small.gif) 50% 50% / 40px no-repeat rgba(0, 0, 0, 0.0980392);"></iframe>').appendTo(document.body);		
	}
	
}

addAppend();


