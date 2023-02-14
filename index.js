const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "grey";
ctx.fillRect(0,0,canvas.width,canvas.height);

const paddle_width = 10;
const paddle_height = 100;
const player_paddle_x_position = 10;
const pc_paddle_x_position = canvas.width - paddle_width - 10;

let player_paddle_y_position = 300;
let pc_paddle_y_position = 400;

const ball_width = 10;
const ball_height = 10;
let ball_x_position = 300;
let ball_y_position = 40;

let ball_x_direction = -10;
let ball_y_direction = 10

function drawPlayerPaddle(){
    ctx.fillStyle = "black";
    ctx.fillRect(player_paddle_x_position,player_paddle_y_position,paddle_width,paddle_height);
}
function clearPaddle(){
    ctx.fillStyle = "grey";
    ctx.fillRect(player_paddle_x_position,player_paddle_y_position,paddle_width,paddle_height);
}

function drawPCPaddle(){
    ctx.fillStyle = "black";
    ctx.fillRect(pc_paddle_x_position,pc_paddle_y_position,paddle_width,paddle_height);
}
function clearPCPaddle(){
    ctx.fillStyle = "grey";
    ctx.fillRect(pc_paddle_x_position,pc_paddle_y_position,paddle_width,paddle_height);
}

function animateBall(){
    ctx.fillStyle = "white";
    ctx.fillRect(ball_x_position,ball_y_position,ball_width,ball_height);
}
function clearBall(){
    ctx.fillStyle = "grey";
    ctx.fillRect(ball_x_position,ball_y_position,ball_width,ball_height);
}
function checkCollision(){
    // CHECK IF BALL HITS TOP
    if(ball_y_position === 0 && ball_y_position <= 0 ){
        ball_y_direction = - ball_y_direction;
    }
    // CHECK IF BALL HITS LEFT
    if(ball_x_position === 0){
        stopBall();
        alert("You lose!");
    }
    // CHECK IF BALL HITS BOTTOM
    if(ball_y_position === canvas.height - ball_height){
        ball_y_direction = - ball_y_direction;
    }
    // CHECK IF BALL HITS RIGHT
    if(ball_x_position === canvas.width - ball_width){
        stopBall();
        alert("You win!");
    }
    // CHECK IF BALL HITS LEFT PADDLE
    if(ball_x_position === (player_paddle_x_position + paddle_width)  && (ball_y_position >= player_paddle_y_position && ball_y_position <= (player_paddle_y_position + paddle_height))){
        ball_x_direction = -ball_x_direction;
    }
    // // CHECK IF BALL HITS RIGHT PADDLE
    if(ball_x_position === (pc_paddle_x_position - paddle_width) && (ball_y_position >= pc_paddle_y_position && ball_y_position <= (pc_paddle_y_position + paddle_height))){
        ball_x_direction = -ball_x_direction;
    }
}

function step(){
    clearBall()
    ball_x_position += ball_x_direction;
    ball_y_position -= ball_y_direction;
    animateBall();
    checkCollision();
}

function stopBall(){
    clearInterval(moveBall);
}
drawPlayerPaddle();
drawPCPaddle();
animateBall();
let moveBall = setInterval(step,75);
// stopBall();

let movePCPaddle = setInterval(()=>{
    if(ball_y_position > pc_paddle_y_position){
        clearPCPaddle();
        pc_paddle_y_position += 10;
        drawPCPaddle();
    }else{
        clearPCPaddle();
        pc_paddle_y_position -= 10;
        drawPCPaddle();
    }
},100)
clearInterval(movePCPaddle);

window.addEventListener("keypress", e =>{
    switch(e.key){
        case "w" : 
            if(player_paddle_y_position === 0) return;
            clearPaddle();
            player_paddle_y_position -= 10;
            drawPlayerPaddle();
            break;
        case "s" : 
            if(player_paddle_y_position === canvas.height - paddle_height) return;
            clearPaddle();
            player_paddle_y_position += 10;
            drawPlayerPaddle();
            break;
        case "8" : 
            if(pc_paddle_y_position === 0) return;
            clearPCPaddle();
            pc_paddle_y_position -= 10;
            drawPCPaddle();
            break;
        case "2" : 
            if(pc_paddle_y_position === canvas.height - paddle_height) return;
            clearPCPaddle();
            pc_paddle_y_position += 10;
            drawPCPaddle();
            break;
    }
})