function Hourglass(canvas){
	var ctx = canvas.getContext("2d");
	var r = Math.min(canvas.width, canvas.height) / 2;
	/*
	var w = canvas.width, h = canvas.height;
	console.log("Hourglass canvas size", w, h)
	function drawTimer(ratio) {
		//ctx.clearRect(0, 0, w, h);
		ctx.fillStyle = 'white';
		ctx.fillRect(w/2 - 10, 10, 20, 40);
		ctx.fillStyle = 'blue';
		ctx.fillRect(w/2 - 9, 11, 18, (ratio * 38));
	}
	*/
	function drawTimer(ratio) {
		var angle = Math.PI * 2 * ratio - Math.PI / 2;
		ctx.beginPath();
		ctx.moveTo(r, r);
		ctx.lineTo(r + r * Math.cos(angle), r + r * Math.sin(angle));
		ctx.stroke();
	}
	return {
		clear: function(){
			ctx.clearRect(0, 0, r*2, r*2);
		},
		drawToDataUrl: function(ratio){
			drawTimer(ratio);
			return canvas.toDataURL();
		}
	};
};

function Stopwatch(){
	return {
		t0: null,
		elapsed: null,
		duration: 30000,
		interval: null,
		handler: null,
		stop: function(){
			if (this.interval) {
				clearInterval(this.interval);
				this.interval = null;
			}
		},
		start: function(){
			var that = this;
			this.stop();
			this.t0 = Date.now();
			this.interval = setInterval(function(){
				that.elapsed = Date.now() - that.t0;
				if (that.handler)
					that.handler(that);
				if (that.elapsed >= that.duration)
					that.stop();
			}, 1);
		},
		reset: function(duration){
			this.stop();
			this.duration = duration;
			return this;
		}
	};
}