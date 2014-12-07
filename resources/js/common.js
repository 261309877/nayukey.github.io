//Common Js for nayukey.github.io
//Created By 爱游戏的酱油猫
//2012.7.2
//Any question, @爱游戏的酱油猫（新浪微博）

//基础urls
var baseUrl = {
	common:'../data/',
	index:'../data/index/',
	docs:'../data/docs/',
	share:'../data/share/',
	content:'../data/content/'
};

var Links = {
	index:{
		indexData:baseUrl.index + 'index.txt'	
	},
	docs:{
		docsList:baseUrl.docs + 'docslist.txt'
	},
	share:{
		shareList:baseUrl.share + 'sharelist.txt'
	},
	content:{
		contentUrl:baseUrl.content
	}
}

var H5lab = function(){
	//xmlHttpRequest
	this.xmlHttpRequest = (function(){
		var xmlHttpRequest;
		if(window.XMLHttpRequest){
			xmlHttpRequest = new XMLHttpRequest();	
		}else if(window.ActiveXObject){
			xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
		}
		return xmlHttpRequest;	
	})();
	//AJAX
	this.ajax = function(method,url,callback,data){
		var xmlHttpRequest = this.xmlHttpRequest;
		if(xmlHttpRequest){
			xmlHttpRequest.open(method,url,true);
			if(data != undefined || data != null){
				xmlHttpRequest.setRequestHeader('content-type','application/x-www-form-urlencoded');
			}
			xmlHttpRequest.onreadystatechange = function(){
				if(xmlHttpRequest.readyState == 4){
					if(xmlHttpRequest.status == 200){
						var json = eval('('+xmlHttpRequest.responseText+')');
						callback(json);	
					}else{
						return;	
					}
				}	
			}
			xmlHttpRequest.send(data);
		}else{
			return;
		}
	}
	//Get Url
	this.getContentUrl = function(name) {
		var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
		if (result == null || result.length < 1) {
			return "";
		}
		return result[1];
	}
}