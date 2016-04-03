var canvas = document.getElementById('canvas');//declaring the canvas
var g = canvas.getContext('2d');

canvas.width = 512;// sets canvas widht
canvas.height = 480;// set canvas height

var font12px = '12pt Arial';// for score etc
var font36px = '36pt Arial';//for menu

var snd = new Audio("audio/fireloop.mp3");// declaring sound file for fireball

var playerWidth = 72;//width of the player in the image
var playerHeight = 96;//heigth of the player in the image
var playerStartX = 200;
var playerStartY = 200;
var imageStartX = 0;
var imageStartNorthY = 0;
var imageStartEastY = 96;
var IMAGE_START_SOUTH_Y = 192;
var imageStartWestY = 288;
var imageWidth = 216;//width of the image

var facing;//says what position the player image is facing
var currentXPosition;
var currentYPosition;
var playerX;
var playerY;

//declaring background//
var backgroundReady = false;
var backgroundImage = new Image();
backgroundImage.onload = function () {
    backgroundReady = true;
};
backgroundImage.src = "images/backgrounds/background.png";

var backgroundReady2 = false;
var backgroundImage2 = new Image();
backgroundImage2.onload = function () {
    backgroundReady2 = true;
};
backgroundImage2.src = "images/backgrounds/background2.png";

var backgroundReady3 = false;
var backgroundImage3 = new Image();
backgroundImage3.onload = function () {
    backgroundReady3 = true;
};
backgroundImage3.src = "images/backgrounds/snowWithTracksBackgrounds.jpg";

var GameOverBackgroundReady = false;
var GameOverBackgroundImage = new Image();
GameOverBackgroundImage.onload = function () {
    GameOverBackgroundReady = true;
};
GameOverBackgroundImage.src = "images/backgrounds/blackBackground.png";

//declaring player     
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function () {
    playerReady = true;
};
playerImage.src = "images/player/resizedSpriteSheet3.png";

// Enemy image
var enemyReady = false;
var enemyImage = new Image();
enemyImage.onload = function () {
    enemyReady = true;
};
enemyImage.src = "images/enemy/evilTeddy.png";

//Items
// Bullet image
var bulletReady = false;
var bulletImage = new Image();
bulletImage.onload = function () {
};
bulletImage.src = "images/items/bullet.png";

//Bomb//
var bombReady = false;
var bombImage = new Image();
bombImage.onload = function () {
    bombReady = true;
};
bombImage.src = "images/items/bomb.png";

//banana
var bananaReady = false;
var bananaImage = new Image();
bananaImage.onload = function () {
    bananaReady = true;
};
bananaImage.src = "images/items/BannaSlip.png";

//Game objects//
var bomb = {
    speed: 256, //movement in pixels per second//
    x: 32 + (Math.random() * (canvas.width - 64)), // set x value of the bomb to be random
    y: 32 + (Math.random() * (canvas.height - 64)),
    size: 32
};

// player being declared along with player.x and player.y etc
var player = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 64,
    speed: 256,
    lifes: 3
};

//item that will respawn randomelly 
var item = {
    x: Math.round(Math.random() * canvas.width - 60),
    y: Math.round(Math.random() * canvas.height - 60),
    size: 32,
    bananaSpeed: 100
};

//enemy declared
var enemy = {
    x: Math.round(Math.random() * canvas.width),
    y: Math.round(Math.random() * canvas.height),
    size: 32
};

//bullet declared
var bullet = {
    speed: 256, // movement in pixels per second
    bulletWidth: 20,
    bulletHeight: 20
};

// used to set the color for the font
var colors = {
    text: '#fff',
    text2: '#E80000'
};

