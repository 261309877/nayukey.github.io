//Nayukey
//2012.5.3
//My Space Core JavaScript

var Space = function (setting) {
    var defaults = {
        ele: document.getElementById("mySpace"),
        context: document.getElementById("mySpace").getContext("2d"),
        FPS: 30,
        appState: 10,
        itemsToLoad: 0,
		haveMissiles:60,
        enemyData:{
            speed: 2,
            cols: 8,
            rows: 4,
            spacingX: 100,
            spacingY: 60,
            startX: 125,
            startY: 25,
            width: 30,
            height: 30
        },
        playerData: {
            speed: 2,
            x: 475,
            y: 425,
            width: 50,
            height: 50
        },
        missileData: {
            speed: 5,
            width: 6,
            height: 16
        }
    }

    this.core.call(this, defaults);
}

Space.prototype.error = {
    "101":"Your Browser does not Support HTML5 Canvas!"
}

Space.prototype.logError = function (states) {
    console.log(states + ":" + this.error[states]);
}


Space.prototype.UI = {
    player: function (o) {
        //o.x: player position x
        //o.y: player position y
        //o.width: player width
        //o.height: player height
        //o.context: canvas context
        var ctx = o.context;
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(o.x, o.y, o.width, o.height);
    },
    missile: function (o) {
        //o.x: missile position x
        //o.y: missile position y
        //o.width: missile width
        //o.height: missile height
        //o.context: canvas context
        var ctx = o.context;
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(o.x, o.y, o.width, o.height);
    },
    enemy: function (o) {
        //o.x: enemy position x
        //o.y: enemy position y
        //o.width: enemy width
        //o.height: enemy height
        //o.context: canvas context
        var ctx = o.context;
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(o.x, o.y, o.width, o.height);
    },
    background: function (o) {
        //o.canvas: canvas dom
        //o.context: canvas context
        var ctx = o.context;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, o.canvas.width, o.canvas.height);
    },
    score: function (o) {
        //o.score: game score
        //o.x: text x
        //o.y: text y
        //o.context: canvas context
        var ctx = o.context;
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "24px Microsoft YaHei";
        ctx.fillText("Score:" + o.score, o.x, o.y);
    }
}

Space.prototype.Sound = {
    shoot: function (o) {
        //o.id: created sound id
        var soundHolder = document.getElementById("sounds");
        var sound = document.createElement("audio");
        sound.setAttribute("src", "");
        sound.id = o.id;
        soundHolder.appendChild(sound);
    },
    boom: function (o) {
        //o.id: created sound id
        var soundHolder = document.getElementById("sounds");
        var sound = document.createElement("audio");
        sound.setAttribute("src", "");
        sound.id = o.id;
        soundHolder.appendChild(sound);
    }
}

Space.prototype.core = function (o) {
    if (!o.context) {
        this.logError("101");
        return;
    }

    var that = this;
    //const STATE
    var STATE_INIT = 10;
    var STATE_LOADING = 20;
    var STATE_RESET = 30;
    var STATE_PLAYING = 40;
    //initial app state
    var appState = o.appState;
    var loadCount = 0;
    var itemsToLoad = o.itemsToLoad;
    var score = '0%';
    var hitnum = 0;
    var shooting = 0;

    var player = {
        x: o.playerData.x,
        y: o.playerData.y,
        width: o.playerData.width,
        height: o.playerData.height,
        speed: o.playerData.speed
    }

    var missiles = new Array();

    var enemies = new Array();

    function initial() {
        //handle sounds load

        //handle images load
        
        appState = STATE_LOADING;
        itemLoaded();
    }

    function itemLoaded() {
        if (loadCount >= itemsToLoad) {
            appState = STATE_RESET;
        }
    }

    function reset() {
        for (var r = 0; r < o.enemyData.rows; r++) {
            for (var c = 0; c < o.enemyData.cols; c++) {
                enemies.push({
                    speed: o.enemyData.speed,
                    x: o.enemyData.startX + c * o.enemyData.spacingX,
                    y: o.enemyData.startY + r * o.enemyData.spacingY,
                    width: o.enemyData.width,
                    height: o.enemyData.height
                });
            }
        }
        score = "0%";
        hitnum = 0;
        shooting = 0;
        appState = STATE_PLAYING;
    }

    function drawScreen() {
        //Update data
        //missile
        for (var i = missiles.length - 1; missiles[i]; i--) {
            missiles[i].y -= missiles[i].speed;
            if (missiles[i].y < -missiles[i].height) {
                missiles.splice(i, 1);
            }
        }

        //enemy
        if (enemies.length <= 0) {
            appState = STATE_RESET;
        }

        for (var i = enemies.length - 1; enemies[i]; i--) {
            enemies[i].x += enemies[i].speed;
            if (enemies[i].x <= 0) {
                enemies[i].speed *= -1;
            } else if (enemies[i].x >= o.ele.width - enemies[i].width) {
                enemies[i].speed *= -1;
            }
            for (var j = missiles.length - 1; missiles[j]; j--) {
                if ((missiles[j].x + missiles[j].width >= enemies[i].x) && (missiles[j].x <= enemies[i].x + enemies[i].width) && (missiles[j].y + missiles[j].height >= enemies[i].y) && (missiles[j].y <= enemies[i].y + enemies[i].height)) {
                    //hit
                    enemies.splice(i, 1);
                    missiles.splice(j, 1);
                    //score
                    hitnum++;
                    console.log(hitnum + "," + shooting);
                    score = shooting == 0 ? 0 + "%" : Math.floor(hitnum / shooting * 100) + "%";
                }
            }

        }
       

        //draw UI
        //background
        this.UI.background({
            canvas: o.ele,
            context: o.context,
        });
        //player
        this.UI.player({
            x: player.x,
            y: player.y,
            width: player.width,
            height: player.height,
            context: o.context
        });
        //missile
        for (var i = missiles.length - 1; missiles[i]; i--) {
            this.UI.missile({
                x: missiles[i].x,
                y: missiles[i].y,
                width: missiles[i].width,
                height: missiles[i].height,
                context: o.context
            });
        }
        //enemy
        for (var i = enemies.length - 1; enemies[i]; i--) {
            this.UI.enemy({
                x: enemies[i].x,
                y: enemies[i].y,
                width: enemies[i].width,
                height: enemies[i].height,
                context: o.context
            });
        }
        //score
        this.UI.score({
            score: score,
            x: 860,
            y: 30,
            context: o.context,
        });
    }

    function playerMove(e) {
        e.preventDefault();
        if (e.offsetX < 0) {
            player.x = 0;
        } else if (e.offsetX > o.ele.width - player.width) {
            player.x = o.ele.width - player.width;
        } else {
            player.x = e.offsetX;
        }
        
    }

    function playerShoot(e) {
        e.preventDefault();

        missiles.push({
            speed: 5,
            x: player.x + player.width * 0.5,
            y: player.y - o.missileData.height,
            width: o.missileData.width,
            height: o.missileData.height
        });

        shooting++;
    }

    function run() {
        switch (appState) {
            case STATE_INIT:
                initial.call(that);
                break;
            case STATE_LOADING:
                break;
            case STATE_RESET:
                reset.call(that);
                break;
            case STATE_PLAYING:
                drawScreen.call(that);
                break;
        }
    }

    //add the event listener
    o.ele.addEventListener("mousedown", playerShoot, false);
    o.ele.addEventListener("mousemove", playerMove, false);

    //FPS 
    var GAME_FPS = o.FPS;
    var intervalTime = 1000/GAME_FPS;
    var timer = window.setInterval(function () {
        run.call(that);
    }, intervalTime);

}
