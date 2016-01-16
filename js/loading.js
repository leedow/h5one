
var loading = {
	count: 0,
	percent: function(num){
		this.count += num;
		$('#loading').text(this.count);
		if(this.count >= 100){
			this.finish();
		}

	 
	},
	init: function(){
		var _this = this;
		var timer = setTimeout(function(){
			_this.finish();
		},3000);

		var timer = setInterval(function(){
			var aim = $('#undergoing');
			var under = $('#undergoing').text();
			switch(under){
				case '':{
					aim.text('.');
					break;
				}
				case '.':{
					aim.text('..');
					break;
				}
				case '..':{
					aim.text('...');
					break;
				}
				case '...':{
					aim.text('');
					break;
				}
			}
		}, 500);

	},
	finish: function(){
		$('#loading-layout').css('display', 'none');
	}
}

loading.init();

module.exports = loading
