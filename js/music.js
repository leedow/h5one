var music = {
	init: function(){
		var _this = this;
		$(document).on('click', '#music', function(){
			var sta = $(this).data('state');
			if(sta == 'start'){
				$(this).data('state', 'pause');
				_this.pause();
			}
			if(sta == 'pause'){
				$(this).data('state','start');
				_this.start();
			}
		});
	},
	pause: function(){
		$('#music')
		.removeClass('music-button-s')
		.removeClass('music-button-p')
		.addClass('music-button-s');
		var a = document.getElementById('audio-bg');
		a.pause();
	},
	start: function(){
		$('#music')
		.removeClass('music-button-s')
		.removeClass('music-button-p')
		.addClass('music-button-p');
		var a = document.getElementById('audio-bg');
		a.play();
	}
}
music.init();
module.exports = music;