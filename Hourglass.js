function Hourglass(canvas){
	var ctx = canvas.getContext("2d");
	var w = canvas.width, h = canvas.height;
	console.log("Hourglass canvas size", w, h)
	function drawTimer(ratio) {
		//ctx.clearRect(0, 0, w, h);
		ctx.fillStyle = 'white';
		ctx.fillRect(w/2 - 10, 10, 20, 40);
		ctx.fillStyle = 'blue';
		ctx.fillRect(w/2 - 9, 11, 18, (ratio * 38));
	}
	return {
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
			this.stop();
			//if (this.onTick) {
				this.t0 = Date.now();
				var that = this;
				this.interval = setInterval(function(){
					that.elapsed = Date.now() - that.t0;
					if (that.handler)
						that.handler(that);
					if (that.elapsed >= that.duration)
						that.stop();
				}, 200);
			//}
		},
		reset: function(duration){
			this.stop();
			this.duration = duration;
		}
	};
}