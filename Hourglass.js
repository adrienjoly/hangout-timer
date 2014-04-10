function Hourglass(canvas){
	var ctx = canvas.getContext("2d");
	var w = canvas.width, h = canvas.height;
	console.log("Hourglass canvas size", w, h)
	function drawTimer(ratio) {
		/*
		ctx.clearRect(0, 0, w, h);
				console.log("clean");
				console.log(canvas.toDataURL());
		*/
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(w/2, h/2);
		ctx.moveTo(w/2, 0);
		ctx.lineTo(0, h/2);
		ctx.stroke();
				console.log("lines");
				console.log(canvas.toDataURL());
		/*
		ctx.fillStyle = 'white';
		ctx.fillRect(w/2 - 10, 10, 20, 40);
		ctx.fillStyle = 'blue';
		ctx.fillRect(w/2 - 9, 11, 18, (ratio * 38));
		ctx.fillStyle = 'red';
		ctx.fillRect(10, 10, 20, 20);
		ctx.fillStyle = 'green';
		ctx.fillRect(w-30, h-30, 20, 20);
				console.log("rects");
				console.log(canvas.toDataURL());
				*/
	}
	return {
		drawToDataUrl: function(ratio){
			try {
				drawTimer(ratio);
			}catch(e){
				console.error(e, e.stack);
			}
			return canvas.toDataURL();
		}
	};
};