// declaring the menu of the game
var menu = {
    positionOfSelectionInMenu: 0,
    selection: 0,
    hl: function (x) {
        if (menu.selection === x) {
            g.fillStyle = '#f00'
        }
        else {
            g.fillStyle = '#000'
        }
        ;
    },
    draw: function () {
        g.fillStyle = '#fff';
        g.fillRect(0, 0, canvas.width, canvas.height);
        g.font = font36px;
        g.fillStyle = '#000';
        if (menu.selection <= -1) {
            menu.selection = 0
        }
        ;
        if (menu.positionOfSelectionInMenu === 0) {
            if (menu.selection >= 4) {
                menu.selection = 3
            }
            ;
            g.fillText("MENU", 10, 10);//writing menu
            menu.hl(0);
            g.fillText("Resume", 10, 56);//writing resume
            menu.hl(1);
            g.fillText("Change Background", 10, 102);//writing change background
            menu.hl(2);
            g.fillText("Save", 10, 148);//writing save
            menu.hl(3);
            g.fillText("Load save", 10, 194);//writing load save
        }
    },
    selectionDown: function () {//move your menu selection number up goes from 2 to 3
        menu.selection++;
    },
    selectionUp: function () {//move your menu selection number down goes from 3 to 2
        menu.selection--;
    },
    enter: function () {// if enter button has been hit
        if (menu.positionOfSelectionInMenu === 0) {//over resume in pause menu
            if (menu.selection === 0) {
                paused = !paused;//pauses game and unpauses it
                timerC = setInterval(function () {
                    timer++;
                }, 1000);
            }
            ;
            if (menu.selection === 1) {// menu selection is 1 then it is change background 
                setTimeout(function () {
                    menu.positionOfSelectionInMenu = 1
                }, 50);
            }
            ;
            if (menu.selection === 2) {// if menu option is two then save method runs
                setTimeout(save, 50);
            }
            ;
            if (menu.selection === 3) {// if menu option is two then load method runs
                setTimeout(loadSave, 50);
            }
            ;
        }
        ;
    }
}
var lifes = 3;// life variable declared with initial arguement
var score = 0;// score variable declared with initial arguement
var timer = 0;// timer variable declared with initial arguement
var paused = false;// paused variable declared with initial arguement


playerX = playerStartX;
playerY = playerStartY;

currentXPosition = imageStartX;
currentYPosition = imageStartEastY;

var keysDown = {};
window.addEventListener('keydown', function (e) {
    if (e.keyCode === 80) {// if p is pressed game is paused
        paused = !paused;
        if (paused === false) {
            timerC = setInterval(function () {
                timer++;
            }, 1000);
        }
        menu.positionOfSelectionInMenu = 0;
        menu.selection = 0;
    }
    ;
    if (e.keyCode === 13) {// if enter button is hit
        menu.enter();
    }
    ;
    if (e.keyCode === 38) {//up arrow
        menu.selectionUp();
        keysDown[e.keyCode] = true;
        e.preventDefault();
    }
    ;
    if (e.keyCode === 40) {//down arrow
        menu.selectionDown();
        keysDown[e.keyCode] = true;
        e.preventDefault();//prevents the code from doing its default action
    }
    ;

    if (e.keyCode === 32) {//space
        keysDown[e.keyCode] = true;
        e.preventDefault();
    }
    ;

    if (e.keyCode === 82) {//r
        keysDown[e.keyCode] = true;
        e.preventDefault();
    }
    ;

    if (e.keyCode === 65) {//a
        keysDown[e.keyCode] = true;
        e.preventDefault();
    }
    ;

    if (e.keyCode === 68) {//d
        keysDown[e.keyCode] = true;
        e.preventDefault();
    }
    ;

    if (e.keyCode === 87) {//w
        keysDown[e.keyCode] = true;
        e.preventDefault();
    }
    ;

    if (e.keyCode === 83) {//d
        keysDown[e.keyCode] = true;
        e.preventDefault();
    }
    ;

    if (e.keyCode === 37) {//left
        keysDown[e.keyCode] = true;
    }
    ;
    if (e.keyCode === 39) {//right
        keysDown[e.keyCode] = true;
    }
    ;
});
window.addEventListener('keyup', function (e) {// detects when the player releases the key
    delete keysDown[e.keyCode];// deletes what key was pressed
});


var time = Date.now();// The Date.now() method returns the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.
var direction = 1;// set direction which is used to decide which direction the bullet shoots
var PlayerDispX = 0;//declared variable that show the player x position
var PlayerDispY = 0;//declared variable that show the player y position
var BombDispX = 0;//declared variable that show the bomb x position
var BombDispY = 0;//declared variable that show the bomb y position

