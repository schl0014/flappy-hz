import Obstacle from './Obstacle.js';
import Bird from './Bird.js';
import Block from './Block.js';
import PowerUp from './PowerUp.js';
export default class Game {
    obstacles;
    bird;
    score;
    blockSpeed = 5;
    canvas;
    ctx;
    constructor(canvasId) {
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = 600;
        this.ctx = this.canvas.getContext('2d');
        this.obstacles = [];
        this.score = 0;
        this.bird = this.insertHzBird();
        console.log(this.bird);
        this.loop();
    }
    loop = () => {
        this.increaseGravity();
        this.insertExtraObstacle();
        this.increaseBlockSpeed();
        this.obstacleOutOfCanvas();
        this.bird.handleKeyBoard();
        this.move();
        this.draw();
        console.log(this.obstacles);
        const collidingObstacle = this.bird.hzCollidesWithObstacle(this.obstacles);
        const collidesWithSide = this.bird.hzCollidesWithSide(this.canvas);
        if (collidesWithSide) {
            this.drawGameOver();
        }
        else if (collidingObstacle != null) {
            if (collidingObstacle.getType() === 'block') {
                this.drawGameOver();
            }
            else {
                if (this.blockSpeed > 5) {
                    this.blockSpeed -= 5;
                }
                this.obstacles.splice(this.obstacles.indexOf(collidingObstacle), 1);
                this.score += 1;
                requestAnimationFrame(this.loop);
            }
        }
        else {
            this.score += 1;
            requestAnimationFrame(this.loop);
        }
    };
    increaseGravity() {
        if (this.score % 8 === 0) {
            this.bird.setYSpeed(1);
        }
    }
    insertExtraObstacle() {
        if (this.score === 0 || this.score % Math.round(500 / this.blockSpeed) === 0) {
            this.obstacles.push(this.createObstacle());
        }
    }
    createObstacle() {
        const randomObstacle = Obstacle.randomNumber(0, 100);
        let image;
        let yPos;
        if (randomObstacle >= 80) {
            image = Game.loadNewImage('./assets/turtle.png');
        }
        else {
            image = Game.loadNewImage('./assets/block.png');
        }
        const randomPosition = Obstacle.randomNumber(0, 1);
        if (randomPosition === 0) {
            yPos = 0;
        }
        else {
            yPos = this.canvas.height - image.height;
        }
        if (randomObstacle >= 80) {
            return new PowerUp(this.canvas.width, yPos, image, this.blockSpeed, this.canvas.height, this.canvas, 'powerup');
        }
        return new Block(this.canvas.width, yPos, image, this.blockSpeed, this.canvas, 'block');
    }
    increaseBlockSpeed() {
        if (this.score % 400 === 0) {
            this.blockSpeed += 2;
            this.obstacles.forEach((block) => {
                block.setXSpeed(this.blockSpeed);
            });
        }
    }
    obstacleOutOfCanvas() {
        this.obstacles.forEach((block, index) => {
            if (block.getXPos() + block.getImage().width < 0) {
                this.obstacles.splice(index, 1);
            }
        });
    }
    drawGameOver() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(`Game over! Your score is: ${this.score}`, 40, this.canvas.width / 2, this.canvas.height / 2);
    }
    insertHzBird() {
        const image = Game.loadNewImage('./assets/logo.png');
        return new Bird(100, this.canvas.height / 2, image);
    }
    move() {
        this.bird.move();
        this.obstacles.forEach((block) => {
            block.move();
        });
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawHZBird();
        this.drawBlocks();
        this.writeTextToCanvas(`Score is: ${this.score}`, 40, this.canvas.width / 2, 40);
    }
    drawHZBird() {
        this.bird.draw(this.ctx);
    }
    drawBlocks() {
        this.obstacles.forEach((block) => {
            block.draw(this.ctx);
        });
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'red') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
//# sourceMappingURL=Game.js.map