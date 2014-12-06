//Publish Js for nayukey.github.io
//Created By 爱游戏的酱油猫
//2012.8.15
//Any question, @爱游戏的酱油猫（新浪微博）

window.addEventListener("load",handleLoaded,false);

function handleLoaded(){
	var betxtEle = document.getElementById("beforeText");
	var aftxtEle = document.getElementById("afterText");
	var betxt = "";
	var aftxt = "";
	
	betxtEle.onchange = function (){
		betxt = betxtEle.value;
		console.log(betxt);
		//replace <>
		aftxt = betxt.replace(/</g,"&lt;");
		aftxt = aftxt.replace(/>/g,"&gt;");
		aftxt = aftxt.replace(/\n/,"</p><p>");
		aftxt = "<p>" + aftxt + "</p>";
		
		aftxtEle.value = aftxt;
	}
}