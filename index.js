const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "grey";
ctx.fillRect(0,0,canvas.width,canvas.height);

const paddle_width = 10;
const paddle_height = 100;
const paddle_x_position = 10;
let paddle_y_position = 300;

const ball_width = 10;
const ball_height = 10;
let ball_x_position = 100;
let ball_y_position = 40;

let ball_x_direction = -10;
let ball_y_direction = 10

function animatePaddle(){
    ctx.fillStyle = "black";
    ctx.fillRect(paddle_x_position,paddle_y_position,paddle_width,paddle_height);
}
function clearPaddle(){
    ctx.fillStyle = "grey";
    ctx.fillRect(paddle_x_position,paddle_y_position,paddle_width,paddle_height);
}
function animateBall(direction = -1){
    ctx.fillStyle = "white";
    ctx.fillRect(ball_x_position,ball_y_position,ball_width,ball_height);
}
function clearBall(){
    ctx.fillStyle = "grey";
    ctx.fillRect(ball_x_position,ball_y_position,ball_width,ball_height);
}
function checkCollision(){
    // CHECK IF BALL HITS BAT
    if(ball_x_position <= paddle_x_position + ball_width){
        if(ball_y_position >= paddle_y_position && ball_y_position <= paddle_y_position + paddle_height){
            stopBall();
            ball_x_direction = -ball_x_direction;
            ball_y_direction = ball_y_direction;
            let moveBall = setInterval(()=>{
                clearBall()
                ball_x_position += ball_x_direction;
                ball_y_position -= ball_y_direction;
                animateBall();
            },300)
        }else{
            stopBall();
        }
    }
    // CHECK IF BALL HITS TOP
    if(ball_y_position === 0 && ball_y_position <= 0 ){
        stopBall();
        ball_y_direction = -ball_y_direction;
        let moveBall = setInterval(()=>{
            clearBall()
            ball_x_position += ball_x_direction;
            ball_y_position -= ball_y_direction;
            animateBall();
        },300)
    }
}

animatePaddle();
animateBall();

window.addEventListener("keypress", e =>{
    if(e.key === "w"){
        if(paddle_y_position === 0) return
        clearPaddle();
        paddle_y_position -= 10;
        animatePaddle();
    }else if(e.key === "s"){
        if(paddle_y_position === canvas.height - paddle_height) return
        clearPaddle();
        paddle_y_position += 10;
        animatePaddle();
    }else return;
})

let moveBall = setInterval(()=>{
    clearBall()
    ball_x_position += ball_x_direction;
    ball_y_position -= ball_y_direction;
    animateBall();
    checkCollision();
},300)

function stopBall(){
    clearInterval(moveBall)
}

