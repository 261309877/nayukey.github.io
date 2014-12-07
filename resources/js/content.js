//Content Js for nayukey.github.io
//Created By 爱游戏的酱油猫
//2012.7.9
//Any question, @爱游戏的酱油猫（新浪微博）

var data=var data = {
	//'img': '图片 URL',
	//'link': '链接',
	//'desc': '描述',
	'title': document.title
};
var callback = function() {
	// 返回的数据并不统一，接口已经尽量统一，我觉得微信公司现在缺 js 程序员
	// 也有一些是很恶心的
	document.getElementById("topic-content").innerHTML = '1';
	console && console.log(argument);
};

(function(){
	var $ = new H5lab();
	var num = $.getContentUrl("c");
	var url = Links.content.contentUrl + num + '.txt';
	$.ajax("get",url,callbacks);
	function callbacks(json){
		//nav
		if(json.selectedNav != undefined) {
			var navlis = document.getElementById("nav-list").getElementsByTagName("li");
			navlis[json.selectedNav].className = 'selected';
		}

		//topic
		document.getElementById("topic-title").innerHTML = json.title;
		document.getElementById("topic-content").innerHTML = json.content;

		try{
			wechat('timeline', data, callback);
		}catch (e){

		}

	}
	
})();