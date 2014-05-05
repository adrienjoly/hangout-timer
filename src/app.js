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

include("//hangout-timer-app.appspot.com/src/Hourglass.js?_t="+Date.now(), function(){
	var canvas = document.getElementById("img");
	var radius = canvas.height / 12 ;
	var hourglass = new Hourglass(canvas, radius, canvas.width / 2, canvas.height - radius * 3),
		overlay = new HangoutOverlay(),
		stopwatch = new Stopwatch();

	function makeSet(duration){
		return function(){
			if (duration){
				var ms = duration * 1000;
				stopwatch.reset(ms);
				hourglass.clear();
				stopwatch.handler = function(){
					var dataUrl = hourglass.drawToDataUrl(stopwatch.elapsed / ms);
					overlay.setUrl(dataUrl);
				};
				stopwatch.start();
			}
			else {
				stopwatch.stop();
				hourglass.clear();
				overlay.setUrl(hourglass.drawToDataUrl(0));
			}
		};
	}

	document.getElementById("start30s").onclick = makeSet(30);
	document.getElementById("start1m").onclick = makeSet(60);
	document.getElementById("start2m").onclick = makeSet(2*60);
	document.getElementById("start5m").onclick = makeSet(5*60);
	document.getElementById("stop").onclick = makeSet();
	//gapi.hangout.hideApp();
	//var overlay = gapi.hangout.av.effects.createOverlay();
});
