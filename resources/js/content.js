//Content Js for html5lab.org
//Created By 爱游戏的酱油猫
//2012.7.9
//Any question, @爱游戏的酱油猫（新浪微博）

(function(){
	var $ = new H5lab();
	var num = $.getContentUrl();
	var url = Links.content.contentUrl + num + '.txt';
	$.ajax("get",url,callbacks);
	function callbacks(json){
		//nav
		if(json.selectedNav != undefined)
		var navlis = document.getElementById("nav-list").getElementsByTagName("li");
		navlis[json.selectedNav].className = 'selected';
		
		//topic
		document.getElementById("topic-title").innerHTML = json.title;
		document.getElementById("topic-content").innerHTML = json.content;
	}
	
})();