var fps = {// fps calculator
    current: 0, //set current fps to 0
    last: 0, //set last fps to 0
    lastUpdated: Date.now(), //sets to what Date.now() is
    update: function () {// calls an update function within itself
        fps.current++;//fps current +1
        if (Date.now() - fps.lastUpdated >= 1000) {// Date.now() -fps.lastUpdated is greater then or equal to 1000
            fps.last = fps.current;// sets the last fps to the current fps
            fps.current = 0;//
            fps.lastUpdated = Date.now();
        }
        ;
    }
};

function save() {// save the variables that are stated in the code
    localStorage.time = timer;
    localStorage.score = score;
}
;

function loadSave() {//loads save file of the variables that are stated in the code
    timer = Number(localStorage.time);
    score = Number(localStorage.score);
    enemyNotInCanvas();// make sure enemy is not outside the canvas
}

function update(modifier) {
    fps.update();
    // is the main code for the game this handles the various changes in variables and make sure they are passed properly to the render
    if (37 in keysDown || 65 in keysDown) {//a and left arrow
        player.x -= player.speed * modifier;// move the player x by - player speed
        bomb.x += bomb.speed * modifier;// move the bomb x by + bomb speed making it move in the complete opposite way of the players movement
        direction = 4;//sets the fireball(bullet) direction to 4
        currentYPosition = imageStartWestY;
        currentXPosition += playerWidth;

        if (currentXPosition >= imageWidth)
            currentXPosition = 0;

    }
    ;
    if (38 in keysDown || 87 in keysDown) {//up arrow and w
        player.y -= player.speed * modifier; // move the player y by - player speed
        bomb.y += bomb.speed * modifier;// move the bomb y by + bomb speed making it move in the complete opposite way of the players movement
        direction = 1;//sets the fireball(bullet) direction to 1
        currentYPosition = imageStartNorthY;
        currentXPosition += playerWidth;

        if (currentXPosition >= imageWidth)
            currentXPosition = 0;
    }
    ;
    if (39 in keysDown || 68 in keysDown) {//d and right arrow
        player.x += player.speed * modifier;// move the player x by + player speed
        bomb.x -= bomb.speed * modifier;// move the bomb x by - bomb speed making it move in the complete opposite way of the players movement
        direction = 3;//sets the fireball(bullet) direction to 3
        currentYPosition = imageStartEastY;
        currentXPosition += playerWidth;

        if (currentXPosition >= imageWidth)
            currentXPosition = 0;
    }
    ;
    if (40 in keysDown || 83 in keysDown) {//down arrow and s
        player.y += player.speed * modifier;// move the player y by + player speed
        bomb.y -= bomb.speed * modifier;// move the bomb y by - bomb speed making it move in the complete opposite way of the players movement
        direction = 2;//sets the fireball(bullet) direction to 2
        currentYPosition = IMAGE_START_SOUTH_Y;
        currentXPosition += playerWidth;

        if (currentXPosition >= imageWidth)
            currentXPosition = 0;
    }
    ;

    if (82 in keysDown) //r
    {//reset the following  variables to there orignal state and calls the reset method
        score = 0;
        lifes = 3;
        timer = 0;
        reset();
    }

    if (32 in keysDown) { // Player holding space
        bulletReady = true;

        if (bulletInterval === null)
        {
            snd.play();// play the sound for the bullet(fireball)
            bullet.x = player.x + 24;//sets bullet.x to player.x
            bullet.y = player.y + 32;//sets bullet.y to player.y
            bulletFiring = false;
            bulletInterval = setInterval(moveBullet, 100 / bullet.speed);  // animate bullet
        }
    }
    ;

    PlayerDispX = Math.round(player.x);//rounds the player.x which is saved as variable which is used later for displaying the players x coordinates
    PlayerDispY = Math.round(player.y);//rounds the player.y which is saved as variable which is used later for displaying the players y coordinates

    if (// if statement to see if player is touching enemy
            player.x < enemy.x + enemy.size &&
            player.x + player.size > enemy.x &&
            player.y < enemy.y + enemy.size &&
            player.y + player.size > enemy.y
            ) {
        enemy.x = Math.round(Math.random() * canvas.width);//chooses a random enemy.x
        enemy.y = Math.round(Math.random() * canvas.height);//chooses a random enemy.y
        score++;//increase the score by 1
        enemyNotInCanvas();
    }
    ;

    if (// if statement to see if bullet is touching enemy
            bullet.x < enemy.x + enemy.size
            && enemy.x <= (bullet.x + 32)
            && player.y <= (bullet.y + 32)
            && enemy.y <= (bullet.y + 32)
            ) {
        enemy.x = Math.round(Math.random() * canvas.width);//chooses a random enemy.x
        enemy.y = Math.round(Math.random() * canvas.height);//chooses a random enemy.y
        score++;//adds to score
        enemyNotInCanvas();
    }

    BombDispX = Math.round(bomb.x);//rounds the bomb.x which is saved as variable which is used later for displaying the bombs x coordinates
    BombDispY = Math.round(bomb.y);//rounds the bomb.y which is saved as variable which is used later for displaying the bombs y coordinates


    if (//checks to see if the player hits the bomb
            player.x <= (bomb.x + 32)
            && bomb.x <= (player.x + 32)
            && player.y <= (bomb.y + 32)
            && bomb.y <= (player.y + 32)
            ) {
        lifes--;//life -1 if player hits the bomb

        bomb.x = Math.round(Math.random() * canvas.width);//Chooses a random x position for the bomb
        bomb.y = Math.round(Math.random() * canvas.height);//Chooses a random y position for the bomb
    }

    if (//checks to see if the player hits the banana
            player.x <= (item.x + 32)
            && item.x <= (player.x + 32)
            && player.y <= (item.y + 32)
            && item.y <= (player.y + 32)
            ) {

        player.speed = player.speed - item.bananaSpeed;
        item.x = Math.round(Math.random() * canvas.width - 100);//Chooses a random x position for the banana
        item.y = Math.round(Math.random() * canvas.height - 100);//Chooses a random y position for the banana
    }

    if (player.x < 0) {
        player.x = 0;//if the player.x less then zero then player.x =0
    }
    ;
    if (bomb.x <= 0) {
        bomb.x = 0;//if the bomb.x less then zero then bomb.x =0
    }
    ;
    
     if (item.x <= 0) {
        item.x = 0;//if the item.x less then zero then item.x =0
    }
    ;

    if (player.y < 0) {
        player.y = 0;//if the player.y less then zero then player.y =0
    }
    ;

    if (bomb.y <= 0) {
        bomb.y = 0;//if the bomb.y less then zero then bomb.y =0
    }
    ;
    
    if (item.y <= 0) {
        item.y = 0;//if the bomb.y less then zero then bomb.y =0
    }
    ;

    if (player.x + player.size > canvas.width) {
        player.x = canvas.width - player.size;//if the player.x + player.size greater then canvas width then player.x equals canvas.width - player.size
    }
    ;

    if (bomb.x + bomb.size > canvas.width) {
        bomb.x = canvas.width - bomb.size;//if the bomb.x + bomb.size greater then canvas width then bomb.x equals canvas.width - bomb.size
    }
    ;
    
     if (item.x + 64 > canvas.width) {
        item.x = canvas.width - 64;//if the bomb.x + bomb.size greater then canvas width then bomb.x equals canvas.width - bomb.size
    }
    ;

    if (player.y + player.size + 32 > canvas.height) {
        player.y = canvas.height - player.size - 32;
        ;//if the player.y + player.size greater then canvas width then player.y equals canvas.width - player.size
    }
    ;

    if (bomb.y + bomb.size > canvas.height) {
        bomb.y = canvas.height - bomb.size;//if the bomb.y + bomb.size greater then canvas width then bomb.y equals canvas.width - bomb.size
    }
    ;
    
     if (item.y + 64 > canvas.height) {
        item.y = canvas.height - 64;//if the bomb.y + bomb.size greater then canvas width then bomb.y equals canvas.width - bomb.size
    }
    ;

}
;

