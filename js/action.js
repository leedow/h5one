var stageModule = require('./stage');

var action = {
	timer: null,
	timeLimit: 30,
	active: true,
	init: function(){//初始化事件绑定
		var _this = this;
		stageModule.init();
		//_this.start();
		 
		$(document).on('click', '.item', function(){
			if(!_this.active){
				alert('游戏停止');
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

		$(document).on('click', '.stop', function(){
			switch($(this).data('active')){
				case 'doing': {
					$('.stop').data('active', 'pause');//.text('继续');;
					$('#pause-layout').css('display', 'block');
					_this.stop();
					break;
				}
				case 'pause': {
					$('.stop').data('active', 'doing');//.text('暂停');
					$('#pause-layout').css('display', 'none');
					_this.start();
					break;
				}
				case 'end': {
					$('.stop').data('active', 'doing');//.text('暂停');
					$('#start-layout').css('display', 'none');
					_this.start();
					break;
				}
			}
			 
		});

		 
	},
	start: function(){
		var _this = this;	 
		_this.active = true;

		_this.timer = setInterval(function(){
			_this.timeLimit--;
			$('#timer').text(_this.timeLimit);
			if(_this.timeLimit <= 0){
				clearInterval(_this.timer);
				_this.over();
				return false;
			}
			 

		}, 1000)
	},
	stop: function(){
		var _this = this;
		_this.active = false;
		clearInterval(_this.timer);
	},
	over: function(){//游戏结束
		var _this = this;
		_this.active = false;
		_this.timeLimit = 30;
		$('.stop').data('active', 'end');//.text('开始');
		alert('游戏结束');
		clearInterval(_this.timer);
	},
	refresh: function(){//刷新页面关数内容
		var _this = this;
		var data = stageModule.getCurrentData();
		var x = data.size.x;
		var y = data.size.y;
		var total = x*y;
		var stage = stageModule.getCurrentStage();

		var position = Math.floor(Math.random()*total);//随机插入答案的位置
		var tmp = '';
		 
		for(var i=0; i<total; i++){			 
				tmp += '<div class="col-4 item-col"><div class="item"></div></div>';		 
		}
		$('#app').html(tmp);

		var items = document.getElementsByClassName('item');
		for(var i=0; i<total; i++){			 
			if(position == i){
				items[i].setAttribute('data-type', 'answer');
				items[i].appendChild(data.answer.img);
			} else {
				items[i].setAttribute('data-type', 'other');
				items[i].appendChild(data.other.img.cloneNode());
			}
		}
	}
}

module.exports = action;