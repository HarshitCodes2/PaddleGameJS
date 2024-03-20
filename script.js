let board;
let context;
let boardHeight = 511;
let boardWidth = 296;
let score = 0;

var playerHeight = 10;
var playerWidth = 50;
let playerVelocityX = 0;

let ballHeight = 10;
let ballWidth = 10;
let ballVelocityX = 0;
let ballVelocityY = 0;

let scoreDiv = document.querySelector('.score-display');

let slider = document.getElementById('slider');
slider.value = Math.floor(boardWidth / 2) - 30;
slider.style = 'width: 296px';


ball = {
    x: boardWidth / 2,
    y: boardHeight / 2,
    height: ballHeight,
    width: ballWidth,
    velocityX: ballVelocityX,
    velocityY: ballVelocityY
}


player = {
    x: Math.floor(boardWidth / 2) - 30,
    y: boardHeight - 14,
    height: playerHeight,
    width: playerWidth,
    velocityX: playerVelocityX
}

window.onload = function () {
    board = document.getElementById('board');
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext('2d');

    context.fillStyle = "navy";
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);
    // document.addEventListener('keyup', movePlayer);
    document.querySelector('button').addEventListener('click', gameStart);
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);


    // player
    context.fillStyle = "navy";
    // player.x += player.velocityX;
    // outOfBound(player.x);
    context.fillRect(player.x, player.y, player.width, player.height);

    //ball
    context.fillStyle = 'black';
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    outOfBoundBall(ball.x, ball.y);
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    //ball hits player paddle
    if (player.x < (ball.x + Math.floor(ball.width / 2)) && (ball.x + Math.floor(ball.width / 2)) < (player.x + player.width) && player.y <= (ball.y + ball.height) && (ball.y + ball.height) <= (player.y + player.height)) {
        console.log('player - ', player);
        console.log('ball - ', ball);
        scoreUp();
    }

    //slider
    player.x = parseInt(slider.value);
    // console.log(slider.value);
}

// function outOfBound(xPosition) {
//     if (xPosition <= 0 || xPosition + player.width >= board.width) {
//         player.velocityX = 0;
//     }
// }

function outOfBoundBall(xPosition, yPosition) {
    if (xPosition <= 0 || xPosition + ball.width >= board.width) {
        ball.velocityX = -ball.velocityX;
    }
    if (yPosition <= 0) {
        ball.velocityY = -ball.velocityY;
    }
    if (yPosition + ball.height >= board.height) {
        gameOver();
    }
}

// function movePlayer(event) {
//     if (event.key == 'ArrowLeft') {
//         player.velocityX = -3;
//     }
//     else if (event.key == 'ArrowRight') {
//         player.velocityX = +3;
//     }
//     else if (event.key == ' ') {
//         moveBall();
//     }
//     console.log(event);
// }

function moveBall() {
    ball.velocityX = -2;
    ball.velocityY = -3;
}

function gameStart() {
    if (this.textContent == 'Start') {
        moveBall();
    }
    ballVelocityX = 1.3;
    ballVelocityY = 1.6;
}

function gameOver() {
    alert('GameOver \n Score : ' + score);
    resetGame();
}

function resetGame() {
    ball.x = boardWidth / 2;
    ball.y = boardHeight / 2;
    ball.velocityX = 0;
    ball.velocityY = 0;

    player.x = Math.floor(boardWidth / 2) - 30;
    player.y = boardHeight - 14;
    player.velocityX = playerVelocityX;

    score = 0;
    scoreDiv.textContent = 'Score : ' + score;
}

function scoreUp() {
    score += 1;
    scoreDiv.textContent = 'Score : ' + score;
    ball.velocityY = -ball.velocityY;

    ball.velocityX += (ball.velocityX / Math.abs(ball.velocityX)) * ballVelocityX * (1 / 10);
    console.log(ball.velocityX);
    ball.velocityY += (ball.velocityY / Math.abs(ball.velocityY)) * ballVelocityY * (1 / 10);
    console.log(ball.velocityY);
}