var bulletSpeed = 100;  // number in range of 1 to 100, where 100 is fastest

function drawBullet()//draws the bullet
{
    g.drawImage(bullet, bullet.x, bullet.y, bullet.bulletWidth, bullet.bulletHeight);
}

var bulletInterval = null;//see if a bullet is already fired
var bulletReady = false;

function moveBullet()  // called by bullet timer
{
    if (direction == 1)//bullet goes up
    {
        bullet.y--;
        if (bullet.y <= 0)
        {
            clearInterval(bulletInterval);  // destroy bullet timer
            bulletInterval = null;
            bulletReady = false;
        }
    }
    if (direction == 2)// bullet goes down
    {
        bullet.y++;
        if (bullet.y >= 512)
        {
            clearInterval(bulletInterval);  // destroy bullet timer
            bulletInterval = null;
            bulletReady = false;
        }
    }

    if (direction == 3)//bullet goes right
    {
        bullet.x++;
        if (bullet.x >= 480)
        {
            clearInterval(bulletInterval);  // destroy bullet timer
            bulletInterval = null;
            bulletReady = false;
        }
    }

    if (direction == 4)//bullet goes left
    {
        bullet.x--;
        if (bullet.x <= 0)
        {
            clearInterval(bulletInterval);  // destroy bullet timer
            bulletInterval = null;
            bulletReady = false;
        }
    }

}

