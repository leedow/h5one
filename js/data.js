var loading = require('./loading');

var data = [{//第一关
	answer: {
		name: 'test1',
		imgUrl: 'img/1/1-(2).png',
		img: null//缓存图片对象
	}, 
	other: {
		name: 'test2',
		imgUrl: 'img/1/5-(2).png',
		img: null
	},
	size: {
		x: 3,
		y: 2
	}
},{//第二关
	answer: {
		name: 'test1',
		imgUrl: 'img/2/1-(2).png',
		img: null//缓存图片对象
	}, 
	other: {
		name: 'test2',
		imgUrl: 'img/2/5-(2).png',
		img: null
	},
	size: {
		x: 3,
		y: 2
	}
},{//第3关
	answer: {
		name: 'test1',
		imgUrl: 'img/3/1-(2).png',
		img: null//缓存图片对象
	}, 
	other: {
		name: 'test2',
		imgUrl: 'img/3/5-(2).png',
		img: null
	},
	size: {
		x: 3,
		y: 2
	}
},{//第4关
	answer: {
		name: 'test1',
		imgUrl: 'img/4/1-(2).png',
		img: null//缓存图片对象
	}, 
	other: {
		name: 'test2',
		imgUrl: 'img/4/5-(2).png',
		img: null
	},
	size: {
		x: 3,
		y: 2
	}
},{//第5关
	answer: {
		name: 'test1',
		imgUrl: 'img/5/1-(2).png',
		img: null//缓存图片对象
	}, 
	other: {
		name: 'test2',
		imgUrl: 'img/5/5-(2).png',
		img: null
	},
	size: {
		x: 3,
		y: 2
	}
},{//第6关
	answer: {
		name: 'test1',
		imgUrl: 'img/6/1-(2).png',
		img: null//缓存图片对象
	}, 
	other: {
		name: 'test2',
		imgUrl: 'img/6/5-(2).png',
		img: null
	},
	size: {
		x: 3,
		y: 2
	}
},{//第7关
	answer: {
		name: 'test1',
		imgUrl: 'img/7/1-(2).png',
		img: null//缓存图片对象
	}, 
	other: {
		name: 'test2',
		imgUrl: 'img/7/5-(2).png',
		img: null
	},
	size: {
		x: 3,
		y: 2
	}
},{//第8关
	answer: {
		name: 'test1',
		imgUrl: 'img/8/1-(2).png',
		img: null//缓存图片对象
	}, 
	other: {
		name: 'test2',
		imgUrl: 'img/8/5-(2).png',
		img: null
	},
	size: {
		x: 3,
		y: 2
	}
},{//第9关
	answer: {
		name: 'test1',
		imgUrl: 'img/9/1-(2).png',
		img: null//缓存图片对象
	}, 
	other: {
		name: 'test2',
		imgUrl: 'img/9/5-(2).png',
		img: null
	},
	size: {
		x: 3,
		y: 2
	}
},{//第10关 特殊关卡
	answer: {
		name: 'test1',
		imgUrl: 'img/10/s.png',
		img: null//缓存图片对象
	}, 
	other: [{
		name: 'test2',
		imgUrl: 'img/10/1.png',
		img: null
	},{
		name: 'test2',
		imgUrl: 'img/10/2.png',
		img: null
	},{
		name: 'test2',
		imgUrl: 'img/10/3.png',
		img: null
	},{
		name: 'test2',
		imgUrl: 'img/10/4.png',
		img: null
	},{
		name: 'test2',
		imgUrl: 'img/10/5.png',
		img: null
	}],
	size: {
		x: 3,
		y: 2
	}
}]

var _buffer = function(){//缓存图片数据
	var step = Math.ceil(50/data.length)+1;
	for(var i=0; i<data.length; i++){
		data[i].answer.img = new Image();
		data[i].answer.img.src = data[i].answer.imgUrl;

		if(data[i].other instanceof Array){//特殊关卡处理
			for(var n = 0; n <data[i].other.length; n++){
				data[i].other[n].img = new Image();
				data[i].other[n].img.src = data[i].other[n].imgUrl;
			}
		} else {
			data[i].other.img = new Image();
			data[i].other.img.src = data[i].other.imgUrl;
			data[i].answer.img.onload = function(){
				loading.percent(step);
			}

			data[i].other.img.onload = function(){
				loading.percent(step);
			}
		}
		 
		 

		 
	}
}

_buffer();


module.exports.getData = function(stage){
	stage--;
	return data[stage];
}

module.exports.getLength = function(){
	return data.length;
}


 