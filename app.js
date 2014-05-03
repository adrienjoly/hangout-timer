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

include("//hangout-timer-app.appspot.com/Hourglass.js?_t="+Date.now(), function(){
	console.log("[App] loaded Hourglass:", Hourglass);

	var hourglass = new Hourglass(document.getElementById("img"), 100),
		overlay = new HangoutOverlay(),
		stopwatch = new Stopwatch();

	function makeSet(duration){
		return function(){
			if (duration){
				var ms = duration * 1000;
				stopwatch.reset(ms);
				hourglass.clear();
				stopwatch.handler = function(){
					hourglass.drawToDataUrl(stopwatch.elapsed / ms);
					overlay.setUrl(dataUrl);
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
	//gapi.hangout.hideApp();
	//var overlay = gapi.hangout.av.effects.createOverlay();
});