function enemyNotInCanvas() {// checks to see if the enemy.x or enemy. y is in the canvas and if it is not it respawns them
    if (enemy.x > canvas.width - enemy.size || enemy.y > canvas.height - enemy.size) {
        enemy.x = Math.round(Math.random() * canvas.width);
        enemy.y = Math.round(Math.random() * canvas.height);
        enemyNotInCanvas();
    }
    ;
}
;

function snowball() {//not used however works and adds snow balls however fps goes below 20 so I removed it

    // Draw 20 snowball.
    for (i = 0; i <= 20; i++) {
        // Get random positions for towers.
        var x = Math.floor(Math.random() * 460);
        var y = Math.floor(Math.random() * 460);

        // Make the snow white
        g.fillStyle = "white";



        // Draw an individual snowblaa.
        g.beginPath();
        g.arc(x, y, 3, 0, Math.PI * 2, true);//draws circle
        g.closePath();
        g.fill();

        // Save  backgroundground.
        backgroundImage = g.getImageData(0, 0, 30, 30);
    }
}

function HTMLPause()//pause game if mouse out side div tag in index page
{
    paused = true;
}

function reset()// resets the playeer and the bomb and the enemy position
{
    facing = "S";// says which way the player is facing here it is set to south
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;

    bomb.x = 32 + (Math.random() * (canvas.width - 64));//randomise the bombs x position
    bomb.y = 32 + (Math.random() * (canvas.height - 64));

    enemy.x = 32 + (Math.random() * (canvas.width - 64));
    enemy.y = 32 + (Math.random() * (canvas.height - 64));

    item.x = Math.round(Math.random() * canvas.width - 100);//Chooses a random x position for the banana
    item.y = Math.round(Math.random() * canvas.height - 100);//Chooses a random y position for the banana
}

