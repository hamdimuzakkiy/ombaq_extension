//$("<span id = 'ombaqExtensionBody'></span>").appendTo(document.body);

// inject js to web pages



// function injectJs(srcFile) {
//     var scr = document.createElement('script');
//     scr.src = srcFile;
//     document.getElementsByTagName('body')[0].appendChild(scr);    
// }
// injectJs(chrome.extension.getURL('js/jquery.js'));

// injectJs(chrome.extension.getURL('js/yourscript.js'));

// function alerts(){
// 	alert('ini inject content_script');
// }
// console.log(window.location.href);

// window.addEventListener("message", function (event) {    
//     console.log(event);
// }, false);

// alert('zz');

function getURL(){
	return window.location.href;
	//return window.location.href;
}
// console.log('inject');

// var greeting = "hola, ";
// var button = document.getElementById("mybutton");
// button.person_name = "Roberto";
// button.addEventListener("click", function() {
//   alert(greeting + button.person_name + ".");
// }, false);

// console.log(button);

// console.log('inject');

setTimeout(function(){
    window.frames['ombaqExtensionBody'].document.getElementById('message').value = getURL();
}, 500);