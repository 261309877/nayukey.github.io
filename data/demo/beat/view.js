// Beat View JavaScript
// Created By Nayukey
// 2012.9.17

//-------------Draw Screen-------------
function drawScreen(){
	context.clearRect(0,0,myCanvas.width,myCanvas.height);
	
	updateCore();
	
	beatDraw.drawBackground();
	beatDraw.drawHit();
	beatDraw.drawEnemy();
	beatDraw.drawRoll();
	beatDraw.drawScore();
	beatDraw.drawStone();
}

//-------------Draw Object-------------
var beatDraw = {};

beatDraw.drawBackground = function(){
	//TopArea
	context.beginPath();
	context.strokeStyle = "#333333";
	context.moveTo(GameOpt.System.TopArea.xs,GameOpt.System.TopArea.ys);
	context.lineTo(GameOpt.System.TopArea.xe,GameOpt.System.TopArea.ye);
	context.stroke();
	
	//ClickArea
	context.beginPath();
	context.fillStyle = "#EEEEEE";
	context.fillRect(GameOpt.System.ClickArea.x, GameOpt.System.ClickArea.y, GameOpt.System.ClickArea.width, GameOpt.System.ClickArea.height);
}

beatDraw.drawHit = function(){
	for(var i = 0; i < hits.length; i++){
		context.beginPath();
		context.fillStyle = "#000000";
		context.fillRect(hits[i].x - hits[i].width / 2,hits[i].y - hits[i].height / 2,hits[i].width,hits[i].height);
	}
}

beatDraw.drawEnemy = function(){
	for(var i = 0; i < enemys.length; i++){
		context.beginPath();
		context.strokeStyle = "#000000";
		context.fillStyle = "#333333";
		context.font = "14px _sans";
		context.strokeRect(enemys[i].x - enemys[i].width / 2,enemys[i].y - enemys[i].height / 2,enemys[i].width,enemys[i].height);
		context.fillText(enemys[i].health,enemys[i].x,enemys[i].y);
	}
}

beatDraw.drawRoll = function(){
	//Roll
	context.save();
	context.strokeStyle = "#333333";
	context.fillStyle = "#000000";
	context.font = GameOpt.Roll.font;
	//Roll Background	
	context.strokeRect(GameOpt.Roll.x, GameOpt.Roll.y, 3 * GameOpt.Roll.width, GameOpt.Roll.height);
	for(var i = 1; i <= 2 ; i++){
		context.beginPath();
		context.moveTo(GameOpt.Roll.x + i * GameOpt.Roll.width, GameOpt.Roll.y);
		context.lineTo(GameOpt.Roll.x + i * GameOpt.Roll.width, GameOpt.Roll.y + GameOpt.Roll.height);
		context.stroke();
	}
	
	//Roll Results
	for(var i = 0; i < rollResult.length; i++){
		context.fillText(myRoll.items[rollResult[i]],GameOpt.Roll.x + 2 * GameOpt.Roll.width - i * GameOpt.Roll.width + GameOpt.Roll.fontPositionMove.x,GameOpt.Roll.y + GameOpt.Roll.fontPositionMove.y + GameOpt.Roll.height * 0.5);
	}
	context.restore();
	
	//Roll Line
	context.save();
	context.strokeStyle = "#333333";
	context.fillStyle = "#AAAAAA";
	context.strokeRect(rollline.x,rollline.y,rollline.width,rollline.height);
	context.fillRect(rollline.x,rollline.y,rollline.width * rollline.point / 100, rollline.height);
	context.restore();
}

beatDraw.drawScore = function(){
	context.beginPath();
	context.fillStyle = "#333333";
	context.font = GameOpt.Score.font;
	context.fillText(score,GameOpt.Score.x,GameOpt.Score.y);
}

beatDraw.drawStone = function(){
	context.beginPath();
	for(var i in myStone){
		context.font = "24px _sans";
		if(myStone[i].display){
			context.fillStyle = "#000000";
		}else{
			context.fillStyle = "#CCCCCC";	
		}
		context.fillText(myStone[i].text,myStone[i].x,myStone[i].y);
	}
}