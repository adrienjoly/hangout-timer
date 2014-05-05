function Hourglass(canvas, r, x, y){
	var ctx = canvas.getContext("2d");
	var r = r || (Math.min(canvas.width, canvas.height) / 2);
	var x = x || r, y = y || r;
	function getColor(ratio) {
		if (ratio >= 0.75)
			return "red";
		else if (ratio >= 0.5)
			return "orange";
		else
			return "green";
	}
	var startAngle =  - Math.PI / 2;
	function drawTimer(ratio) {
		var angle = startAngle + Math.PI * 2 * ratio;
		ctx.beginPath();
		ctx.arc(x, y, r, startAngle, angle);
		ctx.lineTo(x, y);
		ctx.fillStyle = "rgba(128,128,128,0.5)";
		ctx.fill();
		ctx.beginPath();
		ctx.arc(x, y, r*0.9, startAngle, angle);
		ctx.lineTo(x, y);
		ctx.fillStyle = getColor(ratio);
		ctx.fill();
	}
	return {
		clear: function(){
			ctx.clearRect(x-r, y-r, x+r, y+r);
		},
		drawToDataUrl: function(ratio){
			this.clear();
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
			}, 500);
		},
		reset: function(duration){
			this.stop();
			this.duration = duration;
			return this;
		}
	};
}