//onStateChanged.add(callback);

function Hourglass(canvas){
	var ctx = canvas.getContext("2d");
	var w = canvas.width, h = canvas.height;
	console.log("Hourglass canvas size", w, h)
	function drawTimer(ratio) {
		ctx.clearRect(0, 0, w, h);
		
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(w, h);
		ctx.moveTo(w, 0);
		ctx.lineTo(0, h);
		ctx.stroke();

		ctx.fillStyle = 'white';
		ctx.fillRect(w/2 - 20, 20, w/2 + 20, 20 + 40);
		ctx.fillStyle = 'blue';
		ctx.fillRect(w/2 - 19, 21, w/2 + 19, 19 + (ratio * 38));
		ctx.fillStyle = 'red';
		ctx.fillRect(10, 10, 20, 20);
		ctx.fillStyle = 'green';
		ctx.fillRect(w-10, h-10, w-20, h-20);
	}
	return {
		drawToDataUrl: function(ratio){
			drawTimer(ratio);
			return canvas.toDataURL();
		}
	};
};

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
			var ratio = 0;
			setInterval(function(){
				var dataUrl = hourglass.drawToDataUrl(ratio += 0.1);
				overlay.setUrl(dataUrl);
			}, 1000);
			gapi.hangout.hideApp();
			//var overlay = gapi.hangout.av.effects.createOverlay();
		}
	});
}

// Wait for gadget to load.                                                       
gadgets.util.registerOnLoadHandler(init);
