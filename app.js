var gameStart = null;
gameSpeed = null;
gameArea = null;
gameAreaContext = null;
gameAreaWidth = 0;
gameAreaHeight = 0;
cellWidth = 0;
playScore = 0;

snake = null;
snakeFood = null;
snakeDirection = null;
speedSize = 0;
timer = null;

function initialize() {
    gameStart = document.getElementById("gameStart");
    gameSpeed = document.getElementById("gameSpeed");
    gameArea = document.getElementById("gameArea");
    gameAreaContext = gameArea.getContext('2d');
    gameAreaWidth = 400;
    gameAreaHeight = 600;
    cellWidth = 20;
    gameArea.width = gameAreaWidth;
    gameArea.height = gameAreaHeight;

    gameStart.onclick = function() {
        this.disable = true;
        startGame();

    }
    function startGame() {
        playScore = 0;
        snakeDirection = "right";
        speedSize = parsInt(gameSpeed.value);

        if(speedSize > 9) {
            speedSize = 9;
        }else if (speedSize < 0) {
            speedSize = 1;
        }
        snake = [];
        snake.push({ x: 0 , y : cellWidth})
    }
creatFood();
clearInterval(timer);
//timer = setInterval(createga)
}

function creatFood {
    snakeFood = {
        x: Math.round((Math.random() * (gameAreaWidth - cellWidth)) /cellWidth),
        x: Math.round((Math.random() * (gameAreaHeight - cellWidth)) /cellWidth),
    }
}

function createGameArea() {

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    gameAreaContext.fillStyle = "#FFFFFF";
    gameAreaContext.fillReact(0, 0, gameAreaWidth, gameAreaHeight);
    gameAreaContext.strokeStyle = "#CCCCCC";
    gameAreaContext.strokeReact(0, 0, gameAreaWidth, gameAreaHeight);

    if(snakeDirection == 'right') {
        snakeX++; 
    }else if (snakeDirection == 'left') {
        snakeX--; 
    }else if (snakeDirection == 'down') {
        snakeY++;
    }else if (snakeDirection == 'up') {
        snakeY--;
    }
    if (
snakeX == -1 ||
snakeX == gameAreaWidth/ cellWidth ||
snakeY == -1 ||
snakeY == gameAreaHeight /cellWidth ||
control(snakeX, snakeY, snake)
    ) {
        writeScore();
        clearInterval(timer);
        gameStart.disabled = false;
        return;
    }

    if (snake == snakeFood.x && snakeY== snakeFood.y) {
        let newHead = { x: snakeX, y: snakeY};
        playerScore += speedSize;
        creatFood()
    }else {
        let newHead= snake.pop();
        newHead.x = snakeX;
        newHead.y = snakeY;
    }
    snake.unshift(newHead);
    for (let i = 0; i < snake.length; i++) {
        creatSquare(snake[i].x,snakeFood.y)
    }

   creatSquare(snakeFood.x, snakeFood.y); 
}

function control(x, y, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].x == x && array[i].y == y) return true;
    }
    return false;
}

function writeScore() {
    gameAreaContext.font = "50px sans-serif";
    gameAreaContext.fillStyle = "#FFF333";
    gameAreaContext.fillText( 
        "score : " + playScore,
        gameAreaWidth /2 -100,
        gameAreaWidth /2
    )
}

function creatSquare(x, y) {
    gameAreaContext.fillStyle = "000000";
    gameAreaContext.fillReact(x * cellWidth, y * cellWidth, cellWidth, cellWidth)
}

function changeDirection(e) {
    let keys = e.which;
    
    if (keys == "40" && snakeDirection != "up" )snakeDirection = "down";
    else if (keys == "39" && snakeDirection != "left" )snakeDirection = "right";
    else if (keys == "38" && snakeDirection != "down" )snakeDirection = "up";
    else if (keys == "37" && snakeDirection != "right" )snakeDirection = "left";
}

window.onkeydown= changeDirection;
window.onload = initialize;