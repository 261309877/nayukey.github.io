//Share Js for html5lab.org
//Created By 爱游戏的酱油猫
//2012.7.9
//Any question, @爱游戏的酱油猫（新浪微博）

(function(){
	var $ = new H5lab();
	var url = Links.share.shareList
	$.ajax("get",url,callbacks);
	function callbacks(json){
		var str = '';
		for(var i = 0;i < json.sharelist.length;i++){
			str += '<li><a href="'+ json.sharelist[i].href +'">' + json.sharelist[i].content + '</a></li>';
		}
		document.getElementById("share-list").innerHTML = str;
	}
	
})();