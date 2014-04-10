//onStateChanged.add(callback);

function TimerOverlay(canvas){
	var ctx = canvas.getContext("2d");
	var prevImgRsc = null;
	function drawTimer(x, y) {
		ctx.beginPath();
		ctx.moveTo(x - 20, y - 20);
		ctx.lineTo(x + 20, y + 20);
		ctx.moveTo(x + 20, y - 20);
		ctx.lineTo(x - 20, y + 20);
		ctx.stroke();
		return canvas.toDataURL();
	}
	function refreshCanvas(dataUrl){
		var imgRsc = gapi.hangout.av.effects.createImageResource(dataUrl);
		imgRsc.showOverlay();
		if (prevImgRsc)
			prevImgRsc.dispose();
		prevImgRsc = imgRsc;
	}
	return {
		draw: function(x, y){
			refreshCanvas(drawTimer(x, y));
		}
	};
};


function init() {
	var timerOverlay;
	// When API is ready...
	gapi.hangout.onApiReady.add(function(eventObj) {
		if (eventObj.isApiReady) {
			console.log("Hangout API is ready", gapi.hangout);
			timerOverlay = new TimerOverlay(document.getElementById("img"));
			var x = 40;
			setInterval(function(){
				timerOverlay.draw(x++, 40);
			}, 1000);
			gapi.hangout.hideApp();
			//var overlay = gapi.hangout.av.effects.createOverlay();
		}
	});
}

// Wait for gadget to load.                                                       
gadgets.util.registerOnLoadHandler(init);
