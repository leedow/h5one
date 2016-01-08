var data = [{//第一关
	answer: {
		name: 'test1',
		content: '第一关answer'
	}, 
	other: {
		name: 'test2',
		content: '第一关other'
	}
},{//第二关
	answer: {
		name: 'test3',
		content: '第二关answer'
	}, 
	other: {
		name: 'test4',
		content: '第二关other'
	}
}]

module.exports.getData = function(stage){
	stage--;
	return data[stage];
}

module.exports.getLength = function(){
	return data.length;
}


 