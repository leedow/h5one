var stageModule = require('./stage');

var action = {
	timer: null,
	timeLimit: 30,
	active: true,
	init: function(){//初始化事件绑定
		var _this = this;
		stageModule.init();
		_this.start();
		 
		$(document).on('click', '.item', function(){

			if(!_this.active){
				alert('游戏结束了');
				return;
			}

			var type = $(this).data('type');
			if(type == 'answer'){
				alert('进入下一关');
				stageModule.passStage();
				_this.refresh();
			} else {
				alert('点错啦');
			}
		});

		$(document).on('click', '#stop', function(){
			if($(this).data('active')){
				$(this).data('active', false);
				_this.stop();
			} else {
				$(this).data('active', true);
				_this.start();
			}
		});
	},
	start: function(){
		var _this = this;	 
		_this.timer = setInterval(function(){
			_this.timeLimit--
			if(_this.timeLimit == 0){
				clearInterval(_this.timer);
				_this.over();
				return false;
			}
			$('#timer').text(_this.timeLimit);

		}, 1000)
	},
	stop: function(){
		var _this = this;
		clearInterval(_this.timer);
	},
	over: function(){//游戏结束
		var _this = this;
		_this.active = false;
		alert('游戏结束');
	},
	refresh: function(){//刷新页面关数
		var _this = this;
		var data = stageModule.getCurrentData();
		var stage = stageModule.getCurrentStage();
		var tmp = '<div class="item" data-type="answer">' + 
				data.answer.content + '</div>';

		for(var i=0; i<8; i++){
			tmp += '<div class="item" data-type="other">' + 
					data.other.content + '</div>';
		}
		$('#app').html(tmp);
	}
}

module.exports = action;