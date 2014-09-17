window.addEventListener("load",handleWindowLoad,false);

function handleWindowLoad(){
    canvasApp();
}

function canvasApp(){
    var myCanvas = document.getElementById("myCanvas");
    var context = myCanvas.getContext("2d");
    if(!context){
        return;
    }

    //---------------Game State--------------
    var INIT = 0;
    var STARTING = 10;
    var LOADING = 20;
    var RUNNING = 30;
    var GAMEOVER = 40;

    var gameState = 0;
    var render = null;
    //---------------Game Loading------------
    var loadCount = 0;
    var itemsToLoad = 0;
    var loadReady = false;
    //---------------Public Vars-------------
    var canvasWidth = myCanvas.width;
    var canvasHeight = myCanvas.height;

    //Role and Ground
    var gravity = 0.4;
    var roleWidth = 20;
    var roleHeight = 30;
    var role;
    var grounds = [];
    var groundsCount = 10;
    var fireHeight = 0;
    var fire;

    //------------------Audio------------------
    var audioPool = new Array();
    var startMusic;
    var gamingMusic;
    var audioType = "mp3";
    //------------------Objects-----------------
    var Role = function(o){
        var defaults = {
            width:roleWidth,
            height:roleHeight,
            x:100,
            y:300,
            vx:0,
            vy:0,
            jumpVx:5,
            jumpVy:-8,
            standId:0,
            onair:false
        };
        o = extend(defaults,o);
        this.width = o.width;
        this.height = o.height;
        this.x = o.x;
        this.y = o.y;
        this.vx = o.vx;
        this.vy = o.vy;
        this.jumpVx = o.jumpVx;
        this.jumpVy = o.jumpVy;
        this.standId = o.standId;
        this.onair = o.onair;
    }

    var Fire = function(o){
        var defaults = {
            height:fireHeight,
            y:480,
            vy:1
        };
        o = extend(defaults,o);
        this.y = o.y;
        this.vy = o.vy;
    }

    //Dom Elements
    var btnRestart = document.getElementById("btnRestart");
    var btnFollow = document.getElementById("btnFollow");
    var btnStart = document.getElementById("btnStart");
    var btnAbout = document.getElementById("btnAbout");
    var startPage = document.getElementById("startPage");
    var loadingPage = document.getElementById("loadingPage");
    var gameOverPage = document.getElementById("gameOverPage");

    function createSticks(){
        var defaults = {
            width:100,
            height:15,
            startX:10,
            startY:430
        }

        grounds = [];

        for(var i = 0;i < groundsCount;i++){
            var tempX = defaults.startX + Math.floor(Math.random() * 3) * 100;
            var tempY = defaults.startY - i * 110;
            grounds.push({
                id:i,
                width:defaults.width,
                height:defaults.height,
                x:tempX,
                y:tempY,
                type:0
            });
        }
    }

    //-----------Game Update----------------
    function updateGame(){
        //Role
        if(role.y <= canvasHeight){
            var tempI = false;
            for(var i = role.standId;i <= role.standId +1;i++){

                if(i == groundsCount){
                    i = 0;
                    tempI = true;
                }
                if(role.x >= grounds[i].x && role.x <= grounds[i].x + grounds[i].width){
                    if(role.y >= grounds[i].y - role.height && role.y <= grounds[i].y + grounds[i].height - role.height){
                        if(role.vy > 0){
                            role.onair = false;
                            role.y = grounds[i].y - role.height;
                            role.vy = 0;
                            role.standId = grounds[i].id;
                        }
                    }
                }
                if(tempI == true){
                    tempI = false;
                    break;
                }
            }
        }else{
            switchGameState(GAMEOVER);
        }

        if(role.y + role.height>= fire.y){
            switchGameState(GAMEOVER);
        }

        if(role.onair){
            role.vy = role.vy + gravity;
            role.y += role.vy;
        }else{
            if(role.x < grounds[role.standId].x || role.x > grounds[role.standId].x + grounds[role.standId].width){
                role.onair = true;
            }
        }

        if(role.x >= 0 && role.x + role.width <= canvasWidth){
            role.x += role.vx;
        }

        if(role.x < 0){
            role.x = 0;
        }else if(role.x + role.width > canvasWidth){
            role.x = canvasWidth - role.width;
        }

        //Grounds
        for(var i = 0;i < groundsCount;i++){
            if(role.vy < 0){
                grounds[i].y -= role.vy - 1;
            }
            if(grounds[i].y > canvasHeight){
                grounds[i].y = 	grounds[i].y - groundsCount * 110;
            }
        }

        //Fire
        if(role.vy < 0){
            fire.y -= role.vy + 1;
			fire.vy -= 0.002;
        }
        fire.y -= fire.vy;
        fire.vy += 0.001;
    }


    //-----------Game Draw------------------

    function drawScreen(){
         context.clearRect(0,0,canvasWidth,canvasHeight);
         //Sticks
         context.fillStyle = "#00FFFF";
         for(var i = 0;i < groundsCount;i++){
             context.fillRect(grounds[i].x,grounds[i].y,grounds[i].width,grounds[i].height);
         }
         //Role
         context.fillStyle = "#000000";
         context.fillRect(role.x,role.y,role.width,role.height);
         //Fire
         context.fillStyle = "red";
         context.fillRect(0,fire.y,canvasWidth,canvasHeight - fire.y);
    };


    //-------------Game State----------------
    var stateFunc = {};

    stateFunc.init = function(){
        loadCount = 0;
        itemsToLoad = 2;
        //Audio Loading
        var audioPoolEle = document.getElementById("audioPool");

        startMusic = document.createElement("audio");
        audioPoolEle.appendChild(startMusic);
        startMusic.setAttribute("src","audio/start." + audioType);
        startMusic.addEventListener("canplaythrough",itemLoaded,false);

        gamingMusic = document.createElement("audio");
        audioPoolEle.appendChild(gamingMusic);
        gamingMusic.setAttribute("src","audio/game." + audioType);
        gamingMusic.setAttribute("loop",true);
        gamingMusic.addEventListener("canplaythrough",itemLoaded,false);
        startMusic.play();
        switchGameState(STARTING);
    }

    stateFunc.gameStart = function() {
        //Start Screen Buttons
        btnStart.onclick = function(){
            if(loadReady){
                alert("Please Use Arrow Up, Left and Right to Control!");
				startMusic.pause();
                gamingMusic.play();
                switchGameState(LOADING);
            }else{
                alert("Loading,Please wait!");
            }
        }
        btnAbout.onclick = function(){
            alert("OK!");
        }
    }

    stateFunc.gameLoading = function(){
        //Screen
        startPage.style.display = "none";
        startPage.style.zIndex = "1";
        gameOverPage.style.display = "none";
        gameOverPage.style.zIndex = "1";
        myCanvas.style.display = "block";
        myCanvas.style.zIndex = "10";
        //Game
        createSticks();
        var roleTempX = grounds[0].x + (grounds[0].width - roleWidth) / 2;
        var roleTempY = grounds[0].y - roleHeight;
        role = new Role({x:roleTempX,y:roleTempY,standId:0});
        fire = new Fire({});
        switchGameState(RUNNING);
    }

    stateFunc.gameRunning = function (){
        handleKeyBoard();
        updateGame();
        drawScreen();
    }

    stateFunc.gameOver = function (){
        //Screen
        myCanvas.style.display = "none";
        myCanvas.style.zIndex = "1";
        gameOverPage.style.display = "block";
        gameOverPage.style.zIndex = "10";

        btnRestart.onclick = function(){
            switchGameState(LOADING);
        }

        btnFollow.onclick = function(){
            window.location.href = "http://weibo.com/nayukey";
        }
    }

    //------------Audio Control-----------
    function itemLoaded(event){
        loadCount++;
        console.log(loadCount);
        if(loadCount >= itemsToLoad){
            startMusic.removeEventListener("canplaythrough",itemLoaded,false);
            gamingMusic.removeEventListener("canplaythrough",itemLoaded,false);
            audioPool.push({name:"start",element:startMusic,played:false});
            audioPool.push({name:"gaming",element:gamingMusic,played:false});
            loadReady = true;
        }
    }

    //-------------Control---------------
    var keys = {};
    document.onkeydown = function(e){
        e.preventDefault();
        keys[e.keyCode] = true;
    }

    document.onkeyup = function(e){
        keys[e.keyCode] = false;
        if(role !=null){
            role.vx = 0;
        }
    }

    function handleKeyBoard(state){
        if(keys[37]){
            role.vx = - role.jumpVx;
        }

        if(keys[38]){
            if(!role.onair){
                role.vy = role.jumpVy;
                role.onair = true;
            }
        }

        if(keys[39]){
            role.vx = role.jumpVx;
        }
    }

    function handleMouseEvent(state){

    }

    //-----------Switch Game State--------------
    function switchGameState(state){
        gameState = state;
        switch(gameState){
            case 0:
                render = stateFunc.init;
                break;
            case 10:
                render = stateFunc.gameStart;
                break;
            case 20:
                render = stateFunc.gameLoading;
                break;
            case 30:
                render = stateFunc.gameRunning;
                break;
            case 40:
                render = stateFunc.gameOver;
                break;
            default:
                render = stateFunc.gameStart;
                break;
        }
    }

    //-------------Tools----------------
    function extend(a,b){
        for(var i in b){
            a[i] = b[i];
        }
        return a;
    }

    //--------------FPS-----------------
    switchGameState(gameState);
    var fps = 60;
    window.setInterval(function(){
        render();
    }, 1000 / fps);
}