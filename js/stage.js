//闯关逻辑部分
var storage = require('./data');

var stage = {
	currentStage: 1,//当前关数
	currentData: {},//当前关数的数据
	totalStage: 0,//总关数
	init: function(){
		var _this = this;
		_this.currentData = storage.getData(1);
		_this.totalStage = storage.getLength();
	},
	check: function(name){//检查是否正确

	},
	getCurrentData: function(){
		return this.currentData;
	},
	getCurrentStage: function(){
		return this.currentStage;
	},
	passStage: function(){//更新下关数据
		var _this = this;
		_this.currentStage++;
		if(_this.currentStage > _this.totalStage){
			return;
		}
		_this.currentData = storage.getData(_this.currentStage);
	}
}

stage.init();

module.exports = stage;