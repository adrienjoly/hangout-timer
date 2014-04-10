//onStateChanged.add(callback);

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
	var hourglass, overlay;
	// When API is ready...
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

// Wait for gadget to load.                                                       
gadgets.util.registerOnLoadHandler(init);
