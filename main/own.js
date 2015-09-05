
// document.getElementById('getJson').innerHTML = chrome.i18n.getMessage("no_error");
// document.getElementById('getJson').innerHTML = chrome.i18n.getUILanguage();

// chrome.i18n.getAcceptLanguages(function(languageList) {
//           var languages = languageList.join(",");
//           document.getElementById("languageSpan").innerHTML = languages;
//         })

// document.getElementById('test').innerHTML = chrome.extension.getViews();
// console.log(chrome.extension.getViews());

	chrome.browserAction.onClicked.addListener(function (tab){
		chrome.tabs.create({
			url :
			chrome.extension.getURL('popup2.html')
		});
	});
