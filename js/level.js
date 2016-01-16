var l1 = '木门学徒';
var l2 = '木门新秀';
var l3 = '木门大师';
var l4 = '木门之神';

var level = [l1,l1,l1,l1,l1,l1,
l2,l2,l2,l2,l2,l2,
l3,l3,l3,l3,l3,l3,
l4,l4,l4,l4,l4,l4];

module.exports.getLevel = function(stage){
	return level[stage];
}