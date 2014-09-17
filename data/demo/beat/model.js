// Beat Model JavaScript
// Created By Nayukey
// 2012.9.17

//-----------Enemy Model---------------
var Enemy = function(o){
	var defaults = {
		health: Math.ceil(Math.random() * GameOpt.Enemy.maxHealth),
		x: GameOpt.Enemy.x,
		y: GameOpt.Enemy.y,
		width: GameOpt.Enemy.width,
		height: GameOpt.Enemy.height,
		vx: GameOpt.Enemy.vx,
		vy: GameOpt.Enemy.vy,
		area: 0,
		direction: 1
	};
	
	defaults = extend(defaults,o);
	
	this.health = defaults.health;
	this.x = defaults.x;
	this.y = defaults.y;
	this.width = defaults.width;
	this.height = defaults.height;
	this.vx = defaults.vx;
	this.vy = defaults.vy;
	this.point = Math.floor(this.health - Math.random());
	this.rate = 0;
	this.direction = defaults.direction; //1 for left, 2 for right
	this.area = defaults.area; //area 1、2、3、4、5、6
}

//-----------Hit Model-----------------
var Hit = function(o){
	var defaults = {
		power: 1,
		x: GameOpt.Hit.x,
		y: GameOpt.Hit.y,
		width: GameOpt.Hit.width,
		height: GameOpt.Hit.height,
		vx: GameOpt.Hit.vx,
		vy: GameOpt.Hit.vy
	};
	
	defaults = extend(defaults,o);
	
	this.health = defaults.health;
	this.x = defaults.x;
	this.y = defaults.y;
	this.width = defaults.width;
	this.height = defaults.height;
	this.vx = defaults.vx;
	this.vy = defaults.vy;
}

//-----------Roll Model----------------
var Roll = function (){
	this.items = ["R","B","G","1","2","5","C"];
}

var RollLine = function(o){
	var defaults = {
		x: GameOpt.RollLine.x,
		y: GameOpt.RollLine.y,
		width: GameOpt.RollLine.width,
		height: GameOpt.RollLine.height,
		point: GameOpt.RollLine.point
	};
	
	defaults = extend(defaults,o);
	
	this.x = defaults.x;
	this.y = defaults.y;
	this.width = defaults.width;
	this.height = defaults.height;
	this.point = defaults.point;
}

//-----------Stone Model---------------
var Stone = function (o){
	var defaults = {
		Red: {
			text:"R",
			display: true,
			x:20,
			y:20
		},
		Blue: {
			text:"B",
			display: true,
			x:30,
			y:30
		},
		Green: {
			text:"G",
			display: false,
			x:40,
			y:40	
		}
	};
	
	defaults = extend(defaults, o);
	
	this.Red = defaults.Red;
	this.Blue = defaults.Blue;
	this.Green = defaults.Green;	

}

//-----------User Score----------------
var score = GameOpt.Score.initialScore;

//-----------Area Data-----------------
var Area = [{sx:10,ex:110,x:60,y:120,area:1},
	{sx:110,ex:210,x:150,y:120,area:2},
	{sx:210,ex:310,x:260,y:120,area:3},
	{sx:10,ex:110,x:60,y:240,area:4},
	{sx:110,ex:210,x:150,y:240,area:5},
	{sx:210,ex:310,x:260,y:240,area:6}];
