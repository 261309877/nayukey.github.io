//Lab Js for html5lab.org
//Created By 爱游戏的酱油猫
//2012.7.2
//Any question, @爱游戏的酱油猫（新浪微博）

window.addEventListener("load",myLabStart,false);

function myLabStart(){
	var myCanvas = document.getElementById("myLab");
	var context = myCanvas.getContext("2d");
	
	if(!context){
		return;
	}
	
	var loadReady = false;
	var changeReady = true;
	var changeNums = 100;
	var changeCounts = [];
	var speed = 0.00001;
	var colors = [
		"d5ebde","d2f9ff","c6f6f6","f8dbf1","ecf5e4","f9e1f1","ebf4f3","e2f1f4","ecf5e4",//1
		"d6ebd8","d2f9ff","d6ebd8","f9e1f1","f8dbf1","e1f3f5","e4f3f6","e1f3f5",//2
		"e1ece8","c6f6f6","ecf5e4","f7daee","f9e1f1","e2f1f4","ebf4f3",//3
		"c7f8f5","d0ebdc","ddf7f8","e4eafa","e0f3f9",//4
		"d1ebe2","d5ebde","cbf8fd","e0f3f9","c6f6f6","ecf6e5",//5
		"d5ebde","ecf6e5","c6f6f6","e8fcfd",//6
		"ecf8e3","eaf5f1","eaf5e4","c7f8f5","d5f8fc","c9f7f5","c6f6f6",//7
		"ddf7f8","f2faeb","cbf8fd","e4f3f6","ecf5e4",//8
		"cbf8fd","d6ebd8","f2fae5","d0ebdc","eafafa","e4f3f6",//9
		"fdfacd","c7f8f5","fefbcd","d6ebd8","d6ebd8","e4f3f6","f2fae5",//10
		"eafafa","d6ebd8","e5f3f6","d6ebd8","cbf8fd","ecf5e4","dff7f9","effaea",//11
		"e5f3f6","eaf5e4","ecf5f4","ecf5e4","cbf8fd","f2faeb","cbf8fd","d6ebd8",//12
		"eaf5e4","e1f7f4","cbf8fd","ddf7f8","f2fae5","cbf8fd","d6ebd8",//13
		"eaf5e4","d2f8f9","eaf5f1","eafafa","d5f5f4","ddf7f8","c7f8f5","d1ebde",//14
		"eaf5e4","c9f7f5","e1f7f4","e3f2f5","e3f2f5","d5ebde","fffbd3",//15
		"d6ebd8","d7f2fd","cbf8fd","eaf4f3","f2fae5",//16
		"c6f6f6","d1ebde","dbf3f5","d7f8fd",//17
		"e8f5e4","f9e2f2","f6d9ef","edf6e5",//18
		"d6ebd8","f5dcef","f9e2f2",//19
		"d0ebdc","f8dcf2","f7def1","f0f0f0"//20
	];
	var rects = [
		[140,-15,1],[180,-15,1],[220,-15,1],[260,-15,1],[300,-15,1],[340,-15,1],[380,-15,1],[420,-15,1],[460,-15,1],//1
		[180,25,1],[220,25,1],[260,25,1],[300,25,1],[340,25,1],[380,25,1],[420,25,1],[460,25,1],//2
		[140,65,1],[220,65,1],[260,65,1],[300,65,1],[340,65,1],[380,65,1],[420,65,1],//3
		[260,105,1],[300,105,1],[340,105,1],[380,105,1],[460,105,1],//4
		[220,145,1],[260,145,1],[300,145,1],[340,145,1],[380,145,1],[420,145,1],//5
		[260,185,1],[300,185,1],[340,185,1],[380,185,1],//6
		[140,225,1],[220,225,1],[260,225,1],[300,225,1],[340,225,1],[380,225,1],[420,225,1],//7
		[180,265,1],[220,265,1],[260,265,1],[380,265,1],[420,265,1],//8
		[180,305,1],[220,305,1],[260,305,1],[380,305,1],[420,305,1],[460,305,1],//9
		[140,345,1],[180,345,1],[220,345,1],[260,345,1],[380,345,1],[420,345,1],[460,345,1],//10
		[100,385,1],[140,385,1],[180,385,1],[220,385,1],[260,385,1],[380,385,1],[420,385,1],[460,385,1],//11
		[100,425,1],[140,425,1],[180,425,1],[220,425,1],[260,425,1],[380,425,1],[420,425,1],[460,425,1],//12
		[100,465,1],[140,465,1],[180,465,1],[220,465,1],[380,465,1],[420,465,1],[460,465,1],//13
		[-20,505,1],[60,505,1],[100,505,1],[140,505,1],[180,505,1],[220,505,1],[420,505,1],[460,505,1],//14
		[20,545,1],[60,545,1],[100,545,1],[140,545,1],[180,545,1],[420,545,1],[460,545,1],//15
		[20,585,1],[60,585,1],[100,585,1],[140,585,1],[460,585,1],//16
		[-20,625,1],[20,625,1],[60,625,1],[100,625,1],//17
		[-20,665,1],[20,665,1],[60,665,1],[100,665,1],//18
		[-20,705,1],[20,705,1],[60,705,1],//19
		[-20,745,1],[20,745,1],[60,745,1],[100,745,1]//20
	];
	
	//Flask
	var myFlask = new Image();		
	myFlask.onload = function(){
		loadReady = true;	
	}
	myFlask.src = "../resources/lab/images/flask.png";
	
	function updateRects(){
		if(changeReady){
			for(var i = 0;i < changeNums;i++){
				var rnum = Math.floor(Math.random() * colors.length);
				changeCounts.push(rnum);
				rects[rnum].push(true); 
			}
			changeReady = false;
		}else{
			for(var i = 0;i < changeNums;i++){
				var angle = Math.acos(rects[changeCounts[i]][2]) + speed * Math.PI / 180;
				var alpha = Math.floor(Math.cos(angle) * 100)/ 100;
				rects[changeCounts[i]][2] = alpha;
				if(alpha < 0 && rects[changeCounts[i]][3]){
					if(rects[changeCounts[i+1]] && rects[changeCounts[i+1]][3]){
						var tempColor = colors[changeCounts[i]];
						colors[changeCounts[i]] = colors[changeCounts[i+1]];
						colors[changeCounts[i+1]] = tempColor;
						rects[changeCounts[i]][3] = false;
						rects[changeCounts[i+1]][3] = false;
					}
				}
				if(alpha <= -1){
					rects[changeCounts[i]].pop();
					rects[changeCounts[i]][2] = 1;
					if(i == changeNums - 1){
						changeReady = true;
						changeCounts = [];
					}
				}
		
			}	
		}	
	}
	
	function drawRects(){		
		for(var i = 0;i < colors.length;i++){
			context.fillStyle = "#" + colors[i];
			context.save();
			context.globalAlpha = Math.abs(rects[i][2]);
			if(rects[i][2] > 1)
			{
				console.log(rects[i][2]);
			}
			context.fillRect(rects[i][0],rects[i][1],40,40);
			context.restore();
			
		}	
	}
	
	function drawScreen(){
		//Clear
		context.fillStyle = "#FFFFFF";
		context.fillRect(0,0,myCanvas.width,myCanvas.height);
		
		//Rects
		drawRects();
		updateRects();
		
		//Flask
		drawFlask();	
	}
	
	function drawFlask(){
		if(loadReady){
			context.drawImage(myFlask,89,236);	
		}
	}
	
	function render(){
		drawScreen();
	}
	
	var fps = 30;
	var timer = window.setInterval(render,1000/fps);
}