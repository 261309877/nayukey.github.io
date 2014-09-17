// Beat Core JavaScript
// Created By Nayukey
// 2012.9.17

//-------------- Vars -----------------
var myCanvas;
var context;

var gameState = 0;
var GAMESTART = 0;
var GAMELOADING = 10;
var GAMERESET  = 20;
var GAMERUNNING = 30;
var GAMEOVER = 40;
var onlineState = null;

var stateFunc = {};

var timeline = null;
var FPS = 60;
var ti = 0;

var itemsToLoad = 10;
var itemLoadedCount = 0;
var loadReady = false;

var errors = {
	e1001: "context error, please check your Browser."
}
//--------------Load Control--------------
function itemLoaded(){
	
}

//---------------State View----------------

stateFunc.gameStart = function() {
	switchGameState(GAMERESET);
}

stateFunc.gameLoading = function(){
	
}

stateFunc.gameReset = function (){
	score = GameOpt.Score.initialScore;
	createEnemy();
	myStone = new Stone({});
	myRoll = new Roll();
	rollline = new RollLine({});
	myCanvas.addEventListener("click",handleClick,false);
	switchGameState(GAMERUNNING);
}

stateFunc.gameRunning = function (){
	drawScreen();
}

stateFunc.gameOver = function (){
	
}

//------------- State Control ----------
function switchGameState(state){
	gameState = state;
	switch(gameState){
		case 0:
			onlineState = stateFunc.gameStart;
			break;
		case 10:
			onlineState = stateFunc.gameLoading;
			break;
		case 20:
			onlineState = stateFunc.gameReset;
			break;
		case 30:
			onlineState = stateFunc.gameRunning;
			break;
		case 40:
			onlineState = stateFunc.gameOver;
			break;
		default:
            onlineState = stateFunc.gameStart;
            break;
    }
}
//------------- Tools -------------------

function extend(a,b){
	for(var i in b){
		a[i] = b[i];
	}
	return a;
}

//---------------Game Load---------------
window.onload = function(){
	myCanvas = document.getElementById("myCanvas");
	context = myCanvas.getContext("2d");
	if(!context){
		alert(error.e1001);
		return;
	}
	switchGameState(gameState);
	(function coreAnimation(){
		timeline = window.webkitRequestAnimationFrame(function(){
			onlineState();
			coreAnimation();
			ti++;
		});
	})();
};

//--------------Game Options--------------
var GameOpt = {
	Canvas:{
			width: 320,
			height: 480
		},
	Enemy:{
			width: 20,
			height: 40,
			maxHealth: 3,
			x: 125,
			y: 100,
			vx: 0,
			vy: 0,
			maxEnemy: 3
		},
	Hit:{
			width: 8,
			height: 15,
			x: 0,
			y: 0,
			vx: 0,
			vy: 0,
			maxPower: 8,
			maxHit: 4
		},
	Roll:{
			x:80,
			y:5,
			width: 40,
			height: 40,
			fontPositionMove: {
					x: 10,
					y: 16,
				},
			font: "32px _sans",
			rollInterval:240
		},
	RollLine:{
			x:80,
			y:50,
			width:120,
			height:4,
			point:0
		},
	Score:{
			x:260,
			y:35,
			initialScore: 100,
			font: "26px _sans"
		},
	System:{
			TopArea:{
					xs: 0,
					ys: 60,
					xe: 320,
					ye: 60
				},
			ClickArea: {
					x: 0,
					y: 300,
					width: 320,
					height: 180
				}
		}
}
