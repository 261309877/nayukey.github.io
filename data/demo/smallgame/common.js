//Small Game
//By Nayukey
//2012.4.11

//Window Onload

window.onload = function () {
    new logoAnimation();
}

var SmallGame = function () {
    //Check the browser
    var alertMsg = "Your Browser does not Support HTML5 Canvas"
    new Suport().checkCanvas2d(alertMsg);

    //get context
    var myCanvas = document.getElementById('my-game');
    var context = myCanvas.getContext('2d');

    window.addEventListener('click', handleRoleJump, false);

    function startScreen() {
        checkRoleHit();
        update();
        updateLevel();
        render();
    }

    //render
    function render() {
        //Clear
        context.clearRect(0, 0, myCanvas.width, myCanvas.height);

        if (!gameover) {
            //Background
            context.drawImage(canvasBackground.image, 0, 0, myCanvas.width, myCanvas.height);

            if (onair) {
                context.drawImage(canvasBackground.smile, smileX, smileY, canvasBackground.smile.width, canvasBackground.smile.height);
            }

            //Role
            context.drawImage(role.image, role.x, role.y, role.width, role.height);
            //Rock
            for (var i = 0; rocks[i]; i++){
                context.drawImage(rocks[i].image, rocks[i].x, rocks[i].y, rocks[i].width, rocks[i].height);
            }
            
            //Score
            var scoreMsg = 'Score:' + score;
            context.fillStyle = "#FFFFFF";
            context.font = "20px Microsoft YaHei";
            context.textBaseline = 'top';
            context.fillText(scoreMsg, (myCanvas.width - 150), 30);
            //Level
            var levelMsg = 'Level - ' + (level + 1);
            context.fillText(levelMsg, 30, 30);

        } else {
            handleRoleHit();
        }
    }

    //Handle Role Jump
    function handleRoleJump() {
        if (!onair) {
            role.vy = roleJumpSpeed;
            onair = true;
        }        
    }

    function update() {
        //partPos
        partPos = Math.random() * partLevel + 1.2;
        //role
        if (role.y <= roleY && onair == true) {
            role.vy = role.vy + gravity;
            role.y = role.y + role.vy;
        } else if (role.y > roleY) {
            role.y = roleY;
            role.vy = 0;
            onair = false;
        }
        //rock
        for (var i = 0; rocks[i]; i++) {
            if (rocks[i].x < (myCanvas.width / partPos)) {
                if (i == (rocks.length - 1)) {
                    rocks[0].vx = rockSpeed;
                } else {
                    rocks[i + 1].vx = rockSpeed;
                }               
            }

            if (rocks[i].x < (0 - rockWidth)) {
                rocks[i].x = rockX;
                rocks[i].vx = 0;
            }

            rocks[i].x = rocks[i].x + rocks[i].vx;
        }
    }

    function updateLevel() {
        score++;  
        if (level != Math.floor(score / 300)) {
            level = Math.floor(score / 300);
            rockSpeed = rockSpeed * (1 + level / 10);
            gravity = gravity * (1 + level / 100);
            partLevel = partLevel * (1 - level / 20);
        }
    }

    function checkRoleHit() {
        for (var i = 0; rocks[i]; i++) {
            var thisRock = rocks[i];
            var dy = (role.y + role.height / 2) - (thisRock.y + thisRock.height / 2);
            var dx = (role.x + role.width / 2) - (thisRock.x + thisRock.width / 2);
            var r = thisRock.radius + role.radius;
            if ((dy * dy + dx * dx) < (r * r)) {
                handleRoleHit();
            }
        }
    }

    function handleRoleHit() {
        gameover = true;

        //Clear the timer
        window.clearInterval(timer);

        //Clear Canvas
        context.clearRect(0, 0, myCanvas.width, myCanvas.height);
        context.fillStyle = "#333333";
        context.fillRect(0, 0, myCanvas.width, myCanvas.height);

        //Log the Title
        var gameoverMessage = 'Game Over, Your Score is ' + score;
        var textWidth = context.measureText(gameoverMessage).width;
        context.fillStyle = "#FFFFFF";
        context.font = "48px Microsoft YaHei";
        context.textBaseline = 'middle';
        context.fillText(gameoverMessage, (myCanvas.width - textWidth) / 2, myCanvas.height / 2);
        
    }

    //Environment
    var groundY = 518;
    var gravity = 0.5;
    var onair = false;
    var gameover = false;
    var score = 0;
    var level = 0;
    var partPos = 1.5;
    var partLevel = 4;

    //Role
    var roleImageSource = 'role.png';
    var roleImage = new Suport().createImageObject(roleImageSource);
    var roleWidth = roleImage.width;
    var roleHeight = roleImage.height;
    var roleX = (myCanvas.width - roleWidth) / 2;
    var roleY = groundY - roleHeight;
    var roleRadius = roleWidth / 2;   
    var roleJumpSpeed = -12;

    //Rock
    var rockImageSource = 'rock.png';
    var rockImage = new Suport().createImageObject(rockImageSource);
    var rockWidth = rockImage.width;
    var rockHeight = rockImage.height;
    var rockX = myCanvas.width + 100 - rockWidth / 2;
    var rockY = groundY -rockHeight;
    var rockRadius = rockWidth / 2;
    var rockCount = 6;
    var rockSpeed = -4;
    var rocks = new Array();

    //Background
    var backgroundImageSource = 'back.png';
    var backgroundSmile = 'backSmile.png';
    var backgroundImage = new Suport().createImageObject(backgroundImageSource);
    var backgroundSmile = new Suport().createImageObject(backgroundSmile);
    var smileX = 376;
    var smileY = 15;

    //Element
    for (var i = 0; i < rockCount; i++) {
        rocks.push({
            x: rockX,
            y: rockY,
            vx: 0,
            vy: 0,
            width: rockWidth,
            height: rockHeight,
            image: rockImage,
            radius: rockRadius
        });
    }

    rocks[0].vx = rockSpeed;

    var role = {
        x: roleX,
        y: roleY,
        width: roleWidth,
        height: roleHeight,
        vx: 0,
        vy: 0,
        image: roleImage,
        radius: roleRadius
    };
    var canvasBackground = {
        image: backgroundImage,
        smile: backgroundSmile,
        smileX: smileX,
        smileY: smileY
    };


    var timer = window.setInterval(startScreen,33);
}

var logoAnimation = function () {
    //get context
    var myCanvas = document.getElementById('my-game');
    var context = myCanvas.getContext('2d');

    var logoImage = new Image();
    logoImage.src = 'logo.png';

    context.drawImage(logoImage, 0, 0, myCanvas.width, myCanvas.height);

    window.setTimeout(function () {
        new Suport().gameStart();
    }, 5000);
}

var Suport = function () {
    //check the canvas 2d
    this.checkCanvas2d = function (message) {
        if (!document.createElement('canvas').getContext('2d')) {
            alert(message);
            return function () {
                return false;
            };
        }
    };
    //creat the image
    this.createImageObject = function (source) {
        var myImage = new Image();
        myImage.src = source;
        return myImage;
    };
    //Game Start
    this.gameStart = function () {
        new SmallGame();
    };
}