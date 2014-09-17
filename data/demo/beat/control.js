// Beat Update JavaScript
// Created By Nayukey
// 2012.9.17

//---------------Control Array---------------
var hits = new Array();
var enemys = new Array();
var rollTime = 0;
var rollResult = new Array();
var myStone;
var myRoll;
var availArea = [1,2,3,4,5,6];
var rollInterval = GameOpt.Roll.rollInterval;
var rollAniBool = false;
var tempRollObj = {};
var tempArray = [];
var rollCount = 0;
var rollline;

//---------------User Control----------------
function handleClick(e){
	e.preventDefault();
	var mx = e.offsetX;
	var my = e.offsetY;	
	console.log(mx + " " + my);
	if(mx > GameOpt.System.ClickArea.x && mx < GameOpt.System.ClickArea.x + GameOpt.System.ClickArea.width && my > GameOpt.System.ClickArea.y && GameOpt.System.ClickArea.y + GameOpt.System.ClickArea.height){
		if(hits.length < GameOpt.Hit.maxHit){
			hits.push(new Hit({x:mx,y:my}));
			score--;
		}
	}
	console.log(hits);
}

//---------------Update Core--------------------
function updateCore(){
	updateHit();
	updateRoll();
	updateEnemy();
	updateStone();
	gameOverCheck();
}

//---------------Update Hits----------------------
function updateHit(){
	for(var i = 0; i < hits.length; i++){
		//add speed with hit
		//update hits position y
		hits[i].vy -= 0.2;
		hits[i].y += hits[i].vy
		
		//recycle hit when out
		if(hits[i].y + hits[i].height / 2 < GameOpt.System.TopArea.ys + GameOpt.Hit.height / 2){
			hits.splice(i,1);
			break;
		}
		//Check Hit
		for(var j = 0; j < enemys.length; j++){
			if(hits[i].x + hits[i].width / 2 < enemys[j].x - enemys[j].width / 2|| hits[i].y + hits[i].height / 2 < enemys[j].y - enemys[j].height / 2|| hits[i].x - hits[i].width / 2> enemys[j].x + enemys[j].width / 2 || hits[i].y - hits[i].height / 2> enemys[j].y + enemys[j].height / 2){
				//no hit		
			}else{
				enemys[j].health--;
				if(enemys[j].health <= 0){
					score += enemys[j].point;
					availArea.push(enemys[j].area);
					rollline.point += (enemys[j].point + 1) * 10;
					enemys.splice(j,1);					
				}
				hits.splice(i,1);
				break;
			}
		}	
	}
}

//-------------Update Rolls---------------------
function updateRoll(){
	if(rollline.point >= 100){
		rollline.point = 0
		rollTime++;
	}
	
	if(rollTime > 0){
		if(rollAniBool == false){
			tempRollObj = {};
			tempArray = [];
			rollCount = 2;
			rollAniBool = true;
		}
		
		switch(rollInterval){
			case 170:
				rollCount = 1
				break;
			case 100:
				rollCount = 0
				break;
			case 30:
				rollCount = -1;
				break;	
		}
		
		if(rollInterval % 3 == 0){
			for(var i = rollCount;i >= 0;i--){			
				rollResult[i] = Math.floor(Math.random() * 7);			
			}
		}
		
		//Out to Show Roll
		if(rollInterval <= 0){
			for(var i = 0;i < 3;i++){
				tempRollObj[rollResult[i]] = rollResult[i];	
			}
			
			for(var i in tempRollObj){
				tempArray.push(i);
			}
			if(tempArray.length == 1){
				switch(myRoll.items[tempArray[0]]){
					case "R":
						myStone.Red.display = true;
						break;	
					case "B":
						myStone.Blue.display = true;
						break;
					case "G":
						myStone.Green.display = true;
						break;
					case "1":
						score += 10;
						break;
					case "2":
						score += 20;
						break;
					case "5":
						score += 50;
						break;
					case "C":
						break;
				}	
			}
			rollTime--;
			rollAniBool = false;
			rollInterval = GameOpt.Roll.rollInterval;
		}
		rollInterval--;
	}
}

//--------------Update Enemy--------------------
function updateEnemy(){
	for(var i = 0; i < enemys.length; i++){
		if(enemys[i].x + enemys[i].width / 2 > Area[enemys[i].area - 1].ex || enemys[i].x - enemys[i].width / 2 < Area[enemys[i].area - 1].sx){
			enemys[i].direction = enemys[i].direction * (-1);
		}
		enemys[i].x += 1 * enemys[i].direction; 
		
	}
	checkEnemy();	
}

function checkEnemy(){
	if(enemys.length < GameOpt.Enemy.maxEnemy && ti % 100 == 0){
		createEnemy();
	}
}

function createEnemy(){
	var tempJ = Math.floor(Math.random() * availArea.length);
	var tempArea = availArea[tempJ];
	var tempX = Area[tempArea - 1].x + Math.random() * 40 - 20;
	var tempY = Area[tempArea - 1].y + Math.random() * 36 - 18;
	var direction = Math.pow(-1,(Math.floor(Math.random() * 1.99) + 1));
	enemys.push(new Enemy({x:tempX,y:tempY,area:tempArea}));
	availArea.splice(tempJ,1);
}

//---------------Update Stone------------------
function updateStone(){
	for(var i in myStone){
		if(myStone[i].display == false){
			return;	
		}	
	}
	score += 1000;
	myStone.Red.display = false;
	myStone.Blue.display = false;
	myStone.Green.display = false;
}

//--------------Game Over----------------------
function gameOverCheck(){
	if(score < 0){
		console.log("You are Dead!");	
	}
}