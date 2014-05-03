//onStateChanged.add(callback);

console.log("Wait for gadget to load...");

gadgets.util.registerOnLoadHandler(function(){

	console.log("load handler fired!");

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

	function HangoutOverlay(){
		var prevImgRsc = null;
		function refreshFromUrl(dataUrl){
			var imgRsc = gapi.hangout.av.effects.createImageResource(dataUrl);
			imgRsc.showOverlay();
			if (prevImgRsc)
				prevImgRsc.dispose();
			prevImgRsc = imgRsc;
		}
		return {
			setUrl: refreshFromUrl
		};
	}

	function init() {
		var hourglass, overlay, stopwatch = new Stopwatch();
		// When API is ready...

		function makeSet(duration){
			return function(){
				if (duration){
					var ms = duration * 1000;
					stopwatch.reset(ms);
					hourglass.clear();
					stopwatch.handler = function(){
						hourglass.drawToDataUrl(stopwatch.elapsed / ms);
					};
					stopwatch.start();
				}
				else
					stopwatch.stop();
			};
		}

		document.getElementById("start2s").onclick = makeSet(2);
		document.getElementById("start10s").onclick = makeSet(10);
		document.getElementById("start30s").onclick = makeSet(30);
		document.getElementById("stop").onclick = makeSet();

		gapi.hangout.onApiReady.add(function(eventObj) {
			if (eventObj.isApiReady) {
				console.log("Hangout API is ready", gapi.hangout);
				hourglass = new Hourglass(document.getElementById("img"));
				overlay = new HangoutOverlay();
				console.log("overlay", overlay);
				var ratio = 0;
				setInterval(function(){
					var dataUrl = hourglass.drawToDataUrl(ratio += 0.1);
					overlay.setUrl(dataUrl);
				}, 1000);
				//gapi.hangout.hideApp();
				//var overlay = gapi.hangout.av.effects.createOverlay();
			}
		});
	}

	include("//hangout-timer-app.appspot.com/Hourglass.js?_t="+Date.now(), function(){
		console.log("Hourglass", Hourglass);
		init();
	});

});
