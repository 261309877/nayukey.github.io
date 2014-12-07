//Content Js for nayukey.github.io
//Created By 爱游戏的酱油猫
//2012.7.9
//Any question, @爱游戏的酱油猫（新浪微博）

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

		if(json.weixin != undefined){
			if(window.WeixinJSBridge != undefined){
				var shareData = {
					desc : '微信分享测试',
					title : '博客'
				};

				document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
					// 分享到朋友圈
					WeixinJSBridge.on('menu:share:timeline', function(argv) {
						shareTimeline();
					});

				}, false);

				function shareTimeline() {
					WeixinJSBridge.invoke('shareTimeline', shareData, function(res) {
						validateShare(res);
						_report('timeline', res.err_msg);
					});
				}

				function validateShare(res) {
					if (res.err_msg != 'send_app_msg:cancel' && res.err_msg != 'share_timeline:cancel') {
						//返回信息判断
						document.getElementById("topic-content").innerHTML = "1";
					}
				}
			}
		}

	}
	
})();