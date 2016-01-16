var stageModule = require('./stage');
var levelModule = require('./level');
var musicModule = require('./music');
var move = {
	show: function(aim){
		$(aim).css('display', 'block').addClass('show');
		var _t = $(aim);
		setTimeout(function(){
			_t.removeClass('show');
		},150);	
	},
	hide: function(aim){
		$(aim).addClass('hide');
		var _t = $(aim);
		setTimeout(function(){			 
			$(aim).css('display', 'none');
			_t.removeClass('hide');
		},150);	
	}
}

var action = {
	timer: null,
	timeLimit: 30,
	active: true,
	init: function(){//初始化事件绑定
		var _this = this;
		stageModule.init();
		//_this.start();
		var w = $('body').width();
		//var h = $('body').
		//$('body').css('height', h); 
		//$('.layout').css('height', h);
		 
		$(document).on('click', '.item', function(){
			if(!_this.active){
			 
				return;
			}

			var type = $(this).data('type');
			if(type == 'answer'){ 
				stageModule.passStage();
				_this.refresh();
			} else {
				$(this).addClass('error');
				var _t = $(this);
				setTimeout(function(){
					_t.removeClass('error');
				},1000);				 
			}
		});

		$(document).on('click', '#pause', function(){	 
			_this.stop();
	 
		});

		$(document).on('click', '#start', function(){
			 _this.start();			 
		});

		$(document).on('click', '#restart', function(){
			 _this.start();		
			 _this.refresh();	 
		});

		$(document).on('click', '#goon', function(){
		 
			 _this.start();			 
		});
		 
	},
	layout: {
		start: {
			dom: '#start-layout',
			show: function(){
				move.show(this.dom);
			},
			hide: function(){			 
				move.hide(this.dom); 
			}
		},
		restart: {
			dom: '#restart-layout',
			show: function(){
				move.show(this.dom);
			},
			hide: function(){
				move.hide(this.dom); 
			}
		},
		end: {
			dom: '#end-layout',
			show: function(){
				move.show(this.dom);
			},
			hide: function(){
				move.hide(this.dom); 
			}
		},
		pause: {
			dom: '#pause-layout',
			show: function(){
				move.show(this.dom);
			},
			hide: function(){
				move.hide(this.dom); 
			}
		},
		action: {
			show: function(aim){
				$(aim).addClass('show');
				var _t = $(aim);
				setTimeout(function(){
					_t.removeClass('show');
				},1000);	
			},
			hide: function(aim){
				$(aim).addClass('hide');
				var _t = $(aim);
				setTimeout(function(){
					_t.removeClass('hide');
				},1000);	
			}
		}
	},
	start: function(){
		var _this = this;	 
		_this.active = true;

		_this.layout.start.hide();
		_this.layout.end.hide();
		_this.layout.restart.hide();
		_this.layout.pause.hide();

		clearInterval(_this.timer);

		_this.timer = setInterval(function(){
			_this.timeLimit--;
			$('#timer').text(_this.timeLimit);
			if(_this.timeLimit <= 0){
				
				_this.over();
				clearInterval(_this.timer);
				return false;
			}
			 

		}, 1000)
	},
	stop: function(){
		var _this = this;
		_this.active = false;
		_this.layout.pause.show();
		clearInterval(_this.timer);
	 
	},
	over: function(){//游戏结束
		var _this = this;
		_this.active = false;
		_this.timeLimit = 30;
		$('.stop').data('active', 'end');//.text('开始');
		//alert('游戏结束');
		clearInterval(_this.timer);
		_this.layout.restart.show();
		var stage = stageModule.getCurrentStage();
		var level = levelModule.getLevel(stage);
		$('#r_l').text(stage);
		$('#r_s').text(level);
		stageModule.init();
	},
	refresh: function(){//刷新页面关数内容
		var _this = this;
		var data = stageModule.getCurrentData();
		 
		var x = data.size.x;
		var y = data.size.y;
		var total = x*y;
		var stage = stageModule.getCurrentStage();//当前关数
		var totalStage = stageModule.getTotalStage();//总关数

		if(stage > totalStage){
			_this.layout.end.show();
			clearInterval(_this.timer);
			return;
		}


		$('#score-num').text(stage-1);

		var position = Math.floor(Math.random()*total);//随机插入答案的位置
		var tmp = '';
		 
		for(var i=0; i<total; i++){			 
				tmp += '<div class="col-4 item-col show"><div class="item"></div></div>';		 
		}
		$('#app').html(tmp);

		var items = document.getElementsByClassName('item');


		//计算图片高度
		var h = $('body').height();
		var picHeight = Math.floor((h-96-10-20-16)/2);

		if(data.other instanceof Array){//特殊关卡
			var num = 0;
			for(var i=0; i<total; i++){	

				if(position == i){
					items[i].setAttribute('data-type', 'answer');
					data.answer.img.style.height = picHeight + 'px';
					items[i].appendChild(data.answer.img);
				} else {
					items[i].setAttribute('data-type', 'other');
					var chi = data.other[num];
					chi.img.style.height = picHeight + 'px';
					num++;
					items[i].appendChild(chi.img.cloneNode());
				}
			}
		} else {
			for(var i=0; i<total; i++){			 
				if(position == i){
					items[i].setAttribute('data-type', 'answer');
					data.answer.img.style.height = picHeight + 'px';
					items[i].appendChild(data.answer.img);
				} else {
					items[i].setAttribute('data-type', 'other');
					data.other.img.style.height = picHeight + 'px';
					items[i].appendChild(data.other.img.cloneNode());
				}
			}
		}

		 
		
	}
}



module.exports = action;