function render() {
    if (score < 11)
    {
        g.drawImage(backgroundImage, 0, 0);
    }
    else if (score >= 11 && score <= 20)
    {
        g.drawImage(backgroundImage2, 0, 0);
    }
    else if (score >= 21)
    {
        g.drawImage(backgroundImage3, 0, 0);
    }
    if (playerReady) {//loads player image when its ready
        //g.drawImage(playerImage, player.x, player.y);
        g.drawImage(playerImage, currentXPosition, currentYPosition, playerWidth, playerHeight,
                player.x, player.y, playerWidth, playerHeight);
    }

    if (enemyReady) {//loads enemy image when its ready
        g.drawImage(enemyImage, enemy.x, enemy.y);
    }

    if (bulletReady) {//loads bullet image when its ready
        g.drawImage(bulletImage, bullet.x, bullet.y);
    }

    if (PlayerDispX < 0) {
        PlayerDispX = 0;//if the player x position < 0 it set the player x postion to 0
    }
    ;
    if (PlayerDispX > canvas.width - player.size) {//if the player x position > canvas - player size it set the player x postion to canvas - player size
        PlayerDispX = canvas.width - player.size;
    }
    ;
    if (PlayerDispY < 0) {
        PlayerDispY = 0;//if the player y position < 0 it set the player y postion to 0
    }
    ;
    if (PlayerDispY > canvas.height - player.size) {//if the player y position > canvas - player size it set the player y postion to canvas - player size
        PlayerDispY = canvas.height - player.size;
    }
    ;

    g.font = font12px;//sets it to what color the variable is set too
    g.fillStyle = colors.text;//sets the font color
    g.textBaselectionine = 'top';
    g.fillText("Score: " + score, 10, 10);//draw the score at x = 10 and y = 10
    g.fillText("Time: " + timer, 10, 32);//draw the time at x = 10 and y = 32
    g.fillText("Canvas width: " + canvas.width, 10, 54);
    g.fillText("Canvas height: " + canvas.height, 10, 76);
    g.fillText("MyPlayer x: " + PlayerDispX, 10, 98);
    g.fillText("MyPlayer y: " + PlayerDispY, 10, 120);
    g.fillText("Enemy x: " + enemy.x, 10, 142);
    g.fillText("Enemy y: " + enemy.y, 10, 164);

    g.fillText("FPS: " + fps.last, 10, 186);
    g.fillText("Lifes: " + lifes, 10, 208);
    g.fillText("Bomb x: " + BombDispX, 10, 252);
    g.fillText("Bomb y: " + BombDispY, 10, 274);

    if (fps.lastUpdated < 30)// checks to see if the fps is below 30 and if it send an alet message
    {
        alert("Warning fps is extremely low");
    }

    if (score <= 10)//if score is less then 10 run
    {
        g.font = font12px;
        g.fillStyle = colors.text;
        g.textBaselectionine = 'top';
        g.fillText("Level: 1", 10, 230);
        g.fillText("Bomb state: visible", 10, 296);
        if (bombReady) {
            g.drawImage(bombImage, bomb.x, bomb.y);
        }
        if (bananaReady) {
            g.drawImage(bananaImage, item.x, item.y);
        }
    }

    if (lifes <= 0)//draws background then you lost if lifes are less then or =0
    {
        if (GameOverBackgroundReady) {
            g.drawImage(GameOverBackgroundImage, 0, 0);
        }
        g.font = font36px;
        g.fillStyle = colors.text2;
        g.textBaselectionine = 'top';
        g.fillText("You lost", 180, 240);
    }

    if (score > 10 && score < 20)//draw the following if this condition is true
    {
        g.font = font12px;
        g.fillStyle = colors.text;
        g.textBaselectionine = 'top';
        g.fillText("Level: 2", 10, 230);
        g.fillText("bomb state: visible", 10, 296);
        //lifes+1;
        if (bombReady) {
            g.drawImage(bombImage, bomb.x, bomb.y);
        }
        if (bananaReady) {
            g.drawImage(bananaImage, item.x, item.y);
        }
    }

    if (score >= 20 && score <= 39)// if score is between 20 and 39 inclusive then it draws levels 3 and bomb state invisible
    {
        g.font = font12px;
        g.fillStyle = colors.text;
        g.textBaselectionine = 'top';
        g.fillText("Level: 3", 10, 230);
        g.fillText("bomb state: invisible", 10, 296);
        g.fillText("banana state: invisible", 10, 318);
        // snowball();
    }

    else if (score >= 40)//draws background then you won if score are greater then or =40
    {
        if (backgroundReady) {
            g.drawImage(backgroundImage, 0, 0);
        }
        g.font = font36px;
        g.fillStyle = colors.text;
        g.textBaselectionine = 'top';
        g.fillText("You Won", 210, 240);
    }

}
;

function run() {//main game loop
    if (paused === false) {// if game is unpaused

        update((Date.now() - time) / 1000);//update everything the 1000 is to put it in seconds
        render();//render
    }
    else if (paused === true) {//if game is paused
        clearInterval(timerC);//timer is stopped
        menu.draw();//draws menu
    }
    ;
    time = Date.now();
}
;

setInterval(run, 10);//main game time running
enemyNotInCanvas();

timerC = setInterval(function () {
    timer++;
}, 1000);