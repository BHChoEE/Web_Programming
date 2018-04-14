// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var num_balls = 10;
var balls = [];

ctx.fillstyle = "rgba(0, 0, 0, 0.25)";
ctx.fillRect(0,0,width,height);

function Ball(x, y, vx, vy, color, r){
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.color = color;
	this.r = r;
};

Ball.prototype.draw = function(){
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
	ctx.fill();
}

for(let i = 0 ; i < num_balls; ++i){
	var ball = new Ball(
		random(20, width - 20), random(20, height - 20), random(-20, 20), random(-20, 20), "rgb("+random(0, 255)+","+random(0, 255)+","+random(0, 255)+")", random(10, 20)
	);
	balls[i] = ball;
	balls[i].draw();
}

function EvilBall (x, y, vx, vy, color, r){
	Ball.call(this, x, y, vx,vy, color, r);
	this.eatenBalls = 0;
}
EvilBall.prototype = Object.create(Ball.prototype)
var evilBall = new EvilBall(random(20, width - 20), random(20, height - 20), 0, 0, "rgb("+random(0, 255)+","+random(0, 255)+","+random(0, 255)+")", 20);


window.onkeydown = function(event){
	var key = event.window || event.keyCode;
	//console.log(key);
	evilBall.checkKeyDown(key);
}

window.onkeyup = function(event){
	evilBall.checkKeyUp();
}

EvilBall.prototype.checkKeyDown = function(key){
	next_vx = this.vx;
	next_vy = this.vy;
	//console.log(next_vx);
	//console.log(next_vy);
	if(key == 37){
		next_vx -= 20;
	}
	else if(key == 38){
		next_vy -= 20;
	}
	else if(key == 39){
		next_vx += 20
	}

	else if(key == 40){
		next_vy += 20
	}
	this.vx = next_vx;
	this.vy = next_vy;

	if(next_vx > 40)
		this.vx = 40;
	else if(next_vx < -40)
		this.vx = -40;
	if(next_vy > 40)
		this.vy = 40;
	else if(next_vy < -40)
		this.vy = -40;
}

EvilBall.prototype.checkKeyUp = function(){
	this.vx = 0;
	this.vy = 0;
}

function update() {

	ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
	ctx.fillRect(0,0,width,height);

	for(let i = 0 ; i < num_balls ; ++i){
		var ball = balls[i];
		if(ball.x > width || ball.x < 0)
			ball.vx = -ball.vx;
		if(ball.y > height || ball.y < 0)
			ball.vy = -ball.vy;
		collision();
		ball.x += ball.vx;
		ball.y += ball.vy;
		ball.draw();
	}
	if(evilBall.x > width - 40 || evilBall.x < 40)
		evilBall.vx = -evilBall.vx;
	if(evilBall.y > height - 40 || evilBall.y < 40)
		evilBall.vy = -evilBall.vy;
		
	evilBall.x += evilBall.vx;
	evilBall.y += evilBall.vy;
	eat();
	console.log(evilBall.eatenBalls);
	evilBall.draw()
};

function eat(){
	for(let i = 0 ; i < num_balls; ++i){
		var ball = balls[i];
		if((ball.x-evilBall.x)*(ball.x-evilBall.x) + (ball.y-evilBall.y)*(ball.y-evilBall.y) < (ball.r+evilBall.r)*(ball.r+evilBall.r)){
			// ball is eaten
			evilBall.eatenBalls += 1;
			ball.x = random(20, width - 20);
			ball.y = random(20, height - 20);

		}
	}
}

function collision(){
	for(let i = 0 ; i < num_balls; ++i){
		for(let j =  i + 1 ; j < num_balls ; ++j){
			var ball1 = balls[i];
			var ball2 = balls[j];
			if((ball1.x-ball2.x)*(ball1.x-ball2.x) + (ball1.y-ball2.y)*(ball1.y-ball2.y) < (ball1.r+ball2.r)*(ball1.r+ball2.r)){
				ball1.vx = random(-20, 20);
				ball1.vy = random(-20, 20);
				ball2.vx = random(-20, 20);
				ball2.vy = random(-20, 20);
				ball1.color = "rgb("+random(0, 255)+","+random(0, 255)+","+random(0, 255)+")"
				ball2.color = "rgb("+random(0, 255)+","+random(0, 255)+","+random(0, 255)+")"
			}
		}
	}
}
window.setInterval(update, 50);
function display(){
	document.getElementById("eatenBalls").innerHTML = "EatenBalls: "+ evilBall.eatenBalls;
}
window.setInterval(display, 10);
// function to generate random number

function random(min,max) {
	var num = Math.floor(Math.random()*(max-min)) + min;
	return num;
}

