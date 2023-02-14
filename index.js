const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "grey";
ctx.fillRect(0,0,canvas.width,canvas.height);

class GamePiece {
    constructor(width,height,x,y,color){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
    }
    describe(){
        console.table(this);
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
    clear(){
        ctx.fillStyle = "grey";
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}

class Paddle extends GamePiece {
    constructor(width,height,x,y,y_speed){
        super(width,height,x,y,);
        this.y_speed = y_speed;
        this.color = "black";
    }
    moveUp(){
        if(this.y === 0) return;
        this.clear();
        this.y -= 10;
        this.draw();
    }
    moveDown(){
        if(this.y + this.height === 600) return;
        this.clear();
        this.y += 10;
        this.draw();
    }
}
class Ball extends GamePiece {
    constructor(width,height,x,y,x_speed,y_speed){
        super(width,height,x,y);
        this.x_speed = x_speed;
        this.y_speed = y_speed;
        this.color = "white";
    }
    move(){
        this.clear();
        this.checkCollision();
        this.x = this.x - this.x_speed;
        this.y = this.y - this.y_speed;
        this.draw();
    }
    checkCollision(){
        if(this.y === 0 || this.y === 600 - 10){
            this.y_speed = -this.y_speed;
        }
        if(this.x === 0){
            alert("You lose...")
        }else if(this.x === 1000 - 10){
            alert("You win...")
        }
        if(this.x === 20 && (this.y >= playerOnePaddle.y && this.y <= (playerOnePaddle.y + playerOnePaddle.height))){
            this.x_speed = -this.x_speed;
        }else if(this.x === 970 && (this.y >= playerTwoPaddle.y && this.y <= (playerTwoPaddle.y + playerTwoPaddle.height))){
            this.x_speed = -this.x_speed;
        }
    }
}

// INIT 
const ball = new Ball(10,10,600,300,10,-10);
const playerOnePaddle = new Paddle(10,100,10,300,10,10);
const playerTwoPaddle = new Paddle(10,100,980,500,10,10);

ball.draw();
playerOnePaddle.draw();
playerTwoPaddle.draw();

// const test = setInterval(()=>{
//     ball.move()
// },100)

window.addEventListener("keypress", e =>{
    switch(e.key){
        case "w" : 
            playerOnePaddle.moveUp();
            break;
        case "s" : 
            playerOnePaddle.moveDown();
            break;
        case "8" : 
            playerTwoPaddle.moveUp();
            break;
        case "2" : 
            playerTwoPaddle.moveDown();
            break;
    }
})