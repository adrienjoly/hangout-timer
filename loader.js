var include = (function(){
	var FINAL_STATES = {"loaded": true, "complete": true, 4: true},
		head = document.getElementsByTagName("head")[0],
		pending = {};
	return function(src, cb){
		console.log("including", src, "...");
		if (pending[src]) return;
		pending[src] = true;
		var inc = document.createElement("script");
		inc.onload = inc.onreadystatechange = function() {
			if (pending[src] && (!inc.readyState || FINAL_STATES[inc.readyState])) {
				cb && cb();
				delete pending[src];
			}
		};
		inc.src = src;
		head.appendChild(inc);
	};
})();

//onStateChanged.add(callback);

console.log("Wait for gadget to load...");

gadgets.util.registerOnLoadHandler(function(){
	console.log("load handler fired!");
	gapi.hangout.onApiReady.add(function(eventObj) {
		if (eventObj.isApiReady) {
			console.log("Hangout API is ready", gapi.hangout);
			include("//hangout-timer-app.appspot.com/app.js?_t="+Date.now());
		}
	});
});
